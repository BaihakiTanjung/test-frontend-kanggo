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
const deleteProduct = (productId) => {
    idDelete.value = productId;
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
    <div class="grid lg:grid-cols-3 gap-5">
        <div v-for="product in productStore.products" :key="product.id">
            <div class="card bg-base-100 shadow-xl ">
                <figure class="md:h-[300px] w-full">
                    <img v-if="product.image" :src="product.image" alt="Shoes"
                        class="rounded-xl object-cover w-full hover:scale-105 transition" />
                    <img v-else src="https://via.placeholder.com/800" alt="Shoes" />
                </figure>
                <div class="card-body -mt-5">
                    <div class="flex justify-between align-middle content-center">
                        <h2 class="card-title my-auto">{{ truncateText(product.name, 20) }}</h2>
                        <div>
                            <p class="font-extrabold text-2xl">{{ currency(product.price) }}</p>
                        </div>
                    </div>
                    <p>{{ truncateText(product.description, 100) }}</p>
                    <div class="card-actions">
                        <button @click="openEditModal(product.id)" class="btn btn-primary">Edit</button>
                        <button @click="deleteProduct(product.id)" class="btn btn-error text-white">Hapus</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <TransitionRoot :show="confirmationModal">
        <Dialog as="div" class="fixed inset-0 z-10 overflow-y-auto" onClose={closeConfirmationModal}>
            <DialogPanel class="fixed inset-0 flex items-center justify-center">
                <TransitionChild enter="transition ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                    leave="transition ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">

                    <DialogDescription class="bg-white p-6 rounded-xl shadow-xl w-full max-w-xl">
                        <div class="flex">
                            <DialogTitle class="flex-grow text-xl font-bold my-auto">
                                Hapus Produk
                            </DialogTitle>
                            <button type="button" @click="closeConfirmationModal" class="btn btn-ghost">
                                <XMarkIcon class="h-5 w-5" />
                            </button>
                        </div>

                        <hr>

                        <h3 class="text-lg font-bold my-5">Apakah kamu yakin akan menghapus produk ini?</h3>

                        <div class="flex gap-3 mt-4 justify-end">
                            <button @click="closeConfirmationModal" class="btn btn-primary">No</button>
                            <button @click="deleteProductConfirmation" class="btn btn-error text-white">Yes</button>
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