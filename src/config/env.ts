import Constants from 'expo-constants';

const EXTRA = Constants.expoConfig?.extra as { apiBaseURL?: string } | undefined;

export const API_BASE_URL = EXTRA?.apiBaseURL?.replace(/\/+$/, '') || 'https://dummyjson.com';
