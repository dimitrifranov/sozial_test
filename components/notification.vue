<template>
  <div>
    <p>
      {{ notification.content }}
    </p>
    <p class="text-xs -mt-1">
      {{ date }}
    </p>
  </div>
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
