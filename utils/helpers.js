import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const DECK_STORAGE_KEY = 'UdaciCards:deck';
export const NOTIFICATION_KEY = 'UdaciCards:notify';

export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
  .then(() => {
    Platform.OS != 'web' && Notifications.cancelAllScheduledNotificationsAsync
  })
}

export function createNotification() {
  return {
    title: "Study your cards",
    body: "👋 Don't forget to study your cards today!",
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true,
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then((data) => {
    if(data === null) {
      Notifications.requestPermissionsAsync()
      .then(({status}) => {
        if(status === 'granted' && Platform.OS != 'web') {
          Notifications.cancelAllScheduledNotificationsAsync()

          let tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          tomorrow.setHours(20)
          tomorrow.setMinutes(0)

          Notifications.scheduleNotificationAsync({
            content: createNotification(),
            trigger: {
              time: tomorrow,
              repeats: true,
            }
          })

          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
        }
      })
    }
  })
}