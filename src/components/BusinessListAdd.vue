<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn business-list-add__trigger p-3 rounded shadow"
    data-bs-toggle="modal"
    :data-bs-target="`#modal-add-new-business`"
  >
    New Business
  </button>

  <!-- Modal -->
  <teleport to="#business-modals">
    <div
      :id="`modal-add-new-business`"
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      :aria-labelledby="`modal-add-new-businessLabel`"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <form class="modal-content" @submit.prevent="onSubmit">
          <div class="modal-header">
            <h5 :id="`modal-add-new-businessLabel`" class="modal-title">
              Add a new business
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
            <!-- Name of business. -->
            <div class="form-floating mb-2">
              <input
                :id="`business-title-add-new-business`"
                v-model="businessForm.title"
                type="text"
                class="form-control"
                placeholder="Name of business"
                autocomplete="organization"
              />
              <label :for="`business-title-add-new-business`">
                Name of Business
              </label>
            </div>

            <div class="row g-2">
              <!-- Category of business. -->
              <div class="col-md-6">
                <div class="form-floating">
                  <select
                    :id="`business-category-add-new-business`"
                    v-model="businessForm.category"
                    class="form-select"
                    aria-label="Floating label select example"
                  >
                    <option value="" disabled>Open this select menu</option>
                    <option
                      v-for="category in categories"
                      :key="`category-${category.id}`"
                      :value="category.name"
                    >
                      {{ toTitle(category.name) }}
                    </option>
                  </select>
                  <label :for="`business-category-add-new-business`"
                    >Works with selects</label
                  >
                </div>
              </div>

              <!-- Location of business. -->
              <div class="col-md-6">
                <div class="form-floating mb-2">
                  <input
                    :id="`business-location-add-new-business`"
                    v-model="businessForm.city"
                    type="text"
                    class="form-control"
                    placeholder="Where is this business located?"
                    autocomplete="address-level1"
                  />
                  <label :for="`business-location-add-new-business`">
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
                    :id="`business-phone-add-new-business`"
                    v-model.number="businessForm.phone"
                    type="number"
                    class="form-control"
                    placeholder="Business Phone Number"
                    autocomplete="tel"
                  />
                  <label :for="`business-phone-add-new-business`">
                    Phone Number
                  </label>
                </div>
              </div>

              <!-- Email of business. -->
              <div class="col-md-7">
                <div class="form-floating mb-2">
                  <input
                    :id="`business-email-add-new-business`"
                    v-model="businessForm.email"
                    type="email"
                    class="form-control"
                    placeholder="Business Email"
                    autocomplete="email"
                  />
                  <label :for="`business-email-add-new-business`">
                    Business Email
                  </label>
                </div>
              </div>
            </div>

            <!-- Business Website. -->
            <div class="form-floating mb-2">
              <input
                :id="`business-website-add-new-business`"
                v-model="businessForm.website"
                type="url"
                class="form-control"
                placeholder="business website"
                autocomplete="url"
              />
              <label :for="`business-website-add-new-business`">
                Business Website
              </label>
            </div>

            <!-- Notes.-->
            <div class="form-floating">
              <textarea
                :id="`business-note-add-new-business`"
                v-model="businessForm.notes"
                class="form-control"
                placeholder="Leave a note here"
                style="height: 100px"
              ></textarea>
              <label :for="`business-note-add-new-business`"> Notes </label>
            </div>
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
            <button type="submit" class="btn btn-primary">
              Save my changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import { defineComponent, inject, Ref, ref } from 'vue';
import useBackend from '../composables/useBackend';
import useFormatting from '../composables/useFormatting';
import { IBusinessForm, ICategory } from '../interfaces';

export default defineComponent({
  name: 'BusinessListAdd',

  setup() {
    // Retrive the categories from the parent component.
    const categories: undefined | ICategory[] = inject('categories');

    // Get the update business method.
    const { updateBusiness } = useBackend();

    // Populate the form values.
    const businessForm: Ref<IBusinessForm> = ref({
      title: '',
      category: '',
      city: '',
      phone: null,
      email: '',
      website: '',
      notes: '',
    });

    const onSubmit = () => {
      updateBusiness(businessForm.value)
        .then((res: any) => console.log(res))
        .catch((err: Error) => console.error(err));
    };

    const { toTitle } = useFormatting();

    return { categories, businessForm, toTitle, onSubmit };
  },
});
</script>

<style lang="scss" scoped>
.business-list-add {
  &__trigger {
    background-color: #e0e7ff;
    font-weight: 700;
  }
}
</style>
