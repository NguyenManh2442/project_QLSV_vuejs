<template>
    <div id="app">
        <div style="margin:50px">
            <h1>Thông tin thành viên lớp </h1>
        </div>
        <table style="width:100%">
            <tr style="height: 50px;">
                <th>Mã sinh viên</th>
                <th>Tên sinh viên</th>
                <th>Mã lớp</th>
                <th>Email</th>
                <th colspan="3">Chức năng</th>
            </tr>
            <tr v-for="datas in dataClass" :key="datas.id" style="height: 50px;">
                <td>{{datas.studentCode}}</td>
                <td>{{datas.name}}</td>
                <td>{{datas.classCode}}</td>
                <td>{{datas.email}}</td>
                <td>
                    <b-button variant="success" href="#">Xem thông tin</b-button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Index',
        data() {
            return {
                data: [],
                error: [],
                dataClass: [],
                test: ''
            }
        },
        created() {
            axios
                .get("http://127.0.0.1:8000/api/auth/user", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                })
                .then(response => {
                        this.data = response.data.classCode
                        return axios.get("http://localhost:8000/api/studentInClass/" + this.data)
                    }
                )
                .then(response => {
                    this.dataClass = response.data.data
                })
                .catch(error => {
                    console.log(error)
                });

        },
    }
</script>
<style>

</style>