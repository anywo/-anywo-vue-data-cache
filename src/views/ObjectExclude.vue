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
        text: "",
        flag: false,
      },
    };
  },
  dataCache: {
    exclude: ["search.flag"],
  },
};
</script>

<style></style>
