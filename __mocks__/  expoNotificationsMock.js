const IosAuthorizationStatus = { PROVISIONAL: 3 };

module.exports = {
  IosAuthorizationStatus,
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
