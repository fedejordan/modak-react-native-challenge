import '@testing-library/jest-native/extend-expect';

jest.mock(
  'expo-notifications',
  () => {
    const IosAuthorizationStatus = { PROVISIONAL: 3 };
    const SchedulableTriggerInputTypes = {
      TIME_INTERVAL: 'timeInterval',
      DATE: 'date',
      DAILY: 'daily',
      CALENDAR: 'calendar',
    } as const;

    return {
      IosAuthorizationStatus,
      SchedulableTriggerInputTypes,
      getPermissionsAsync: jest.fn(async () => ({
        granted: true,
        ios: { status: IosAuthorizationStatus.PROVISIONAL },
      })),
      requestPermissionsAsync: jest.fn(async () => ({
        granted: true,
        ios: { status: IosAuthorizationStatus.PROVISIONAL },
      })),
      scheduleNotificationAsync: jest.fn(async () => 'mock-notif-id'),
      setNotificationHandler: jest.fn(),
      setNotificationChannelAsync: jest.fn(),
    };
  },
  { virtual: true },
);

import { NativeModules } from 'react-native';
NativeModules.PurchaseReminderModule = NativeModules.PurchaseReminderModule || {
  addEvent: jest.fn(async () => ({ eventId: 'mock-event' })),
};
