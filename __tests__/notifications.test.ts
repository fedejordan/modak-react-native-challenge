import * as Notifications from 'expo-notifications';
import { schedulePurchaseReminderNotification } from '@/utils/notifications';

describe('schedulePurchaseReminderNotification', () => {
  it('schedules a notification 24h later and returns an id', async () => {
    const when = new Date('2025-08-21T12:00:00.000Z').toISOString();
    const id = await schedulePurchaseReminderNotification({ id: '123', title: 'Product X' }, when, {
      delayHours: 24,
    });
    expect(id).toBe('mock-notif-id');
    expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledTimes(1);
    const call = (Notifications.scheduleNotificationAsync as jest.Mock).mock.calls[0][0];
    expect(call.content.title).toMatch('Purchase reminder');
    expect(call.trigger instanceof Date).toBe(true);
  });
});
