<script setup lang="ts">

</script>

<template>
    <div class="container-title">
        <h1>About</h1>
        <h3>Nosey, aren't ya?</h3>
    </div>
    <div class="container">
        <Transition name="fade" appear>      
        <div class="container-blurb">
            <div class="container-info">
                <div class="container-text">
                    <h2>Shitty Joke Stealer Inc.</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias magni nemo quo quidem voluptate ducimus, voluptatem ea nihil maxime vero. Est eaque, vitae neque a et impedit blanditiis quo autem?</p>       
                    <p>Tenetur labore unde quos? Impedit neque laudantium placeat qui debitis hic accusamus delectus adipisci magni, expedita ducimus reiciendis quam error eaque sit.</p>
                </div>
                <div class="container-img">
                    <img src="/random-building-asheville-north-carolina-usa-taken-december-65696557.webp">
                </div>
            </div>
            <div class="container-info">
                <div class="container-text">
                    <h2>Founder</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, aspernatur eveniet! Labore nulla sequi repellendus temporibus quo placeat maxime. Rerum accusamus blanditiis similique, inventore porro commodi quasi! Voluptatibus, omnis veritatis?</p>
                </div>
                <div class="container-img">
                    <img src="/2586271584_c1ccd73115_z.jpg" >
                </div>
            </div>    
        </div>
        </Transition>  
    </div>
</template>

<style scoped>

.container {
    display: flex;
    flex-direction: column;
    justify-self: center;
    padding: 20px;
    margin: 10px;
    max-width: 1280px;
}

.container-blurb {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 30px;
}

.container-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
}

.container-text {
    padding: 10px;
}

.container-img {
    width: 300px;
    height: 300px;
    min-width: 300px;
}

img {
    display: block;
    position: absolute;
    width: 300px;
    height: 300px;
}

p {
  text-align: left;
}

@media screen and (max-width: 1024px) {
  .container-info {
    flex-wrap: wrap;
    justify-content: center;
  }
}

</style>