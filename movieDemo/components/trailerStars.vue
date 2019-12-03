<template>
	<view>
		<view class="movie-score-wapper">
			<image
			 src="/../../static/movie/实心星星.png" 
			 class="movie-star"
			 v-for="(yellow,i) in yellowScore"></image>
			 <image 
			 src="/../../static/movie/star_gray.png" 
			 class="movie-star"
			 v-for="(gray,i) in grayScore"></image>
			 <view class="movie-score" v-if="showNum == 1">
			 	9.1
			 </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yellowScore: 0, // 黄色星星数
				grayScore: 5, // 灰色星星数
			};
		},

		props: {
			innerScope: 0, // 定义外部传入的分数
			showNum: 0, // 是否显示具体的分值，1 显示 0 不显示
		},

		// 生命周期，组件创建完成后被调用
		created() {

			var tempScore = 0;
			if (this.innerScope != null && this.innerScope != undefined && this.innerScope != '') {
				tempScore = this.innerScope
			}
			// 计算 有几个 黄色星星 ，几个灰色 星星
			var yellowScore = parseInt(tempScore / 2)
			var grayScore = 5 - yellowScore

			this.yellowScore = yellowScore
			this.grayScore = grayScore
			
		}

	}
</script>

<style>
	.movie-score-wapper {
		width: 200upx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.movie-star {
		width: 25upx;
		height: 25upx;
		margin-top: 6upx;
	}

	.movie-score {
		font-size: 12px;
		color: grey;
		margin-left: 8upx;
	}
</style>
