<template>
  <div class="business-list px-3 py-4">
    <div id="teleport">
      <!-- Page Views. -->
      <div id="business-views"></div>

      <!-- Modals. -->
      <div id="business-modals"></div>
    </div>

    <div class="row g-2">
      <!-- Dropdown Filter. -->
      <div class="col-md-3">
        <BusinessListDropdown v-model:filter-term.lazy="filterTerm" />
      </div>

      <!-- Searchbar. -->
      <div class="col">
        <BusinessListSearchbar v-model:search-term.lazy="searchTerm" />
      </div>
    </div>

    <!-- List of businesses. -->
    <div v-if="hasBusinesses" class="business-list__card">
      <BusinessListCard
        v-for="business in businesses"
        :key="business.directoryIdx"
        :business="business"
      />
    </div>

    <!-- Add a new business. -->
    <div class="business-list__add">
      <BusinessListAdd />
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { defineAsyncComponent, defineComponent, onMounted, provide } from 'vue';
import BusinessListSearchbar from './BusinessListSearchbar.vue';
import BusinessListDropdown from './BusinessListDropdown.vue';
import useBackend from '../composables/useBackend';

const BusinessListCard = defineAsyncComponent(
  () => import('./BusinessListCard.vue'),
);
const BusinessListAdd = defineAsyncComponent(
  () => import('./BusinessListAdd.vue'),
);

export default defineComponent({
  name: 'BusinessList',
  components: {
    BusinessListSearchbar,
    BusinessListDropdown,
    BusinessListCard,
    BusinessListAdd,
  },

  setup() {
    // Get the API methods.
    const {
      searchTerm,
      filterTerm,
      categories,
      businesses,
      hasBusinesses,
      getBusinesses,
    } = useBackend();

    // Fetch the data when the component is mounted.
    onMounted(getBusinesses);

    // Provide the categories and updateBusiness to the children.
    provide('categories', categories);

    return {
      searchTerm,
      filterTerm,
      categories,
      businesses,
      hasBusinesses,
    };
  },
});
</script>

<style lang="scss" scoped></style>
