<template>
  <div>
    <groupProfile :group="group" />
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import groupProfile from '@/components/groupProfile.vue'
import GroupService from '@/services/GroupService.js'
export default {
  components: {
    groupProfile
  },
  async asyncData({ $axios, route, error, $auth }) {
    const secret = route.query.secret
    // error({
    //   statusCode: 503,
    //   message: route.params
    // })
    if (!$auth.loggedIn) console.log('login')
    else if (secret) {
      await GroupService.joinGroup({
        group: route.params.groupId,
        user: $auth.user.pk,
        secret
      }).then((res) => {
        if (res.data.id) {
          const groupRequest = $axios
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
        } else
          error({
            statusCode: 503,
            message: 'Unable to join this Group'
          })
      })
    }
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
  // async mounted() {
  //   if (!this.$auth.loggedIn) this.$router.push('/login')
  //   else {
  //     await GroupService.joinGroup({
  //       group: this.group.id,
  //       user: this.$auth.user.pk
  //     }).then((res) => {
  //       this.group.group_members.push(res.data)
  //     })
  //   }
  // },
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
