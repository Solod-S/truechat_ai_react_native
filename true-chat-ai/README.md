![Version](https://img.shields.io/badge/Version-1.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![runs with React Native](https://img.shields.io/badge/Runs%20with%20RN-000.svg?style=flat-square&logo=react&labelColor=f3f3f3&logoColor=61DAFB)](https://reactnative.dev/)
[![runs with Expo](https://img.shields.io/badge/Runs%20with%20Expo-000.svg?style=flat-square&logo=expo&labelColor=f3f3f3&logoColor=000020)](https://expo.dev/)
[![runs with React Native Vector Icons](https://img.shields.io/badge/Runs%20with%20RN%20Vector%20Icons-000.svg?style=flat-square&logo=react&labelColor=f3f3f3&logoColor=61DAFB)](https://github.com/oblador/react-native-vector-icons)
[![runs with React Native Reanimated](https://img.shields.io/badge/Runs%20with%20RN%20Reanimated-000.svg?style=flat-square&logo=react&labelColor=f3f3f3&logoColor=61DAFB)](https://github.com/software-mansion/react-native-reanimated)
[![runs with React Native Responsive Screen](https://img.shields.io/badge/Runs%20with%20RN%20Responsive%20Screen-000.svg?style=flat-square&logo=react&labelColor=f3f3f3&logoColor=61DAFB)](https://github.com/marudy/react-native-responsive-screen)
[![Runs with Google Gemini](https://img.shields.io/badge/Runs%20with%20Gemini-000.svg?style=flat-square&logo=google&labelColor=f3f3f3&logoColor=4285F4)](https://github.com/google/generative-ai-js)
[![Runs with Firebase](https://img.shields.io/badge/Runs%20with%20Firebase-000.svg?style=flat-square&logo=firebase&labelColor=f3f3f3&logoColor=FFCA28)](https://firebase.google.com/)
[![Runs with Zustand](https://img.shields.io/badge/Runs%20with%20Zustand-000.svg?style=flat-square&logo=zazzle&labelColor=f3f3f3&logoColor=443E38)](https://github.com/pmndrs/zustand)
[![Runs with Lottie](https://img.shields.io/badge/Runs%20with%20Lottie-000.svg?style=flat-square&logo=lospec&labelColor=f3f3f3&logoColor=000000)](https://github.com/lottie-react-native/lottie-react-native)
[![Runs with React Native Toast Message](https://img.shields.io/badge/Runs%20with%20RN%20Toast%20Message-000.svg?style=flat-square&logo=imessage&labelColor=f3f3f3&logoColor=61DAFB)](https://github.com/calintamas/react-native-toast-message)

<!-- [![Runs with Moment.js](https://img.shields.io/badge/Runs%20with%20Moment.js-000.svg?style=flat-square&logo=momenteo&labelColor=f3f3f3&logoColor=68B5AA)](https://momentjs.com/) -->

# True Chat AI

![True Chat AI](./assets/banner-min.jpg)

**Project Description:**

True Chat AI is a smart conversational assistant designed to help users across different areas of life through easy and intuitive chat interactions.

Key Features:

- Choose Your Expert Bot – Chat with one of five specialized AI bots, each tailored to a specific domain
  - 💼 Financial Advisor – Get insights on personal finance, investments, and budgeting
  - 🩺 Medical Advisor – Receive general advice on health, symptoms, and wellness
  - 🛠️ Technical Support – Get help with devices, apps, and tech troubleshooting
  - ⚖️ Legal Advisor – Understand legal topics and get guidance on common legal issues
  - 🍽️ Culinary Guide – Explore recipes, cooking tips, and meal suggestions
- Private Conversations – All chats are completely confidential and are not stored or shared anywhere
- Email-Based Login – Secure and quick access through email authentication

True Chat AI is your personal advisor in your pocket. Just pick a bot and start the conversation! 🤖💬

 <div align="center">
 <br />
 
![True Chat AI](./assets/video.gif)

  <br />
</div>

**Main Technologies:**

– React Native: A popular framework for building cross-platform mobile applications using JavaScript and React. It enables developers to write native apps for iOS and Android with a single codebase, ensuring seamless performance and a consistent user experience.

– Expo: A powerful framework and platform for developing React Native applications. It offers a managed workflow, over-the-air updates, and access to native APIs without requiring native code, simplifying the development process.

– React Native Vector Icons: A library providing a vast collection of customizable vector icons for React Native applications. It supports multiple icon sets, enabling developers to easily enhance UI elements with scalable icons.

– React Native Reanimated: A high-performance animation library that enables smooth and fluid animations using the native thread, improving user experience with seamless transitions and interactions.

– React Native Responsive Screen: A utility library designed for building fully responsive user interfaces. It allows UI components to dynamically adjust based on screen size and orientation, ensuring optimal display across various devices.

– Google Gemini (@google/generative-ai): A generative AI model from Google that enables advanced AI-powered features such as text generation, image analysis, and conversational AI, enhancing the capabilities of applications with state-of-the-art machine learning.

– Firebase: A comprehensive platform by Google that provides backend services such as authentication, real-time databases, cloud storage, and push notifications, enabling seamless app development and scalability.

– Zustand: A minimal and flexible state management library for React and React Native. It offers a simple API with a small footprint, making state management more efficient and easier to maintain.

– Lottie (lottie-react-native): A library for rendering high-quality vector animations in React Native. It allows developers to use JSON-based animations created in Adobe After Effects, improving app interactivity and visual appeal.

<!-- – Moment.js: A widely used JavaScript library for handling dates and times. It simplifies date formatting, parsing, and manipulation, making it easier to manage time-related functions in applications. -->

– React Native Toast Message: A simple and customizable toast notification library for React Native, making it easy to display quick messages, alerts, and confirmations in mobile applications.

## How to Install and Run Your React Native App Using Expo

![React Native App](/assets/exp.png)

### Prerequisites

1. **Install Node.js**: Ensure you have Node.js installed. You can download it from [Node.js official website](https://nodejs.org/).
2. **Install Expo CLI**: Install Expo globally by running:

   ```bash
   npm install -g expo-cli
   ```

3. Install a Mobile Emulator or Expo Go App:

   Use a simulator/emulator for iOS or Android.
   Or install the Expo Go app on your mobile device from the App Store or Google Play.

### Using Git (recommended)

Clone the project from github. Change "myproject" to your project name.

```bash
git clone https://github.com/Solod-S/truechat_ai_react_native ./myproject
```

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd myproject
npm install
```

### Start

0. Prepare .env file

```javascript
EXPO_PUBLIC_GOOGLE_AI_API_KEY;
EXPO_PUBLIC_FIREBASE_API_KEY;
EXPO_PUBLIC_FIREBASE_APP_ID;
```

1. Start the Project

```javascript
npm start
```

2. Open the App on Your Device

- Using Expo Go App:

  - Scan the QR code with the Expo Go app.
  - The app will load directly on your device.

- Using an Emulator:

  - iOS Simulator "i"
  - Android Simulator "a"

3. Enjoy Your App!!!

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please create a pull request. For major changes, please open an issue first to discuss the changes.

**_NOTE: PLEASE LET ME KNOW IF YOU DISCOVERED ANY BUG OR YOU HAVE ANY SUGGESTIONS_**
