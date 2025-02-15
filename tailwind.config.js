function generateKeys(length, indicator, multi = 10, negative = false) {
  const obj = {};

  for (let i = 0; i < length; i++) {
    obj[i * multi] = `${i * multi}${indicator}`;
    if (negative) obj[`-${i * multi}`] = `-${i * multi}${indicator}`;
  }

  return obj;
}

module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        kitsu: {
          DEFAULT: '#402F3F',
        },
        success: '#1abc9c',
        danger: '#e74c3c',
        warning: '#fcbf00',
      },
      spacing: {
        ...generateKeys(50, 'px', 50),
        screen: '100vh',
        unset: 'unset',
        full: '100%',
      },
      minWidth: {
        ...generateKeys(40, 'px', 50),
        full: '100%',
        screen: '100vw',
        unset: 'unset',
      },
      maxWidth: {
        ...generateKeys(40, 'px', 50),
        full: '100%',
        screen: '100vw',
        unset: 'unset',
      },
      minHeight: {
        ...generateKeys(50, 'px', 50),
        full: '100%',
        screen: '100vw',
        unset: 'unset',
      },
      zIndex: {
        ...generateKeys(11, '', 10, true),
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked', 'disabled', 'group-focus'],
      backgroundOpacity: ['group-focus'],
      borderWidth: ['group-focus'],
      opacity: ['group-focus'],
      borderColor: ['checked', 'disabled'],
      boxShadow: ['active'],
      rotate: ['group-focus'],
      inset: ['hover', 'focus', 'group-focus'],
    },
  },
  plugins: [],
};
