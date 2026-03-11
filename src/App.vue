<template>
  <nav>
    <router-link to="/">Главная</router-link> |
    <router-link to="/cart">Корзина</router-link> |
    <router-link to="/orders">Оформленные заказы</router-link>
  </nav>
  <router-view/>
</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    max-width: 1920px;
    margin: auto;
    background-color: #eff1eb;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}

nav {
  padding: 30px;
}

a {
  font-weight: bold;
  text-decoration: none;
  color: #3b3b3b;;
}

a:hover:not(.router-link-exact-active) {
  color: #9cc54f;
}

nav a.router-link-exact-active {
  border-bottom: 3px solid #9cc54f;
  padding-bottom: 3px;
}
</style>