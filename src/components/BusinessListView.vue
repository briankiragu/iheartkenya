<template>
  <div class="business-list-view">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary btn-circle"
      data-bs-toggle="modal"
      :data-bs-target="`#static-backdrop-${business?.directoryIdx}`"
    >
      View
    </button>

    <!-- Modal -->
    <teleport to="#business-views">
      <div
        :id="`static-backdrop-${business?.directoryIdx}`"
        class="modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        :aria-labelledby="`static-backdrop-${business?.directoryIdx}Label`"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-fullscreen">
          <div class="modal-content">
            <!-- Modal Header. -->
            <div class="modal-header">
              <h5
                :id="`static-backdrop-${business?.directoryIdx}Label`"
                class="modal-title"
              >
                {{ business?.title }}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <!-- Modal Content. -->
            <div class="modal-body">
              <div class="business-list-view__image">
                <img
                  src="../assets/images/local1.jpeg"
                  :alt="`${business?.title} image`"
                  class="img-fluid rounded-3"
                  loading="lazy"
                />
              </div>

              <div
                class="
                  business-list-view__header
                  mt-3
                  d-flex
                  justify-content-between
                "
              >
                <!-- Titles. -->
                <div class="business-list-view__titles">
                  <h1 class="business-list-view__title mb-1">
                    {{ business?.title }}
                  </h1>
                  <h3 class="business-list-view__subtitle">
                    {{ business?.owner }} owns this business
                  </h3>
                  <h4
                    v-if="hasWebsite"
                    class="business-list-view__website mt-2"
                  >
                    <a :href="business?.website" target="_blank">
                      View their website
                    </a>
                  </h4>
                </div>

                <!-- Actions. -->
                <div class="business-list-view__actions ms-3">
                  <BusinessListCardModal />
                </div>
              </div>

              <div class="business-list-view__info mt-3">
                <!-- Category. -->
                <span
                  class="
                    business-list-view__category
                    me-2
                    px-2
                    py-1
                    rounded
                    text-white
                  "
                >
                  {{ toTitle(business?.category) }}
                </span>

                <!-- Location. -->
                <span class="business-list-view__location">
                  Located in {{ business?.city }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-unresolved */
import { computed, defineAsyncComponent, defineComponent, inject } from 'vue';
import useFormatting from '../composables/useFormatting';
import { IBusiness } from '../interfaces';

const BusinessListCardModal = defineAsyncComponent(
  () => import('./BusinessListCardModal.vue'),
);

export default defineComponent({
  name: 'BusinessListView',
  components: { BusinessListCardModal },

  setup() {
    // Retrive the business from the parent component.
    const business: undefined | IBusiness = inject('business');

    // Computed properties.
    const isLocallyOwned = computed(() => business?.localowned === 'true');
    const hasWebsite = computed(() => !!business?.website);

    const { toTitle } = useFormatting();

    return { business, isLocallyOwned, hasWebsite, toTitle };
  },
});
</script>

<style lang="scss" scoped>
.business-list-view {
  &__title {
    font-size: 1.6rem;
    font-weight: 400;
  }

  &__subtitle {
    font-size: 0.9rem;
  }

  &__info {
    font-size: 0.9rem;
  }

  &__category {
    background-color: #6366f1;
  }

  &__website {
    font-size: 0.9rem;
  }
}
</style>
