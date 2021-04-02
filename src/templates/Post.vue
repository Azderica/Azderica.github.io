<template>
  <Layout>
    <div class="post-title">
      <h1 class="post-title__text">
        {{ $page.post.title }}
      </h1>

      <PostMeta :post="$page.post" />
    </div>

    <div class="post content-box">
      <div class="post__header">
        <g-image
          alt="Cover image"
          v-if="$page.post.cover_image"
          :src="$page.post.cover_image"
        />
      </div>

      <div class="post__content" v-html="$page.post.content" />

      <div class="post__footer">
        <PostTags :post="$page.post" />
      </div>
    </div>

    <div
      class="post-comments"
      ref="post-comments-dark"
      v-show="isDarkTheme"
    ></div>
    <div
      class="post-comments"
      ref="post-comments-light"
      v-show="!isDarkTheme"
    ></div>

    <Author class="post-author" />
  </Layout>
</template>

<script>
import PostMeta from '~/components/PostMeta'
import PostTags from '~/components/PostTags'
import Author from '~/components/Author.vue'

export default {
  components: {
    Author,
    PostMeta,
    PostTags,
  },
  data() {
    return {
      isDarkTheme: false,
    }
  },
  mounted() {
    if (window.__theme == 'dark') this.isDarkTheme = true
    this.$refs['post-comments-dark'].appendChild(
      this.createUtterancesNode('dark')
    )
    this.$refs['post-comments-light'].appendChild(
      this.createUtterancesNode('light')
    )
  },
  methods: {
    updateThemeEvent(theme) {
      this.isDarkTheme = theme
    },
    createUtterancesNode(theme) {
      const script = window.document.createElement('script')
      const attributes = {
        src: 'https://utteranc.es/client.js',
        repo: 'Azderica/azderica.github.io',
        'issue-term': 'pathname',
        theme: theme === 'light' ? 'github-light' : 'github-dark',
        crossorigin: 'anonymous',
        sync: true,
      }
      Object.entries(attributes).forEach(([key, value]) => {
        script.setAttribute(key, value)
      })
      return script
    },
  },
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        {
          name: 'description',
          content: this.$page.post.description,
        },
      ],
    }
  },
}
</script>

<page-query>
query Post ($id: ID!) {
  post: post (id: $id) {
    title
    path
    date (format: "D. MMMM YYYY")
    timeToRead
    tags {
      id
      title
      path
    }
    description
    content
    cover_image (width: 860, blur: 10)
  }
}
</page-query>

<style lang="scss">
.post-title {
  padding: calc(var(--space) / 2) 0 calc(var(--space) / 2);
  text-align: center;
}

.post {
  &__header {
    width: calc(100% + var(--space) * 2);
    margin-left: calc(var(--space) * -1);
    margin-top: calc(var(--space) * -1);
    margin-bottom: calc(var(--space) / 2);
    overflow: hidden;
    border-radius: var(--radius) var(--radius) 0 0;

    img {
      width: 100%;
    }

    &:empty {
      display: none;
    }
  }

  &__content {
    h2:first-child {
      margin-top: 0;
    }

    p:first-of-type {
      font-size: 1.2em;
      color: var(--title-color);
    }

    img {
      width: calc(100% + var(--space) * 2);
      margin-left: calc(var(--space) * -1);
      display: block;
      max-width: none;
    }
  }
}

.post-comments {
  padding: calc(var(--space) / 2);

  &:empty {
    display: none;
  }
}

.post-author {
  margin-top: calc(var(--space) / 2);
}
</style>
