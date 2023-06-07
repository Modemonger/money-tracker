<script>
import { defineComponent } from "vue"
import { useNotesStore } from "../stores/notesStore";
import { useSessionStore } from "../stores/sessionStore";

export default defineComponent({
    data: () => ({
        active: false,
        sessionStore: useSessionStore(),
    }),
    methods: {
        menuOnClick() {
            this.active = !this.active;
        },
        logout() {
          this.sessionStore.clearLocal();
        }
    },
    mounted() {
        useNotesStore().getFromDB();
    },
})
</script>

<template>
    <div id="menu">
        <div id="menu-bar" :class="active ? 'change' : 'menu-bar'" @click="menuOnClick()">
            <div id="bar1" class="bar"></div>
            <div id="bar2" class="bar"></div>
            <div id="bar3" class="bar"></div>
        </div>
        <nav id="nav" :class="active ? 'change' : 'nav'">
            <ul>
                <li><router-link to="/add-note">Add a note</router-link></li>
                <li><router-link to="/listing">Your notes</router-link></li>
                <li><router-link to="/analytics">Your analytics</router-link></li>
                <li><router-link to="/profile">Your profile</router-link></li>
                <li @click="logout"><a href="/login">Logout</a></li>
            </ul>
        </nav> 
    </div>

    <div id="menu-bg" class="menu-bg" :class="active ? 'change-bg' : 'menu-bg'"></div>
</template>

<style>
#menu {
  z-index: 10;
}

#menu-bar {
  width: 45px;
  height: 40px;
  margin: 2rem 0 0 1rem;
  cursor: pointer;
}

ul li {
    text-align: start;
    list-style: none;
}

ul li a {
    color: #f0f0f0;
    text-decoration: none;
    font-size: 32px;
}

ul li a:hover {
    color: #b0b0b0;
    text-decoration: none;
    font-size: 32px;
}

.bar {
  height: 5px;
  width: 100%;
  background-color: #DC052D;
  display: block;
  border-radius: 5px;
  transition: 0.3s ease;
}

#bar1 {
  transform: translateY(8px);
}

#bar2 {
  transform: translateY(12px);
}

#bar3 {
  transform: translateY(16px);
}

.nav {
  transition: 0.3s ease;
  display: none;
}

.nav ul {
  padding: 0 22px;
}

.nav li {
  list-style: none;
  padding: 12px 0;
}

.nav li a {
  color: white;
  font-size: 20px;
  text-decoration: none;
}

.nav li a:hover {
  font-weight: bold;
}

.menu-bg, #menu {
  top: -16px;
  left: -10px;
  position: absolute;
}

.menu-bg {
  z-index: 5;
  width: 0;
  height: 0;
  margin: 30px 0 20px 20px;
  background: radial-gradient(circle, #DC052D, #DC052D);
  border-radius: 50%;
  transition: 0.3s ease;
}

.change {
  display: block;
}

.change .bar {
  background-color: white;
}

.change #bar1 {
  transform: translateY(20px) rotateZ(-45deg);
}

.change #bar2 {
  opacity: 0;
}

.change #bar3 {
  transform: translateY(10px) rotateZ(45deg);
}

.change-bg {
  width: 720px;
  height: 860px;
  transform: translate(-60%,-30%);
}
</style>