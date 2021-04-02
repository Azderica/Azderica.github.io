import plugin_gridsome_plugin_google_analytics_6 from "/Users/myepark/Downloads/myGit/Azderica.github.io/node_modules/@gridsome/plugin-google-analytics/gridsome.client.js"
import plugin_gridsome_plugin_gtag_7 from "/Users/myepark/Downloads/myGit/Azderica.github.io/node_modules/gridsome-plugin-gtag/gridsome.client.js"
import plugin_gridsome_plugin_gitalk_8 from "/Users/myepark/Downloads/myGit/Azderica.github.io/node_modules/gridsome-plugin-gitalk/gridsome.client.js"

export default [
  {
    run: plugin_gridsome_plugin_google_analytics_6,
    options: {"id":"UA-178657281-1"}
  },
  {
    run: plugin_gridsome_plugin_gtag_7,
    options: {"config":{}}
  },
  {
    run: plugin_gridsome_plugin_gitalk_8,
    options: {"clientID":"f8907ac8c5f50969c820","clientSecret":"8ad0fdf9578233e9ff998e5f1fea1b52ad9ba0db","repo":"nishantwrp-website","owner":"nishantwrp","admin":["nishantwrp"]}
  }
]
