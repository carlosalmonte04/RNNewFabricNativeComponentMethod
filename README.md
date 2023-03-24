# RNNewArchitectureNativeCommands

## Introduction

This repository contains the code reproducing the issue with not calling Native Commands on iOS platform. There are two projects:

* RTNCenteredText - the Fabric Native Component based on [this page](https://reactnative.dev/docs/the-new-architecture/pillars-fabric-components). Additionaly this component implements native command named `trigger`. The method was created according to the information available [here](https://reactnative.dev/docs/new-architecture-library-intro#migrating-off-dispatchviewmanagercommand). 
* NewArchitectureIOSIssue - the app project using `RTNCenteredText` as dependency. It contains a simple main page rendering the `RTNCenteredText` component. There is a button allowing to call `trigger` method of `RTNCenteredText`.

## Issue description

While `trigger` method works fine on Android (it's possible to catch its call via `receiveCommand` method of the `CenteredTextManager` class), it doesn't work on iOS. The applied approach is using the `RCT_EXPORT_METHOD` macro in `RTNCenteredTextManager`, like:

```
RCT_EXPORT_METHOD(trigger:(nonnull NSNumber *)reactTag) {
    NSLog(@"*** Native method triggered");
}
```

Also `RTNCenteredText` implements the `trigger` method but it doesn't work either, like:

```
- (void)trigger {
    NSLog(@"*** Fabric component trigger called directly");
}
```

## Steps to reproduce

1. Clone the repository.
2. Open the terminal and navigate to the `NewArchitectureIOSIssue` directory.
3. Execute 'npm install' command.
4. Navigate to the `NewArchitectureIOSIssue/ios` directory.
5. Run `bundle install && RCT_NEW_ARCH_ENABLED=1 bundle exec pod install`
6. Run app via XCode to be able to see all logs in the console.
7. When app runs, click the `Trigger native method` button.

**Expected result**

Below logs should be printed by the app:
```
*** Fabric component initWithFrame
*** Fabric component updateProps
[javascript] [*** Capturing reference ref: [object Object] this.ref: undefined
[javascript] [*** Capturing reference ref: [object Object] this.ref: [object Object]
*** Fabric component updateProps
[javascript] [*** Trigger native method
[javascript] [*** Reference is not null [object Object]
*** Native method triggered via Manager
```
or
```
*** Fabric component initWithFrame
*** Fabric component updateProps
[javascript] [*** Capturing reference ref: [object Object] this.ref: undefined
[javascript] [*** Capturing reference ref: [object Object] this.ref: [object Object]
*** Fabric component updateProps
[javascript] [*** Trigger native method
[javascript] [*** Reference is not null [object Object]
*** Fabric component trigger method called directly
```

**Actual result**

App logs:
```
*** Fabric component initWithFrame
*** Fabric component updateProps
[javascript] [*** Capturing reference ref: [object Object] this.ref: undefined
[javascript] [*** Capturing reference ref: [object Object] this.ref: [object Object]
*** Fabric component updateProps
[javascript] [*** Trigger native method
[javascript] [*** Reference is not null [object Object]
```


