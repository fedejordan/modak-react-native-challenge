import '@testing-library/jest-native/extend-expect';

jest.useFakeTimers();

jest.mock('expo-notifications', () => ({
  __esModule: true,
  getPermissionsAsync: jest.fn(async () => ({ granted: true, ios: { status: 2 } })),
  requestPermissionsAsync: jest.fn(async () => ({ granted: true, ios: { status: 2 } })),
  scheduleNotificationAsync: jest.fn(async () => 'mock-notif-id'),
  setNotificationHandler: jest.fn(),
  setNotificationChannelAsync: jest.fn(),
}));

import { NativeModules } from 'react-native';
NativeModules.PurchaseReminderModule = NativeModules.PurchaseReminderModule || {
  addEvent: jest.fn(async () => ({ eventId: 'mock-event' })),
};
