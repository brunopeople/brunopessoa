<template>
  <div>
    <the-header />
    <users-list />
    <div class="fade-footer" />
  </div>
</template>

<script>
import TheHeader from '@/views/TheHeader'
import UsersList from '@/components/UsersList'

export default {
  name: 'usersView',
  components: { TheHeader, UsersList },
}
</script>

<style scoped>
.fade-footer {
  position: absolute;
  bottom: 0;
  height: 25vh;
  width: 100vw;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}
</style>
