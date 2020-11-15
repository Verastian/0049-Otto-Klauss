<template>
<v-row justify="center">
    <v-dialog v-model="showForm" persistent max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">Agregar un Juguete</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field label="Codigo*" hint="A0001" persistent-hint required v-model="emptyToys.data.code"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field label="Nombre*" hint="Lego" persistent-hint required v-model="emptyToys.data.name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field label="Stock*" required v-model="emptyToys.data.stock">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field label="Precio*" required v-model="emptyToys.data.price"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click.prevent="closeForm">
                    Cerrar
                </v-btn>
                <v-btn v-text="emptyToys.id ? 'Actualizar' : 'Crear'" color="blue darken-1" text @click.prevent="submitForm">
                    Crear
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-row>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
export default {
    props: {
        showForm: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            emptyToys: {
                id: null,
                data: {
                    code: null,
                    name: null,
                    stock: 0,
                    price: 0,
                },
            },
        }
    },
    methods: {
        ...mapActions(["createToy", "updateToy"]),

        submitForm() {
            if (!confirm("seguro?")) {
                return;
            }

            if (this.emptyToys.id) {
                console.log(this.emptyToys.id)
                this.updateToy(this.emptyToys);
            } else {
                this.createToy(this.emptyToys.data);
            }
            this.$emit("close-form");
            this.resetToy();
        },
        closeForm() {
            this.$emit("close-form");
            this.resetToy();
        },
        resetToy() {
            this.emptyToys.id = null;
            this.emptyToys.data.code = null;
            this.emptyToys.data.name = null;
            this.emptyToys.data.stock = 0;
            this.emptyToys.data.price = 0;
        },
    },
    computed: {
        ...mapState(["currentToy"]),
    },
    watch: {
        currentToy: function () {
            this.emptyToys = JSON.parse(JSON.stringify(this.currentToy));
        },
    },
};
</script>
