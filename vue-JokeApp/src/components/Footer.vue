<script setup lang="ts">

</script>

<template>

    <footer>
        <div class="container">
            <h2>Jokes For You</h2>
            <div class="container-info">
                <a>Contact</a>
                <a>Complaint</a>
                <a>Information</a>
            </div>
            <p class="copyright">© 2025 Shitty Joke Stealer. All rights reserved.</p>
        </div>
    </footer>

</template>

<style scoped>

.container {
    display: block;
    margin-top: 60px;
    padding: 20px;
    background-color: color-mix(in srgb, var(--primary), var(--background) 70%);
}

h2, a {
    background-color: transparent;
    text-align: center;
}

.copyright {
    background-color: transparent;
    color: var(--subtext);
    font-size: .8rem;
    text-align: center;
    padding-top: 10px;
}

.container-info {
    background-color: transparent;
    color: color-mix(in srgb, var(--text), transparent 20%);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px;
}

a {
    cursor: pointer;
    transition: color 0.2s ease-in-out;
}

a:hover {
    color: color-mix(in srgb, var(--favourite), transparent 20%);
    transition: color 0.2s ease-in-out;
}

</style>