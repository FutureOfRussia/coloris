import { ActivityIndicator, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Updates from 'expo-updates'
import { BlurView } from 'expo-blur'

import { px } from '../../helpers/Dimensions'
import BounceButton from '../BounceButton'
import { Colors } from '../../constants'
import { useTerms } from '../../hooks'
import styles from './styles'

export default function UpdateBanner() {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [load, setLoad] = useState(false)
  const { updateBanner: terms } = useTerms()

  useEffect(() => {
    Updates.checkForUpdateAsync()
      .then(update => {
        if (update.isAvailable) setShow(true)
      })
      .catch(() => setShow(false))
  }, [])

  const update = async () => {
    try {
      setLoading(true)
      await Updates.fetchUpdateAsync()
      setLoad(true)
      setLoading(false)
    } catch (e) {
      setLoad(false)
      setLoading(false)
    }
  }

  const reload = async () => {
    try {
      setLoading(true)
      await Updates.reloadAsync()
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  if (show) {
    return (
      <BlurView tint="dark" intensity={85} style={styles.container}>
        <View style={styles.content}>
          <View style={styles.textBlock}>
            <Text style={styles.title}>{terms.title}</Text>
            <Text style={styles.subtitle}>{loading ? terms.loading : <>{load ? terms.done : terms.subtitle}</>}</Text>
          </View>
          <View style={styles.buttonBlock}>
            {load ? (
              <BounceButton style={styles.button} onPress={reload} disabled={loading} debounce>
                <Text style={styles.buttonText}>{loading ? terms.load : terms.reload}</Text>
                {loading && <ActivityIndicator style={{ marginLeft: px(10) }} size="small" color={Colors.LINK} />}
              </BounceButton>
            ) : (
              <BounceButton style={styles.button} onPress={update} disabled={loading} debounce>
                <Text style={styles.buttonText}>{loading ? terms.load : terms.update}</Text>
                {loading && <ActivityIndicator style={{ marginLeft: px(10) }} size="small" color={Colors.LINK} />}
              </BounceButton>
            )}
          </View>
        </View>
      </BlurView>
    )
  }

  return null
}
