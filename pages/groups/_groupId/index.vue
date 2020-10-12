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
    console.log(secret)
    if (!$auth.loggedIn && secret) {
      console.log(secret + ' 1')
      return { login_first: true }
    } else if (secret && $auth.loggedIn) {
      await $axios
        .post('/memberships/', {
          group: route.params.groupId,
          user: $auth.user.pk,
          secret
        })
        .then((res) => {
          const groupRequest = $axios
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
      console.log(secret + ' 2')
      const groupRequest = await $axios
        .get('/groups/' + route.params.groupId + '/')
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
  computed: {
    groupName() {
      if (this.login_first) return 'Gruppen Profil'
      else return this.group.name
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
      title: this.groupName,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Das Profil von der Gruppe ' + this.groupName
        }
      ]
    }
  }
}
</script>

<style scoped></style>
