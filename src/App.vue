<template>
<v-app>
    <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
            <v-img alt="OttoKlaus Logo" class="shrink mr-2 hidden-md-and-up" contain src="https://fontmeme.com/permalink/201110/50cf568dc75c907406317a453e6516a5.png" transition="scale-transition" width="60" />

            <v-img alt="OttoKlaus Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="230" src="https://fontmeme.com/permalink/201110/2db6849656609646965ea31afa6b8d49.png" width="180" />
        </div>

        <v-spacer></v-spacer>

        <v-btn v-if='currentUser' @click='logout' text>
            <span class="mr-2">Cerrar Sesion</span>
            <v-icon>mdi-lock-open</v-icon>
        </v-btn>
    </v-app-bar>

    <v-main>
        <router-view></router-view>
    </v-main>
</v-app>
</template>

<script>
import firebase from 'firebase';
import {
    mapState,
    mapActions
} from 'vuex';
export default {
    name: 'App',
    methods: {
        ...mapActions(['updateCurrentUser']),
        logout() {
            firebase.auth().signOut().then(() => {
                this.updateCurrentUser(null)
                this.$router.push('/login')
            })
        }
    },
    computed: {
        ...mapState(['currentUser']),
    },
    created() {
        this.updateCurrentUser(firebase.auth().currentUser)
    }
};
</script>
