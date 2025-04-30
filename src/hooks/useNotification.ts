import { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import ApiService from '../api/apiService';
import { API_ENDPOINTS } from '../constants/ApiEndPoints';
import { API_CODE } from '../constants/enum';

const requestNotificationPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    } else {
      // iOS permission request
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }
  } catch (err) {
    console.warn(err);
  }
};

const getToken = async () => {
  try {
    const token = await messaging().getToken();
    await ApiService.post(API_ENDPOINTS.TOKEN, { token }, false);
  } catch (error: any) {
    if (error?.status === API_CODE.EXISTED) {
      console.log('Token already registered on server');
    } else {
      console.error('Error getting or registering FCM Token:', error);
    }
  }
};

// Display foreground notification
const displayNotification = async (remoteMessage) => {
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display the notification
  await notifee.displayNotification({
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
    android: {
      channelId,
      smallIcon: 'ic_launcher', // Use your app icon
      // Add other Android specific options as needed
    },
  });
};

export const useNotification = () => {
  useEffect(() => {
    requestNotificationPermission();
    getToken();

    // Set up foreground notification handler
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground message received:', remoteMessage);
      await displayNotification(remoteMessage);
    });

    return () => unsubscribe();
  }, []);
};
