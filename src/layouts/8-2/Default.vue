<template>
  <el-row>
    <el-col :span="19">
      <port :page="page" :index="0"></port>
    </el-col>
    <el-col :span="5">
      <port :page="page" :index="1"></port>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'layout-8-2',
    props: ['page', 'layout'],
    data () {
      return {}
    }
  }
</script>

<style>
</style>