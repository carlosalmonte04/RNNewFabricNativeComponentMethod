#import <React/RCTLog.h>
#import <React/RCTUIManager.h>
#import <React/RCTViewManager.h>

@interface RTNCenteredTextManager : RCTViewManager
@end

@implementation RTNCenteredTextManager

RCT_EXPORT_MODULE(RTNCenteredText)

RCT_EXPORT_METHOD(trigger:(nonnull NSNumber *)reactTag) {
    NSLog(@"*** Native method triggered via Manager");
}

RCT_EXPORT_VIEW_PROPERTY(text, NSString)

@end