<template>
  <div>
    <topAppBar />
    <transition name="fade" mode="out-in">
      <nuxt />
    </transition>
    <bottomNav />
  </div>
</template>

<script>
import topAppBar from '@/components/topAppBar.vue'
import bottomNav from '@/components/bottomNav.vue'
export default {
  components: {
    topAppBar,
    bottomNav
  },
  computed: {
    user() {
      return this.$auth.user
    }
  },
  mounted() {
    window.OneSignal = window.OneSignal || []
    window.OneSignal.push(() => {
      window.OneSignal.getUserId(async (userId) => {
        // this.user.signal_id = userId
        if (this.$auth.loggedIn) {
          await this.$store.dispatch('users/updateUser', {
            pk: this.user.pk,
            username: this.user.username,
            password: this.user.password,
            comments_notifs: this.user.comments_notifs,
            follow_post_notifs: this.user.follow_post_notifs,
            like_notifs: this.user.like_notifs,
            new_follow_notifs: this.user.new_follow_notifs,
            signal_id: userId
          })
          // console.log(userId)
        }
      })
    })
  },
  head() {
    return {
      title: 'Website',
      titleTemplate: '%s - sozial_test',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Das beste soziale netzwerk'
        }
      ]
    }
  }
}
</script>

<style scoped>
.fade-enter,
.fade-leave-to {
  @apply opacity-0;
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-500 ease-out;
}
</style>
