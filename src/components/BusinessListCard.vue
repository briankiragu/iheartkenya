<template>
  <div class="business-list-card card bg-white mb-4 border-0 rounded-3 shadow">
    <!-- Image header. -->
    <div v-if="false" class="business-list-card__image">
      <img
        src="../assets/images/local2.jpeg"
        :alt="`${business.title} image`"
        class="img-fluid"
      />
    </div>

    <!-- Main content. -->
    <div class="business-list-card__text">
      <!-- Business Title. -->
      <h2 class="business-list-card__title mb-1 py-2">
        {{ business.title }}
      </h2>

      <!-- Business Ownership. -->
      <h3
        v-if="isLocallyOwned"
        class="business-list-card__ownership rounded fst-italic"
      >
        Locally Owned
      </h3>

      <!-- Business Info. -->
      <div
        class="
          business-list-card__info
          d-flex
          align-items-center
          justify-content-between
          mt-0
        "
      >
        <div class="business-list-card__info-main">
          <span class="business-list-card__category rounded me-2 px-2 py-1">
            {{ business.category }}
          </span>

          <span class="business-list-card__location">
            {{ business.city }}
          </span>
        </div>

        <!-- Actions. -->
        <div class="business-list-card__info-actions">
          <BusinessListView />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { defineAsyncComponent, defineComponent, provide } from 'vue';
import { IBusiness } from '../interfaces';

const BusinessListView = defineAsyncComponent(
  () => import('./BusinessListView.vue'),
);

export default defineComponent({
  name: 'BusinessListCard',
  components: { BusinessListView },

  props: {
    business: { type: Object as () => IBusiness, default: () => {} },
  },

  setup(props) {
    // Check if the business is locally owned.
    const isLocallyOwned: boolean = props.business.localowned === 'true';

    // Provide the business to all children.
    provide('business', props.business);

    return { isLocallyOwned };
  },
});
</script>

<style lang="scss" scoped>
.business-list-card {
  padding: 20px 30px;

  &__image {
    img {
      border-top-left-radius: 0.3rem;
      border-bottom-left-radius: 0.3rem;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
      height: 100px;
    }
  }

  &__title {
    color: hsl(220, 4%, 29%);
    font-size: 1.7rem;
    font-weight: 520;
  }

  &__ownership {
    color: #4338ca;
    font-size: 0.9rem;
  }

  &__info {
    color: #6b7280;
    font-size: 0.89rem;
  }

  &__category {
    background-color: #a5b4fc;
    color: #064e3b;
    font-weight: 550;

    img {
      width: 30px;
    }
  }
}
</style>
