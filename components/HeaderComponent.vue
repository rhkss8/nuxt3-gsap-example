<template>
  <header className="header">
    <a
        className="brand"
        href="https://greensock.com/scrolltrigger"
        target="_blank"
        rel="noreferrer"
    >
      <img
          className="greensock-icon"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/scroll-trigger-logo-light.svg"
          width="200"
          height="64"
          alt="ScrollTrigger"
      />
    </a>
    <nav>
      <ul>
        <li>
          <NuxtLink to="/">home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/box">Boxes</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/scroll">ScrollTrigger</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/layers">Layers Section</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/physics">Physics</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script setup lang="ts">
</script>
