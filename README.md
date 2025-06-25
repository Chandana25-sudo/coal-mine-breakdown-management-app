# 🏭 Coal Mine Breakdown Management System

A comprehensive React-based web application for managing and tracking equipment breakdowns in coal mining operations. This system provides real-time data entry, analytics, and reporting capabilities with Firebase cloud integration.

## 📋 Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Firebase Setup](#firebase-setup)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🔧 Core Functionality

- **Real-time Data Entry**: Comprehensive form for recording equipment breakdowns
- **Records Management**: View, edit, and delete breakdown records
- **Analytics Dashboard**: Interactive charts and visualizations
- **CSV Export**: Export records for external analysis
- **Firebase Integration**: Cloud-based data storage and real-time sync

### 🎨 User Experience

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Professional UI**: Modern, clean interface with intuitive navigation
- **Form Validation**: Real-time validation with helpful error messages
- **Loading States**: Smooth user experience with loading indicators
- **Toast Notifications**: User-friendly success and error messages

### 📊 Analytics Features

- **Breakdown by Category**: Pie chart showing breakdown distribution
- **Machine Analysis**: Equipment-wise breakdown statistics
- **Shift Analysis**: Time-based breakdown patterns
- **Priority Tracking**: Maintenance priority visualization
- **Spare Parts Usage**: Track commonly used spare parts

## 📸 Screenshots

### Data Entry Interface

![Data Entry Form](screenshots/data-entry.png)
_Comprehensive form for recording equipment breakdowns with validation_

### Records Management

![Records Table](screenshots/records-table.png)
_Professional table view with edit, delete, and export functionality_

### Analytics Dashboard

![Analytics Charts](screenshots/analytics-dashboard.png)
_Interactive charts showing breakdown patterns and statistics_

### Mobile Responsive Design

![Mobile View](screenshots/mobile-view.png)
_Fully responsive design optimized for mobile devices_

## 🛠 Technology Stack

### Frontend

- **React.js** - Modern JavaScript library for building user interfaces
- **Chart.js** - Beautiful, responsive charts for data visualization
- **CSS3** - Modern styling with flexbox and grid layouts
- **JavaScript ES6+** - Latest JavaScript features and syntax

### Backend & Database

- **Firebase Firestore** - NoSQL cloud database for real-time data
- **Firebase Authentication** - Secure user authentication (ready for implementation)
- **Firebase Hosting** - Fast and secure web hosting (optional)

### Development Tools

- **Create React App** - React application boilerplate
- **ESLint** - Code linting and formatting
- **Git** - Version control system

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 14.0 or higher)
- **npm** (version 6.0 or higher)
- **Git** (for cloning the repository)
- **Firebase Account** (for database setup)

Check your versions:

```bash
node --version
npm --version
git --version
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Chandana25-sudo/coal-mine-breakdown-management-app.git
cd coal-mine-breakdown-management-app
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:

- React and React DOM
- Chart.js and react-chartjs-2
- Firebase SDK
- Other utility libraries

### 3. Verify Installation

```bash
npm list --depth=0
```

## 🔥 Firebase Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `coal-mine-breakdown-management`
4. Enable Google Analytics (optional)
5. Click "Create project"

### Step 2: Set Up Firestore Database

1. In Firebase Console, click "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select your preferred region
5. Click "Done"

### Step 3: Get Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ → "Project settings"
2. Scroll to "Your apps" section
3. Click the web icon `</>` to add a web app
4. Enter app nickname: `coal-mine-web-app`
5. Copy the Firebase configuration object

### Step 4: Configure the Application

1. Open `src/config/firebase.js`
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id",
};
```

### Step 5: Set Up Security Rules

1. In Firestore Database, click "Rules" tab
2. Replace default rules with:

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

3. Click "Publish"

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm start
```

This will:

- Start the development server
- Open your browser to `http://localhost:3000`
- Enable hot reloading for development
- Show compilation errors in the console

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Testing the Application

```bash
npm test
```

Runs the test suite in interactive watch mode.

## 📖 Usage

### 1. Data Entry

