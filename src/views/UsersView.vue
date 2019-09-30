<template>
  <div>
    <v-app-bar dark color="primary">
      <v-toolbar-title>Usuários</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-menu bottom left offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) in menuItems"
            :key="i"
            class="user-dropdown-tile"
            @click="item.method"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-icon class="user-dropdown-icon">{{ item.icon }}</v-icon>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <users-list />
    <div class="fade-footer" />
  </div>
</template>

<script>
import UsersList from '@/components/UsersList'
export default {
  name: 'usersView',
  components: { UsersList },
  data() {
    return {
      menuItems: [
        { title: 'Sair', icon: 'mdi-logout-variant', method: this.userLogout },
      ],
    }
  },
  methods: {
    userLogout() {
      this.$router.push({ name: 'home' })
      localStorage.removeItem('_token')
    },
  },
}
</script>

<style scoped>
.user-dropdown-tile:hover {
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.user-dropdown-icon {
  margin-left: 1rem;
}

.user-list {
  display: flex;
  align-items: center;
}

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
