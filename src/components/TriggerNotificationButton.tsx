import { Button, Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { ensureNotificationPermission } from '@/utils/notifications';

function TriggerNotificationButton({ title }: { title: string }) {
  const handlePress = async () => {
    const ok = await ensureNotificationPermission();
    if (!ok) {
      Alert.alert('Permission needed', 'Please enable notifications for this app.');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body: 'Local notification test ✅',
        sound: Platform.OS === 'ios' ? 'default' : undefined,
        ...(Platform.OS === 'android' ? { channelId: 'default' } : {}),
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 60,
        repeats: false,
      } satisfies Notifications.TimeIntervalNotificationTrigger,
    });
  };

  return <Button title="Trigger Notification" onPress={handlePress} />;
}
export default TriggerNotificationButton;
