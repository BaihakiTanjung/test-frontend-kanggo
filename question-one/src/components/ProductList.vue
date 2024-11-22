<script setup>
import { useProductStore } from '@/stores/productStore';
import currency from "@/utils/currency";
import { ref, computed } from 'vue';
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogDescription,
    DialogTitle,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/solid';

components: {
    XMarkIcon
}

const productStore = useProductStore();

const emit = defineEmits(["isAction"]);

const isAction = ref("");
const openEditModal = (id) => {
    productStore.openProductModal();
    // 2 for edit
    isAction.value = 2;
    emit("isAction", isAction.value);
    productStore.setProduct(id);
}

const idDelete = ref("");
const nameDelete = ref("");
const deleteProduct = (productId, productName) => {
    idDelete.value = productId;
    nameDelete.value = productName;
    openConfirmationModal();
}


const truncateText = computed(() => {
    return (text, length) => {
        return text.length > length ? text.slice(0, length) + "..." : text;
    }
})

const confirmationModal = ref(false);

const openConfirmationModal = () => {
    confirmationModal.value = true;
}

const closeConfirmationModal = () => {
    confirmationModal.value = false;
}

const deleteProductConfirmation = () => {
    productStore.removeProduct(idDelete.value);
    closeConfirmationModal();
}
</script>

<template>
    <div v-if="productStore.products.length > 0" class="grid gap-5 lg:grid-cols-3">
        <div v-for="product in productStore.products" :key="product.id">
            <div class="shadow-xl card bg-base-100 ">
                <figure class="md:h-[300px] w-full">
                    <img v-if="product.image" :src="product.image" alt="Shoes"
                        class="object-cover w-full transition rounded-xl hover:scale-105" />
                    <img v-else src="https://via.placeholder.com/800" alt="Shoes" />
                </figure>
                <div class="-mt-5 card-body">
                    <div class="flex content-center justify-between align-middle">
                        <h2 class="my-auto card-title">{{ truncateText(product.name, 20) }}</h2>
                        <div>
                            <p class="text-2xl font-extrabold text-primary">{{ currency(product.price) }}</p>
                        </div>
                    </div>
                    <p>{{ truncateText(product.description, 100) }}</p>
                    <div class="card-actions">
                        <button @click="openEditModal(product.id)" class="btn btn-primary">Edit</button>
                        <button @click="deleteProduct(product.id, product.name)"
                            class="text-white btn btn-error">Hapus</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="flex items-center justify-center">
            <p class="mt-10 text-2xl">Tidak ada produk</p>
        </div>
    </div>


    <TransitionRoot :show="confirmationModal">
        <Dialog as="div" class="fixed inset-0 z-10 overflow-y-auto" onClose={closeConfirmationModal}>
            <DialogPanel class="fixed inset-0 flex items-center justify-center">
                <TransitionChild enter="transition ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                    leave="transition ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">

                    <DialogDescription class="w-full max-w-xl p-6 bg-white shadow-xl rounded-xl">
                        <div class="flex">
                            <DialogTitle class="flex-grow my-auto text-xl font-bold">
                                Hapus Produk
                            </DialogTitle>
                            <button type="button" @click="closeConfirmationModal" class="btn btn-ghost">
                                <XMarkIcon class="w-5 h-5" />
                            </button>
                        </div>

                        <hr>

                        <h3 class="my-5 text-lg">Apakah kamu yakin akan menghapus produk <span class="font-bold">{{
                            nameDelete }}</span>?
                        </h3>

                        <div class="flex justify-end gap-3 mt-4">
                            <button @click="closeConfirmationModal" class="btn btn-primary">No</button>
                            <button @click="deleteProductConfirmation" class="text-white btn btn-error">Yes</button>
                        </div>
                    </DialogDescription>
                </TransitionChild>
            </DialogPanel>
        </Dialog>

        <TransitionChild enter="transition ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
            leave="transition ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>
    </TransitionRoot>

</template>