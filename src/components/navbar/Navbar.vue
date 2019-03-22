<template>
  <el-menu
    :default-active="activeTab"
    class="el-menu-demo nav"
    mode="horizontal"
    :router="true">
    <template v-for="item in navs" v-if="!item.hidden">  
      <el-submenu :index="item.path" :key="item.path" v-if="item.submenu">
        <!--用el ui 的title进行solt分发菜单-->
        <template slot="title"><i class="iconfont" :class="item.iconCls?item.iconCls:''"></i><badge :data="item" class="item"> {{item.title}}</badge></template>  
        <!--item.name和item.children.name来配置菜单栏和子菜单栏的名称-->
        <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">
        	<a v-if="child.isLink" style="text-decoration: none;color :#909399" :href="child.linkUrl" target="_blank"> {{child.title}}</a>
        	<span v-if="!child.isLink"> {{child.title}}</span>
        	<badge class="mark" :data="child"></badge>
        </el-menu-item>
      </el-submenu>
      <el-menu-item class="first-menu" v-if="!item.submenu && item.isLink" :index="item.path" :key="item.path" ><a style="text-decoration: none;color :#fff" :href="item.linkUrl" target="_blank"> {{item.title}}</a></el-menu-item>
      <el-menu-item :title="topNav" class="first-menu" v-if="!item.submenu && !item.isLink" :index="item.path" :key="item.path"><i class="iconfont" :class="item.iconCls?item.iconCls:''"></i><badge :data="item" class="item"> {{item.title}}</badge></el-menu-item>
    </template>
    <!--<template>
    	<el-submenu index=""  v-if="noHidden.length>6">
        <template slot="title">更多应用</template>
        <div class="more">
        	<div class="search">
        		 <el-input
        		 		size="mini"
						    placeholder="输入中文或字母检索"
						    v-model="menuName">
						    <i slot="prefix" class="el-input__icon el-icon-search"></i>
						  </el-input>
        	</div>
	        <el-carousel  :autoplay=false height="335px">
				    <el-carousel-item v-for="(itemArr,index) in carouselArr" :key="index">
					    	<div id="block">
					    		<el-menu-item class="blockMenu" v-for="item in itemArr" :index="item.path" :key="item.path" >
					    			<div v-if="item.isLink">
					    				<a style="text-decoration: none;display: block;" :href="item.linkUrl" target="_blank">
						    				<i :class="['msc-text-color','iconfont',item.iconCls ? item.iconCls : 'icon-liebiao']"></i>
						    				<span  class="msc-textColor-hover">{{item.title}}</span>
					    				</a>
					    			</div>
					    			<div v-if="!item.isLink"  >
					    				<span style="display: block;">
						    				<badge :data="item" class="item">
						    					<i :class="['msc-text-color','iconfont',item.iconCls ? item.iconCls : 'icon-liebiao']"></i>
						    				</badge>
						    				<span class="msc-textColor-hover">{{item.title}}</span>
					    				</span>
					    			</div>
					    		</el-menu-item>
					    	</div>
				    </el-carousel-item>
				  </el-carousel>
		   	</div>
    	</el-submenu>
    </template>-->
  </el-menu>
</template>
<script>
  export default {
    name: 'navbar',
    props: ['page', 'navs'],
    data () {
      return {
        noHidden:[],
        showMenu:[],
        blockMenu:[],
        carouselArr:[],
        menuNum:24,
        menuName:'',
        activeTab: ''
      }
    },
    computed: {
      topNav () {
        return this.$store.getters.topNav
      },
      site () {
        return this.$store.getters.site
      },
//    blockMenuNum(){
//    	return Math.ceil(this.blockMenu.length/this.menuNum)
//    }
    },
    created(){
      this.activeTab = this.$store.getters.topNav
    	console.info(this.navs, this.$route.path)
//  	for(let item of this.navs || []){
//  		if(!item.hidden){
//  			this.noHidden.push(item)
//  		}
//  	}
//  	let _this=this
//  	if(this.noHidden.length>6){
//  		let arr2=[]
//	  		this.noHidden.forEach(function(item, index, array) {
//	  			if(index<6){
//	  				_this.showMenu.push(item)
//	  			}else{
//	  				arr2.push(item)
//	  			}
//				});
//				//第三步
//			this.getChilds(arr2);
//				for(let i=0;i<this.blockMenuNum;i++){
//					this.carouselArr[i]=[]
//					for(let j=this.menuNum*i;j<this.blockMenu.length;j++){
//						if(j<(this.menuNum*(i+1))){
//							this.carouselArr[i].push(this.blockMenu[j])
//						}
//					}
//				}
//  	}else{
//  		this.noHidden.forEach(function(item, index, array) {
//	  				_this.showMenu.push(item);
//				})
//  	}
    },
    methods: {
    	getChilds(arr){
    		for(let item of arr){
    			if(item.children){
    				this.getChilds(item.children);
    			}else{
    				this.blockMenu.push(item);
    			}
    		}
    	}
    },
    watch: {
      '$route': function(to, from){ // 路由改变时执行
        this.activeTab = this.$store.getters.topNav
      }
    }
  }
</script>

<style scoped>
	.search{margin-bottom: 5px;overflow: hidden;}
	.search .el-input{width: 200px;float: right ;margin-right: 35px;margin-top: 10px;} 
	.more{width: 510px;height: 380px;background: #fff;}
	.more #block{overflow: hidden;padding:0px 0px  15px 25px;box-sizing: border-box;}
	.more #block .blockMenu{width:68px;height:auto;line-height:normal;background-color:#fff!important;float: left;padding:10px 5px;box-sizing:border-box;text-align: center;cursor: pointer;margin:0 10px 10px 0;}
	.more #block .blockMenu i{font-size: 22px;display: block;margin-bottom: 10px;}
	.more #block .blockMenu span{font-size: 12px;color: #333;display: block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
  >>> .el-badge__content{border: none;}
  .nav i {
     margin-right: 5px;
     font-size: 16px;
    }
  >>> .el-badge__content.is-fixed{
    top:18px;
    right:4px;
  }
  .mark{float: right;}
  >>>.el-menu--horizontal{border-bottom: none;}
  >>> .el-menu--horizontal>.el-menu-item.is-active, .el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
    border-bottom-width: 4px;
  }
  .is-opened >>> .el-submenu__title .el-badge__content {
    display: none;
  }
  .el-icon-arrow-down{font-size: 12px;}
 >>>.el-carousel__button{background:#666;width: 5px;height: 5px;border-radius: 50%;opacity: 0.3;}
.more >>>.el-carousel__arrow{width: 12px;height: 24px;border-radius: 0;}
.more >>>.el-carousel__arrow--left {left:5px}
.more >>>.el-carousel__arrow--right {right:5px}
.el-menu--horizontal{border-bottom: none;}
</style>
<style>
	.el-menu--horizontal .el-menu--popup{padding: 0;}
</style>