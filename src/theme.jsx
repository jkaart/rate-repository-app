import { Platform } from 'react-native'

const theme = {
  colors: {
    default: '#000000',
    textPrimary: '#ffffff',
    textSecondary: '#595959',
    primary: '#0366d6',
    secondary: '#24292e',
    backgroundPrimary: '#ffffff',
    backgroundSecondary: '#e1e4e8',
    inputPrimary: '#999999',
    inputSecondary: '#595959',
    errorColor: '#d73a4a'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
}

export default theme
