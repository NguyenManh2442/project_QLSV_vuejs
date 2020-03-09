<template>
<b-row>
    <b-col sm="4">Thêm lớp học:</b-col>
      <b-col sm="4">
        <b-form @submit="onSubmit" v-if="show">
        <b-form-group
            id="input-group-1"
            label="Mã lớp:"
            label-for="input-1"
        >
            <b-form-input
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

        <b-button type="submit" variant="primary">Thêm</b-button>
        </b-form>
      </b-col>
      <b-col sm="4"></b-col>
</b-row>
</template>

<script>
import axios from 'axios'
export default {
    name:'Index',
    data() {
      return {
        form: {
          classCode: '',
          className: '',
          homeroomTeacher: '',
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        axios
            .post("http://localhost:8000/api/class",{
                classCode:this.form.classCode,
                className: this.form.className,
                homeroomTeacher: this.form.homeroomTeacher
            })
            .then(response => {
                this.data = response.data.data},
                alert("Thêm mới thành công!")
                )

            .catch(error => {
            console.log(1);
            console.log(error)
        })
      }
    },
}
</script>
<style>

</style>