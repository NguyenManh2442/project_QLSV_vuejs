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
            <tr v-for="datas in data" :key="datas.id" style="height: 50px;">
                <td>{{datas.studentCode}}</td>
                <td>{{datas.name}}</td>
                <td>{{datas.classCode}}</td>
                <td>{{datas.email}}</td>
                <td><b-button variant="success" href="#">Xem thông tin</b-button></td>

                <td><router-link  :to="{name:'repairsinhvienId', params:{id:datas.id}}">Sửa</router-link></td>


                <td><b-button pill variant="outline-danger" v-on:click="xoa(datas.id)">Xóa</b-button></td>
            </tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Index',
    data(){
        return {
            data:[],
            error:[],
        }
    },
    created() {
        axios
            .get("http://localhost:8000/api/studentInClass/"+this.$route.params.classCode)
            .then(response => {
                this.data = response.data.data
            })
            .catch(error => {
            console.log(error)
        })
    },
    methods: {
        xoa(id){
            axios
                .delete("http://127.0.0.1:8000/api/students/"+ id)
                .then(
                    this.data.splice(this.data.map(item => item.id).indexOf(id),1), 
                )
                .catch(error => {
                    console.log(1)
                console.log(error)
            })
        }
    }
}
</script>
<style>

</style>