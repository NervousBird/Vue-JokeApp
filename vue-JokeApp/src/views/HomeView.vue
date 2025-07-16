<script setup lang="ts">

</script>

<template>
  <main>
    <div class="container-title">
      <h1>Jokes For You</h1>
    </div>
    <div class="container">
        <div class="container-overview">
          <div clas="container-summary">
            <h2>What we do:</h2>
            <p>Jokes For You is a technology company that provides jokeservices. It offers Shitty Jokes On Demand (SJOC), andhonestly, not much else. For more information, go away.</p>
          </div>
          <div>
            <h2>More Nonsense:</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero maxime a voluptates possimus rem soluta, inventore, consequatur enim eius, ducimus odit quas. Accusantium, atque cupiditate molestiae sequi ab facere excepturi?</p>
          </div>
        </div>
          <div class="container-reviews">
            <div class="container-review">
              <div class="container-rating">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
              </div>
              <p class="review">Soooo funny, I almost died.</p>
              <p class="company">- FunnyCompany.com</p>
            </div>
            <div class="container-review">
              <div class="container-rating">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
              </div>
              <p class="review">Had the best laugh ever.</p>
              <p class="company">- WeHateComedy.org</p>
            </div>
            <div class="container-review">
              <div class="container-rating">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
              </div>
              <p class="review">I got paid to give it 5 stars</p>
              <p class="company">- PayUsForReviews.com</p>
            </div>
          </div>
    </div>
  </main>
  
</template>

<style scoped>

.container-review {
  display: block;
  width: 100%;
  max-width: 300px;
}
.bi-star-fill {
  color: var(--judgement);
}
.company {
  text-align: right;
  font-size: .8rem;
  color: var(--subtext);
}

.container {
  display: grid;
  grid-template-columns: 1fr .5fr;
  padding: 20px;
  margin: 10px;
  margin-left: 3vw;
  margin-right: 3vw;
  gap: 30px;
}

.container-overview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 10px;
  gap: 40px;
}

p {
  text-align: left;
}

.container-reviews {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  gap: 60px;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 1s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

</style>
