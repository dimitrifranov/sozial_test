<template>
  <div class="w-screen h-screen flex flex-col items-center pt-16">
    <h2 class="text-white text-lg pb-4">
      Personen, denen du folgst
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
  asyncData({ $axios, error, $auth, $config }) {
    const apiClient = $axios.create({
      baseURL: $config.apiUrl,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const following = []
    for (const user of $auth.user.following) {
      apiClient.get('/users/' + user.user_to + '/').then((res) => {
        following.push(res.data)
      })
    }
    return {
      following
    }
  },
  head() {
    return {
      title: 'folgst',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Personen, denen du folgst'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
