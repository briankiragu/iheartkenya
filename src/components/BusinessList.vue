<template>
  <div class="business-list px-3 py-4">
    <div id="teleport">
      <!-- Page Views. -->
      <div id="business-views"></div>

      <!-- Modals. -->
      <div id="business-modals"></div>
    </div>

    <!-- Searchbar. -->
    <BusinessListSearchbar v-model:search-term.lazy="searchTerm" />

    <!-- List of businesses. -->
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
import { defineAsyncComponent, defineComponent, onMounted, provide } from 'vue';
import useBackend from '../composables/useBackend';
import BusinessListSearchbar from './BusinessListSearchbar.vue';

const BusinessListCard = defineAsyncComponent(
  () => import('./BusinessListCard.vue'),
);

export default defineComponent({
  name: 'BusinessList',
  components: { BusinessListSearchbar, BusinessListCard },

  setup() {
    // Get the API methods.
    const { searchTerm, categories, businesses, hasBusinesses, getBusinesses } =
      useBackend();

    // Fetch the data when the component is mounted.
    onMounted(getBusinesses);

    // Provide the categories and updateBusiness to the children.
    provide('categories', categories);

    return {
      searchTerm,
      categories,
      businesses,
      hasBusinesses,
    };
  },
});
</script>

<style lang="scss" scoped></style>
