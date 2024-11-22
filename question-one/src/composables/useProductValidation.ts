import { ref, computed } from "vue";
import type { Product } from "@/types/product";

export function useProductValidation() {
  const errors = ref<Record<keyof Partial<Product>, string>>({
    name: "",
    price: "",
    description: "",
    id: "",
    image: "",
  });

  const isError = computed(() =>
    Object.values(errors.value).some((error) => error !== "")
  );

  const validate = (product: Partial<Product>) => {
    errors.value = { name: "", price: "", description: "", id: "", image: "" };

    if (!product.name || product.name.trim() === "") {
      errors.value.name = "Nama produk harus diisi.";
    }

    if (!product.price || product.price.toString().trim() === "") {
      errors.value.price = "Harga produk harus diisi.";
    } else if (isNaN(Number(product.price))) {
      errors.value.price = "Harga produk harus berupa angka.";
    }

    if (!product.description || product.description.trim() === "") {
      errors.value.description = "Deskripsi produk harus diisi.";
    }
  };

  const resetValidation = () => {
    errors.value = { name: "", price: "", description: "", id: "", image: "" };
  };

  return {
    errors,
    isError,
    validate,
    resetValidation,
  };
}
