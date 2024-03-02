<template>
  <Layout>
    <div class="post-title">
      <h1 class="post-title__text">
        {{ $page.post.title }}
      </h1>

      <PostMeta :post="$page.post" />

      <ul class="list-outside list-disc">
        <template v-for="(post, i) in articlesTree">
          <li
            :key="i"
            class="mt-3"
            :style="`margin-left: ${(post.indentation - 1) * 16}px`"
          >
            <g-link v-if="post.path" :to="post.path" class="underline">
              {{ post.title }} – {{ post.date }}
            </g-link>
            <div v-if="!post.path" class="font-bold">
              {{ post.title }}
            </div>
          </li>
        </template>
      </ul>
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
import PostMeta from "~/components/PostMeta";
import PostTags from "~/components/PostTags";
import Author from "~/components/Author.vue";
import Adsense from "~/components/Adsense.vue";

export default {
  components: {
    Author,
    PostMeta,
    PostTags,
    Adsense,
  },
  data() {
    return {
      isDarkTheme: false,
    };
  },
  mounted() {
    if (window.__theme == "dark") this.isDarkTheme = true;
    this.$refs["post-comments-dark"].appendChild(
      this.createUtterancesNode("dark")
    );
    this.$refs["post-comments-light"].appendChild(
      this.createUtterancesNode("light")
    );
  },
  methods: {
    updateThemeEvent(theme) {
      this.isDarkTheme = theme;
    },
    createUtterancesNode(theme) {
      const script = window.document.createElement("script");
      const attributes = {
        src: "https://utteranc.es/client.js",
        repo: "Azderica/azderica.github.io",
        "issue-term": "pathname",
        theme: theme === "light" ? "github-light" : "github-dark",
        crossorigin: "anonymous",
        sync: true,
      };
      Object.entries(attributes).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });
      return script;
    },
    firstDifferingIndex(currentPath, lastPath) {
      // we want to show everything from the first different path component
      // if currentPath = ['test', 'path', 'file1']
      // and lastPath = ['test', 'for', 'file2']
      // the forst different path component is at index 1
      return currentPath.findIndex((p, idx) => p !== lastPath[idx]);
    },
    getDifferingPaths(currentPath, lastPath) {
      const firstDifferingIdx = this.firstDifferingIndex(currentPath, lastPath);

      // now return the paths from the first differing path, excluding the last part (the filename)
      return currentPath.slice(firstDifferingIdx, -1);
    },
  },
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        {
          name: "description",
          content: this.$page.post.description,
        },
      ],
    };
  },
  computed: {
    articlesTree() {
      const posts = this.$page.posts.edges.map((edge) => edge.node);

      const postsWithPaths = posts.map((post) => ({
        ...post,
        splitPath: post.path.split("/").slice(1, -1),
      }));

      postsWithPaths.sort((postA, postB) => {
        const lenA = postA.splitPath.length;
        const lenB = postB.splitPath.length;

        // it only makes sense to compare on every level
        // if one path has more components than another, only compare as long as both paths have levels
        for (let i = 0; i < Math.min(lenA, lenB); i++) {
          if (postA.splitPath[i] !== postB.splitPath[i]) {
            // if, e.g., the 3rd component of the paths are not equal, do a string comparison
            return postA.splitPath[i] < postB.splitPath[i] ? -1 : 1;
          }
        }
        // if we didn't exit until here, the we have e.g. this situation:
        // pathA = '/posts/categoryA/article1', pathB = '/posts/categoryA'

        // so if both have the same length, return that they are equal
        if (lenA === lenB) return 0;

        // and if one is longer than the other, the shorter path should come first
        return lenA < lenB ? -1 : 1;
      });

      const result = [];

      postsWithPaths.forEach((post, i) => {
        const lastPost = i > 0 ? postsWithPaths[i - 1] : null;

        if (!lastPost && post.splitPath.length > 1) {
          // special handler for if the first post already has multiple path components
          // we need a forEach here, because the path may be even deeper than one level,
          // and we want one category label on every level
          post.splitPath.slice(0, -1).forEach((path, j) =>
            result.push({
              title: path,
              indentation: post.splitPath.length - j - 2,
            })
          );
        }

        if (
          lastPost &&
          this.getDifferingPaths(post.splitPath, lastPost.splitPath).length > 0
        ) {
          this.getDifferingPaths(post.splitPath, lastPost.splitPath).forEach(
            (path, j) =>
              result.push({
                title: path,
                indentation:
                  this.firstDifferingIndex(post.splitPath, lastPost.splitPath) +
                  j,
              })
          );
        }

        result.push({ ...post, indentation: post.path.split("/").length - 3 });
      });

      return result;
    },
  },
};
</script>

<page-query>
query Post {
  post: post (sortBy: "date", order: DESC) {
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
      font-size: 1em;
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
