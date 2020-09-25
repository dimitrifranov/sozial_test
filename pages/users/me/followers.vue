<template>
  <div class="w-screen h-screen flex flex-col items-center pt-16">
    <h2 class="text-white text-lg pb-4">
      Personen die dir folgen
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
  asyncData({ $axios, error, $auth, $config }) {
    const apiClient = $axios.create({
      baseURL: $config.apiUrl,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const followers = []
    for (const follower of $auth.user.follower) {
      apiClient.get('/users/' + follower.user_from + '/').then((res) => {
        followers.push(res.data)
      })
    }
    return {
      followers
    }
  }
}
</script>

<style lang="scss" scoped></style>
