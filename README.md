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
