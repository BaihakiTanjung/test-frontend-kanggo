<template>
    <TransitionRoot appear :show="productStore.isProductModal" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <form @submit.prevent="handleSubmit">
                            <DialogPanel
                                class="sm:w-[500px] w-[300px] max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div class="grid gap-1">
                                    <div class="flex">
                                        <DialogTitle class="flex-grow text-xl font-bold my-auto">{{ isAction == 1 ?
                                            "Tambah"
                                            : "Edit" }} Produk
                                        </DialogTitle>
                                        <button type="button" @click="closeModal" class="btn btn-ghost">
                                            <XMarkIcon class="h-5 w-5" />
                                        </button>
                                    </div>
                                    <div class="form-control">
                                        <div class="label">
                                            <span class="label-text">Nama</span>
                                        </div>
                                        <input v-model="productForm.name" class="input input-bordered w-full"
                                            placeholder="Nama Produk" :class="{ 'border-error': errors?.name }" />

                                        <p v-if="errors?.name" class="text-red-500 text-xs">{{
                                            errors?.name }}
                                        </p>
                                    </div>

                                    <div class="form-control">
                                        <div class="label">
                                            <span class="label-text">Harga</span>
                                        </div>
                                        <input v-model="productForm.price" class="input input-bordered w-full"
                                            placeholder="Harga Produk" :class="{ 'border-error': errors?.price }" />

                                        <p v-if="errors?.price" class="text-red-500 text-xs">{{
                                            errors?.price }}
                                        </p>
                                    </div>
                                    <div class="form-control">
                                        <div class="label">
                                            <span class="label-text">Deskripsi</span>
                                        </div>
                                        <textarea v-model="productForm.description"
                                            class="textarea textarea-bordered w-full" placeholder="Deskripsi Produk"
                                            :class="{ 'border-error': errors?.description }"></textarea>

                                        <p v-if="errors?.description" class="text-red-500 text-xs">{{
                                            errors?.description }}
                                        </p>
                                    </div>
                                    <div class="form-control">
                                        <div class="label">
                                            <span class="label-text">Gambar</span>
                                        </div>
                                        <input v-model="productForm.image" class="input input-bordered w-full"
                                            placeholder="URL Gambar Produk" />
                                    </div>

                                    <div v-if="isAction != 1">
                                        <p>Image Preview : </p>
                                        <div class="flex justify-center h-[400px]">
                                            <img :src="imagePreview" alt="preview" class="w-full object-cover"
                                                loading="lazy" />
                                        </div>
                                    </div>

                                    <button type="submit" class="btn btn-primary mt-2">{{ isAction != 1 ? 'Edit' :
                                        'Simpan'
                                        }}</button>
                                </div>
                            </DialogPanel>
                        </form>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'
import { defineProps, ref, reactive, defineEmits, watch, computed } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { useProductStore } from '@/stores/productStore';
import { useProductValidation } from '@/composables/useProductValidation';

components: {
    XMarkIcon
}

const props = defineProps({
    isAction: [Number, String]
})

const productStore = useProductStore()

const productForm = reactive({
    id: "",
    name: '',
    price: "",
    description: '',
    image: '',
})

const clearProductForm = () => {
    productForm.id = ''
    productForm.name = ''
    productForm.price = 0
    productForm.description = ''
    productForm.image = ''
}

const imagePreview = ref('')
watch(() => productStore.product, (product) => {
    clearProductForm()

    if (product) {
        productForm.id = product?.id || ''
        productForm.name = product?.name || ''
        productForm.price = product?.price || ""
        productForm.description = product?.description || ''
        productForm.image = product?.image || ''
        imagePreview.value = product?.image || ''
    }
}, { immediate: true, deep: true })

const closeModal = () => {
    productStore.closeProductModal()
}

const { errors, isError, validate, resetValidation } = useProductValidation();

const handleSubmit = () => {
    validate(productForm);

    watch(() => productForm, (productForm) => {
        validate(productForm)
    }, { deep: true, immediate: true })

    if (isError.value) return

    if (props.isAction == 1) {
        const AddProduct = {
            id: Math.floor(Math.random() * 1000),
            name: productForm.name,
            price: productForm.price,
            description: productForm.description,
            image: productForm.image
        }

        productStore.addProduct(AddProduct)
    } else {
        const editProduct = {
            id: productForm.id,
            name: productForm.name,
            price: productForm.price,
            description: productForm.description,
            image: productForm.image
        }

        productStore.editProduct(editProduct)
    }
    closeModal()
}

</script>