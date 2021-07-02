<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#staticBackdrop"
  >
    Launch static backdrop modal
  </button>

  <!-- Modal -->
  <div
    id="staticBackdrop"
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="staticBackdropLabel" class="modal-title">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">...</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Understood</button>
        </div>
      </div>
    </div>
  </div>
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
