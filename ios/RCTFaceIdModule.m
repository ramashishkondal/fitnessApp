//
//  RCTFaceIdModule.m
//  fitnessApp
//
//  Created by ChicMic on 03/07/24.
//
#import "RCTFaceIdModule.h"

@implementation RCTFaceIdModule

RCT_EXPORT_MODULE(FaceIdModule);

RCT_EXPORT_METHOD(authenticateWithFaceID:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        LAContext *context = [[LAContext alloc] init];
        NSError *error = nil;
        
        if ([context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error]) {
            if (context.biometryType == LABiometryTypeFaceID) {
                [context evaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics
                        localizedReason:@"Authenticate with Face ID"
                                  reply:^(BOOL success, NSError *error) {
                    if (success) {
                        resolve(@"Authentication successful");
                    } else {
                        reject(@"authentication_error", @"Authentication failed", error);
                    }
                }];
            } else {
                reject(@"face_id_unavailable", @"Face ID is not available on this device", error);
            }
        } else {
            reject(@"biometry_unavailable", @"Biometric authentication is not available on this device", error);
        }
    });
}

@end
