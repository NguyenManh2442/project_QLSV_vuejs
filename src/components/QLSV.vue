<template>
    <b-row>
        <b-col sm="3">
            <b-list-group>
                <b-list-group-item href="/admin/lophoc">Lớp học</b-list-group-item>
                <b-list-group-item href="/admin/sinhvien">Sinh viên</b-list-group-item>
                <b-list-group-item href="/admin/monhoc">Môn học</b-list-group-item>
            </b-list-group>
        </b-col>
        <b-col sm="9">
            <div>
                <table style="width:100%">
                    <tr style="height: 50px;">
                        <th>Ten: {{data.name}}, Email: {{data.email}}</th>
                    </tr>

                </table>
                <button v-on:click="logout()">Đăng xuất</button>
            </div>
        <router-view></router-view>
        </b-col>
    </b-row>
</template>

<script>

    import axios from "axios";

    export default {
        name: 'QLSV',
        components: {},
        data() {
            return {
                data: [],
                error: [],
            }
        },
        created() {
            axios
                .get("http://127.0.0.1:8000/api/auth/admin", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("tokenAdmin"),
                    }
                })
                .then(response => this.data = response.data);
        },
        methods: {
            logout() {
                axios
                    .get("http://127.0.0.1:8000/api/auth/logoutAdmin", {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem("tokenAdmin"),
                        }
                    })
                    .then(
                        localStorage.removeItem("tokenAdmin"),
                        this.$router.push("/loginAdmin"));
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
