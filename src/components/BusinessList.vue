<template>
  <div class="business-list px-3 py-4">
    <!-- Modals. -->
    <div id="modals"></div>

    <div v-if="hasBusinesses" class="business-list__card">
      <BusinessListCard
        v-for="business in businesses"
        :key="business.directoryIdx"
        :business="business"
        :categories="categories"
      />
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { defineAsyncComponent, defineComponent, onMounted } from 'vue';
import useBackend from '../composables/useBackend';

const BusinessListCard = defineAsyncComponent(
  () => import('./BusinessListCard.vue'),
);

export default defineComponent({
  name: 'BusinessList',
  components: { BusinessListCard },

  setup() {
    const { categories, businesses, hasBusinesses, getBusinesses } =
      useBackend();

    // Fetch the data when the component is mounted.
    onMounted(getBusinesses);

    return { categories, businesses, hasBusinesses, getBusinesses };
  },
});
</script>

<style lang="scss" scoped></style>
