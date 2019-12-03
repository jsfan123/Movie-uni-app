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


		<!-- 热门预告 start -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/tabBarIcon/news_info_active.png" class="hot-ico"></image>
				<view class="hot-title">
					热门预告
				</view>
			</view>
		</view>


		<view class="hot-movies page-block">
			<video
			 v-for="trailer in hotTrailerList"
			 :src="trailer.trailer"
			 :poster="trailer.poster"
			 class="hot-movie-single"
			  controls></video>
		</view>
		<!-- 热门预告 end -->


		<!-- 猜你喜欢 start -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/tabBarIcon/news_info_active.png" class="hot-ico"></image>
				<view class="hot-title">
					猜你喜欢
				</view>
			</view>
		</view>
		
		<view class="guess-u-like page-block">
			<view class="single-like-movie">
				<image :src="`../../static/movie/1.jpg`" class="like-moive"></image>
				<!-- 影片信息 -->
				<view class="movie-desc">
					<view class="movie-title">
						蝙蝠侠大战超人蝙蝠侠大战超人蝙蝠侠大战超人
					</view>
					<!-- 星级 -->
					<trailerStars innerScope="5.1" showNum="0"></trailerStars>
					<view class="movie-info">
						2018 / 美国 / 科幻 动作
					</view>
					<view class="movie-actor">
						本·阿弗莱克 / 亨利·卡维尔 / 艾米·亚当斯 / 盖尔·加朵
					</view>
				</view>
				<view class="movie-star" @click="praiseMe">
					<image src="../../static/icons/点赞.png" class="praise-ico"></image>
					<view class="praise-me">
						点赞
					</view>
					<view :animation="animationData" class="praise-me animation-opacity">
						+1
					</view>
				</view>
			</view>
		</view>
		<!-- 猜你喜欢 end -->
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
				animationData: {}, // 动画对象
			}
		},
		onUnload(){ // 页面卸载，触发
			this.animationData = {}
		},
		onLoad() { // 页面加载，只会执行一次
			var _this = this


			// 在页面创建的时候，创建一个临时动画对象
			this.animation = uni.createAnimation({
				
			})
				
			// 获取 轮播图 数据
			_this.fetchBanner()

			// 获取 热门超英 数据
			_this.fetchHotData('/index/movie/list', "superhero", function(res) {
				if (res.data.statusCode == 200) {
					_this.hotSuperHeroList = res.data.data
				}
			})

			// 获取 热门预告 数据
			_this.fetchHotData('/index/movie/list', "trailer", function(res) {
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
			fetchHotData(reqUrl, type, callback) {
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
			// 实现点赞动画效果
			praiseMe(){
				// 构建动画数据，并且通过step 来表示这段动画的完成
				this.animation.translateY(-56).opacity(1).step({
					duration:400 // 动画持续时间，400ms
				})
				// 导出动画数据到 view 组件，实现组价你的动画效果
				this.animationData = this.animation.export()
				
				// 动画执行600ms 之后，还原到之前的位置，
				setTimeout(function() {
					this.animation.translateY(0).opacity(0).step({
						duration:0 // 动画持续时间，0ms
					})
					this.animationData = this.animation.export()
				}.bind(this), 600);
				
			},
		},
		components: {
			// helloCom,
			trailerStars
		}
	}
</script>

<style>
	@import url("index.css");
</style>
