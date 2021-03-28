import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import React from 'react'

import { useCachedResources, useDebounce } from './hooks'
import { UpdateBanner } from './components'
import Navigation from './navigation'
import store from './store'

export default function App(): JSX.Element {
  const isLoadingComplete = useCachedResources()

  useDebounce()

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <Navigation isLoadingComplete={isLoadingComplete} />
        <UpdateBanner />
      </Provider>
    </SafeAreaProvider>
  )
}
