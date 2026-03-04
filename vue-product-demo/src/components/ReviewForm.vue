<template>
  <form @submit.prevent="onSubmit">
    <h3>Leave a Review</h3>
    <label for="name">Name:</label>
    <input id="name" v-model="name" />

    <label for="review">Review:</label>
    <textarea id="review" v-model="review"></textarea>

    <label for="rating">Rating:</label>
    <select id="rating" v-model="rating">
      <option disabled value="">Select Rating</option>
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>

    <br />
    <label>Would you recommend?</label>
    <label>
      <input type="radio" value="Yes" v-model="recommend" />
      Yes
    </label>
    <label>
      <input type="radio" value="No" v-model="recommend" />
      No
    </label>

    <br />
    <button type="submit">Submit</button>
  </form>
</template>


<script setup>
import { ref } from 'vue'

const emit = defineEmits(['review-submitted'])

const name = ref('')
const review = ref('')
const rating = ref(null)
const recommend = ref(null)

function onSubmit() {
  if (!name.value || !review.value || !rating.value) {
    alert('Complete all fields')
    return
  }

  emit('review-submitted', {
    name: name.value,
    review: review.value,
    rating: rating.value,
    recommend: recommend.value
  })

  name.value = ''
  review.value = ''
  rating.value = null
  recommend.value = null
}
</script>
