import { StyleSheet } from 'react-native'

import { shadow } from '../../helpers/Utilities'
import { px } from '../../helpers/Dimensions'
import { Colors } from '../../constants'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  field: {
    backgroundColor: Colors.black(0.7),
    borderRadius: px(10),
    borderWidth: px(5),
    borderColor: Colors.white(0.05),
    padding: px(5),
    justifyContent: 'space-between',
    ...shadow({ shadowOpacity: 1 }),
  },
  dotsLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dotContainer: {
    borderWidth: px(1),
    margin: px(1),
  },
  item: {
    position: 'absolute',
    borderWidth: px(1),
    borderColor: Colors.white(0.5),
    ...shadow(),
  },
})
