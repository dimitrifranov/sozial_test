<template>
  <div class="center-items h-screen">
    <form
      class=" w-full max-w-xs h-screen center-items flex-col"
      @submit.prevent="updateUser"
    >
      <BaseToggle
        v-model="data.follow_post_notifs"
        title="Erfahre wenn Accounts denen du folgst etwas Posten"
      />
      <BaseToggle
        v-model="data.new_follow_notifs"
        title="Erfahre wenn dir jemand neues folgt"
      />
      <BaseToggle
        v-model="data.like_notifs"
        title="Erfahre wenn jemand einen deiner Posts gefällt"
      />
      <BaseToggle
        v-model="data.comments_notifs"
        title="Erfahre wenn jemand unter einem deiner Posts kommentiert"
      />
      <BaseButton type="submit">
        Speichern
      </BaseButton>
    </form>
  </div>
</template>

<script>
import UserService from '@/services/UserService.js'
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
        username: this.$auth.user.username,
        password: this.$auth.user.password
      }
    }
  },
  methods: {
    updateUser() {
      UserService.updateUser(this.data).then((response) => {
        this.$auth.setUser(response.data)
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
