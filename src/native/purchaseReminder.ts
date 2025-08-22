import { NativeModules, Platform } from 'react-native';

type AddEventResult = {
  eventId: string;
  startDate: number;
  endDate: number;
};

type PurchaseReminderModuleType = {
  addEvent(
    title: string,
    notes?: string | null,
    isoDate?: string | null,
    durationMinutes?: number,
  ): Promise<AddEventResult>;
};

const LINKING_ERROR =
  `The native module "PurchaseReminderModule" is not linked.\n` +
  `Make sure you have run "npx expo prebuild" and then "expo run:ios".\n` +
  `Platform: ${Platform.OS}`;

const PurchaseReminderModule: PurchaseReminderModuleType =
  NativeModules.PurchaseReminderModule ??
  (new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    },
  ) as unknown);

export async function addPurchaseReminder(
  title: string,
  options?: { notes?: string; isoDate?: string; durationMinutes?: number },
): Promise<AddEventResult> {
  const { notes = null, isoDate = null, durationMinutes = 60 } = options ?? {};
  return PurchaseReminderModule.addEvent(title, notes, isoDate, durationMinutes);
}
