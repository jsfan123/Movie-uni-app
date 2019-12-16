<template>
	<view class="page">
		<!-- 视频播放 start -->
		<view class="player">
			<video src=""
			poster="../../static/movie/1.jpg"
			 controls
			 class="movie-video"></video>
		</view>
		<!-- 视频播放 end -->
		
		<!-- 影片基本信息 start -->
		<view class="movie-info">
			<image src="../../static/movie/1.jpg" class="movie-cover"></image>
			<view class="movie-i-right">
				<view class="movie-name">{{trailer.name}}</view>
				<view class="movie-intro">{{trailer.protagonist}}</view>
				<view class="movie-intro">{{trailer.originalName}}</view>
				<view class="movie-intro">{{trailer.movieType}}</view>
				<view class="movie-intro">{{trailer.releaseDate}}</view>
				<view class="score-block">
					<view class="big-score">
						<view class="score-words">综合评分：</view>
						<view class="movie-score">{{ trailer.score }}</view>
					</view>
					<view class="score-stars" v-if="trailer.score >= 0">
						<trailerStars :innerScope="trailer.score" showNum="0"></trailerStars>
						<view class="prise-counts">
							{{ trailer.priseCounts }} 人点赞
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 影片基本信息 start -->
	</view>
</template>

<script>
	// 导入自定义组件
	import trailerStars from '../../components/trailerStars.vue';
	export default {
		data() {
			return {
				trailer:{},
				trailerId:''
			}
		},
		onLoad(params) {
			// 获取上一个页面传递的参数，params：是一个对象
			this.trailerId = params.trailerId;
			this.fetchMovie()
		},
		methods: {
			// 获取影片详情
			fetchMovie(){
				uni.request({
					url: this.baseURL + '/movie',
					method:"GET",
					data:{
						id:this.trailerId
					},
					success:(res) => {
						if(res.data.statusCode == 200) {
							this.trailer = res.data.data
						}
					}
				})
			},
			
		},
		components:{
			trailerStars
		}
	}
</script>

<style>
@import url("./movie.css");
</style>
