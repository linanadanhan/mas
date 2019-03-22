<template>
  <el-row>
    <el-col :span="17">
      <port :page="page" :index="0"></port>
    </el-col>
    <el-col :span="7">
      <port :page="page" :index="1"></port>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'layout-7-3',
    props: ['page', 'layout'],
    data () {
      return {}
    }
  }
</script>

<style>
</style>