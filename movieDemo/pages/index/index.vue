<template>
	<view class="page">
		<!-- 轮播图 start -->
		<!-- interval :自动切换的时间间隔 -->
		<swiper :indicator-dots="true" :autoplay="true" class="carousel" :interval="3000" :duration="1000">
			<swiper-item v-for="banner of bannerList" :key="banner.url">
				<image :src="`../../static/banner/banner${banner.sort}.jpg`" class="carousel"></image>
			</swiper-item>
		</swiper>
		<!-- 轮播图 end -->

		<!-- 热门电影 start -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/tabBarIcon/news_info_active.png" class="hot-ico"></image>
				<view class="hot-title">
					热门电影
				</view>
			</view>
		</view>
		
		<scroll-view scroll-x="true" class="page-block hot-scroll">
			
			<view class="single-poster" v-for="(superhero,i) in hotSuperHeroList" :key="i">
				<view class="poster-wapper">
					<image :src="`../../static/movie/${i+1}.jpg`" class="poster-img"></image>
					<view class="movie-name">
						{{superhero.name}}
					</view>
					<!-- <trailerStars :innerScope="superhero.scrore" showNum="1"></trailerStars> -->
					<trailerStars innerScope="5.1" showNum="1"></trailerStars>
				</view>
			</view>
			
			
		</scroll-view>


		<!-- 热门电影 end -->

	</view>
</template>

<script>
	// 导入自定义组件
	// import helloCom from '../../components/helloCom.vue';
	import trailerStars from '../../components/trailerStars.vue';
	export default {
		data() {
			return {
				title: 'Hello',
				bannerList: [], // 轮播图 数据
				hotSuperHeroList: [], // 热门超英 数据
				hotTrailerList: [], // 热门预告 数据
			}
		},
		onLoad() { // 页面加载，只会执行一次
			var _this = this
			
			// 获取 轮播图 数据
			_this.fetchBanner()
			
			// 获取 热门超英 数据
			_this.fetchHotData('/index/movie/list',"superhero",function(res){
				if (res.data.statusCode == 200) {
					_this.hotSuperHeroList = res.data.data
				}
			})
			
			// 获取 热门预告 数据
			_this.fetchHotData('/index/movie/list',"trailer",function(res){
				if (res.data.statusCode == 200) {
					_this.hotTrailerList = res.data.data
				}
			})
		},
		methods: {
			// 获取 首页轮播图 数据
			fetchBanner() {
				uni.request({
					url: this.baseURL + '/index/banners/list', //仅为示例，并非真实接口地址。
					method: "GET",
					data: {
						name: '首页轮播图'
					},
					success: (res) => {
						if (res.data.statusCode == 200) {
							console.log(res.data.data);
							this.bannerList = res.data.data.list
						}
					}
				});
			},
			// 获取 热门超英/预告 数据
			fetchHotData(reqUrl,type,callback) {
				uni.request({
					url: this.baseURL + reqUrl, //仅为示例，并非真实接口地址。
					method: "GET",
					data: {
						type // 表示 查询数据的 类型 superhero / prevue
					},
					success: (res) => {
						callback(res)
						
					}
				});
			},
		},
		components:{
			// helloCom,
			trailerStars
		}
	}
</script>

<style>
	@import url("index.css");
</style>
