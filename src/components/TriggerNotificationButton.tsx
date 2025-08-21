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

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body: 'Local notification test ✅',
        sound: Platform.OS === 'ios' ? 'default' : undefined,
      },
      trigger: Platform.OS === 'android' ? { channelId: 'default', seconds: 3 } : { seconds: 3 },
    });
  };

  return <Button title="Trigger Notification" onPress={handlePress} />;
}
export default TriggerNotificationButton;
