<template>
  <Layout>
    <h1 class="text-2xl text-gray-900 dark:text-gray-100 font-semibold mb-5">
      Blog Posts
    </h1>
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
  </Layout>
</template>

<page-query>
query Posts {
  allPost: allBlogPost (sortBy: "date", order: DESC) {
    edges {
      node {
        title
        date (format: "MMMM D, Y")
        path
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: "Blog Posts",
  },
  computed: {
    articlesTree() {
      const posts = this.$page.posts.edges.map((edge) => edge.node);

      // slice because paths start and end with '/'
      const postsWithPaths = posts.map((post) => ({
        ...post,
        splitPath: post.path.split("/").slice(1, -1),
      }));

      postsWithPaths.sort((postA, postB) => {
        const lenA = postA.splitPath.length;
        const lenB = postB.splitPath.length;

        for (let i = 0; i < Math.min(lenA, lenB); i++) {
          if (postA.splitPath[i] !== postB.splitPath[i]) {
            return postA.splitPath[i] < postB.splitPath[i] ? -1 : 1;
          }
        }
        if (lenA === lenB) return 0;
        return lenA < lenB ? -1 : 1;
      });

      const result = [];

      postsWithPaths.forEach((post, i) => {
        const lastPost = i > 0 ? postsWithPaths[i - 1] : null;
        if (!lastPost && post.splitPath.length > 1) {
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
  methods: {
    firstDifferingIndex(currentPath, lastPath) {
      return currentPath.findIndex((p, idx) => p !== lastPath[idx]);
    },
    getDifferingPaths(currentPath, lastPath) {
      const firstDifferingIdx = this.firstDifferingIndex(currentPath, lastPath);

      return currentPath.slice(firstDifferingIdx, -1);
    },
  },
};
</script>
