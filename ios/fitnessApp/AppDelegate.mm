#import "AppDelegate.h"
#import <Firebase.h>
#import "RCTAppleHealthKit.h"

#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  self.moduleName = @"fitness_App";

  // apple health kit background observer
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self
                                              launchOptions:launchOptions];
  /* Adding Background initializer for HealthKit  */
    [[RCTAppleHealthKit new] initializeBackgroundObservers:bridge];
  
  // for loggin out the user after uninstalling the app and then installing it while logged in
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    if (![defaults boolForKey:@"notFirstRun"]) {
      [defaults setBool:YES forKey:@"notFirstRun"];
      [defaults synchronize];
      [[FIRAuth auth] signOut:NULL];
    }
  
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
