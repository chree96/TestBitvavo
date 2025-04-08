module.exports = {
    configurations: {
      'ios.sim.debug': {
        device: 'simulator',
        app: 'expo',
        build: 'expo run:ios --configuration Debug',
      },
      'android.emu.debug': {
        device: 'emulator',
        app: 'expo',
        build: 'expo run:android --configuration Debug',
      },
    },
  };