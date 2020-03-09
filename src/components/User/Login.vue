<template>
    <b-row>
        <b-col sm="4">Đăng nhập :</b-col>
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
                    .post("http://localhost:8000/api/auth/login", {
                        email: this.form.email,
                        password: this.form.password
                    })
                    .then(response => {
                        let token = response.data.success.token;
                        localStorage.setItem("token", token);
                        this.$router.push("/sv");
                    })

                    .catch(error => {
                        this.$router.push('/login')
                        console.log(error)
                    })
            }
        },
    }
</script>
<style>

</style>