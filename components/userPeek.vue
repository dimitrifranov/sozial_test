<template>
  <div>
    <nuxt-link :to="user_link" class="text-white flex w-40 justify-start mb-4">
      <img
        :src="user.profile_picture"
        class="h-8 w-8 border border-white mr-4"
      />
      <div>
        <p>{{ user.username }}</p>
        <p class="text-xs font-light">
          {{ user.bio }}
        </p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    user_link() {
      return '/users/' + this.user.pk
    }
  }
}
</script>

<style lang="scss" scoped></style>
