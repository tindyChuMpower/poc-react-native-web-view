import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useRef} from 'react';
import {BackHandler} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {appBarStore} from '../components/AppBar';
import {progressBarStore} from '../components/ProgressBar';

type TItemsProp = NativeStackNavigationProp<any, 'Items'>;
export default function Items() {
  const navigation = useNavigation<TItemsProp>();
  const webViewRef = useRef<WebView>(null);
  const setKey = appBarStore(state => state.setKey);

  const setProgress = progressBarStore(state => state.setProgress);

  const handleMessage = (e: WebViewMessageEvent) => {
    console.log(e);
  };

  const uri = 'http://192.168.0.186:3000/items?mobile=1';

  const INJECTED_JAVASCRIPT = `
    const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

    (async () => {
      await sleep(1000);
      const items = document.getElementsByClassName("items__element");
      for (const item of items) {
        item.addEventListener('click', () => {
          window.ReactNativeWebView.postMessage(item.getAttribute("data-id"));
        });
      }
    })();
  `;

  useEffect(() => {
    const handler = () => {
      navigation.navigate('Home');
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handler);

    return () => {
      setKey('');
      BackHandler.removeEventListener('hardwareBackPress', handler);
    };
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
