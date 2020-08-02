<template>
  <div>
    <div
      v-infinite-scroll="loadMore"
      class="w-screen flex flex-col items-center pt-16"
      infinite-scroll-disabled="autoLoadDisabled"
      infinite-scroll-distance="10"
    >
      <div v-for="(notification, i) in notifications" :key="i">
        {{ notification }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
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
    ...mapState({
      notifications: (state) => state.users.notifications
    })
  },
  methods: {
    loadMore($state) {
      this.loading = true
      this.$store
        .dispatch('users/getNotifications', this.$auth.user.pk)
        .then((this.loading = false))
    }
  }
}
</script>

<style scoped></style>
