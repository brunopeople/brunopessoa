<template>
  <div>
    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>
          {{ registerMode ? 'Novo usuário' : 'Login' }}
        </v-toolbar-title>
        <div class="flex-grow-1"></div>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="user.email"
            label="E-mail"
            type="email"
            required
          />
          <v-text-field
            v-model="user.password"
            id="password"
            label="Password"
            type="password"
            required
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-if="registerMode"
          color="primary"
          block
          :loading="sendingRequest"
          :disabled="sendingRequest"
          @click="registerUser"
        >
          Registrar
        </v-btn>
        <v-btn
          v-else
          color="primary"
          block
          :loading="sendingRequest"
          :disabled="sendingRequest"
          @click="userLogin"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
    <p v-if="!registerMode">
      Novo usuário? Clique <a @click="registerMode = true">aqui</a> para se
      registrar.
    </p>
    <p v-else>
      Já é cadastrado? Clique <a @click="registerMode = false">aqui</a> para se
      entrar.
    </p>
  </div>
</template>

<script>
export default {
  name: 'theLogin',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      sendingRequest: false,
      registerMode: false,
    }
  },
  methods: {
    registerUser() {
      this.sendingRequest = true
      this.$http.post('register', this.user).finally(() => {
        this.registerMode = false
        this.sendingRequest = false
      })
    },
    userLogin() {
      this.sendingRequest = true
      this.$http
        .post('login', this.user)
        .then(res =>
          localStorage.setItem('_token', JSON.stringify(res.data.token))
        )
        .then(() => this.$router.push('users'))
        .catch(err => err)
        .finally(() => (this.sendingRequest = false))
    },
  },
}
</script>
