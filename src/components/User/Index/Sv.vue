<template>
    <div>
        <table style="width:100%">
            <tr style="height: 50px;">
                <th>Ten: {{data.name}}, Email: {{data.email}}</th>
            </tr>

        </table>
        <button v-on:click="logout()">Đăng xuất</button>
    </div>
</template>
<script>
    import axios from 'axios';

    export default {
        name: 'sv',
        data() {
            return {
                data: [],
                error: [],
            }
        },
        created() {
            axios
                .get("http://127.0.0.1:8000/api/auth/user", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                })
                .then(response => this.data = response.data);
        },
        methods: {
            logout() {
                axios
                    .get("http://127.0.0.1:8000/api/auth/logout", {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem("token"),
                        }
                    })
                    .then(
                        localStorage.removeItem("token"),
                        this.$router.push("/login"));
            }
        }
    }
</script>
<style>

</style>