<template>
    <div id="app">
        <div style="margin:50px">
            <b-button v-b-modal.addStudent pill variant="outline-success" v-on:click="addStudent()"> + Thêm sinh viên</b-button>
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
                <b-button v-b-modal.modal-xl variant="primary" v-on:click="xem(datas.id, datas.studentCode)">Xem TT đăng
                    ký môn
                </b-button>

                <td>
                    <b-button v-b-modal.updateStudent pill variant="outline-primary" v-on:click="updateById(datas.id)">
                        Sửa
                    </b-button>
                </td>

                <td>
                    <b-button pill variant="outline-danger" v-on:click="xoa(datas.id)">Xóa</b-button>
                </td>
            </tr>
        </table>
        <b-modal id="modal-xl" size="xl" title="Thông tin đăng ký môn học của sinh viên">
            <h2>Thông tin đăng ký của mã sinh viên: {{studentCode}}</h2>
            <table style="width:100%">
                <tr style="height: 50px;">
                    <th>Mã môn</th>
                    <th>Tên môn</th>
                    <th>Ngày bắt đầu</th>
                    <th>Chức năng</th>
                    <th>
                        <b-button v-b-modal.subject variant="primary" v-on:click="dangky(studentCode)">Đăng ký môn
                        </b-button>
                    </th>
                </tr>
                <tr v-for="tt in ttdangky" :key="tt.id" style="height: 50px;">
                    <td>{{tt.subjectCode}}</td>
                    <td>{{tt.subjectName}}</td>
                    <td>{{tt.id}}</td>
                    <td>
                        <b-button pill variant="outline-danger" v-on:click="huy(tt.id)">Hủy</b-button>
                    </td>
                </tr>
            </table>
        </b-modal>
        <b-modal id="subject" size="xl" title="Môn học">
            <h2>Đăng ký môn học của mã sinh viên: {{studentCode}}</h2>
            <table style="width:100%">
                <tr style="height: 50px;">
                    <th>Mã môn</th>
                    <th>Tên môn</th>
                    <th>Giáo viên bộ môn</th>
                    <th>Ngày học</th>
                    <th colspan="3">Chức năng</th>
                </tr>
                <tr v-for="datas in subject" :key="datas.id" style="height: 50px;">

                    <td>{{datas.subjectCode}}</td>
                    <td>{{datas.subjectName}}</td>
                    <td>{{datas.subjectTeacher}}</td>
                    <td>{{datas.startDay}}</td>
                    <td>
                        <b-button pill variant="outline-danger" v-on:click="XNdangky(datas.subjectCode)">Đăng ký học
                        </b-button>
                    </td>
                </tr>
            </table>
        </b-modal>
        <!--------------------------------------------------------------------------------------->

        <b-modal id="addStudent" size="xl" title="Sinh viên">
            <b-row>
                <b-col sm="4">Thêm sinh viên:</b-col>
                <b-col sm="4">
                    <b-form @submit="onSubmitAddStudent" v-if="show">
                        <b-form-group
                                id="input-group-1"
                                label="Mã sinh viên:"
                                label-for="input-1"
                        >
                            <b-form-input
                                    id="input-1"
                                    v-model="formAdd.studentCode"
                                    required
                                    placeholder="Nhập mã sinh viên"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="Tên sinh viên:" label-for="input-2">
                            <b-form-input
                                    id="input-2"
                                    v-model="formAdd.name"
                                    required
                                    placeholder="Nhập tên sinh viên"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="Email:" label-for="input-2">
                            <b-form-input
                                    id="input-2"
                                    v-model="formAdd.email"
                                    type="email"
                                    required
                                    placeholder="Địa chỉ Email"
                            ></b-form-input>
                        </b-form-group>
                        <label for="">Chọn lớp: </label>
                        <select v-model="formAdd.classCode" id="">
                            <option v-for="classCode in classCodes" :key="classCode.id" :value="classCode.classCode">
                                {{classCode.className}}
                            </option>
                        </select><br><br>
                        <b-button type="submit" variant="primary">Thêm</b-button>
                    </b-form>
                </b-col>
                <b-col sm="4"></b-col>
            </b-row>
        </b-modal>

        <!--        ----------------------------------------------->
        <b-modal id="updateStudent" size="xl" title="Sinh viên">
            <b-row>
                <b-col sm="4">Cập nhật sinh viên:</b-col>
                <b-col sm="4">
                    <b-form @submit="onSubmit" v-if="show">
                        <b-form-group
                                id="input-group-1"
                                label="Mã sinh viên:"
                                label-for="input-1"
                        >
                            <b-form-input
                                    id="input-1"
                                    v-model="formUpdate.studentCode"
                                    required
                                    placeholder="Nhập mã sinh viên"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="Tên sinh viên:" label-for="input-2">
                            <b-form-input
                                    id="input-2"
                                    v-model="formUpdate.name"
                                    required
                                    placeholder="Nhập tên sinh viên"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="Email:" label-for="input-2">
                            <b-form-input
                                    id="input-2"
                                    v-model="formUpdate.email"
                                    type="email"
                                    required
                                    placeholder="Địa chỉ Email"
                            ></b-form-input>
                        </b-form-group>
                        <label for="">Chọn lớp: </label>
                        <select v-model="formUpdate.classCode" id="">
                            <option v-for="classCodea in classCodes" :key="classCodea.id" :value="classCodea.classCode">
                                {{classCodea.className}}
                            </option>
                        </select><br><br>
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
        name: 'SinhVien',
        data() {
            return {
                data: [],
                error: [],
                ttdangky: [],
                studentCode: '',
                subject: [],
                formAdd: {
                    studentCode: '',
                    name: '',
                    email: '',
                    classCode: null,
                },
                formUpdate: {
                    studentCode: '',
                    name: '',
                    email: '',
                    classCode: null,
                },
                classCodes: [],
                studentId: '',
                show: true
            }
        },
        created() {
            axios
                .get("http://localhost:8000/api/students")
                .then(response => {
                    this.data = response.data.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        methods: {
            xoa(id) {
                axios
                    .delete("http://127.0.0.1:8000/api/students/" + id)
                    .then(
                        this.data.splice(this.data.map(item => item.id).indexOf(id), 1),
                    )
                    .catch(error => {
                        console.log(error)
                    })
            },
            xem(id, studentCode) {
                axios
                    .get("http://127.0.0.1:8000/api/showSubject/" + id)
                    .then(
                        response => {
                            this.ttdangky = response.data.data,
                                this.studentCode = studentCode
                            console.log(this.ttdangky);

                        })
                    .catch(error => {
                        console.log(error)
                    })

            },
            dangky(studentCode) {
                axios
                    .get("http://127.0.0.1:8000/api/subjects")
                    .then(
                        response => {
                            this.subject = response.data.data,
                                this.studentCode = studentCode
                        })
                    .catch(error => {
                        console.log(error)
                    })

            },
            XNdangky(subjectCode) {
                axios
                    .post("http://127.0.0.1:8000/api/infor-subjects", {
                        studentCode: this.studentCode,
                        subjectCode: subjectCode,
                    })
                    .then(
                        response => {
                            this.ttdangky = response.data.data,
                                console.log(this.ttdangky);

                        })
                    .catch(error => {
                        console.log(error)
                    })

            },
            huy(id) {
                axios
                    .delete("http://127.0.0.1:8000/api/infor-subjects/" + id)
                    .then(
                        this.ttdangky.splice(this.ttdangky.map(item => item.id).indexOf(id), 1),
                    )
                    .catch(error => {
                        console.log(error)
                    })
            },
            updateById(id) {
                axios
                    .get("http://localhost:8000/api/students/" + id)
                    .then(response => {
                        this.formUpdate = response.data.data
                        console.log(this.formUpdate)
                        this.studentId = id
                    })
                    .catch(error => {
                        console.log(error)
                    })
                axios
                    .get("http://localhost:8000/api/class")
                    .then(response => {
                        this.classCodes = response.data.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            addStudent(){
                axios
                    .get("http://localhost:8000/api/class")
                    .then(response => {
                        this.classCodes = response.data.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            onSubmitAddStudent(evt) {
                evt.preventDefault()
                axios
                    .post("http://localhost:8000/api/students",{
                        studentCode:this.formAdd.studentCode,
                        name: this.formAdd.name,
                        email: this.formAdd.email,
                        classCode: this.formAdd.classCode,
                        password: this.formAdd.studentCode
                    })

                    .then(response => {
                            this.data = response.data.data},
                        alert("Thêm sinh viên thành công!")
                    )

                    .catch(error => {
                        console.log(error)
                    })
            },
            onSubmit(evt) {
                evt.preventDefault()
                axios
                    .put("http://localhost:8000/api/students/" + this.studentId, {
                        studentCode: this.formUpdate.studentCode,
                        name: this.formUpdate.name,
                        email: this.formUpdate.email,
                        classCode: this.formUpdate.classCode,
                        password: this.formUpdate.studentCode
                    })
                    .then(response => {
                            this.data = response.data.data
                        },
                        alert("Cập nhật thành công!"))
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }
</script>
<style>

</style>