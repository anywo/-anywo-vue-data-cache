<template>
  <div class="about">
    <input v-model="search.text" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        text: ""
      },
    };
  },
  dataCacheKey: "home",
  dataCache: {
    target: ["search.text"],
  },
};
</script>

<style></style>
