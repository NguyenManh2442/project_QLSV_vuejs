<template>
    <div id="app">
        <div style="margin:50px">
            <b-button variant="success" v-b-modal.AddSubject >+ Thêm môn học</b-button>
        </div>
        <table style="width:100%">
            <tr style="height: 50px;">
                <th>Mã môn</th>
                <th>Tên môn</th>
                <th>Giáo viên bộ môn</th>
                <th colspan="3">Chức năng</th>
            </tr>
            <tr v-for="datas in dataSubject" :key="datas.id" style="height: 50px;">
                <td>{{datas.subjectCode}}</td>
                <td>{{datas.subjectName}}</td>
                <td>{{datas.subjectTeacher}}</td>
                <td><router-link  :to="{name:'monhocId', params:{id:datas.id}}">Xem chi tiết</router-link></td>

                <td><b-button v-b-modal.updateSubject variant="primary" v-on:click="updateById(datas.id)" >Sửa</b-button></td>

                <td><b-button pill variant="outline-danger" v-on:click="xoa(datas.id)">Xóa</b-button></td>
            </tr>
        </table>
        <b-modal id="AddSubject" size="xl" title="Môn học">
            <b-row>
                <b-col sm="4">Thêm môn hoc:</b-col>
                <b-col sm="4">
                    <b-form @submit="onSubmit" v-if="show">
                    <b-form-group
                        id="input-group-1"
                        label="Mã môn học:"
                        label-for="input-1"
                    >
                        <b-form-input
                        id="input-1"
                        v-model="formAdd.subjectCode"
                        required
                        placeholder="Nhập mã môn học"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Tên môn học:" label-for="input-2">
                        <b-form-input
                        id="input-2"
                        v-model="formAdd.subjectName"
                        required
                        placeholder="Nhập tên môn học"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Tên giáo viên bộ môn:" label-for="input-2">
                        <b-form-input
                        id="input-2"
                        v-model="formAdd.subjectTeacher"
                        required
                        placeholder="Nhập tên giáo viên bộ môn"
                        ></b-form-input>
                    </b-form-group>
                    
                    <b-form-group id="input-group-2" label="Ngày bắt đầu học:" label-for="input-2">
                        <b-form-input
                        id="input-2"
                        v-model="formAdd.startDay"
                        type="date"
                        required
                        ></b-form-input>
                    </b-form-group>

                    <b-button type="submit" variant="primary">Thêm</b-button>
                    </b-form>
                </b-col>
                <b-col sm="4"></b-col>
            </b-row>
        </b-modal>


        <!-- ---------------------------------------------------- -->
         <b-modal id="updateSubject" size="xl" title="Môn học">
            <b-row>
                <b-col sm="4">Sửa môn hoc:</b-col>
                <b-col sm="4">
                    <b-form @submit="onSubmitUpdate" v-if="show">
                    <b-form-group
                        id="input-group-1"
                        label="Mã môn học:"
                        label-for="input-1"
                    >
                        <b-form-input
                        id="input-1"
                        v-model="formUpdate.subjectCode"
                        required
                        placeholder="Nhập mã môn học"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Tên môn học:" label-for="input-2">
                        <b-form-input
                        id="input-2"
                        v-model="formUpdate.subjectName"
                        required
                        placeholder="Nhập tên môn học"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Tên giáo viên bộ môn:" label-for="input-2">
                        <b-form-input
                        id="input-2"
                        v-model="formUpdate.subjectTeacher"
                        required
                        placeholder="Nhập tên giáo viên bộ môn"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Ngày bắt đầu học:" label-for="input-2">
                        <b-form-input
                        id="input-2"
                        v-model="formUpdate.startDay"
                        type="date"
                        required
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
            dataSubject:[],
            error:[],
            formAdd: {
                subjectCode: '',
                subjectName: '',
                subjectTeacher: '',
                startDay:null
            },
            formUpdate: {
                subjectCode: '',
                subjectName: '',
                subjectTeacher: '',
                startDay:null
            },
            SubjectId:'',
            show:true,
        }
    },
    created() {
        axios
            .get("http://127.0.0.1:8000/api/subjects")
            .then(response => {
                this.dataSubject = response.data.data
            })
            .catch(error => {
            console.log(error)
        })
    },
    methods: {
        xoa(id){
            axios
                .delete("http://127.0.0.1:8000/api/subjects/"+ id)
                .then(
                    this.dataSubject.splice(this.dataSubject.map(item => item.id).indexOf(id),1)
                )
                .catch(error => {
                console.log(error)
            })
        },
        updateById(id){
            axios
            .get("http://localhost:8000/api/subjects/" + id)
            .then(response => {
                this.formUpdate = response.data.data
                this.SubjectId = id
            })
            .catch(error => {
                console.log(error)
            })
        },
        onSubmitUpdate(evt) {
        evt.preventDefault()
                axios
                .put("http://localhost:8000/api/subjects/"+ this.SubjectId,{
                    subjectCode:this.formUpdate.subjectCode,
                    subjectName: this.formUpdate.subjectName,
                    subjectTeacher: this.formUpdate.subjectTeacher,
                    startDay: this.formUpdate.startDay
                })
                .then(response => {
                    this.dataSubject = response.data.data
                    alert("Cập nhật thành công!")
                    })
                .catch(error => {
                console.log(error)
        })
        },

        onSubmit(evt) {
        evt.preventDefault()
        axios
            .post("http://localhost:8000/api/subjects",{
                subjectCode:this.formAdd.subjectCode,
                subjectName: this.formAdd.subjectName,
                subjectTeacher: this.formAdd.subjectTeacher,
                startDay: this.formAdd.startDay
            })

            .then(response => {
                this.dataSubject.push(response.data.data)},
                alert("Thêm môn học thành công!")
                )

            .catch(error => {
            console.log(error)
        })
      }
    }
}
</script>

