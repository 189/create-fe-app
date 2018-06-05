<template>
	<div class="container">
		<div class="logo"></div>
		<div class="title">Vue Single Page Applycation</div>
		<div class="userbox">
			<div v-if="users.fetching">用户信息正在获取中...</div>
			<template v-else>
				<div v-if="users.info.name">
					用户名：{{ users.info.name }} 
					<a href="javascript:;" v-on:click="logout">退出</a>
				</div>
				<a href="javascrip:;" v-on:click='login' v-else>登录</a>
			</template>
		</div>
		<router-link class="button" to="/">home</router-link>
		<router-link class="button" :to="{ name : 'users' }">用户列表</router-link>
		<router-link class="button" :to="{ name : 'about' }">关于我们</router-link>
		<router-view/>
	</div>
</template>
<script>
import * as types from '~/store/mutation-types';
import { mapState } from 'vuex';
import '~/assets/styles/base.scss';

export default {
  name: "app",
  data() {
    return {};
	},
	computed : { ...mapState(['users']) },
	methods : {
		fetchUserInfo(){
			this.$store.dispatch({ type : types.UPDATE_USER_INFO });
		},
		logout(){
			this.$store.dispatch({ type : types.LOGOUT });
		},
		login(){
			this.$store.dispatch({ type : types.UPDATE_USER_INFO })
		}
	},
	mounted(){
		this.fetchUserInfo();
	}
};
</script>
<style lang="scss">
	
</style>

