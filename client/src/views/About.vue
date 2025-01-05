<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <article>
        <section class="movie-detail">
            <p class="section-subtitle">
                {{ t('about.title') }}
            </p>
            <img src="/assets/images/theatrix.svg" alt="theatrix-logo">
            <h2 class="h2 section-title">
                Theater & Music <strong>Performances</strong>
            </h2>


            <div class="about-page">
                <section class="about-content">
                    <div class="container">
                        <h2>Who We Are</h2>
                        <p>
                            Theatrix is your ultimate event and concert app, designed to bring people closer to the
                            magic of live performances. Whether you’re a fan of music, theater, or cultural festivals,
                            we ensure you’re always in the front row of excitement.
                        </p>

                        <h2>What We Offer</h2>
                        <ul>
                            <li>Discover upcoming theater and concert events across multiple cities and countries.</li>
                            <li>Seamless ticket booking experience.</li>
                            <li>Personalized event recommendations based on your current location.</li>
                            <li>Add to favorites, check your purchase history.</li>
                            <li>Send your favourite events quickly on your mobile by just scanning our event qr code links.</li>
                        </ul>

                        <h2>Our Mission</h2>
                        <p>
                            At Theatrix, we believe in the power of live entertainment to inspire and connect people.
                            Our mission is to create a platform that brings fans closer to their favorite artists and
                            experiences.
                        </p>

                        <h2>Contact Us</h2>
                        <p>
                            Have questions or need assistance? Reach out to our support team at <a
                                href="mailto:support@theatrix.com">support@theatrix.com</a> or write us directly using our contacts form (no need to register!). We’ll be glad to help!
                        </p>
                    </div>
                </section>
            </div>



        </section>
    </article>
</template>


<style scoped>
@import './auth/Auth.css';

img {
    display: block;
    margin: 0 auto;
}
.about-page {
    font-family: Arial, sans-serif;

}
.about-content {
    padding: 2rem 0;
}
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
}
h2 {
    font-size: 1.75rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
}
ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
}

ul li {
    margin-bottom: 0.5rem;
}

a {
    color: var(--app-main-color);
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>
