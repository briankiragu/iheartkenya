<template>
  <div class="business-list-dropdown form-floating">
    <select
      id="business-list-filter"
      class="form-select"
      aria-label="Floating label select example"
      @change="onFilter($event)"
    >
      <option value="">All categories</option>
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.name"
      >
        {{ toTitle(category.name) }}
      </option>
    </select>
    <label for="business-list-filter">Choose a category</label>
  </div>
</template>

<script lang="ts">
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-unresolved */
import { defineComponent, inject } from 'vue';
import useFormatting from '../composables/useFormatting';
import { ICategory } from '../interfaces';

export default defineComponent({
  name: 'BusinessListDropdown',
  props: {
    filterTerm: { type: String, default: '' },
  },
  emits: ['update:filterTerm'],

  setup(props, { emit }) {
    const categories: undefined | ICategory[] = inject('categories');
    const { toTitle } = useFormatting();

    const onFilter = (e: any) => {
      emit('update:filterTerm', e.target.value);
    };

    return { categories, toTitle, onFilter };
  },
});
</script>

<style></style>
