import 'dotenv/config';

export default {
  expo: {
    plugins: ['expo-dev-client', 'expo-notifications'],
    name: 'modak-rn-challenge',
    slug: 'modak-rn-challenge',
    scheme: 'modak-rn-challenge',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.anonymous.modakrnchallenge',
      infoPlist: {
        NSCalendarsUsageDescription: 'We need to access your calendar for the purchase reminder.',
      },
      usesNotifications: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      package: 'com.anonymous.modakrnchallenge',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      apiBaseURL: process.env.API_BASE_URL,
    },
  },
};
