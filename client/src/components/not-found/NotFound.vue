<script setup>
const images = [
  '/assets/images/404/__4.jpg',
  '/assets/images/404/_0.jpg',
  '/assets/images/404/_4.jpg',
];
</script>

<template>
  <article>
    <section class="top-rated">
      <div class="container">
        <p class="section-subtitle">
          WoW
        </p>
        <h2 class="h2 section-title">
          How, did you get <strong>here ?</strong>
        </h2>
        <ul class="movies-list list-404">
          <li v-for="(image, index) in images" :key="index">
            <div class="movie-card">
              <a href="#">
                <figure class="card-banner">
                  <img :src="image" alt="">
                </figure>
              </a>
            </div>
          </li>
        </ul>
        <div class="details-actions">
          <router-link to="/">
            <button class="btn-404">
              BACK
            </button>
          </router-link>
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped>
@import './NotFound.css';
</style>
