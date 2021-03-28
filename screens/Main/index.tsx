import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { View, ViewStyle } from 'react-native'
import { clamp } from 'react-native-redash'
import _ from 'lodash'

import { getRandomIntInclusive } from '../../helpers/Utilities'
import { px, width } from '../../helpers/Dimensions'
import { Colors, Styles } from '../../constants'
import styles from './styles'

interface Item {
  y: number
  x: number
  color: string
}

export const NUMBER_OF_LINE = 18
export const NUMBER_OF_CELL = 9
export const CELL_SIZE = width(70) / NUMBER_OF_CELL
export const CELL_MARGIN = px(2)
export const OFFSET = px(6)
const INITIAL_Y = 0
const INITIAL_X = 4

export default function Main() {
  const y = useSharedValue(INITIAL_Y)
  const x = useSharedValue(INITIAL_X)
  const indicatorY = useSharedValue(NUMBER_OF_LINE - 1)

  const getNewItem = (): Item => ({
    y: INITIAL_Y,
    x: INITIAL_X,
    color: Colors.cells[getRandomIntInclusive(0, 4)],
  })

  const [items, setItems] = useState<Item[]>([getNewItem()])
  const [cells, setCells] = useState(() => {
    return _.range(NUMBER_OF_CELL).map(() => NUMBER_OF_LINE - 1)
  })

  useEffect(() => {
    if (cells.every(c => c === 0)) {
      console.log('end')
    }
  }, [cells])

  const addNewItem = () => {
    setItems(prevState => {
      const newState = prevState
      newState[newState.length - 1].y = y.value
      newState[newState.length - 1].x = x.value
      return newState
    })
    setCells(prevState => {
      const newState = prevState
      newState[x.value] -= 1
      return newState
    })
    setItems(prevState => [...prevState, getNewItem()])
    y.value = INITIAL_Y
    x.value = INITIAL_X
    indicatorY.value = cells[INITIAL_X]
  }

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { y: number; dY: number; startY: number; startX: number }
  >({
    onStart: (event, ctx) => {
      ctx.dY = 0
      ctx.y = 0
      ctx.startY = y.value
      ctx.startX = x.value
    },
    onActive: (event, ctx) => {
      if (ctx.dY < event.translationY) {
        ctx.y += event.translationY - ctx.dY
      }

      ctx.dY = event.translationY

      const dX = clamp(ctx.startX + Math.trunc(event.translationX / 30), 0, NUMBER_OF_CELL - 1)
      const dY = clamp(ctx.startY + Math.trunc(ctx.y / 15), 0, cells[dX])

      if (cells[dX] >= 0) {
        y.value = dY
        x.value = dX
      }
      indicatorY.value = cells[dX]
    },
    onEnd: () => {
      if (y.value === cells[x.value] && cells[x.value] > 0) {
        runOnJS(addNewItem)()
      }
    },
  })

  const animatedItemStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: (CELL_SIZE + CELL_MARGIN) * y.value },
      { translateX: (CELL_SIZE + CELL_MARGIN) * x.value },
    ],
  }))

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: (CELL_SIZE + CELL_MARGIN) * indicatorY.value },
      { translateX: (CELL_SIZE + CELL_MARGIN) * x.value },
    ],
  }))

  const itemIsActive = (index: number) => index + 1 === items.length

  const getItemStyle = (item: Item): ViewStyle => ({
    transform: [{ translateY: (CELL_SIZE + CELL_MARGIN) * item.y }, { translateX: (CELL_SIZE + CELL_MARGIN) * item.x }],
  })

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={Styles.fullFlex}>
        <LinearGradient colors={Colors.background} start={[0.5, 1]} end={[0.5, 0]} style={styles.container}>
          <View style={styles.field}>
            {_.range(NUMBER_OF_LINE).map(i => (
              <View key={i.toString()} style={styles.dotsLine}>
                {_.range(NUMBER_OF_CELL).map(j => (
                  <View
                    key={`${i} - ${j}`.toString()}
                    style={[
                      styles.dotContainer,
                      {
                        borderColor: Colors.rgba(30, 201, 232, 0.02 * i),
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                      },
                    ]}
                  />
                ))}
              </View>
            ))}
            {items.map((item, index) => (
              <Animated.View
                key={`item - ${index}`.toString()}
                style={[
                  styles.item,
                  {
                    top: OFFSET,
                    left: OFFSET,
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    backgroundColor: item.color,
                  },
                  itemIsActive(index) ? animatedItemStyle : getItemStyle(item),
                ]}
              />
            ))}
            <Animated.View
              style={[
                styles.item,
                {
                  top: OFFSET,
                  left: OFFSET,
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                },
                animatedIndicatorStyle,
              ]}
            />
          </View>
        </LinearGradient>
      </Animated.View>
    </PanGestureHandler>
  )
}
