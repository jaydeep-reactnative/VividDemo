# VividDemo

The repository for VividDemo.

**Project Name**: `VividDemo`

**Bundle Id**: `com.vividdemo`

**Package Name**: `com.vividdemo`

##  Project Desctiption
React Native application that displays the current weather for a user's location, and other locations manually added by the user. You can use a weather API of your choice to get the current weather data.

Build a navigation system that allows users to navigate between different screens in your React Native application. You can use the React Navigation library to help you build this. The application should include the following screens:

-   Main screen displaying the current weather for the user's location.
-   Screen where the user can add additional locations manually.
-   Screen where the user can see all the manually added locations and select one.

Add animations to your React Native app to make it more engaging and interactive. You can use libraries like React Native Animations or React Native Reanimated to create animations.

![Screenshot](images/image1.png)
![Screenshot](images/image2.png)
![Screenshot](images/image3.png)
![Screenshot](images/image4.png)
![Screenshot](images/image5.png)
![Screenshot](images/image6.png)
---

## Prerequisites

**iOS** : XCode(14.2)

**Android** : Android Studio(Android Studio Dolphin | 2021.3.1 Patch 1) with gradle(7.3.1)

**Editor** : Visual Studio Code


Currently includes:

- React Native
- React Navigation
- Redux-toolkit
- TypeScript
- And more!

## How to Setup Project

_Steps to setup the project_

**Step 1:** Clone this repository.

**Step 2:** Go to the cloned repo and open in in termianl.

**Step 3:** Install the Application with `yarn install`

**Step 4:** Install pods with `npx pod install`

**Step 5:** Run Jetify for Third Party library convert in AndroidX `npx jetify`(This needs to be done only for first time after checking out the repo. And for all projects having react-native 0.60 onwards)

## How to Run the Project

_Steps to run the project in ios and andorid_

1. cd to the project directory
2. Run and build for either OS
    * Run iOS app
        ```bash
        yarn ios
        ```
    * Run Android app
      * Start Genymotion or Native emulator
      ```bash
      yarn android
      ```

## Extra steps for android

- None

## Extra steps for ios

- You will need all the certificates to run the ios project in a real device.
