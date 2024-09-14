# Bookish Frontend

Bookish is a mobile application built with [Next.js](https://nextjs.org/) and [Capacitor.js](https://capacitorjs.com/), aiming to create a dedicated social network for readers. The platform is designed for book enthusiasts of all kinds, allowing users to connect, discuss, and debate about any type of literature, from classic novels to manga and manhwa.

## Project Summary

- **Platform**: Mobile application using Next.js and Capacitor.js.
- **Purpose**: To create a social network for readers where they can gather and discuss all types of literature.
- **Features**:
  - User profiles and preferences.
  - Community spaces for discussions on specific genres or book types.
  - Real-time feeds to share and comment on book-related content.
  - Integration of private and public groups focused on various literary themes.
  
## Key Technologies

- **Next.js**: A powerful React framework that provides server-side rendering, static site generation, and a robust API layer.
- **Capacitor.js**: A cross-platform framework that allows the app to be run on mobile devices, leveraging the power of native device features.
- **Tailwind CSS**: For styling the application with a utility-first approach.
- **TypeScript**: Ensuring type safety and better code maintainability.

## Vision

The vision of Bookish is to bring together book lovers from around the world, creating a vibrant community where readers can engage in meaningful discussions, discover new books, and connect with like-minded individuals. The app serves as a hub for anyone passionate about reading, offering a platform to explore literature in all its forms.

Here's an updated README section with detailed instructions on how to install and run your project:

## Installation Guide

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Make sure you have the latest stable version of Node.js installed on your machine. [Download Node.js](https://nodejs.org/)
- **Xcode**: Required for iOS development. Make sure Xcode is installed and updated on your Mac. [Download Xcode](https://developer.apple.com/xcode/)

### Steps to Install and Run the Project

1. **Clone the Repository**: Start by cloning the project repository from GitHub to your local machine.

   ```bash
   git clone <REPO_URL>
   ```

2. **Navigate to the Project Directory**: Move into the directory of the cloned project.

   ```bash
   cd <PROJECT_DIRECTORY>
   ```

3. **Install Dependencies**: Install the necessary dependencies using npm.

   ```bash
   npm install
   ```

4. **Build the Project**: Compile the project for production.

   ```bash
   npm run build
   ```

5. **Sync with Capacitor**: Sync the project with Capacitor to ensure the native projects are up-to-date.

   ```bash
   npx cap sync
   ```

6. **Open in Xcode**: Open the project in Xcode to run it on an iOS device or simulator.

   ```bash
   npx cap open ios
   ```

### Notes

- Ensure Xcode is configured correctly to run the application on your desired iOS device or simulator.
- You may need to adjust settings in Xcode, such as signing and deployment targets, to match your development environment.