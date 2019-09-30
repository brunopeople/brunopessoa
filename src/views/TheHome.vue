<template>
  <div class="home">
    <div class="home__company">
      <img
        src="@/assets/images/cropped-athos2.png"
        alt="Logo Athos"
        class="home__company--logo"
      />
    </div>
    <div class="home__shape" />
    <div class="home__login">
      <login-form />
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm'
export default {
  name: 'theHome',
  components: { LoginForm },
}
</script>

<style scoped>
.home {
  background-color: #ccc;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.home__company {
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home__company--logo {
  display: block;
}

.home__shape {
  background-color: #c5141a;
  width: 200px;
  height: 200px;
  position: absolute;
  bottom: 0;
  right: 0;
  clip-path: polygon(100% 0, 0 100%, 100% 100%, 100% 100%);
}

.home__login {
  width: 80%;
  justify-self: center;
  align-self: center;
}
</style>
