import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  onSnapshot 
} from 'firebase/firestore';
import { db } from './firebase.js';

// Personal user ID for security
const PERSONAL_USER_ID = 'personal-user';

// Journal entries database operations
export const journalService = {
  // Add new journal entry
  async addEntry(entry) {
    try {
      const docRef = await addDoc(collection(db, 'journal'), {
        ...entry,
        userId: PERSONAL_USER_ID, // Ensure personal user ID
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { id: docRef.id, ...entry };
    } catch (error) {
      console.error('Error adding journal entry:', error);
      throw error;
    }
  },

  // Get all journal entries
  async getEntries(userId = PERSONAL_USER_ID) {
    try {
      const q = query(
        collection(db, 'journal'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting journal entries:', error);
      throw error;
    }
  },

  // Update journal entry
  async updateEntry(id, updates) {
    try {
      const docRef = doc(db, 'journal', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date()
      });
      return { id, ...updates };
    } catch (error) {
      console.error('Error updating journal entry:', error);
      throw error;
    }
  },

  // Delete journal entry
  async deleteEntry(id) {
    try {
      await deleteDoc(doc(db, 'journal', id));
      return id;
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      throw error;
    }
  },

  // Real-time listener for journal entries
  subscribeToEntries(userId = PERSONAL_USER_ID, callback) {
    const q = query(
      collection(db, 'journal'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, (querySnapshot) => {
      const entries = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(entries);
    });
  }
};

// Dashboard/stats database operations
export const statsService = {
  // Add daily stat
  async addDailyStat(stat) {
    try {
      const docRef = await addDoc(collection(db, 'stats'), {
        ...stat,
        userId: PERSONAL_USER_ID, // Ensure personal user ID
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        createdAt: new Date()
      });
      return { id: docRef.id, ...stat };
    } catch (error) {
      console.error('Error adding daily stat:', error);
      throw error;
    }
  },

  // Get stats for dashboard
  async getStats(userId = PERSONAL_USER_ID, days = 30) {
    try {
      const q = query(
        collection(db, 'stats'),
        where('userId', '==', userId),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.slice(0, days).map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting stats:', error);
      throw error;
    }
  }
};

export default { journalService, statsService };
