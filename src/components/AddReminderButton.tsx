import { Alert, Button, Platform } from 'react-native';
import { addPurchaseReminder } from '@/native/purchaseReminder';

function AddReminderButton({
  title,
  notes,
  whenISO, // e.g. new Date().toISOString()
}: {
  title: string;
  notes?: string;
  whenISO?: string;
}) {
  const onPress = async () => {
    try {
      if (Platform.OS === 'ios') {
        await addPurchaseReminder(title, {
          notes,
          isoDate: whenISO,
          durationMinutes: 60, // opcional
        });
        Alert.alert('Done ✅', 'Event created in calendar.');
      } else {
        Alert.alert('Info', 'This feature is only available on iOS.');
      }
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? "Event couldn't be created.");
    }
  };

  return <Button title="Add reminder (1 week)" onPress={onPress} />;
}

export default AddReminderButton;
