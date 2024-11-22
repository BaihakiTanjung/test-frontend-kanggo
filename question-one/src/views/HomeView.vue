<script setup lang="ts">
import SearchBar from "@/components/SearchBar.vue";
import ProductList from "@/components/ProductList.vue";
import ProductModal from "@/components/ProductModal.vue";
import { PlusIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';
import { useProductStore } from '@/stores/productStore';
import { useProductValidation } from '@/composables/useProductValidation';

components: {
  PlusIcon
}

const productStore = useProductStore();

const isAction = ref(0);
const isModalOpen = ref(false);

const openAddModal = () => {
  productStore.clearProduct();
  productStore.openProductModal();
  // 1 for add
  isAction.value = 1;
}

const handleIsAction = (action: number) => {
  isAction.value = action;
}
</script>

<template>
  <div class="grid grid-cols-1 gap-3">
    <div class="flex flex-col md:flex-row gap-3 justify-center">
      <SearchBar class="col-span-2 w-full md:w-11/12" />
      <button @click="openAddModal" class="btn btn-primary block">
        Tambah
      </button>
    </div>
    <ProductList @isAction="handleIsAction" />
    <ProductModal :is-action="isAction" />
  </div>
</template>
