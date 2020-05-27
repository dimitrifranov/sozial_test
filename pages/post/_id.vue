<template>
  <div>
    {{ post }}
  </div>
</template>

<script>
export default {
  asyncData({ $axios, route, error }) {
    return $axios
      .get('http://localhost:8000/post/' + route.params.id)
      .then((response) => {
        return {
          post: response.data
        }
      })
      .catch((e) => {
        error({
          statusCode: 503,
          message: 'Unable to get this Users'
        })
      })
  }
}
</script>

<style scoped></style>
