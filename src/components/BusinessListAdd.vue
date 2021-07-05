<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#newBusinessModal"
  >
    New Business
  </button>

  <!-- Modal -->
  <div
    id="newBusinessModal"
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="newBusinessModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <form class="modal-content" @submit.prevent="onSubmit">
        <div class="modal-header">
          <h5 id="newBusinessModalLabel" class="modal-title">
            Add a new business
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <!-- Modal form. -->
        <div class="modal-body">
          <!-- Name of business. -->
          <div class="form-floating mb-2">
            <input
              :id="`business-title`"
              v-model="businessForm.title"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': v$.title.$invalid }"
              placeholder="Name of business"
              autocomplete="organization"
            />
            <label :for="`business-title`">Name of Business</label>
            <!-- Validation feedback. -->
            <div v-if="v$.title.$invalid" class="invalid-feedback">
              <p v-for="error of v$.title.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </div>
          </div>

          <div class="row g-2">
            <!-- Category of business. -->
            <div v-if="categories" class="col-md-6">
              <div class="form-floating">
                <select
                  :id="`business-category`"
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
                <label :for="`business-category`">Works with selects</label>

                <!-- Validation feedback. -->
                <div v-if="v$.category.$invalid" class="invalid-feedback">
                  <p v-for="error of v$.category.$errors" :key="error.$uid">
                    {{ error.$message }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Location of business. -->
            <div class="col-md-6">
              <div class="form-floating mb-2">
                <input
                  :id="`business-location`"
                  v-model="businessForm.city"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': v$.city.$invalid }"
                  placeholder="Where is this business located?"
                  autocomplete="address-level1"
                />
                <label :for="`business-location`">
                  Where is this business?
                </label>

                <!-- Validation feedback. -->
                <div v-if="v$.city.$invalid" class="invalid-feedback">
                  <p v-for="error of v$.city.$errors" :key="error.$uid">
                    {{ error.$message }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="row g-2">
            <!-- Phone Number of business. -->
            <div class="col-md-5">
              <div class="form-floating mb-2">
                <input
                  :id="`business-phone`"
                  v-model.number="businessForm.phone"
                  type="number"
                  class="form-control"
                  :class="{ 'is-invalid': v$.phone.$invalid }"
                  placeholder="Business Phone Number"
                  autocomplete="tel"
                />
                <label :for="`business-phone`"> Phone Number </label>

                <!-- Validation feedback. -->
                <div v-if="v$.phone.$invalid" class="invalid-feedback">
                  <p v-for="error of v$.phone.$errors" :key="error.$uid">
                    {{ error.$message }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Email of business. -->
            <div class="col-md-7">
              <div class="form-floating mb-2">
                <input
                  :id="`business-email`"
                  v-model="businessForm.email"
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': v$.email.$invalid }"
                  placeholder="Business Email"
                  autocomplete="email"
                />
                <label :for="`business-email`"> Business Email </label>

                <!-- Validation feedback. -->
                <div v-if="v$.email.$invalid" class="invalid-feedback">
                  <p v-for="error of v$.email.$errors" :key="error.$uid">
                    {{ error.$message }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Business Website. -->
          <div class="form-floating mb-2">
            <input
              :id="`business-website`"
              v-model="businessForm.website"
              type="url"
              class="form-control"
              :class="{ 'is-invalid': v$.website.$invalid }"
              placeholder="business website"
              autocomplete="url"
            />
            <label :for="`business-website`">Business Website</label>

            <!-- Validation feedback. -->
            <div v-if="v$.website.$invalid" class="invalid-feedback">
              <p v-for="error of v$.website.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </div>
          </div>

          <!-- Notes.-->
          <div class="form-floating">
            <textarea
              :id="`business-note`"
              v-model="businessForm.notes"
              class="form-control"
              :class="{ 'is-invalid': v$.notes.$invalid }"
              placeholder="Leave a note here"
              style="height: 100px"
            ></textarea>
            <label :for="`business-note`">Notes</label>

            <!-- Validation feedback. -->
            <div v-if="v$.notes.$invalid" class="invalid-feedback">
              <p v-for="error of v$.notes.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </div>
          </div>
        </div>

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
            Add new business
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import { defineComponent, inject, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email, url } from '@vuelidate/validators';
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

    // Formatting methods.
    const { toTitle } = useFormatting();

    // Populate the form values.
    const businessForm: IBusinessForm = reactive({
      title: '',
      category: '',
      city: '',
      phone: '',
      email: '',
      website: '',
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

    const onSubmit = () => {
      updateBusiness(businessForm)
        .then((res: any) => console.log(res))
        .catch((err: Error) => console.error(err));
    };

    return { categories, businessForm, v$, toTitle, onSubmit };
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
