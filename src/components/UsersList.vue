<template>
  <v-container class="fill-heigth" fluid>
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1"
      :loading="requestingApi"
      loading-text="Loading..."
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <div class="flex-grow-1" />
          <v-dialog v-model="dialog" max-width="500px" persistent>
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-on="on"
                @click="resetEditUser"
              >
                Novo usuário
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ dialogTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-text-field
                    v-model="editedUser.first_name"
                    label="Nome"
                    :error-messages="
                      $v.editedUser.first_name.$error ? 'Nome requerido' : ''
                    "
                    :error="$v.editedUser.first_name.$error"
                    @blur="$v.editedUser.first_name.$touch()"
                  />
                  <v-text-field
                    v-model="editedUser.last_name"
                    label="Sobrenome"
                    :error-messages="
                      $v.editedUser.last_name.$error
                        ? 'Sobrenome requerido'
                        : ''
                    "
                    :error="$v.editedUser.last_name.$error"
                    @blur="$v.editedUser.last_name.$touch()"
                  />
                  <v-text-field
                    v-model="editedUser.email"
                    label="E-mail"
                    :error-messages="
                      $v.editedUser.email.$error ? 'E-mail inválido' : ''
                    "
                    :error="$v.editedUser.email.$error"
                    @blur="$v.editedUser.email.$touch()"
                  />
                </v-container>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1" />
                <v-btn
                  color="warning darken-1"
                  text
                  :disabled="requestingApi"
                  @click="cancelEdit"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  v-if="editMode"
                  color="success darken-1"
                  text
                  :disabled="requestingApi"
                  @click="editUser"
                >
                  Editar
                </v-btn>
                <v-btn
                  v-else
                  color="success darken-1"
                  text
                  :disabled="requestingApi"
                  @click="saveUser"
                >
                  Salvar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="loadUser(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="loadUser(item, 'delete')">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="deleteDialog" max-width="500" persistent>
      <v-card>
        <v-card-title class="headline"
          >Deseja realmente excluir este usuário?</v-card-title
        >
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="success darken-1"
            text
            :disabled="requestingApi"
            @click="deleteDialog = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="warning darken-1"
            text
            :disabled="requestingApi"
            @click="deleteUser()"
          >
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'userList',
  data() {
    return {
      requestingApi: false,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'E-mail', value: 'email' },
        { text: 'Nome', value: 'first_name' },
        { text: 'Sobrenome', value: 'last_name' },
        { text: 'Ações', value: 'action', sortable: false },
      ],
      users: [],
      editedIndex: -1,
      editedUser: {},
      editMode: false,
      dialog: false,
      deleteDialog: false,
    }
  },
  validations: {
    editedUser: {
      first_name: { required },
      last_name: { required },
      email: { required, email },
    },
  },
  computed: {
    dialogTitle() {
      return this.editedIndex === -1 ? 'Novo usuário' : 'Editar usuário'
    },
  },
  created() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      this.requestingApi = true
      this.$http
        .get('users')
        .then(res => (this.users = res.data.data))
        .finally(() => (this.requestingApi = false))
    },
    saveUser() {
      if (this.touchValidations()) return
      this.requestingApi = true
      this.$http
        .post('users', this.editedUser)
        .then(res => this.users.push(res.data))
        .finally(() => this.endRequests())
    },
    loadUser(user, action = 'edit') {
      this.editMode = true
      this.editedIndex = this.users.indexOf(user)
      this.editedUser = Object.assign({}, user)
      if (action === 'delete') {
        this.deleteDialog = true
        return
      }
      this.dialog = true
    },
    editUser() {
      if (this.touchValidations()) return
      this.requestingApi = true
      this.$http
        .put(`users/${this.editUser.id}`, this.editedUser)
        .then(res => Object.assign(this.users[this.editedIndex], res.data))
        .finally(() => this.endRequests())
    },
    deleteUser() {
      this.requestingApi = true
      this.$http
        .delete(`users/${this.editedUser.id}`)
        .then(() => this.users.splice(this.editedIndex, 1))
        .finally(() => this.endRequests())
    },
    cancelEdit() {
      this.dialog = false
      this.editMode = false
      this.$v.$reset()
    },
    resetEditUser() {
      this.editedIndex = -1
      this.editedUser = {}
      this.editMode = false
    },
    endRequests() {
      this.requestingApi = false
      this.dialog = false
      this.deleteDialog = false
    },
    touchValidations() {
      this.$v.$touch()
      return this.$v.$error
    },
  },
}
</script>
