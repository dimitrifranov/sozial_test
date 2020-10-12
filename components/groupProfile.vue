<template>
  <div class="center-items">
    <div class="h-screen max-w-md">
      <div class="clearfix relative">
        <h2 class="text-2xl text-white text-center font-light pt-20">
          <!-- {{ group.name }} -->
        </h2>
        <nuxt-link class="center-items w-full" :to="creator_link">
          <h3
            class="text-l text-white text-opacity-75 text-center font-light hover:underline"
          >
            erstellt von {{ group.creator_name }}
          </h3>
        </nuxt-link>

        <baseButton
          v-if="myprofile"
          class="text-xs hover:underline ml-1"
          buttonClass="absolute z-20 h-16 right-0"
          @clicked="invite"
        >
          Freunde<br />
          einladen
        </baseButton>
      </div>

      <div class="w-screen max-w-md relative pt-3">
        <img
          id="pic"
          src="/Group 8.svg"
          width="100%"
          class="block z-10 absolute"
        />
        <div class="w-full center-items flex-col relative ">
          <img :src="profilepicture" :width="profile_width" />
          <div class="text-white w-full grid grid-cols-3 profile-info z-20 ">
            <div class="center-items">
              <section class="text-center text-xs align-middle">
                {{ group.description }}
              </section>
            </div>
            <div class="center-items ">
              <button
                class="triangle absolute bottom-0 z-20"
                :style="triangleStyle"
                @click="action"
                @mouseover="toggle"
                @mouseleave="toggle"
              />
              <div
                class="text-center align-middle transition-colors duration-200 z-30 pointer-events-none"
                :class="{ 'text-grey': hover }"
              >
                <cog-outline-icon
                  v-if="myprofile"
                  title="Settings"
                  :size="24"
                  class="mt-1"
                />
                <p v-else class="text-xs mt-2 font-light">
                  {{ button_text }}
                </p>
              </div>
            </div>
            <div class="center-items flex flex-row items-baseline">
              <div class="flex flex-col items-center">
                <p class="text-2xs font-light">
                  Members
                </p>
                <p class="-mt-1 text-lg">
                  {{ group.group_members.length }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="autoLoadDisabled"
        infinite-scroll-distance="10"
        class="grid grid-cols-3 gap-1 pb-16"
      >
        <postPreview v-for="(post, i) in posts" :key="i" :post="post" />
      </div>
    </div>
  </div>
</template>

<script>
import postPreview from '@/components/postPreview.vue'
export default {
  components: {
    postPreview
  },
  props: {
    group: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      windowWidth: 0,
      hover: false,
      loading: false,
      start: true,
      next: null,
      posts: []
    }
  },
  computed: {
    finish() {
      return !this.start && !this.next
    },
    webShareApiSupported() {
      try {
        return navigator.share
      } catch (error) {
        return false
      }
    },
    autoLoadDisabled() {
      return this.loading || this.finish
      // || this.posts.length === 0
    },
    triangleStyle() {
      if (!this.hover) {
        return {
          borderLeft: this.triangle_width + 'px solid transparent',
          borderRight: this.triangle_width + 'px solid transparent',
          borderBottom: this.triangle_width + 'px solid transparent'
        }
      } else {
        return {
          borderLeft: this.triangle_width + 'px solid transparent',
          borderRight: this.triangle_width + 'px solid transparent',
          borderBottom: this.triangle_width + 'px solid white'
        }
      }
    },
    button_text() {
      if (this.myprofile) return 'edit'
      else if (this.member) return 'Austreten'
      else return 'Beitreten'
    },
    creator_link() {
      return '/users/' + this.group.creator
    },
    member() {
      if (!this.$auth.loggedIn) return false
      return this.group.group_members.find(
        (obj) => obj.user === this.$auth.user.pk
      )
    },
    profilepicture() {
      if (this.group.pic) return this.group.pic
      else return '/group.png'
    },
    myprofile() {
      if (
        this.$auth.loggedIn &&
        this.$auth.user.username === this.group.creator_name
      )
        return true
      else return false
    },
    triangle_width() {
      if (this.windowWidth > 448) return 448 / 6
      else return this.windowWidth / 6
    },
    profile_width() {
      return this.triangle_width * 2 + 'px'
    }
  },
  mounted() {
    this.windowWidth = window.innerWidth
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
  methods: {
    getPosts(data) {
      if (data.next) return this.$axios.get(data.next)
      else if (data.user) {
        return this.$axios.get(
          '/groups/' + data.group + '/posts/?ordering=-pub_date',
          {
            params: { user: data.user }
          }
        )
      } else {
        return this.$axios.get(
          '/groups/' + data.group + '/posts/?ordering=-pub_date'
        )
      }
    },
    loadMore($state) {
      this.loading = true
      this.start = false
      if (this.$auth.loggedIn) {
        this.getPosts({
          group: this.group.id,
          user: this.$auth.user.pk,
          next: this.next
        })
          .then((response) => {
            this.next = response.data.next
            this.posts.push(...response.data.results)
          })
          .then((this.loading = false))
      } else {
        this.getPosts({
          group: this.group.id,
          next: this.next
        })
          .then((response) => {
            this.next = response.data.next
            this.posts.push(...response.data.results)
          })
          .then((this.loading = false))
      }
    },
    action() {
      if (this.myprofile) this.$router.push(this.group.id + '/edit')
      else if (this.member) this.leaveGroup()
      else this.joinGroup()
    },
    joinGroup() {
      if (!this.$auth.loggedIn) this.$router.push('/login')
      this.$axios
        .post('/memberships/', {
          group: this.group.id,
          user: this.$auth.user.pk
        })
        .then((res) => {
          this.group.group_members.push(res.data)
        })
    },
    leaveGroup() {
      this.$axios
        .delete(
          '/memberships' +
            this.group.group_members.find(
              (obj) => obj.user === this.$auth.user.pk
            ).id +
            '/'
        )
        .then(() => {
          this.group.group_members = this.group.group_members.filter(
            (members) => members.user !== this.$auth.user.pk
          )
        })
    },
    async invite() {
      const url =
        this.$config.baseUrl +
        '/groups/' +
        this.group.id +
        '?secret=' +
        this.group.secret
      if (this.webShareApiSupported) {
        try {
          navigator.share({
            title: 'Einladung',
            text:
              this.$auth.user.username +
              ' lädt dich ein seiner Gruppe: ' +
              this.group.name +
              ' beizutreten',
            url
          })
        } catch (e) {
          this.error({
            statusCode: 500,
            message: 'Unable to share post'
          })
        }
      } else {
        await navigator.clipboard.writeText(url)
        alert('Copied the text: ' + url)
      }
    },
    toggle() {
      this.hover = !this.hover
    }
  }
}
</script>

<style scoped>
.profile-info {
  height: 18vw;
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
