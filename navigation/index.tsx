import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { ActivityIndicator, View } from 'react-native'
import * as Localization from 'expo-localization'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as React from 'react'

import LinkingConfiguration from '../helpers/LinkingConfiguration'
import { RootStackParamList } from '../types/Navigation'
import { Colors, Styles } from '../constants'
import { Dispatch } from '../types/Models'
import { Main } from '../screens'

const Stack = createStackNavigator<RootStackParamList>()

export default function Navigation({ isLoadingComplete }: { isLoadingComplete: boolean }): JSX.Element {
  const {
    appState: { setAppState },
  } = useDispatch<Dispatch>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      let [locale] = await Localization.locale.split('-')
      if (locale !== 'ru') locale = 'en'
      setAppState({ locale })
      setLoading(false)
    })()
  }, [setAppState])

  return (
    <NavigationContainer linking={LinkingConfiguration}>
      {isLoadingComplete && !loading ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      ) : (
        <View style={[Styles.fullFlex, Styles.centered]}>
          <ActivityIndicator size="large" color={Colors.LINK} />
        </View>
      )}
    </NavigationContainer>
  )
}
