const path = require('path')

module.exports = {
  themes: {
    development: {
      id: '82787598372',
      password: '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',
      store: 'bigblanket.myshopify.com',
      ignore: [
        'settings_data.json' // leave this here to avoid overriding theme settings on sync
      ]
    }
  },
  assets: {
    presets: [
      'sass'
    ]
  }
}
