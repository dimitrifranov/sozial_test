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
  async asyncData({ $axios, route, error }) {
    const groupRequest = await $axios
      .get(
        'https://social-tests-api.herokuapp.com/groups/' +
          route.params.groupId +
          '/'
      )
      .catch((e) => {
        error({
          statusCode: 503,
          message: 'Unable to get this Group'
        })
      })

    return {
      group: groupRequest.data
    }
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
