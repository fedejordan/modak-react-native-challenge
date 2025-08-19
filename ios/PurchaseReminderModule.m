#import <React/RCTBridgeModule.h>
#import <React/RCTUtils.h>

@interface RCT_EXTERN_MODULE(PurchaseReminderModule, NSObject)

RCT_EXTERN_METHOD(addEvent:(NSString *)title
                  notes:(NSString *)notes
                  isoDate:(NSString *)isoDate
                  durationMinutes:(nonnull NSNumber *)durationMinutes
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
