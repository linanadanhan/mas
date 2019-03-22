<template>
  <el-menu :collapse="isCollapse?isCollapse:isOwnCollapse" :default-active="page.path" class="el-menu-vertical-demo" :router="true">
    <template v-for="item in navs" v-if="!item.hidden">  
      <el-submenu :index="item.path" :key="item.path" v-if="item.submenu">
        <!--用el ui 的title进行solt分发菜单-->
        <template slot="title">
          <i class="iconfont" :class="item.iconCls?item.iconCls:'icon-icon-gridtwoup'"></i> <span slot="title">{{item.title}}<badge :data="item" class="mark"/></span>
        </template>  
        <!--item.name和item.children.name来配置菜单栏和子菜单栏的名称-->  
        <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">
        	<a v-if="child.isLink" style="text-decoration: none;color :#fff" :href="child.linkUrl" target="_blank">
            <i class="iconfont" :class="child.iconCls?child.iconCls:'icon-icon-gridtwoup'"></i> <span slot="title">{{child.title}}<badge :data="child" class="mark"/></span>
           </a>
        	<span v-if="!child.isLink">
            <i class="iconfont" :class="child.iconCls?child.iconCls:'icon-icon-gridtwoup'"></i> <span slot="title">{{child.title}}<badge :data="child" class="mark"/></span>
          </span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-if="!item.submenu && item.isLink" :index="item.path" :key="item.path"> <a style="text-decoration: none;color :#fff" :href="item.linkUrl" target="_blank"><i class="iconfont" :class="item.iconCls?item.iconCls:'icon-icon-gridtwoup'"></i> <span slot="title">{{item.title}}<badge :data="item" class="mark"/></span></a>
      </el-menu-item>  
      <el-menu-item v-if="!item.submenu && !item.isLink" :index="item.path" :key="item.path"><i class="iconfont" :class="item.iconCls?item.iconCls:'icon-icon-gridtwoup'"></i> <span slot="title">{{item.title}}<badge :data="item" class="mark"/></span></el-menu-item>  
    </template>  
  </el-menu>
</template>
<script>
export default {
  name: "sub-navbar",
  props: ["page", "navs","isCollapse"],
  data() {
    return {
      isOwnCollapse:false
    };
  },
  computed: {},
  created() {}
};
</script>

<style scoped>
>>> .el-badge__content {
  border: none;
}
.mark {
  float: right;
}
.is-opened > .el-submenu__title > .el-badge {
  display: none;
}
i{font-size: 18px;margin-right: 5px;}
</style>