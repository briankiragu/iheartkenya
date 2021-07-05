<template>
  <div class="business-list px-3 py-4">
    <div id="teleport">
      <!-- Page Views. -->
      <div id="business-views"></div>

      <!-- Modals. -->
      <div id="business-modals"></div>
    </div>

    <!-- Add a new business. -->
    <div class="business-list__add mb-5">
      <BusinessListAdd />
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

      <div
        class="business-list__loader d-flex justify-content-center"
        :class="{ 'd-none': !isLoading }"
      >
        <img
          src="../assets/loaders/loading.svg"
          alt="Loader icon"
          class="img-fluid"
          loading="lazy"
        />
      </div>
    </div>

    <div v-else class="business-list__no-cards text-center">
      <p class="mb-4 mt-5">There are no businesses to display.</p>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import {
  defineAsyncComponent,
  defineComponent,
  onMounted,
  provide,
  Ref,
  ref,
} from 'vue';
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
    // Declare data properties.
    const isLoading: Ref<boolean> = ref(true);
    const pageNo: Ref<number> = ref(1);

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
    onMounted(() => {
      // Set to loading.
      isLoading.value = true;

      // Get the first businesses on page load.
      getBusinesses(pageNo.value)
        .then((response) => {
          businesses.value = [...response.data];
        })
        .catch((err: Error) => console.error(err.message));

      // Add a listener to fetch more records on scroll-to-bottom.
      window.onscroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
          // Set the state to loading.
          isLoading.value = true;

          // Add the page count.
          pageNo.value += 1;

          // Get the requests.
          getBusinesses(pageNo.value)
            .then((response) => {
              // Check if any new data was returned.
              if (response.data.length > 0) {
                // Update the businesses with the incoming data.
                businesses.value.push(...response.data);
              } else {
                // Decrement the page counter.
                pageNo.value -= 1;
              }
            })
            .catch(() => {
              // Decrement the page counter.
              pageNo.value -= 1;
            });

          // Set the state from loading.
          isLoading.value = false;
        }
      };

      // Set from loading.
      isLoading.value = false;
    });

    // Provide the categories and updateBusiness to the children.
    provide('categories', categories);

    return {
      isLoading,
      searchTerm,
      filterTerm,
      categories,
      businesses,
      hasBusinesses,
    };
  },
});
</script>

<style lang="scss" scoped>
.business-list {
  &__loader {
    img {
      width: 80px;
    }
  }
}
</style>
