# React Native Sample App

## 1. Setup

You need a current LTS version of Node.js and a copy of this repo (`git clone`). Pick **one** way to run the app. The quickest are a physical phone with Expo Go, or the web.

**Expo Go** is a free app that runs this project on a physical phone while you build it. Simulators, emulators and the web don't use it.

```bash
npm install
```

An Expo account is needed to sign in on a physical phone. Simulators, emulators and the web don't need one.

If your phone can't connect, check it is on the same Wi-Fi as your computer. You can also try `npx expo start --tunnel`.

When the app runs you should see a header, "Phones & SIM cards", and a blank screen. That is the starting point.

### Android emulator

These steps are for a Mac and use Homebrew.

1. Install the JDK:
   ```bash
   brew install --cask zulu@17
   ```
2. Install **Android Studio** (https://developer.android.com/studio) and open it. In the Setup Wizard, choose **Standard** and finish the install.
3. Go to **Settings > Languages & Frameworks > Android SDK**.
   - **SDK Platforms** tab: select **Android SDK Platform 36**.
   - **SDK Tools** tab: make sure **Android SDK Build-Tools** and **Android Emulator** are installed.
4. Add these lines to `~/.zshrc` (or `~/.bash_profile` if you use bash), then open a new terminal or run `source ~/.zshrc`:
   ```bash
   export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```
5. Check it works. This should print a version:
   ```bash
   adb version
   ```
6. In Android Studio, click **More Actions > Virtual Device Manager > Create virtual device**.
7. Pick a recent Pixel and a recent system image (download it if asked), then click **Finish**. Choose an arm64 image on Apple silicon and x86_64 on an Intel Mac. A Google Play image is not required.
8. Click the **Play** button next to the device to start the emulator, and wait for the Android home screen.
9. Run:
   ```bash
   npm run android
   ```
   This installs Expo Go into the emulator for you. Leave the terminal running. If the emulator is slow, close other apps.

### iOS simulator

Needs a Mac.

1. Install **Xcode** (Mac App Store).
2. Open Xcode. In the menu bar, go to **Xcode > Open Developer Tool > Device Hub**.
3. Click on **+ > iPhone > Select the model and operating system version**. This tutorial was tested to be working on iPhone 18 and iOS 27.
4. If Xcode asks you to accept the license, run `sudo xcodebuild -license accept`.
5. Run:
   ```bash
   npm run ios
   ```
   This installs Expo Go into the simulator for you. Leave the terminal running.

Boot the simulator before you run `npm run ios`. Expo Go needs iOS 16.4 or newer. If you see "requires a newer version of iOS", create a simulator with a newer runtime. This tutorial was tested on iOS 27.

### Expo Snack (nothing to install)

If you cannot run the app locally, use the shared Snack: https://snack.expo.dev/@rogoodvoda/react-native-workshop

It runs in your browser, so there is nothing to install.

### Running on a physical Android phone

You don't need Android Studio for this. Expo Go is enough.


1. Install **Expo Go** (Play Store).
2. Sign into your account in Expo Go. Create one if it doesn't exist (https://expo.dev/signup)
3. Sign into the same account in the Expo CLI. Expo Go only opens a project when both are signed in to the same account.
   ```bash
   npx expo login
   ```
4. Start the Metro Bundler. Metro is the JavaScript bundler that packages your code and serves it to your phone.
   ```bash
   npm run start
   ```
5. Ensure you are on the same Wi-Fi network as your computer.
6. Open Expo Go and tap **Scan QR code**. This will open the application within the Expo Go app on your phone.

### Running on a physical iPhone

You don't need Xcode for this. Expo Go is enough.

1. Install **Expo Go** (App Store).
2. Sign into your account in Expo Go. Create one if it doesn't exist (https://expo.dev/signup)
3. Sign into the same account in the Expo CLI. Expo Go only opens a project when both are signed in to the same account.
   ```bash
   npx expo login
   ```
4. Start the Metro Bundler. Metro is the JavaScript bundler that packages your code and serves it to your phone.
   ```bash
   npm run start
   ```
5. Ensure you are on the same Wi-Fi network as your computer.
6. Scan the QR code with the Camera app. This will open the application within the Expo Go app on your phone.
7. If the phone asks to find devices on your local network, allow it. Expo Go in the App Store matches the Expo SDK in this project. If it reports a version mismatch, update Expo Go.

### Web

```bash
npm run web
```

A browser tab opens, usually at http://localhost:8081. You don't need Expo Go, a QR code or an Expo login. If the Metro bundler is already running, press `w` in its terminal instead.
