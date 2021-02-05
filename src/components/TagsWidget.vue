<template>
  <aside class="mb-5">
    <h2 class="mb-3 font-family-sans-serif h4">All Tags</h2>
    <ul class="list-inline">
      <li
        class="list-inline-item mb-2"
        v-for="{ node } in $static.allWordPressPostTag.edges"
        :key="node.slug"
      >
        <b-button variant="primary" size="sm" :to="node.path">
          {{ node.title }} ({{ node.count }})
        </b-button>
      </li>
    </ul>
  </aside>
</template>

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

