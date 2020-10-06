<template>
  <div>
    <groupProfile v-if="!login_first" :group="group" />
  </div>
</template>

<script>
import groupProfile from '@/components/groupProfile.vue'
export default {
  components: {
    groupProfile
  },
  async asyncData({ $axios, route, error, $auth, $config }) {
    const secret = route.query.secret

    if (!$auth.loggedIn && secret) {
      return { login_first: true, group: {} }
    } else if (secret && $auth.loggedIn) {
      await this.$axios
        .post('/memberships/', {
          group: route.params.groupId,
          user: $auth.user.pk,
          secret
        })
        .then((res) => {
          if (res.data.id) {
            const groupRequest = $axios
              .get('groups/' + route.params.groupId + '/')
              .catch((e) => {
                error({
                  statusCode: 503,
                  message: 'Unable to get this Group'
                })
              })

            return {
              login_first: false,
              group: groupRequest.data
            }
          } else
            error({
              statusCode: 503,
              message: 'Unable to join this Group'
            })
        })
    } else if ($auth.loggedIn) {
      const groupRequest = await $axios
        .get('groups/' + route.params.groupId + '/', {
          params: { user: $auth.user.pk }
        })
        .catch((e) => {
          error({
            statusCode: 503,
            message: 'Unable to get this Group'
          })
        })

      return {
        login_first: false,
        group: groupRequest.data
      }
    } else {
      const groupRequest = await $axios
        .get('groups/' + route.params.groupId + '/')
        .catch((e) => {
          error({
            statusCode: 503,
            message: 'Unable to get this Group'
          })
        })

      return {
        login_first: false,
        group: groupRequest.data
      }
    }
  },
  mounted() {
    if (this.login_first) {
      this.$store.dispatch('groups/setJoining', {
        group: this.$route.params.groupId,
        secret: this.$route.query.secret
      })
      this.$router.push('/login')
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
