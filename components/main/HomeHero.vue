<template>
  <div class="hero-wrapper ">
    <Swiper
      :modules="modules"
      effect="fade"
      :fade-effect="{ crossFade: true }"
      :loop="true"
      :speed="700"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      class="hero-swiper"
    >
      <SwiperSlide v-for="(slide, i) in hero.slides" :key="i">
        <div
          class="hero-slide"
          :style="{ backgroundImage: `url(${slide.image})` }"
        >
          <div class="hero-overlay" />
        </div>
      </SwiperSlide>
    </Swiper>

    <!-- Info Cards — right side, vertically centered -->
    <div class="hero-cards">
      <NuxtLink
        v-for="(btn, i) in hero.buttons"
        :key="i"
        :to="btn.link"
        :target="btn.link.startsWith('tel:') || btn.link.startsWith('mailto:') ? '_self' : undefined"
        class="hero-card"
        :class="`hero-card--${i}`"
      >
        <span class="hero-card__text" v-html="formatText(btn.text)" />
        <span v-if="i === 2" class="hero-card__arrow">›</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import header from "@/data/header.json";

const languageStore = useLanguageStore();
const headerData = computed(() => languageStore.getLocalizedData(header));
const hero = computed(() => headerData.value.hero);

const modules = [Autoplay, EffectFade];

const formatText = (text: string) => text.replace(/\n/g, "<br/>");
</script>

<style lang="scss" scoped>
.hero-wrapper {
  position: relative;
  width: 100%;
  height: 100svh;
  overflow: hidden;
}

.hero-swiper {
  width: 100%;
  height: 100%;

  :deep(.swiper-wrapper),
  :deep(.swiper-slide) {
    height: 100%;
  }
}

.hero-slide {
  position: relative;
  inset: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
}

/* ── Info cards ─────────────────────────────────────── */
.hero-cards {
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
  animation: fadeUp 0.8s ease both;
  animation-delay: 0.4s;
}

.hero-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  min-width: 220px;
  padding: 0.875rem 1.25rem;
  background: rgba(0, 0, 0, 0.72);
  color: #fff;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  line-height: 1.4;
  text-decoration: none;
  transition: background 0.3s ease, transform 0.3s ease;
  animation: fadeUp 0.6s ease both;

  &:nth-child(1) { animation-delay: 0.5s; }
  &:nth-child(2) { animation-delay: 0.65s; }
  &:nth-child(3) { animation-delay: 0.8s; }

  &:hover {
    background: rgba(50, 50, 50, 0.9);
    transform: translateX(-4px);
  }

  &--2 {
    color: #a8d5a2;
  }
}

.hero-card__arrow {
  font-size: 1.4rem;
  line-height: 1;
  color: #a8d5a2;
}

/* ── Animations ─────────────────────────────────────── */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Responsive ─────────────────────────────────────── */
@media (max-width: 1023px) {
  .hero-wrapper {
    height: 60vw;
    min-height: 300px;
  }

  .hero-cards {
    right: 1rem;
    gap: 0.375rem;
  }

  .hero-card {
    min-width: 180px;
    font-size: 0.8rem;
    padding: 0.625rem 0.875rem;
  }
}

@media (max-width: 639px) {
  .hero-wrapper {
    height: 75vw;
    min-height: 260px;
  }

  .hero-cards {
    right: 50%;
    transform: translate(50%, -50%);
    align-items: center;
    width: calc(100% - 2rem);
  }

  .hero-card {
    width: 100%;
    min-width: unset;
    justify-content: center;
    text-align: center;

    &:hover {
      transform: none;
    }
  }
}
</style>
