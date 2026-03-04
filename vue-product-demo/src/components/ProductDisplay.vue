<template>
  <p>Shipping: {{ premium ? 'Free' : '$2.99' }}</p>
  <p>Cart: {{ cart }}</p>

  <button :disabled="inventory == 0" @click="addToCart">Add to Cart</button>
  <button :disabled="cart == 0" @click="removeFromCart">Remove from Cart</button>
  <button @click="resetCart">Reset Cart</button>
</template>

<script setup>
defineProps({
  premium: Boolean,
  cart: Number
})

const emit = defineEmits(['add-to-cart', 'remove-from-cart'])
function addToCart(id) {
  emit('add-to-cart', id)
}
function removeFromCart(id) {
  emit('remove-from-cart', id)
}
function resetCart(id) {
  emit('reset-cart', id)
}
</script setup>