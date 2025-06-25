# Firebase Setup Guide for Coal Mine Breakdown Management

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `coal-mine-breakdown-management`
4. Enable Google Analytics (optional)
5. Choose your Google Analytics account or create new one
6. Click "Create project"

## Step 2: Setup Firestore Database

1. In your Firebase project, click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (we'll configure security later)
4. Select your preferred region (choose closest to your location)
5. Click "Done"

## Step 3: Get Firebase Configuration

1. In your Firebase project, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click on "Web" icon (</>) to add a web app
5. Enter app nickname: `coal-mine-web-app`
6. Check "Also set up Firebase Hosting" (optional)
7. Click "Register app"
8. Copy the Firebase configuration object

## Step 4: Update Firebase Configuration

1. Open `src/config/firebase.js` in your project
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id",
  measurementId: "your-actual-measurement-id",
};
```

## Step 5: Configure Firestore Security Rules

1. In Firebase Console, go to "Firestore Database"
2. Click on "Rules" tab
3. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /breakdownRecords/{document} {
      allow read, write: if true;
    }
  }
}
```

4. Click "Publish"

## Step 6: Test the Application

1. Save your changes to `firebase.js`
2. Start your React application: `npm start`
3. Try adding a breakdown record
4. Check Firebase Console > Firestore Database to see your data

## Database Structure

Your breakdown records will be stored in Firestore with this structure:

```
breakdownRecords (collection)
├── [auto-generated-id] (document)
│   ├── date: "2025-06-25"
│   ├── executive: "Yeshwanth"
│   ├── shift: "General (8am-5pm)"
│   ├── machine: "SDL"
│   ├── category: "Electrical"
│   ├── description: "Motor failure in main conveyor"
│   ├── delayTime: 2.5
│   ├── priority: "High"
│   ├── spareParts: "Motor bearings, electrical cables"
│   ├── resolution: "Replaced motor bearings and rewired connections"
│   ├── timestamp: [server timestamp]
│   └── createdAt: "2025-06-25T10:30:00.000Z"
```

## Features Enabled

✅ **Cloud Storage**: All data stored in Firebase Firestore
✅ **Real-time Sync**: Data updates across all browser sessions
✅ **Offline Fallback**: Falls back to localStorage if Firebase is unavailable
✅ **Loading States**: Shows loading spinner while fetching data
✅ **Error Handling**: Displays error messages for network issues
✅ **Data Backup**: Automatic backup to localStorage

## Troubleshooting

### Common Issues:

1. **"Firebase not configured" error**

   - Make sure you've updated `src/config/firebase.js` with your actual config

2. **"Permission denied" error**

   - Check your Firestore security rules
   - Make sure you've published the rules

3. **Data not loading**
   - Check browser console for errors
   - Verify your internet connection
   - Check Firebase project status

### Need Help?

- Firebase Documentation: https://firebase.google.com/docs
- Firestore Getting Started: https://firebase.google.com/docs/firestore/quickstart

## Security Notes

⚠️ **Important**: The current security rules allow anyone to read/write data. For production use, you should implement proper authentication and more restrictive rules.

For production, consider:

- Adding Firebase Authentication
- Implementing user-based access control
- Adding data validation rules
- Setting up proper backup procedures
