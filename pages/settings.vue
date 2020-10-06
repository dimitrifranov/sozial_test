<template>
  <div class="center-items h-screen">
    <form
      class=" w-full max-w-xs h-screen center-items flex-col pt-16 pb-16"
      @submit.prevent="updateUser"
    >
      <baseToggle
        v-model="data.follow_post_notifs"
        title="Erfahre wenn Accounts, denen du folgst, etwas Posten"
      />
      <baseToggle
        v-model="data.new_follow_notifs"
        title="Erfahre wenn dir Jemand neues folgt"
      />
      <baseToggle
        v-model="data.like_notifs"
        title="Erfahre wenn Jemand einen deiner Posts gefällt"
      />
      <baseToggle
        v-model="data.comments_notifs"
        title="Erfahre wenn jemand unter einem deiner Posts kommentiert"
      />
      <baseButton type="submit">
        Speichern
      </baseButton>
    </form>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      data: {
        follow_post_notifs: this.$auth.user.follow_post_notifs,
        new_follow_notifs: this.$auth.user.new_follow_notifs,
        like_notifs: this.$auth.user.like_notifs,
        comments_notifs: this.$auth.user.comments_notifs,
        pk: this.$auth.user.pk,
        username: this.$auth.user.username
        // password: this.$auth.user.password
      }
    }
  },
  methods: {
    updateUser() {
      this.$axios
        .put('/users/' + this.data.pk + '/', this.data)
        .then((response) => {
          this.$auth.setUser(response.data)
          this.$router.push('/')
        })
    }
  },
  head() {
    return {
      title: 'Einstellungen',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Personalisiere deine Einstellungen nach deinen Wünschen'
        }
      ]
    }
  }
}
</script>

<style scoped></style>
