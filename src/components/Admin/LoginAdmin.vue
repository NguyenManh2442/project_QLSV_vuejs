<template>
    <b-row>
        <b-col sm="4">Đăng nhập Admin :</b-col>
        <b-col sm="4">
            <b-form @submit="onSubmit" v-if="show">
                <b-form-group
                        id="input-group-1"
                        label="Email:"
                        label-for="input-1"
                >
                    <b-form-input
                            id="input-1"
                            v-model="form.email"
                            required
                            placeholder="Nhập Email"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Password:" label-for="input-2">
                    <b-form-input
                            id="input-2"
                            v-model="form.password"
                            type="password"
                            required
                            placeholder="Password"
                    ></b-form-input>
                </b-form-group>

                <b-button type="submit" variant="primary">Đăng nhập</b-button>
            </b-form>
        </b-col>
        <b-col sm="4"></b-col>
    </b-row>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Login',
        data() {
            return {
                error: [],
                data: [],
                form: {
                    email: '',
                    password: ''
                },
                show: true
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault()
                axios
                    .post("http://localhost:8000/api/auth/loginAdmin", {
                        email: this.form.email,
                        password: this.form.password
                    })
                    .then(response => {
                        let tokenAdmin = response.data.success.tokenAdmin;
                        localStorage.setItem("tokenAdmin", tokenAdmin);
                        this.$router.push("/admin");
                    })

                    .catch(error => {
                        this.$router.push('/loginAdmin')
                        console.log(error)
                    })
            }
        },
    }
</script>
<style>

</style>