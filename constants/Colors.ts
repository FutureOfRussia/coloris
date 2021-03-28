export default {
  LINK: '#2e78b7',
  TRANSPARENT: 'transparent',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY: '#EEEEEE',
  col: '#1ec9e8',
  background: ['#09203F', '#537895'],
  cells: ['#1EC9E8', '#00DC7D', '#F5E027', '#E20338', '#A854A5'],
  white: (opacity = 1): string => `rgba(255, 255, 255, ${opacity})`,
  black: (opacity = 1): string => `rgba(0, 0, 0, ${opacity})`,
  rgb: (r = 0, g = 0, b = 0): string => `rgb(${r}, ${g}, ${b})`,
  rgba: (r = 0, g = 0, b = 0, a = 0): string => `rgba(${r}, ${g}, ${b}, ${a})`,
}
