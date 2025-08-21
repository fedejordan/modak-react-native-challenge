import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function ensureNotificationPermission(): Promise<boolean> {
  const settings = await Notifications.getPermissionsAsync();
  if (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  ) {
    return true;
  }
  const req = await Notifications.requestPermissionsAsync({
    ios: { allowAlert: true, allowBadge: false, allowSound: true },
  });
  return !!req.granted || req.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
}

export type PurchaseProduct = { id: string | number; title: string; price?: number };

export async function schedulePurchaseReminderNotification(
  product: PurchaseProduct,
  whenISO: string,
  opts?: { delayHours?: number },
): Promise<string> {
  const ok = await ensureNotificationPermission();
  if (!ok) throw new Error('Notifications permissions denied');

  const base = new Date(whenISO);
  if (isNaN(base.getTime())) throw new Error('Invalid date');

  const hours = opts?.delayHours ?? 24;
  const fireDate = new Date(base.getTime() + hours * 60 * 60 * 1000);

  const content: Notifications.NotificationContentInput = {
    title: 'Purchase reminder',
    body: `“${product.title}” — ¿still interested??`,
    data: { productId: String(product.id), scheduledFromISO: whenISO },
    sound: Platform.OS === 'ios' ? 'default' : undefined,
  };

  const trigger: Date | Notifications.NotificationTriggerInput = fireDate;

  const id = await Notifications.scheduleNotificationAsync({ content, trigger });
  return id;
}

export async function cancelNotification(id: string) {
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
  } catch {
    // Silently ignore errors
  }
}

export function configureNotifications() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    }).catch(console.warn);
  }
}
