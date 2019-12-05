<template>
	<view class="page">
		<view class="search-block">
			<view class="search-icon-wapper">
				<image src="/../../static/icons/搜索.png" class="search-icon"></image>
			</view>
			<input 
			type="text" 
			placeholder="搜索预告" 
			maxlength="15" 
			v-model="paramsObj.search" 
			class="search-text" 
			confirm-type="next"
			@confirm="searchMe"			
			focus />
		</view>

		<view class="movie-list page-block">
			<view v-for="movie in searchList" class="movie-wapper">
				<image src="/static/movie/1.jpg" class="poster-img"></image>
				<view class="movie-name">
					{{ movie.name }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchList: [],
				paramsObj:{
					currentPage: 1,		// 当前页
					pageSize: 10,		// 页容量
					search: "",			// 搜索关键字
				},
				totalLength:0,  		// 总记录数
			}
		},
		onLoad() {
			let _this = this;

			

			// 加载 paramsObj 表示 获取搜索页的默认数据,
			_this.fetchSearchData(this.paramsObj,(res)=>{
				console.log(res.data)
				if(res.data.statusCode == 200){
					this.totalLength = res.data.count
					this.searchList = res.data.data
				}
			})
		},
		// 页面上拉 触发
		onReachBottom() {
			let currentPage = ++this.paramsObj.currentPage
			let totalPage = Math.ceil(this.totalLength / this.paramsObj.pageSize)
			console.log(totalPage)
			// 如果当前页 大于了 总页数，则不再发送请求
			if(currentPage > totalPage) {
				return
			}
			// 否则触发更新函数
			this.fetchSearchData(this.paramsObj,(res)=>{
				console.log(res.data)
				if(res.data.statusCode == 200){
					this.totalLength = res.data.count
					this.searchList = this.searchList.concat(res.data.data)
				}
			})
		},
		methods: {
			// 获取搜索页的 预告片数据，paramsObj表示传递的参数对象。
			fetchSearchData(paramsObj, callback) {
				uni.showLoading({
					mask: true,
					title: "加载中..."
				})
				uni.showNavigationBarLoading()
				uni.request({
					url: this.baseURL + '/search/list', //仅为示例，并非真实接口地址。
					method: 'GET',
					data: paramsObj,
					success: res => {
						callback(res)
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading()
						uni.hideNavigationBarLoading()
					}
				});
			},
			// 点击 软键盘上的搜索时 触发
			searchMe(e){
				let me = this;
				// 清空 数据
				me.searchList = []
				// 将 当前页置为 1
				this.paramsObj.currentPage = 1
				// 调用搜索函数
				me.fetchSearchData(this.paramsObj,(res)=>{
					console.log(res)
					me.searchList = res.data.data
				})
			}
		}
	}
</script>

<style>
	@import url("search.css");
</style>
