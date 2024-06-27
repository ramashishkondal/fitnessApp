package com.chicmic.app;

import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

public class FingerPrintModule extends ReactContextBaseJavaModule {
    FingerPrintModule(ReactApplicationContext context){
        super(context);
    }
    @Override
    public String getName() {
        return "FingerPrintModule";
    }

    @ReactMethod
    public void doSomething(){
        System.out.println("do somthing ran");
        Log.d("do something ran","with");
    }

    @ReactMethod
    public Map<String,Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("DEFAULT","xyz Abcd");
        return constants;
    }
}
