<template>
  <div class="w-screen h-screen flex flex-col items-center pt-16">
    <h2 class="text-white text-lg pb-4">
      Personen, die {{ user.username }} folgen
    </h2>
    <userPeek v-for="(user, id) in followers" :key="id" :user="user" />
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

    const followers = []
    for (const follower of user.follower) {
      apiClient.get('/users/' + follower.user_from + '/').then((res) => {
        followers.push(res.data)
      })
    }
    return {
      followers,
      user
    }
  }
}
</script>

<style lang="scss" scoped></style>
