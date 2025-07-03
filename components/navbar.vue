<template>
  <div class="sticky top-0 z-50 bg-white border-b-1 border-gray">
    <nav class="container mx-auto px-6 py-4 flex items-center justify-between">
      <NuxtLink
        to="/posts"
        class="text-xl text-teal-400 font-bold hover:text-primary transition-colors"
      >
        Posts
      </NuxtLink>

      <div class="hidden md:flex space-x-6 items-center">
        <NuxtLink
          to="/"
          class="text-gray-600 hover:text-primary transition-colors"
          active-class="text-primary font-semibold"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/dashboard"
          class="text-gray-600 hover:text-primary transition-colors"
          active-class="text-primary font-semibold"
        >
          Dashboard
        </NuxtLink>
      </div>

      <div class="md:hidden">
        <button class="text-gray-800 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  </div>
</template>
