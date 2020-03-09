<template>
    <b-row>
        <b-col sm="3">
            <b-list-group>
                <b-list-group-item href="/sv">Home</b-list-group-item>
                <b-list-group-item href="/studentClass">Lớp học</b-list-group-item>
                <b-list-group-item href="/detailSubject">Môn học</b-list-group-item>
            </b-list-group>
        </b-col>
        <b-col sm="9">
            <router-view></router-view>
        </b-col>
    </b-row>
</template>

<script>

    export default {
        name: 'SV',
        components: {},
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
