const darkTheme = {
  backgroundColor: '#121214',
  color: '#a6a6b1',
  white: '#ffffff',
  default: {
    backgroundColor: 'transparent',
    borderColor: '#6332d4',
  },
  primary: {
    backgroundColor: '#6332d4',
    borderColor: '#6332d4',
  },
  success: {
    backgroundColor: '#008552',
    borderColor: '#008552',
  },
  danger: {
    backgroundColor: '#be1f89',
    borderColor: '#be1f89',
  },
  button: {
    size: {
      small: {
        padding: '6px 12px',
        fontSize: '1rem',
      },
      large: {
        padding: '12px 20px',
        fontSize: '1.3rem',
      },
    },
  },
} as const

export default darkTheme
