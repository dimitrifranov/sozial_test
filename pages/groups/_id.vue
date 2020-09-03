<template>
  <div>
    <groupProfile :group="group" />
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import groupProfile from '@/components/groupProfile.vue'
export default {
  components: {
    groupProfile
  },
  asyncData({ $axios, route, error }) {
    const groupRequest = $axios({
      url:
        'https://social-tests-api.herokuapp.com/groups/' +
        route.params.id +
        '/',
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const groupPostsRequest = $axios({
      url:
        'https://social-tests-api.herokuapp.com/groups/' +
        route.params.id +
        '/posts/',
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    return Promise.all([groupRequest, groupPostsRequest])
      .then((results) => {
        return {
          group: results[0].data,
          posts: results[1].data.results
        }
      })

      .catch((e) => {
        error({
          statusCode: 503,
          message: 'Unable to get this Group'
        })
      })
  },
  head() {
    return {
      title: this.group.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Das Profil von der Gruppe ' + this.group.name
        }
      ]
    }
  }
}
</script>

<style scoped></style>
