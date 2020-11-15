<template>
<div class="home">
    <toys-form :showForm="showForm" @close-form=" showForm=false" @save-form=" showForm=false"></toys-form>
    <v-container>
        <h1>Toys List</h1>

        <v-btn dark color="orange" small class="mr-2" @click.prevent="showForm= true">
            Agregar un juguete a la lista
        </v-btn>

        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Code</th>
                        <th class="text-left">Name</th>
                        <th class="text-left">Stock</th>
                        <th class="text-left">Price</th>
                        <th class="text-left"></th>
                        <th class="text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="toy in toys" :key="toy.id">
                        <td>{{ toy.data.code }}</td>
                        <td>{{ toy.data.name }}</td>
                        <td>{{ toy.data.stock }}</td>
                        <td>{{ toy.data.price }}</td>
                        <td>
                            <v-icon color="orange" small class="mr-2" @click="modifyToy(toy)">
                                mdi-pencil
                            </v-icon>
                        </td>
                        <td>
                            <v-icon color="orange" small class="mr-2" @click="removeToy(toy.id)">
                                mdi-delete
                            </v-icon>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-container>
</div>
</template>

<script>
import ToysForm from "@/components/ToysForm.vue";
import {
    mapState,
    mapActions
} from "vuex";
// @ is an alias to /src

export default {
    name: "Toy",
    data() {
        return {
            showForm: false
        };
    },
    components: {
        ToysForm,
    },

    computed: {
        ...mapState(["toys"]),
    },
    methods: {
        ...mapActions(["getToys", "deleteToy", "editToy"]),
        removeToy(toyId) {
            if (confirm("Seguro??")) {
                this.deleteToy(toyId);
            }
        },
        modifyToy(toy) {
            this.editToy(toy);
            this.showForm = true;
        },
    },
    created() {
        this.getToys();
    },
};
</script>

<style>
</style>
