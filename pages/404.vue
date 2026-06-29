<template>
  <div class="relative py-10 text-center">
    <div class="container">
      <div class="w-full h-full flex flex-col justify-center items-center">
        <img
          src="/images/404.png"
          alt="alt 404"
          class="max-w-[744px] w-full h-full object-cover"
        />
      </div>
      <h4 class="text-[#2F80ED] font-medium lg:text-[48px] text-[32px] leading-[60px] mt-4">Page Not Found</h4>
      <p class="my-4 text-center lg:text-[20px] text-[18px] text-[#333333]">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <NuxtLink
        to="/"
        class="lg:text-[20px] text-[18px] text-[#2F80ED] bg-[#EBF5FF] text-center mt-6 py-[7px] px-[15px] hover:!text-[#ffffff] hover:bg-[#2F80ED] transition-all duration-300 rounded-lg"
      >
        Go Back
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.push('/')
  }, 5000) 
})
</script>
