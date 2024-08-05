package com.chicmic.app;

import android.os.Build;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.biometric.BiometricManager;
import androidx.biometric.BiometricPrompt;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.FragmentActivity;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.concurrent.Executor;

public class FingerPrintModule extends ReactContextBaseJavaModule {

    private Executor executor;
    private BiometricPrompt biometricPrompt;
    private BiometricPrompt.PromptInfo promptInfo;
    private String currentRoute = "";

    FingerPrintModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "FingerPrintModule";
    }

    @RequiresApi(api = Build.VERSION_CODES.P)
    @ReactMethod
    public void setCurrentRoute(String route) {
        currentRoute = route;
    }
    @ReactMethod
    public void authenticateFingerPrint(Promise promise) {
        Log.d("FingerPrintModule", "authenticateFingerPrint called");

        final ReactApplicationContext reactContext = getReactApplicationContext();
        executor = ContextCompat.getMainExecutor(reactContext);

        FragmentActivity activity = (FragmentActivity) getCurrentActivity();
        if (activity == null) {
            Log.e("FingerPrintModule", "Activity is null");
            promise.reject("activity_null", "Current activity is null.");
            return;
        }

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                biometricPrompt = new BiometricPrompt(activity,
                        executor, new BiometricPrompt.AuthenticationCallback() {
                    @Override
                    public void onAuthenticationError(int errorCode, @NonNull CharSequence errString) {
                        super.onAuthenticationError(errorCode, errString);
                        Toast.makeText(reactContext,
                                "Authentication error: " + errString, Toast.LENGTH_SHORT).show();
                        sendEventToReactNative("auth_error", "Authentication error: " + errString);
                        promise.reject("auth_error", "Authentication error: " + errString);
                    }

                    @Override
                    public void onAuthenticationSucceeded(@NonNull BiometricPrompt.AuthenticationResult result) {
                        super.onAuthenticationSucceeded(result);
                        Toast.makeText(reactContext,
                                "Authentication succeeded!", Toast.LENGTH_SHORT).show();
                                if ("SignIn".equals(currentRoute)) {
                            sendEventToReactNative("auth_success", "Authentication succeeded!");
                        }
                        else{
                            sendEventToReactNative("auth_success_AddFingerPrint", "Authentication succeeded!");
                        }

                        promise.resolve("Authentication succeeded!");
                    }

                    @Override
                    public void onAuthenticationFailed() {
                        super.onAuthenticationFailed();
                        Toast.makeText(reactContext, "Authentication failed",
                                Toast.LENGTH_SHORT).show();
                        sendEventToReactNative("auth_failed", "Authentication failed");
                        promise.reject("auth_failed", "Authentication failed");
                    }
                });

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                    promptInfo = new BiometricPrompt.PromptInfo.Builder()
                            .setTitle("Biometric Sign in")
                            .setSubtitle("Sign in using your biometric credentials")
                            .setAllowedAuthenticators(BiometricManager.Authenticators.BIOMETRIC_STRONG | BiometricManager.Authenticators.DEVICE_CREDENTIAL)
                            .build();
                } else {
                    promptInfo = new BiometricPrompt.PromptInfo.Builder()
                            .setTitle("Biometric Sign in")
                            .setSubtitle("Sign in using your biometric credentials")
                            .setDeviceCredentialAllowed(true)
                            .build();
                }

                biometricPrompt.authenticate(promptInfo);
            }

            private void sendEventToReactNative(String eventName, String message) {
                WritableMap params = Arguments.createMap();
                params.putString("message", message);
                ReactContext reactContext = getReactApplicationContext();
                if (reactContext != null) {
                    reactContext.getJSModule(com.facebook.react.modules.core.RCTNativeAppEventEmitter.class)
                            .emit(eventName, params);
                }
            }
        });
    }
}
