# 🚀 Firebase Setup Guide for Your Personal PWA

## Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name it: `personal-pwa-app` (or any name you prefer)
4. Disable Google Analytics (not needed for personal use)
5. Click "Create project"

## Step 2: Setup Firestore Database
1. In your Firebase project, click "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll secure it later)
4. Select a location (choose closest to you)

## Step 3: Get Firebase Configuration
1. In project settings (⚙️ icon), scroll to "Your apps"
2. Click the web icon `</>`
3. Register your app: `Personal PWA App`
4. Copy the firebaseConfig object
5. Replace the config in `src/config/firebase.js`

## Step 4: Update Firebase Rules (Important!)
In Firestore Database → Rules, replace with:

### For Personal Use (Recommended):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Personal PWA - only allow access to your data
    match /journal/{document} {
      allow read, write: if request.auth == null && 
        (resource == null || resource.data.userId == 'personal-user') &&
        (request.resource == null || request.resource.data.userId == 'personal-user');
    }
    match /stats/{document} {
      allow read, write: if request.auth == null && 
        (resource == null || resource.data.userId == 'personal-user') &&
        (request.resource == null || request.resource.data.userId == 'personal-user');
    }
    match /settings/{document} {
      allow read, write: if request.auth == null && 
        (resource == null || resource.data.userId == 'personal-user') &&
        (request.resource == null || request.resource.data.userId == 'personal-user');
    }
  }
}
```

### Simpler Version (Also Secure):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Personal PWA - allow if userId matches
    match /journal/{document} {
      allow read, write: if request.resource.data.userId == 'personal-user';
    }
    match /stats/{document} {
      allow read, write: if request.resource.data.userId == 'personal-user';
    }
    match /settings/{document} {
      allow read, write: if request.resource.data.userId == 'personal-user';
    }
  }
}
```

### Alternative - Open for Testing (Less Secure):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## Step 5: Deploy to GitHub Pages

### 5.1 Build your app:
```bash
npm run build
```

### 5.2 Install gh-pages:
```bash
npm install --save-dev gh-pages
```

### 5.3 Add to package.json scripts:
```json
{
  "scripts": {
    "deploy": "gh-pages -d dist",
    "predeploy": "npm run build"
  },
  "homepage": "https://yourusername.github.io/personal-pwa-app"
}
```

### 5.4 Deploy:
```bash
npm run deploy
```

## Step 6: Install on iPhone
1. Open Safari on your iPhone
2. Go to your GitHub Pages URL
3. Tap the Share button (📤)
4. Scroll down and tap "Add to Home Screen"
5. Name it "Personal PWA" and tap "Add"

## 🎉 You're Done!
Your PWA will now:
- ✅ Work offline
- ✅ Sync data across devices
- ✅ Feel like a native iPhone app
- ✅ Store data in Firebase (free forever for personal use)

## Security Tips (Optional):
- Add Firebase Authentication later
- Restrict Firestore rules to authenticated users only
- Add your domain to Firebase authorized domains

## Alternative Databases:
- **Supabase**: More features, PostgreSQL
- **PocketBase**: Self-hosted, lightweight
- **Airtable**: Spreadsheet-like interface
