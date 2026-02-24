<template>
  <header>
    <h1>{{ product }}</h1>
    <p>{{ description }}</p>

    <p v-if="inventory > 10">In Stock</p>
    <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
    <p v-else>Out of Stock</p>
    <p v-show="onSale">On Sale</p>
  </header>

  <div class="product-image">
    <img :src="image" :alt="product" :title="product" width="250"
      :class="{ 'out-of-stock-img': inventory==0 }"/>
  </div>

  <div>
    <button @click="switchToBlue()">Switch to Blue Socks</button>
    <button @click="switchToGreen()">Switch to Green Socks</button>
    <button @click="product = 'Boots', description = 'Warm, comfortable boots for everyday wear.'">Switch to Boots</button>
    <button @click="product = 'Socks', description = 'Warm, comfortable socks for everyday wear.'">Switch to Socks</button>
  </div>

  <div>
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
  </div>

  <div>
    <p>Cart: {{ cart }}</p>

    <button :disabled="inventory == 0" @click="cart += 1">Add to Cart</button>
    <button :disabled="cart == 0" @click="cart -= 1">Remove from Cart</button>
    <button @click="cart = 0">Reset Cart</button>
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
const inventory = ref(0)
const onSale = ref(true)

const details = ref(['50% cotton', '30% wool', '20% polyester'])
const variants = ref([
  { id: 2234, color: 'green', image: socksGreen },
  { id: 2235, color: 'blue', image: socksBlue }
])
const sizes = ref(['S', 'M', 'L', 'XL'])

const cart = ref(0)

function switchToBlue() {
  image.value = socksBlue
}
function switchToGreen() {
  image.value = socksGreen
}
function updateImage(variantImage) {
  image.value = variantImage
}


</script>
