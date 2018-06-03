<template>
	<div id="app">
    <ul class="menu">
			<li> <router-link to="/"> 首页</router-link></li>
			<li> <router-link :to="{ name : 'users' }">用户列表</router-link></li>
		</ul>
		<div class="userbox">
			<div v-if="users.fetching">用户信息正在获取中...</div>
			<template v-else>
				<div v-if="users.info.name">
					用户名：{{ users.info.name }} 
					<a href="javascript:;" v-on:click="logout">退出</a>
				</div>
				<div v-else>用户未登录</div>
			</template>
		</div>
		<router-view/>
	</div>
</template>
<script>
import * as types from './store/mutation-types';
import { mapState } from 'vuex';
export default {
  name: "app",
  data() {
    return {};
	},
	computed : {
		...mapState(['users'])
	},
	components: {},
	methods : {
		fetchUserInfo(){
			this.$store.dispatch({
				type : types.UPDATE_USER_INFO
			});
		},
		logout(){
			this.$store.dispatch({
				type : types.LOGOUT
			});
		}
	},
	mounted(){
		this.fetchUserInfo();
	}
};
</script>

<style lang="scss">
.router-link-exact-active {
	color : red;
}
</style>
