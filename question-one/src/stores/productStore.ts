import type { Product } from "@/types/product";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import data from "@/json/products.json";
import debounce from "@/utils/debounce";
import { useProductValidation } from "@/composables/useProductValidation";

export const useProductStore = defineStore("products", () => {
  const isProductModal = ref<boolean>(false);

  const openProductModal = () => {
    isProductModal.value = true;
  };

  const closeProductModal = () => {
    isProductModal.value = false;
  };

  const products = ref<Product[]>([]);
  products.value = data;

  const addProduct = (product: Product) => {
    products.value.push(product);
  };

  const editProduct = (product: Product) => {
    const index = products.value.findIndex((p) => p.id === product.id);
    products.value[index] = product;
  };

  const removeProduct = (productId: number) => {
    const index = products.value.findIndex(
      (product) => product.id === productId
    );

    products.value.splice(index, 1);
  };

  const product = ref<Product | null>(null);

  const setProduct = (productId: number) => {
    const index = products.value.findIndex(
      (product) => product.id === productId
    );
    product.value = products.value[index];
  };

  const clearProduct = () => {
    product.value = {
      id: 0,
      name: "",
      price: 0,
      description: "",
      image: "",
    };
  };

  const searchTerm = ref<string>("");

  const searchProduct = debounce((term: string) => {
    searchTerm.value = term;
  }, 300);

  watch(searchTerm, (term) => {
    if (!term) {
      return (products.value = data);
    }

    products.value = data.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
  });

  return {
    products,
    searchTerm,
    addProduct,
    removeProduct,
    searchProduct,
    isProductModal,
    openProductModal,
    closeProductModal,
    product,
    setProduct,
    clearProduct,
    editProduct,
  };
});
