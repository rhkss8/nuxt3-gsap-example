<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';

import transitionConfig from '../helpers/transitionConfig';

const main = ref();
let tl;
let ctx;

definePageMeta({
  pageTransition: transitionConfig,
});

const toggleTimeline = () => {
  tl.reversed(!tl.reversed());
};

onMounted(() => {
  // ctx = gsap.context((self) => {
  //   const boxes = self.selector('.box');
  //   tl = gsap
  //       .timeline()
  //       .to(boxes[0], { x: 120, rotation: 360 })
  //       .to(boxes[1], { x: -120, rotation: -360 }, '<')
  //       .to(boxes[2], { y: -166 })
  //       .reverse();
  // }, main.value); // <- Scope!


  let dots = [],
      bg = document.querySelector("#featureBackground"),
      i, dot;

// create 80 dot elements and put them in an array
  for (i = 0; i < 80; i++) {
    dot = document.createElement("div");
    dot.setAttribute("class", "dot");
    bg.appendChild(dot);
    dots.push(dot);
  }

//set the initial position of all the dots, and pick a random color for each from an array of colors
  gsap.set(dots, {
    backgroundColor: "random([#663399,#84d100,#cc9900,#0066cc,#993333])",
    scale: "random(0.4, 1)",
    x:400,
    y:300
  });

// create the physics2D animation
  let tween = gsap.to(dots, {
    duration: 2.5,
    physics2D: {
      velocity: "random(200, 650)",
      angle: "random(250, 290)",
      gravity: 500
    },
    delay: "random(0, 2.5)"
  });


  GSDevTools.create({
    animation: tween,
    container: "#featureAnimation",
    minimal: true
  });
});

onUnmounted(() => {
  ctx.revert(); // <- Easy Cleanup!
});
</script>

<template>
  <section class="boxes-container" ref="main">
    <div class="feature" id="featureAnimation">
      <div id="featureBackground"></div>
    </div>
  </section>
</template>

<style>
#featureAnimation {
  background-color: #000;
  height: 262px;
  overflow: hidden;
  position: relative;
  width: 800px;
  margin: auto;
}

.dot {
  position: absolute;
  background-color: #91e600;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  will-change: transform;
}
</style>
