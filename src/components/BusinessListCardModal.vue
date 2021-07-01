<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="business-list-card-modal__trigger rounded-circle border-0 shadow"
    data-bs-toggle="modal"
    :data-bs-target="`#modal${business?.directoryIdx}`"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-pencil-square"
      viewBox="0 0 16 16"
    >
      <path
        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
      />
      <path
        fill-rule="evenodd"
        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
      />
    </svg>
  </button>

  <!-- Modal -->
  <teleport to="#business-modals">
    <div
      :id="`modal${business?.directoryIdx}`"
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      :aria-labelledby="`modal${business?.directoryIdx}Label`"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 :id="`modal${business?.directoryIdx}Label`" class="modal-title">
              Edit {{ business?.title }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <!-- Edit form. -->
          <div class="modal-body">
            <form @submit.prevent="onSubmit">
              <!-- Name of business. -->
              <div class="form-floating mb-2">
                <input
                  :id="`business-title-${business?.directoryIdx}`"
                  type="text"
                  class="form-control"
                  placeholder="Name of business"
                  :value="business?.title"
                  autocomplete="organization"
                />
                <label :for="`business-title-${business?.directoryIdx}`">
                  Name of Business
                </label>
              </div>

              <div class="row g-2">
                <!-- Category of business. -->
                <div class="col-md-6">
                  <div class="form-floating">
                    <select
                      :id="`business-category-${business?.directoryIdx}`"
                      class="form-select"
                      aria-label="Floating label select example"
                    >
                      <option selected disabled>Open this select menu</option>
                      <option
                        v-for="category in categories"
                        :key="`category-${category.id}`"
                        :value="category.id"
                      >
                        {{ toTitle(category.name) }}
                      </option>
                    </select>
                    <label :for="`business-category-${business?.directoryIdx}`"
                      >Works with selects</label
                    >
                  </div>
                </div>

                <!-- Location of business. -->
                <div class="col-md-6">
                  <div class="form-floating mb-2">
                    <input
                      :id="`business-location-${business?.directoryIdx}`"
                      type="text"
                      class="form-control"
                      placeholder="Where is this business located?"
                      autocomplete="address-level1"
                      :value="business?.city"
                    />
                    <label :for="`business-location-${business?.directoryIdx}`">
                      Where is this business?
                    </label>
                  </div>
                </div>
              </div>

              <div class="row g-2">
                <!-- Phone Number of business. -->
                <div class="col-md-5">
                  <div class="form-floating mb-2">
                    <input
                      :id="`business-phone-${business?.directoryIdx}`"
                      type="number"
                      class="form-control"
                      placeholder="Business Phone Number"
                      autocomplete="tel"
                      :value="business?.city"
                    />
                    <label :for="`business-phone-${business?.directoryIdx}`">
                      Phone Number
                    </label>
                  </div>
                </div>

                <!-- Email of business. -->
                <div class="col-md-7">
                  <div class="form-floating mb-2">
                    <input
                      :id="`business-email-${business?.directoryIdx}`"
                      type="email"
                      class="form-control"
                      placeholder="Business Email"
                      autocomplete="email"
                      :value="business?.city"
                    />
                    <label :for="`business-email-${business?.directoryIdx}`">
                      Business Email
                    </label>
                  </div>
                </div>
              </div>

              <!-- Business Website. -->
              <div class="form-floating mb-2">
                <input
                  :id="`business-website-${business?.directoryIdx}`"
                  type="url"
                  class="form-control"
                  placeholder="business website"
                  :value="business?.website"
                  autocomplete="url"
                />
                <label :for="`business-website-${business?.directoryIdx}`">
                  Business Website
                </label>
              </div>

              <!-- Notes.-->
              <div class="form-floating">
                <textarea
                  :id="`business-note-${business?.directoryIdx}`"
                  class="form-control"
                  placeholder="Leave a note here"
                  style="height: 100px;"
                ></textarea>
                <label :for="`business-note-${business?.directoryIdx}`">
                  Notes
                </label>
              </div>
            </form>
          </div>

          <!-- Modal footer. -->
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save my changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import { defineComponent, inject } from 'vue';
import useFormatting from '../composables/useFormatting';
import { IBusiness, ICategory } from '../interfaces';

export default defineComponent({
  name: 'BusinessListCardModal',

  setup() {
    // Retrive the business from the parent component.
    const business: undefined | IBusiness = inject('business');
    const categories: undefined | ICategory[] = inject('categories');

    const { toTitle } = useFormatting();

    const onSubmit = () => {};

    return { business, categories, toTitle, onSubmit };
  },
});
</script>

<style lang="scss" scoped>
.business-list-card-modal {
  &__trigger {
    background-color: #e0e7ff;
    font-weight: 700;
    padding: 12px 15px;
  }
}
</style>
