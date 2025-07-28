import { useState, useEffect } from 'react';
import { db } from '../utils/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function FirebaseTest() {
  const [status, setStatus] = useState('Testing Firebase connection...');
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    testFirebaseConnection();
  }, []);

  const testFirebaseConnection = async () => {
    try {
      setStatus('🔄 Testing Firebase connection...');
      
      // Test 1: Try to write data
      const testDoc = await addDoc(collection(db, 'test'), {
        message: 'Firebase connection test',
        timestamp: new Date(),
        userId: 'personal-user'
      });
      
      setStatus('✅ Firebase write test successful!');
      
      // Test 2: Try to read data
      const querySnapshot = await getDocs(collection(db, 'test'));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      
      setTestData(data);
      setStatus('✅ Firebase read/write tests successful!');
      
    } catch (error) {
      console.error('Firebase test error:', error);
      setStatus(`❌ Firebase error: ${error.message}`);
    }
  };

  const runTest = () => {
    setTestData([]);
    testFirebaseConnection();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">🔥 Firebase Connection Test</h2>
      
      <div className="text-center mb-6">
        <p className="text-lg mb-4">{status}</p>
        <button 
          onClick={runTest}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          Run Test Again
        </button>
      </div>

      {testData.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-3">📊 Test Data Retrieved:</h3>
          <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
            {testData.map((item, index) => (
              <div key={item.id} className="text-sm mb-2 p-2 bg-white rounded border">
                <strong>Entry {index + 1}:</strong> {item.message}<br/>
                <span className="text-gray-500">
                  Time: {item.timestamp?.toDate?.()?.toLocaleString() || 'N/A'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
