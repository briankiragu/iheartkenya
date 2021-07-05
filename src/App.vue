<template>
  <BusinessList />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BusinessList from './components/BusinessList.vue';

export default defineComponent({
  name: 'App',
  components: {
    BusinessList,
  },
});
</script>

<style>
#app {
  background-color: whitesmoke;
  font-family: Inter, 'Avenir Next', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}
</style>