1. Navigate to the **Data Entry** tab
2. Fill in the breakdown details:
   - Date of breakdown
   - Executive name
   - Shift information
   - Machine/equipment details
   - Breakdown category
   - Delay time in hours
   - Maintenance priority
   - Optional: Description, spare parts, resolution
3. Click **"Submit Breakdown Report"**
4. Use **"🔥 Test Firebase"** button to verify connection

### 2. Records Management

1. Navigate to the **Records** tab
2. View all breakdown records in a professional table
3. Use **"🔄 Refresh"** to reload data
4. Use **"📥 Download"** to export records as CSV
5. Click edit (✏️) or delete (🗑️) icons for record management

### 3. Analytics Dashboard

1. Navigate to the **Analytics** tab
2. View interactive charts showing:
   - Breakdown distribution by category
   - Machine-wise breakdown analysis
   - Shift-based patterns
   - Priority distribution
   - Spare parts usage statistics

### 4. Mobile Usage

- The application is fully responsive
- All features work seamlessly on mobile devices
- Touch-friendly interface with optimized layouts

## 📁 Project Structure

```
coal-mine-breakdown-management-app/
├── public/
│   ├── index.html              # Main HTML template
│   └── favicon.ico             # Application icon
├── src/
│   ├── components/
│   │   ├── Analytics/
│   │   │   └── Analytics.js    # Analytics dashboard component
│   │   ├── common/
│   │   │   ├── Alert.js        # Toast notification component
│   │   │   └── Loading.js      # Loading spinner component
│   │   ├── DataEntry/
│   │   │   └── DataEntry.js    # Data entry form component
│   │   ├── Records/
│   │   │   └── Records.js      # Records management component
│   │   ├── Header.js           # Application header
│   │   └── Navigation.js       # Navigation tabs
│   ├── config/
│   │   └── firebase.js         # Firebase configuration
│   ├── hooks/
│   │   ├── useBreakdownData.js # Local data management hook
│   │   └── useFirebaseBreakdownData.js # Firebase data hook
│   ├── styles/
│   │   └── globals.css         # Global styles and responsive design
│   ├── utils/
│   │   ├── csvExport.js        # CSV export functionality
│   │   └── testFirebase.js     # Firebase connection testing
│   ├── App.js                  # Main application component
│   └── index.js                # Application entry point
├── .gitignore                  # Git ignore rules
├── package.json                # Project dependencies and scripts
├── README.md                   # This file
└── Firebase Setup Guides/
    ├── FIREBASE_SETUP.md       # Basic Firebase setup
    ├── FIREBASE_INTEGRATION_STEPS.md # Detailed integration steps
    └── FIRESTORE_SETUP_GUIDE.md # Firestore-specific setup
```

## 🔧 Key Components

### Data Management

- **useFirebaseBreakdownData**: Custom hook for Firebase operations
- **Firebase Config**: Centralized Firebase configuration
- **CSV Export**: Utility for exporting data to CSV format

### User Interface

- **Responsive Design**: Mobile-first approach with breakpoints
- **Form Validation**: Real-time validation with error handling
- **Charts Integration**: Chart.js for beautiful data visualizations
- **Professional Styling**: Modern CSS with smooth animations

### Features Implementation

- **Real-time Sync**: Firebase Firestore for live data updates
- **Offline Support**: LocalStorage fallback when Firebase is unavailable
- **Error Handling**: Comprehensive error handling with user feedback
- **Loading States**: Smooth user experience with loading indicators

## 🤝 Contributing

We welcome contributions to improve the Coal Mine Breakdown Management System!

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow React best practices
- Write clean, commented code
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Chandana Velpula**

- GitHub: [@Chandana25-sudo](https://github.com/Chandana25-sudo)
- Email: chandana.velpula16@gmail.com

## 🙏 Acknowledgments

- React.js community for excellent documentation
- Firebase team for robust cloud services
- Chart.js for beautiful data visualizations
- Open source community for inspiration and tools

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Firebase Setup Guides](FIREBASE_SETUP.md) for configuration help
2. Use the **"🔥 Test Firebase"** button in the app to diagnose connection issues
3. Check browser console for detailed error messages
4. Create an issue on GitHub for bug reports or feature requests

---

**Made with ❤️ for efficient coal mine operations management**
