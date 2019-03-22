<template>
  <el-row>
    <el-col :span="8">
      <port :page="page" :index="0"></port>
    </el-col>
    <el-col :span="8">
      <port :page="page" :index="1"></port>
    </el-col>
    <el-col :span="8">
      <port :page="page" :index="2"></port>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'layout-3-3-3',
    props: ['page', 'layout'],
    data () {
      return {}
    }
  }
</script>

<style>
</style>