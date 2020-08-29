<template>
  <div>
    <button
      class="text-white flex w-40 justify-start mb-4"
      @click="$emit('clicked', group.id)"
    >
      <img :src="group.pic" class="h-8 w-8 border border-white mr-4" />
      <div>
        <p>{{ group.name }}</p>
        <p class="text-xs font-light">
          {{ group.description }}
        </p>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  computed: {
    group_link() {
      return '/groups/' + this.group.id
    }
  }
}
</script>

<style lang="scss" scoped></style>
