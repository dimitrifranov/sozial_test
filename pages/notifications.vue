<template>
  <div class="center-items h-screen w-screen">
    <section v-if="nonotifs" class="text-white opacity-75 text-xl text-center">
      Noch keine Benachrichtigungen
    </section>
    <section
      v-else
      v-infinite-scroll="loadMore"
      class="w-full max-w-xs flex flex-col items-start py-16"
      infinite-scroll-disabled="autoLoadDisabled"
      infinite-scroll-distance="20"
    >
      <div v-for="(notification, i) in notifications" :key="i">
        <notification
          class="text-white font-light mb-1"
          :notification="notification"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import notification from '@/components/notification.vue'
export default {
  middleware: 'auth',
  components: {
    notification
  },
  data() {
    return {
      page: 1,
      loading: false,
      group: 1
    }
  },
  computed: {
    autoLoadDisabled() {
      return this.loading
      // || this.posts.length === 0
    },
    nonotifs() {
      // debugger
      if (this.notifications.length <= 0 && this.gotnotifs) return true
      else return false
    },
    // date() {
    //   return this.notification.time.getDate()
    // },
    ...mapState({
      notifications: (state) => state.users.notifications,
      gotnotifs: (state) => state.users.gotnotifs
    })
  },
  methods: {
    loadMore($state) {
      this.loading = true
      this.$store
        .dispatch('users/getNotifications', this.$auth.user.pk)
        .then((this.loading = false))
        .catch((e) => {
          this.error({
            statusCode: 503,
            message: 'Unable to get notifications'
          })
        })
    }
  },
  head() {
    return {
      title: 'Benachrichtigungen',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Alle deine neusten Benachrichtigungen'
        }
      ]
    }
  }
}
</script>

<style scoped></style>
