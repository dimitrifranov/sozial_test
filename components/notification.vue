<template>
  <nuxt-link :to="notification.link" class="flex justify-start">
    <img
      :src="notification.profile_pic"
      class="h-8 w-8 border border-white mr-4"
    />
    <section>
      <p>
        {{ notification.content }}
      </p>
      <p class="text-xs -mt-1">
        {{ date }}
      </p>
    </section>
  </nuxt-link>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/de'
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  computed: {
    date() {
      return dayjs(this.notification.time).fromNow()
    }
  },

  created() {
    dayjs.locale('de')
    dayjs.extend(relativeTime)
  }
}
</script>

<style scoped></style>
