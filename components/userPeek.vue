<template>
  <div>
    <nuxt-link :to="user_link" class="text-white flex w-40 justify-start mb-4">
      <img :src="user.profile_pic" class="h-8 w-8 border border-white mr-4" />
      <div>
        <p>{{ user.creator_name }}</p>
        <p class="text-xs font-light">
          {{ user.title }}
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
      return '/post/' + this.user.id
    }
  }
}
</script>

<style lang="scss" scoped></style>
