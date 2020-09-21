<template>
  <div class="flex flex-col items-center h-screen pt-16">
    <postComponent :post="post" />
    <comments :comments="comments" :post="post.id" />
  </div>
</template>

<script>
import postComponent from '@/components/postComponent.vue'
import comments from '@/components/comments.vue'

export default {
  components: {
    postComponent,
    comments
  },
  async asyncData({ $axios, route, error, $auth }) {
    const re = /(?<=\/groups\/)\d/
    const group = re.exec(route.fullPath)[0]
    const post = await $axios.get(
      'https://social-tests-api.herokuapp.com/groups/' +
        group +
        '/posts/' +
        route.params.id +
        '/',
      { params: { user: $auth.user.pk } }
    )

    const comments = await $axios.get(
      'https://social-tests-api.herokuapp.com/groups/1/posts/' +
        route.params.id +
        '/comments/'
    )

    return {
      post: post.data,
      comments: comments.data.results
    }
  },
  data() {
    return {
      comment: '',
      comment_label: 'Kommentieren'
    }
  },
  head() {
    return {
      title: this.post.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Einer von vielen Posts'
        }
      ]
    }
  }
}
</script>

<style scoped></style>
