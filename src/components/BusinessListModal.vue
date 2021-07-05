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
        <form class="modal-content" @submit.prevent="onSubmit">
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
            <!-- Name of business. -->
            <div class="form-floating mb-2">
              <input
                :id="`business-title-${business?.directoryIdx}`"
                v-model="businessForm.title"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.title.$invalid }"
                placeholder="Name of business"
                autocomplete="organization"
              />
              <label :for="`business-title-${business?.directoryIdx}`">
                Name of Business
              </label>

              <!-- Validation feedback. -->
              <div v-if="v$.title.$invalid" class="invalid-feedback">
                <p v-for="error of v$.title.$errors" :key="error.$uid">
                  <strong>{{ error.$message }}</strong>
                </p>
              </div>
            </div>

            <div class="row g-2">
              <!-- Category of business. -->
              <div v-if="categories" class="col-md-6">
                <div class="form-floating">
                  <select
                    :id="`business-category-${business?.directoryIdx}`"
                    v-model="businessForm.category"
                    class="form-select"
                    :class="{ 'is-invalid': v$.category.$invalid }"
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
                  <label :for="`business-category-${business?.directoryIdx}`">
                    Works with selects
                  </label>
                  <div v-if="v$.category.$invalid" class="invalid-feedback">
                    Please select a category.
                  </div>
                </div>
              </div>

              <!-- Location of business. -->
              <div class="col-md-6">
                <div class="form-floating mb-2">
                  <input
                    :id="`business-location-${business?.directoryIdx}`"
                    v-model="businessForm.city"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': v$.city.$invalid }"
                    placeholder="Where is this business located?"
                    autocomplete="address-level1"
                  />
                  <label :for="`business-location-${business?.directoryIdx}`">
                    Where is this business?
                  </label>
                  <div v-if="v$.city.$invalid" class="invalid-feedback">
                    Please give a city.
                  </div>
                </div>
              </div>
            </div>

            <div class="row g-2">
              <!-- Phone Number of business. -->
              <div class="col-md-5">
                <div class="form-floating mb-2">
                  <input
                    :id="`business-phone-${business?.directoryIdx}`"
                    v-model.number="businessForm.phone"
                    type="number"
                    class="form-control"
                    :class="{ 'is-invalid': v$.phone.$invalid }"
                    placeholder="Business Phone Number"
                    autocomplete="tel"
                  />
                  <label :for="`business-phone-${business?.directoryIdx}`">
                    Phone Number
                  </label>
                  <div v-if="v$.phone.$invalid" class="invalid-feedback">
                    Please give a valid phone number.
                  </div>
                </div>
              </div>

              <!-- Email of business. -->
              <div class="col-md-7">
                <div class="form-floating mb-2">
                  <input
                    :id="`business-email-${business?.directoryIdx}`"
                    v-model="businessForm.email"
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': v$.email.$invalid }"
                    placeholder="Business Email"
                    autocomplete="email"
                  />
                  <label :for="`business-email-${business?.directoryIdx}`">
                    Business Email
                  </label>
                  <div v-if="v$.email.$invalid" class="invalid-feedback">
                    Please give a valid email address.
                  </div>
                </div>
              </div>
            </div>

            <!-- Business Website. -->
            <div class="form-floating mb-2">
              <input
                :id="`business-website-${business?.directoryIdx}`"
                v-model="businessForm.website"
                type="url"
                class="form-control"
                :class="{ 'is-invalid': v$.website.$invalid }"
                placeholder="business website"
                autocomplete="url"
              />
              <label :for="`business-website-${business?.directoryIdx}`">
                Business Website
              </label>
              <div v-if="v$.website.$invalid" class="invalid-feedback">
                Please give a valid website.
              </div>
            </div>

            <!-- Notes.-->
            <div class="form-floating">
              <textarea
                :id="`business-note-${business?.directoryIdx}`"
                v-model="businessForm.notes"
                class="form-control"
                :class="{ 'is-invalid': v$.notes.$invalid }"
                placeholder="Leave a note here"
                style="height: 100px"
              ></textarea>
              <label :for="`business-note-${business?.directoryIdx}`">
                Notes
              </label>
              <div v-if="v$.notes.$invalid" class="invalid-feedback">
                Please give a notes.
              </div>
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
            <button
              type="submit"
              class="btn btn-primary"
              :class="{ disabled: v$.$invalid }"
            >
              Update this business
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
import { defineComponent, inject, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email, url } from '@vuelidate/validators';
import useBackend from '../composables/useBackend';
import useFormatting from '../composables/useFormatting';
import { IBusiness, IBusinessForm, ICategory } from '../interfaces';

export default defineComponent({
  name: 'BusinessListModal',

  setup() {
    // Retrive the business and categories from the parent component.
    const business: undefined | IBusiness = inject('business');
    const categories: undefined | ICategory[] = inject('categories');

    // Get the update business method.
    const { updateBusiness } = useBackend();

    // Formatting methods.
    const { toTitle } = useFormatting();

    // Populate the form values.
    const businessForm: IBusinessForm = reactive({
      title: business!.title,
      category: business!.category,
      city: business!.city,
      phone: '',
      email: '',
      website: business!.website ? business!.website : '',
      notes: '',
    });

    // Validation rules.
    const rules = {
      title: { required },
      category: {},
      city: {},
      phone: {},
      email: { email },
      website: { url },
      notes: {},
    };

    // Setup vuelidate.
    const v$ = useVuelidate(rules, businessForm, {
      $autoDirty: true,
      $lazy: true,
    });

    /**
     * When a user clicks submit.
     *
     * @author Brian K. Kiragu <bkariuki@hotmail.com>
     */
    const onSubmit = () => {
      updateBusiness(businessForm)
        .then((res: any) => console.log(res))
        .catch((err: Error) => console.error(err));
    };

    return {
      v$,
      business,
      categories,
      businessForm,
      toTitle,
      onSubmit,
    };
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
