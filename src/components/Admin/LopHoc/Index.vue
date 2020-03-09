<template>
    <div id="app">
        <div style="margin:50px">
            <b-button v-b-modal.AddClass variant="outline-success" >+ Thêm lớp học</b-button>
        </div>
        <table style="width:100%">
            <tr style="height: 50px;">
                <th>Mã lớp</th>
                <th>Tên lớp lớp</th>
                <th>Giáo viên chủ nhiệm</th>
                <th colspan="3">Chức năng</th>
            </tr>
            <tr v-for="datas in data" :key="datas.id" style="height: 50px;">
                <td>{{datas.classCode}}</td>
                <td>{{datas.className}}</td>
                <td>{{datas.homeroomTeacher}}</td>
                <td><router-link  :to="{name:'lophocId', params:{classCode:datas.classCode}}">Xem thành viên</router-link></td>

                <td><b-button v-b-modal.updateClass variant="outline-primary" v-on:click="updateById(datas.id)" >Sửa</b-button></td>
                
                <td><b-button pill variant="outline-danger" v-on:click="xoa(datas.id)">Xóa</b-button></td>
            </tr>
        </table>
        <!-- ------------------------------------------------------------------------------------ -->
        <b-modal id="AddClass" size="xl" title="Thêm lớp học">
            <b-row>
                <b-col sm="4">Thêm lớp học:</b-col>
                <b-col sm="4">
                    <b-form @submit="onSubmitAddClass" v-if="show">
                    <b-form-group
                        id="input-group-1"
                        label="Mã lớp:"
                        label-for="input-1"
                    >
                        <b-form-input
                        id="input-1"
                        v-model="formAddClass.classCode"
                        required
                        placeholder="Nhập mã lớp"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Tên lớp học:" label-for="input-2">
                        <b-form-input
                        id="input-2"
                        v-model="formAddClass.className"
                        required
                        placeholder="Nhập tên lớp"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Tên giáo viên chủ nhiệm:" label-for="input-2">
                        <b-form-input
                        id="input-2"
                        v-model="formAddClass.homeroomTeacher"
                        required
                        placeholder="Nhập tên giáo viên"
                        ></b-form-input>
                    </b-form-group>

                    <b-button type="submit" variant="primary">Thêm</b-button>
                    </b-form>
                </b-col>
                <b-col sm="4"></b-col>
            </b-row>
        </b-modal>

        <!-- ------------------------------------------------------------------------------------ -->
        <b-modal id="updateClass" size="xl" title="Sửa lớp học">
            <b-row>
                <b-col sm="4">Sửa lớp học:</b-col>
                <b-col sm="4">
                    <b-form @submit="onSubmit" v-if="show">
                    <b-form-group
                        id="input-group-1"
                        label="Mã lớp:"
                        label-for="input-1"
                    >
                        <b-form-input
                        value="aaaaaa"
                        id="input-1"
                        v-model="form.classCode"
                        required
                        placeholder="Nhập mã lớp"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Tên lớp học:" label-for="input-2">
                        <b-form-input
                        id="input-2"
                        v-model="form.className"
                        required
                        placeholder="Nhập tên lớp"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Tên giáo viên chủ nhiệm:" label-for="input-2">
                        <b-form-input
                        id="input-2"
                        v-model="form.homeroomTeacher"
                        required
                        placeholder="Nhập tên giáo viên"
                        ></b-form-input>
                    </b-form-group>

                    <b-button type="submit" variant="primary">Cập nhật</b-button>
                    </b-form>
                </b-col>
                <b-col sm="4"></b-col>
            </b-row>
        </b-modal>
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
            form: {
                classCode: '',
                className: '',
                homeroomTeacher: '',
            },
            formAddClass: {
                classCode: '',
                className: '',
                homeroomTeacher: '',
                },
            id:'',
            show: true
        }
    },
    created() {
        axios
            .get("http://127.0.0.1:8000/api/class")
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
                .delete("http://127.0.0.1:8000/api/class/"+ id)
                .then(
                    this.data.splice(this.data.map(item => item.id).indexOf(id),1)
                )
                .catch(error => {
                console.log(error)
            })
        },
        updateById(id){
            axios
            .get("http://localhost:8000/api/class/" + id)
            .then(response => {
                this.form = response.data.data
                this.id = id
            })
            .catch(error => {
            console.log(1);
            
            console.log(error)
        })
        },
        onSubmit(evt) {
        evt.preventDefault()
        axios
            .put("http://localhost:8000/api/class/"+ this.id,{
                classCode:this.form.classCode,
                className: this.form.className,
                homeroomTeacher: this.form.homeroomTeacher
            })
            .then(response => {
                this.data = response.data.data
                 alert("Cập nhật thành công!")
                })
            .catch(error => {
            console.log(error)
        })
      },

      onSubmitAddClass(evt) {
        evt.preventDefault()
        axios
            .post("http://localhost:8000/api/class",{
                classCode:this.formAddClass.classCode,
                className: this.formAddClass.className,
                homeroomTeacher: this.formAddClass.homeroomTeacher
            })
            .then(response => {
                this.data = response.data.data
                alert("Thêm mới thành công!")
                })

            .catch(error => {
            console.log(error)
        })
      }
    }
}
</script>
<style>

</style>