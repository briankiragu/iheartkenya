/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { computed, Ref, ref } from "vue";
import { IBusiness, IBusinessForm, ICategory, IPaginatedResponse } from "../interfaces";

const baseUrl = 'https://heartofkenya.com/TableSearchJson?config=directoryMachakosJson';

export default () => {
  const searchTerm: Ref<string> = ref('');
  const filterTerm: Ref<string> = ref('');
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


  /**
   * Function to query endpoint.
   *
   * @param page {number} The page number.
   * @param term {null | string} The search term
   * @returns Promise<IBusiness[]>
   * @author Brian K. Kiragu <bkariuki@hotmail.com>
   */
  const getBusinesses = async (
    page: number = 1,
    term: null | string = null
  ): Promise<IPaginatedResponse> => {
    // Check if a search term was provided.
    const endpoint = term ? `${baseUrl}&page=${page}&search=${term}` : baseUrl;

    // Launch the request.
    const response = await fetch(endpoint);

    // Check for errors.
    if (!response.ok) {
      throw new Error(`There was an error ${response.statusText}`);
    }

    // Get the data from the request.
    return response.json();
  }

  /**
   * Update a business
   *
   * @param data {IBusinessForm} User input data
   * @author Brian K. Kiragu <bkariuki@hotmail.com>
   */
  const updateBusiness = async (data: IBusinessForm): Promise<void> => {
    // Launch the request.
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Check for errors.
    if (!response.ok) {
      throw new Error(`There was an error ${response.statusText}`);
    }

    // Get the data from the request.
    return response.json();
  }

  // Return the function results.
  return {
    searchTerm,
    filterTerm,
    categories,
    businesses,
    hasBusinesses,
    getBusinesses,
    updateBusiness
  };
};
