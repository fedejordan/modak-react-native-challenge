import Foundation
import EventKit
import ExpoModulesCore

@objc(PurchaseReminderModule)
class PurchaseReminderModule: NSObject {

  private let eventStore = EKEventStore()

  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc func addEvent(
    _ title: String,
    notes: String?,
    isoDate: String?,
    durationMinutes: NSNumber?,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    let date: Date
    if let iso = isoDate, let parsed = ISO8601DateFormatter().date(from: iso) {
      date = parsed
    } else {
      date = Date().addingTimeInterval(60)
    }

    let minutes = durationMinutes?.intValue ?? 60
    let endDate = Calendar.current.date(byAdding: .minute, value: minutes, to: date) ?? date.addingTimeInterval(Double(minutes) * 60.0)

    eventStore.requestAccess(to: .event) { [weak self] granted, error in
      guard let self = self else { return }
      if let error = error {
        reject("EK_ERROR", "Error solicitando permiso: \(error.localizedDescription)", error)
        return
      }
      if !granted {
        reject("EK_DENIED", "Permiso de Calendario denegado por el usuario.", nil)
        return
      }

      let event = EKEvent(eventStore: self.eventStore)
      event.title = title
      event.notes = notes
      event.startDate = date
      event.endDate = endDate

      if let defaultCalendar = self.eventStore.defaultCalendarForNewEvents {
        event.calendar = defaultCalendar
      } else {
        if let editable = self.eventStore.calendars(for: .event).first(where: { $0.allowsContentModifications }) {
          event.calendar = editable
        }
      }

      do {
        try self.eventStore.save(event, span: .thisEvent)
        resolve([
          "eventId": event.eventIdentifier ?? "",
          "startDate": event.startDate.timeIntervalSince1970 * 1000,
          "endDate": event.endDate.timeIntervalSince1970 * 1000
        ])
      } catch {
        reject("EK_SAVE_ERROR", "No se pudo guardar el evento: \(error.localizedDescription)", error)
      }
    }
  }
}
