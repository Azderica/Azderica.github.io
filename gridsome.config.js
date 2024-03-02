// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  icon: "./src/favicon.png",
  siteUrl: "https://Azderica.github.io",
  pathPrefix: "/",
  siteName: "Azderica",
  siteDescription: "부족하지만 꿈많은 웹 개발자의 발전 기록입니다.",

  plugins: [
    {
      use: "@gridsome/vue-remark",
      options: {
        typeName: "Post",
        baseDir: "content/posts/*.md",
        templates: "./src/templates/Post.vue",
        includePaths: ["./content/markdown-snippets"],
        plugins: [
          ["gridsome-plugin-remark-shiki", { theme: "nord", skipInline: true }],
        ],
        refs: {
          tags: {
            typeName: "Tag",
            create: true,
          },
        },
      },
    },
    {
      use: "@gridsome/plugin-google-analytics",
      options: {
        id: "UA-178657281-1",
      },
    },
    {
      use: "gridsome-plugin-gtag",
      options: {
        config: {
          id: process.env.GOOGLE_ANALYTICS_ID,
        },
      },
    },
  ],

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      anchorClassName: "icon icon-link",
      plugins: ["@gridsome/remark-prismjs"],
      options: {
        showLineNumbers: true,
      },
    },
  },
};
