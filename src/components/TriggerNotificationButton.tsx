import { TouchableOpacity, Text } from 'react-native';
import * as Notifications from 'expo-notifications';

function TriggerNotificationButton({ title }: { title: string }) {
  const handlePress = async () => {
    // Alternativa de test:
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
      },
      trigger: {
        seconds: 3,
      },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>Trigger Notification</Text>
    </TouchableOpacity>
  );
}

export default TriggerNotificationButton;
