<template>
  <div class="center-items">
    <div class="h-screen max-w-md">
      <!-- <nuxt-link v-if="myprofile" to="/users/me/edit">
        <BaseButton v-if="myprofile" class="pt-16 float-right ">
          edit
        </BaseButton>
      </nuxt-link> -->

      <h1 class="text-2xl text-white text-center font-light pt-20">
        {{ user.username }}
        {{ triangle_width }}
      </h1>

      <div class="w-full relative pt-3">
        <img
          id="pic"
          src="/Group 8.svg"
          width="100%"
          class="block z-10 absolute"
        />
        <div class="w-full center-items flex-col relative ">
          <img :src="profilepicture" width="33%" />
          <div class="text-white w-full grid grid-cols-3 profile-info z-20 ">
            <div class="center-items">
              <p class="text-center align-middle">
                {{ user.bio }}
              </p>
            </div>
            <div class="center-items ">
              <button
                class="triangle absolute bottom-0 z-30"
                :style="{
                  borderLeft: triangle_width + ' solid transparent',
                  borderRight: triangle_width + ' solid transparent',
                  borderBottom: triangle_width + ' solid transparent'
                }"
                @click="action"
                @mouseover="toggle"
                @mouseleave="toggle"
              />
              <p
                class="text-center align-middle transition-colors duration-200 z-20"
                :class="{ 'text-grey': hover }"
              >
                {{ button_text }}
              </p>
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
    <!-- <script>
      var width = this.document.getElementById('pic').style.width
      console.log(width)
    </script> -->
  </div>
</template>

<script>
import UserService from '@/services/UserService.js'
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      windowWidth: 0,
      hover: false
    }
  },
  computed: {
    button_text() {
      if (this.myprofile) return 'edit'
      else if (this.following) return 'Folgen'
      else return 'Entfolgen'
    },
    following() {
      return this.user.follower.find(
        (obj) => obj.user_from === this.$auth.user.pk
      )
    },
    profilepicture() {
      if (this.user.profile_picture) return this.user.profile_picture
      else return '/icon.png'
    },
    myprofile() {
      if (this.$auth.loggedIn && this.$auth.user.pk === this.user.pk)
        return true
      else return false
    },
    triangle_width() {
      if (this.windowWidth > 448) return 448 / 6
      else return this.windowWidth / 6
    }
  },
  mounted() {
    this.windowWidth = window.innerWidth
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
  methods: {
    // set_triangle() {
    //   this.windowWidth = window.innerWidth
    //   const triangle = document.getElementById('triangle')
    //   console.log('bottom:' + triangle.style.borderBottom)
    //   triangle.style.borderLeft = this.triangle_width + ' solid transparent'
    //   triangle.style.borderRight = this.triangle_width + ' solid transparent'
    //   triangle.style.borderBottom = this.triangle_width + ' solid transparent'
    //   console.log('bottom:' + triangle.style.borderBottom)
    // },
    action() {
      if (this.myprofile) this.$router.push('me/edit')
      else if (this.following) this.unfollow()
      else this.follow()
    },
    follow() {
      UserService.followUser({
        user_to: this.user.pk,
        user_from: this.$auth.user.pk
      })
        .then(
          this.user.follower.push({
            user_to: this.user.pk,
            user_from: this.$auth.user.pk
          })
        )
        .catch((e) => {
          this.error({
            statusCode: 503,
            message: 'Unable to follow user'
          })
        })
      // .then(console.log(this.user.follower))
    },
    unfollow() {
      console.log('unfollow')
    },
    toggle() {
      this.hover = !this.hover
    }
    // afterEnter() {
    //   const triangle = document.getElementById('triangle')
    //   triangle.style.borderBottomWidth = '74.6px'
    // }
  }
}
</script>

<style scoped>
.profile-info {
  height: 18vw;
}

.triangle:hover {
  border-color: transparent transparent white transparent;
}

.triangle {
  transition-property: border-color;
  transition-duration: 200ms;
  width: 0;
  height: 0;
  margin-bottom: 3px;
}

@media only screen and (min-width: 445px) {
  .profile-info {
    height: 5rem;
  }
}
</style>
