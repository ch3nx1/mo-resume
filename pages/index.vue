<script setup lang="ts"></script>

<template>
  <AppHeader>
    <template #right>
      <nuxt-link class="btn btn-primary btn-outline normal-case text-base" to="/main">
        {{ $t('getStarted') }}
      </nuxt-link>
    </template>
  </AppHeader>
  <div class="container mx-auto px-6 pt-16">
    <div class="columns-2">
      <div class="flex flex-col overflow-hidden py-64 justify-center items-start">
        <h1 class="text-5xl mb-3">
          {{ $t('slogan') }}
        </h1>
        <h2 class="mb-8 p-1">
          {{ $t('description') }}
        </h2>
        <button class="btn btn-primary normal-case btn-xs sm:btn-sm md:btn-md lg:btn-lg">
          {{ $t('createResume') }}
        </button>
      </div>
      <img src="../assets/images/homepage.webp">
    </div>
  </div>
</template>
