<template>
  <div>
    <profile :user="user" :postId="user.pk" />
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import profile from '@/components/profile.vue'
export default {
  components: {
    profile
  },
  async asyncData({ $axios, route, error }) {
    const userRequest = await $axios({
      url: 'users/' + route.params.id + '/',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).catch((e) => {
      error({
        statusCode: 503,
        message: 'Unable to get this Users'
      })
    })
    // const userPostsRequest = $axios({
    //   url:
    //     'https://social-tests-api.herokuapp.com/users/' +
    //     route.params.id +
    //     '/posts/',
    //   withCredentials: false,
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   }
    // })

    return {
      user: userRequest.data
    }
    // return Promise.all([userRequest, userPostsRequest])
    //   .then((results) => {
    //     return {
    //       user: results[0].data,
    //       posts: results[1].data.results
    //     }
    //   })
  },
  head() {
    return {
      title: this.user.username,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Das Profil von ' + this.user.username
        }
      ]
    }
  }
}
</script>

<style scoped></style>
