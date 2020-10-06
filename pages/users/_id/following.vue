<template>
  <div class="w-screen h-screen flex flex-col items-center pt-16">
    <h2 class="text-white text-lg pb-4">
      Personen, denen {{ user.username }} folgt
    </h2>
    <userPeek v-for="(user, id) in following" :key="id" :user="user" />
  </div>
</template>

<script>
import userPeek from '@/components/userPeek.vue'
export default {
  components: {
    userPeek
  },
  async asyncData({ $axios, error, route, $auth }) {
    let user
    await $axios.get('/users/' + route.params.id + '/').then((res) => {
      user = res.data
    })
    const following = []
    for (const followingUser of user.following) {
      $axios.get('/users/' + followingUser.user_to + '/').then((res) => {
        following.push(res.data)
      })
    }
    return {
      following,
      user
    }
  },
  head() {
    return {
      title: this.user.username + ' folgt',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Personen, denen ' + this.user.username + ' folgt'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
