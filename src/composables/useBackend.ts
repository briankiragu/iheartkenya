/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { computed, Ref, ref, watch } from "vue";
import { IBusiness, ICategory } from "../interfaces";

const baseUrl = 'https://heartofkenya.com/TableSearchJson?config=directoryMachakosJson';

export default () => {
  const searchTerm: Ref<string> = ref('');
  const categories: Ref<ICategory[]> = ref([
    { id: 1, name: 'beauty' },
    { id: 2, name: 'bookstore' },
    { id: 3, name: 'general-store' },
    { id: 4, name: 'clothing-store' },
  ]);
  const businesses: Ref<IBusiness[]> = ref([
    {
      "directoryIdx": 4,
      "worldid": "kenyaheart",
      "library": "Machakos",
      "category": "Beauty",
      "title": "Ruth Beauty Parlour",
      "owner": "Bernard",
      "website": "",
      "city": "Machakos",
      "localowned": null,
      "status": "Active",
      "modified": "4/16/2021 11:55:35 PM"
    },
    {
      "directoryIdx": 1,
      "worldid": "kenyaheart",
      "library": "machakos",
      "category": "bookstores",
      "title": "Chap Chap Enterprise",
      "owner": "Richard Wasike",
      "website": null,
      "city": "Machakos",
      "localowned": "true",
      "status": "Active",
      "modified": ""
    }
  ]);
  const hasBusinesses: Ref<boolean> = computed(() => businesses.value.length > 0)

  // Function to query endpoint.
  const getBusinesses = async (term: null | string = null) => {
    // Check if a search term was provided.
    const endpoint = term ? `${baseUrl}&search=${term}` : baseUrl;

    // Launch the request.
    const response = await fetch(endpoint);

    // Check for errors.
    if (!response.ok) {
      throw new Error(`There was an error: ${response.text}`);
    }

    // Get the data from the request.
    businesses.value = await response.json();
  }

  // Watch the search term for changes.
  watch(searchTerm, (newValue) => {
    getBusinesses(newValue);
  });

  // Return the function results.
  return { searchTerm, categories, businesses, hasBusinesses, getBusinesses };
};
