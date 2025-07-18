<script setup lang="ts">

</script>

<template>
  <main>
    <div class="container-title">
      <h1>Jokes For You</h1>
      <h3>The Greatest* Joke Company Around</h3>
    </div>
    <div class="container">
        <Transition name="fade" :duration="400" appear>
          <div class="container-overview">
            <div clas="container-summary">
              <h2>What we do:</h2>
              <p>Jokes For You is a technology company that provides jokeservices. It offers Shitty Jokes On Demand (SJOD), andhonestly, not much else. For more information, go away.</p>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem odio perspiciatis nisi amet voluptatem labore corporis eum veritatis eius, accusamus consequuntur possimus expedita aperiam impedit blanditiis fuga voluptatibus temporibus rem.</p>
            </div>
            <div>
              <h2>More Nonsense:</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero maxime a voluptates possimus rem soluta, inventore, consequatur enim eius, ducimus odit quas. Accusantium, atque cupiditate molestiae sequi ab facere excepturi?</p>
            </div>
          </div>
        </Transition>
          <div class="container-reviews">
            <Transition name="fade" :duration="100" appear>
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
            </Transition>
            <Transition name="fade" :duration="500" appear>
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
            </Transition>
            <Transition name="fade" :duration="2200" appear>
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
            </Transition>
          </div>
    </div>
  </main>
  
</template>

<style scoped>
main {
  align-content: center;
}

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
  justify-self: center;
  padding: 10px;
  margin: 10px;
  max-width: 1280px;
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

@media screen and (max-width: 1024px) {
  .container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

</style>
