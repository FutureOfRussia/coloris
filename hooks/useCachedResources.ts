import * as SplashScreen from 'expo-splash-screen'
import { Ionicons } from '@expo/vector-icons'
import { useState, useEffect } from 'react'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'

import { Images } from '../constants'

export default function useCachedResources(): boolean {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        await SplashScreen.preventAutoHideAsync()
        await Font.loadAsync({ ...Ionicons.font })
        await Asset.loadAsync(Images.list)
      } catch (e) {
        console.log(e)
      }
    }

    loadResourcesAndDataAsync().then(async () => {
      setLoadingComplete(true)
      await SplashScreen.hideAsync()
    })
  }, [])

  return isLoadingComplete
}
