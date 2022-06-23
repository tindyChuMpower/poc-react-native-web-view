import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useRef} from 'react';
import {BackHandler} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {appBarStore} from '../components/AppBar';
import {progressBarStore} from '../components/ProgressBar';

export type THomeProp = NativeStackNavigationProp<any, 'Home'>;

export default function Home() {
  const navigation = useNavigation<THomeProp>();
  const webViewRef = useRef<WebView>(null);
  const setKey = appBarStore(state => state.setKey);

  const setProgress = progressBarStore(state => state.setProgress);

  const handleMessage = (_: WebViewMessageEvent) => {
    setKey('items');
    navigation.navigate('Items');
  };

  const uri = 'http://192.168.0.186:3000?mobile=1';

  const INJECTED_JAVASCRIPT = `
    const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

    (async () => {
      await sleep(1000);
      const link = document.getElementById("items-link");
      link.addEventListener('click', () => {
        window.ReactNativeWebView.postMessage('clickItemsLink');
      });
    })();
  `;

  useEffect(() => {
    const handler = () => {
      webViewRef?.current!.goBack();
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handler);

    return () => BackHandler.removeEventListener('hardwareBackPress', handler);
  }, []);

  return (
    <WebView
      ref={webViewRef}
      source={{uri: uri}}
      onLoadProgress={({nativeEvent}) => setProgress(nativeEvent.progress)}
      injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
      onMessage={handleMessage}
    />
  );
}
