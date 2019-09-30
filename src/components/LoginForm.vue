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
            :error="$v.user.email.$error"
            :error-messages="$v.user.email.$error ? 'E-mail inválido' : ''"
            @blur="$v.user.email.$touch()"
          />
          <v-text-field
            v-model="user.password"
            id="password"
            label="Password"
            type="password"
            required
            :error="$v.user.password.$error"
            :error-messages="$v.user.password.$error ? 'Senha inválida' : ''"
            @blur="$v.user.password.$touch()"
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
import { required, minLength, email } from 'vuelidate/lib/validators'

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
  validations: {
    user: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(3),
      },
    },
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
      this.$v.$touch()
      if (this.$v.$error) return
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
