<template>
<div>
    <v-app>
        <v-img :src="imgBack" min-height="100%">
            <v-card width="400px" class="mx-auto my-5">
                <v-card-title class="pb-0">
                    <h1 class="mx-auto mb-5">Bienvenido</h1>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field label="Usuario" prepend-icon="mdi-account-circle" v-model="user" />
                        <v-text-field label="Contraseña" :type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword" v-model="password" />
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="info" @click="login">Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-img>
    </v-app>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
import firebase from 'firebase'
export default {
    data() {
        return {
            user: "",
            password: "",
            showPassword: false,
            imgBack: 'https://www.salud.mapfre.es/media/2016/07/guia-practica-juegos-juguetes-3-1100x408.jpg'
        };
    },
    methods: {
        ...mapActions(["updateCurrentUser"]),
        login() {
            if (this.user != '' && this.password != '') {
                firebase.auth().signInWithEmailAndPassword(this.user, this.password)
                    .then(() => {
                        //add user store
                        this.updateCurrentUser(firebase.auth().currentUser)
                        this.$router.push('/toys');
                    })
                    .catch(() => {
                        alert('Debes estar Registrado')
                    });
            } else {
                alert('Ambos campos son requeridos')
            }
        }
    },
};
</script>
