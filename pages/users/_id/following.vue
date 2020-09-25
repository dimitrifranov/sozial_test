<template>
  <div class="w-screen h-screen flex flex-col items-center pt-16">
    <h2 class="text-white text-lg pb-4">
      Personen, denen {{ user.username }} folgst
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
  async asyncData({ $axios, error, route, $auth, $config }) {
    const apiClient = $axios.create({
      baseURL: $config.apiUrl,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    let user
    await apiClient.get('/users/' + route.params.id + '/').then((res) => {
      user = res.data
    })
    const following = []
    for (const followingUser of user.following) {
      apiClient.get('/users/' + followingUser.user_to + '/').then((res) => {
        following.push(res.data)
      })
    }
    return {
      following,
      user
    }
  }
}
</script>

<style lang="scss" scoped></style>
