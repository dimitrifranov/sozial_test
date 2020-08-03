<template>
  <div class="center-items">
    <div class="h-screen max-w-md">
      <nuxt-link v-if="myprofile" to="/users/me/edit">
        <BaseButton v-if="myprofile" class="pt-16 float-right ">
          edit
        </BaseButton>
      </nuxt-link>

      <h1 class="text-2xl text-white text-center font-light pt-20 clearfix">
        {{ user.username }}
      </h1>

      <div class="w-full relative pt-3">
        <img src="/Group 8.svg" width="100%" class="block z-10 absolute" />
        <div class="w-full center-items flex-col relative ">
          <img :src="profilepicture" width="33%" />
          <div class="text-white w-full grid grid-cols-3 profile-info z-20 ">
            <div class="center-items">
              <p class="text-center align-middle">
                {{ user.bio }}
              </p>
            </div>
            <div class="center-items ">
              <button class="text-center align-middle hover:opacity-25">
                follow
              </button>
            </div>
            <div class="center-items">
              <p class="text-center align-middle">
                {{ user.following.length }} <br />
                {{ user.follower.length }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-1 pb-16">
        <img
          v-for="(post, i) in user.posts"
          :key="i"
          :src="post.src"
          alt="post"
        />
      </div>
    </div>
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
    profilepicture() {
      if (this.user.profile_picture) return this.user.profile_picture
      else return '/icon.png'
    },
    myprofile() {
      if (this.$auth.loggedIn && this.$auth.user.pk === this.user.pk)
        return true
      else return false
    }
  }
}
</script>

<style scoped>
.profile-info {
  height: 18vw;
}
@media only screen and (min-width: 445px) {
  .profile-info {
    height: 5rem;
  }
}
</style>
