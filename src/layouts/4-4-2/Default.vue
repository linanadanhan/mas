<template>
  <el-row>
    <el-col :span="10">
      <port :page="page" :index="0"></port>
    </el-col>
    <el-col :span="10">
      <port :page="page" :index="1"></port>
    </el-col>
    <el-col :span="4">
      <port :page="page" :index="2"></port>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'layout-2-8',
    props: ['page', 'layout'],
    data () {
      return {}
    }
  }
</script>

<style>
</style>