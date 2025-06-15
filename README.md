# Noowing - Productivity Timer App

A beautiful productivity timer application built with Expo and React Native, featuring the Noowing technique for enhanced focus and productivity.

## Features

- 45-2-5 cycle timer (45 minutes work, 2 minutes activation, 5 minutes rest)
- Beautiful dark theme with orange accent colors
- User authentication and registration
- Onboarding flow for new users
- Statistics tracking
- Profile management
- Responsive design

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Web

To build the application for web deployment:

```bash
npm run build:web
```

### Deployment

This app is configured for deployment on Netlify. To deploy:

1. Build the application:
   ```bash
   npm run build:web
   ```

2. Deploy to Netlify:
   ```bash
   npm run deploy
   ```

## Domain Setup

To set up a custom domain:

1. Connect your Netlify account
2. Configure your domain in the Netlify dashboard
3. Update the `origin` in `app.json` to match your custom domain
4. Redeploy the application

## Project Structure

- `/app` - Application routes and screens
- `/components` - Reusable UI components
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and database
- `/types` - TypeScript type definitions

## Technologies Used

- Expo SDK 53
- React Native
- Expo Router
- TypeScript
- React Native Reanimated
- Lucide React Native (icons)

## License

This project is private and proprietary.