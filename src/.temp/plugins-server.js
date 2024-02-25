import plugin_gridsome_plugin_google_analytics_6 from "/Users/mh97888/Downloads/git/Azderica.github.io/node_modules/@gridsome/plugin-google-analytics/gridsome.client.js"
import plugin_gridsome_plugin_gtag_7 from "/Users/mh97888/Downloads/git/Azderica.github.io/node_modules/gridsome-plugin-gtag/gridsome.client.js"

export default [
  {
    run: plugin_gridsome_plugin_google_analytics_6,
    options: {"id":"UA-178657281-1"}
  },
  {
    run: plugin_gridsome_plugin_gtag_7,
    options: {"config":{}}
  }
]
