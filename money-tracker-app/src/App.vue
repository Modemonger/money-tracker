<script setup>
import Header from "./components/header.vue";

</script>

<template>
  <div class="app">
    <Header />
    <router-view></router-view>
    <div class="lines">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
}
.lines {
    position: absolute;
    top: 75%;
    left: -45%;
    width: 200vw;
    height: 40px;
    margin: 2rem 0 0 1rem;
    transform: rotateZ(45deg);
}
.lines .line {
    height: 5px;
    width: 100%;
    margin: 1rem 0;
    background-color: #dc052c7e;
    display: block;
    border-radius: 5px;
    transition: 0.3s ease;
}
</style>
