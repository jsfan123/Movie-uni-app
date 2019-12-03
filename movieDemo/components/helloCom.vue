<template name="helloCom"> <!-- 定义组件的名称 为 helloCom -->
	<view>
		<view class="">
			{{msg}}
			{{text}}
		</view>
		<input type="text" :value="text" />
	</view>
	
</template>

<script>
	export default {
		name:"helloCom", // 定义组件的名称 为 helloCom
		data() {
			return {
				msg:"I'm helloCom compoent!"
			}
		},
		props:{
			text:{
				type:String
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
