<template>
  <header>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>

    <p v-if="inventory > 10">In Stock</p>
    <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
    <p v-else>Out of Stock</p>
    <p v-show="onSale">{{ sale }}</p>
  </header>

  <div class="product-image">
    <img :src="image" :alt="product" :title="product" width="250"
      :class="{ 'out-of-stock-img': inventory==0 }"/>
  </div>

  <div>
    <button @click="switchToBlue()">Switch to Blue Socks</button>
    <button @click="switchToGreen()">Switch to Green Socks</button>
    <button @click="product = 'Boots'">Switch to Boots</button>
    <button @click="product = 'Socks'">Switch to Socks</button>
  </div>

  <div>
    <ProductDetails :details="details" :variants="variants" :sizes="sizes"/>
  </div>

  <div>
    <ProductDisplay 
      :premium="premium" :cart="cart"
      @add-to-cart="addToCart"
      @remove-from-cart="removeFromCart"
      @reset-cart="resetCart"/>
    
    <br />
    <a :href="url" target="_blank" rel="noopener">Open product link</a>
  </div>

  <div>
    <ReviewForm @review-submitted="addReview" />
    <h3>Reviews</h3>
    <ul>
      <li v-for="r in reviews">
        <p>{{ r.name }}</p>
        <p>{{ r.review }}</p>
        <p>{{ r.rating }}</p>
        <p>{{ r.recommend }}</p>
        <p>---</p>
      </li>
    </ul>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import socksGreen from './assets/images/socks_green.jpg'
import socksBlue from './assets/images/socks_blue.jpg'
import ProductDisplay from './components/ProductDisplay.vue'
import ProductDetails from './components/ProductDetails.vue'
import ReviewForm from './components/ReviewForm.vue'

const brand = ref('Vue Mastery')
const product = ref('Socks')
const description = computed(() => {
  return 'Warm, comfortable ' + product.value + ' for everyday wear.'
})
const title = computed(() => {
  return brand.value + ' ' + product.value
})

const image = ref(socksGreen)
const url = ref('https://en.wikipedia.org/wiki/Sock')
function switchToBlue() {
  image.value = socksBlue
}
function switchToGreen() {
  image.value = socksGreen
}
function updateImage(variantImage) {
  image.value = variantImage
}

const inventory = ref(0)
const onSale = ref(true)
const sale = computed(() => {
  return brand.value + ' ' + product.value + ' are on sale'
})

const details = ref(['50% cotton', '30% wool', '20% polyester'])
const variants = ref([
  { id: 2234, color: 'green', image: socksGreen },
  { id: 2235, color: 'blue', image: socksBlue }
])
const sizes = ref(['S', 'M', 'L', 'XL'])

const cart = ref(0)
const premium = ref(true)
function addToCart() {
  cart.value++
}
function removeFromCart() {
  cart.value--
}
function resetCart() {
  cart.value = 0
}

const reviews = ref([])
function addReview(review) {
  reviews.value.push(review)
}
</script>
