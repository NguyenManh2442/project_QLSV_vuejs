<template>
    <div>
        <h2>Thông tin đăng ký môn học</h2>
        <table style="width:100%">
            <tr style="height: 50px;">
                <th>Mã môn</th>
                <th>Tên môn</th>
                <th>Ngày bắt đầu</th>
                <th>Chức năng</th>
                <th>
                    <b-button v-b-modal.subject variant="primary" v-on:click="dangky()">Đăng ký môn
                    </b-button>
                </th>
            </tr>
            <tr v-for="tt in dataSubject" :key="tt.id" style="height: 50px;">
                <td>{{tt.subjectCode}}</td>
                <td>{{tt.subjectName}}</td>
                <td>{{tt.startDay}}</td>
                <td>
                    <b-button pill variant="outline-danger" v-on:click="huy(tt.id)">Hủy</b-button>
                </td>
            </tr>
        </table>
        <b-modal id="subject" size="xl" title="Môn học">
            <h2>Đăng ký môn học </h2>
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
    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        name: 'DetailSubject',
        data() {
            return {
                dataSubject: [],
                error: [],
                data: [],
                subject: [],
                studentCode: '',
                show: true,
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
                        this.data = response.data.id
                        this.studentCode = response.data.studentCode
                        return axios.get("http://127.0.0.1:8000/api/showSubject/" + this.data)
                    }
                )
                .then(
                    response => {
                        this.dataSubject = response.data.data
                    })
                .catch(error => {
                    console.log(error)
                })
        },
        methods: {
            dangky() {
                axios
                    .get("http://127.0.0.1:8000/api/subjects")
                    .then(
                        response => {
                            this.subject = response.data.data
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
                            this.dataSubject = response.data.data
                            alert("Đăng ký thành công mã môn: "+ subjectCode)
                        })
                    .catch(error => {
                        console.log(error)
                    })

            },
            huy(id){
                axios
                    .delete("http://127.0.0.1:8000/api/infor-subjects/"+ id)
                    .then(
                        this.dataSubject.splice(this.dataSubject.map(item => item.id).indexOf(id),1),
                    )
                    .catch(error => {
                        console.log(error)
                    })
            },
        }

    }
</script>