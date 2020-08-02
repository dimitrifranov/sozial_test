<template>
  <div>
    <profile :user="user" />
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import profile from '@/components/profile.vue'
export default {
  components: {
    profile
  },
  asyncData({ $axios, route, error }) {
    return $axios
      .get(
        'https://social-tests-api.herokuapp.com/users/' + route.params.id + '/'
      )
      .then((response) => {
        return {
          user: response.data
        }
      })
      .catch((e) => {
        error({
          statusCode: 503,
          message: 'Unable to get this Users'
        })
      })
  }
  // computed: {
  //   ...mapState({
  //     user: (state) => state.users.user
  //   })
  // }
}
</script>

<style scoped></style>
