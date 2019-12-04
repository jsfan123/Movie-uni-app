<template>
	<view class="page">
		<view class="search-block">
			<view class="search-icon-wapper">
				<image src="/../../static/icons/搜索.png" class="search-icon"></image>
			</view>
			<input type="text" placeholder="搜索预告" maxlength="15" value="" class="search-text" focus />
		</view>
		
		<view class="movie-list page-block">
			<view v-for="list in 10" class="movie-wapper">
				<image src="/static/movie/1.jpg" class="poster-img"></image>
				<view class="movie-name">
					冰雪奇缘2
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
@import url("search.css");
</style>
