<template>
  <h3>Materials</h3>
  <ul>
    <li v-for="detail in details">{{ detail }}</li>
  </ul>

  <h3>Variant Colors</h3>
  <ul>
    <li 
      v-for="variant in variants" 
      :key="variant.id"
      :title="variant.color"
      class="color-circle active"
      @mouseover="updateImage(variant.image)"
      :style="{ backgroundColor: variant.color }">
    </li>
  </ul>

  <h3>Sizes</h3>
  <ul>
    <li v-for="size in sizes" :key="size">{{ size }}</li>
  </ul>
</template>

<script setup>
defineProps({
  details: Array,
  variants: Array,
  sizes: Array
})
</script setup>