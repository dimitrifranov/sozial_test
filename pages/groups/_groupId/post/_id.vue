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
    // const re = /(?<=\/groups\/)\d/
    // const group = re.exec(route.fullPath)[0]
    let post = null
    const apiClient = $axios.create({
      baseURL: `https://social-tests-api.herokuapp.com/`,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    if ($auth.loggedIn) {
      post = await apiClient.get(
        '/groups/' + route.params.groupId + '/posts/' + route.params.id + '/',
        { params: { user: $auth.user.pk } }
      )
    } else {
      post = await apiClient.get(
        '/groups/' + route.params.groupId + '/posts/' + route.params.id + '/'
      )
    }
    const comments = await apiClient.get(
      '/groups/' +
        route.params.groupId +
        '/posts/' +
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
