<template>
  <div class="business-list-searchbar">
    <div class="form-floating mb-3">
      <input
        :id="`business-search-bar`"
        type="search"
        class="form-control"
        placeholder="Enter name of business"
        autocomplete="organization"
        :value="searchTerm"
        @input="onSearch($event)"
      />
      <label :for="`business-search-bar`">Search for a businesses by name</label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BusinessListSearchbar',
  props: {
    searchTerm: { type: String, default: '' },
  },
  emits: ['update:searchTerm'],

  setup(props, { emit }) {
    const onSearch = (e: any) => {
      emit('update:searchTerm', e.target.value);
    };

    return { onSearch };
  },
});
</script>

<style lang="scss" scoped>
.business-list-searchbar {
  input {
    font-size: 0.9rem;
  }

  label {
    font-size: 1rem;
  }
}
</style>
