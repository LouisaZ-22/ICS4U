<template>
  <div>
    <h1>{{ product }}</h1>
    <p>{{ description }}</p>

    <p v-if="inventory > 10">In Stock</p>
    <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
    <p v-else>Out of Stock</p>
    <p v-show="onSale">On Sale</p>

    <div class="product-image">
      <img :src="image" :alt="product" :title="product" width="250" />
    </div>

    <h3>Materials</h3>
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>

    <h3>Variant Colors</h3>
    <ul>
      <li v-for="variant in variants" :key="variant.id">{{ variant.color }}</li>
    </ul>

    <h3>Sizes</h3>
    <ul>
      <li v-for="size in sizes" :key="size">{{ size }}</li>
    </ul>

    <button @click="switchToBlue()">Switch to Blue Socks</button>
    <button @click="switchToGreen()">Switch to Green Socks</button>
    <button @click="product = 'Boots', description = 'Warm, comfortable boots for everyday wear.'">Switch to Boots</button>
    <button @click="product = 'Socks', description = 'Warm, comfortable socks for everyday wear.'">Switch to Socks</button>
  </div>

  <a :href="url" target="_blank" rel="noopener">Open product link</a>
</template>


<script setup>
import { ref } from 'vue'
import socksGreen from './assets/images/socks_green.jpg'
import socksBlue from './assets/images/socks_blue.jpg'

const product = ref('Socks')
const description = ref('Warm, comfortable socks for everyday wear.')

const image = ref(socksGreen)
const url = ref('https://en.wikipedia.org/wiki/Sock')
const inventory = ref(4)
const onSale = ref(true)

const details = ref(['50% cotton', '30% wool', '20% polyester'])
const variants = ref([
  { id: 2234, color: 'green' },
  { id: 2235, color: 'blue' }
])
const sizes = ref(['S', 'M', 'L', 'XL'])

function switchToBlue() {
  image.value = socksBlue
}
function switchToGreen() {
  image.value = socksGreen
}
</script>
