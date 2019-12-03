<template>
<el-dialog class="my-dialog" :title="title" :visible.sync="isOpen" @close="selfClose" :close-on-click-modal="false">
    <slot></slot>
    <div slot="footer" class="dialog-footer">
        <el-button @click="cancelFun">取 消</el-button>
        <el-button type="primary" @click="saveFun">确 定</el-button>
    </div>
</el-dialog>
</template>

<script>
export default {
    props:{
        dialogFormVisible:Boolean, // 弹出框 状态
        title:String,       // 标题
        cancelFun:Function, // 取消 事件
        saveFun:Function,   // 确定 事件
    },
     watch:{
        dialogFormVisible:function(newVal){
            console.log(newVal)
            this.isOpen = newVal;
        }
    },
    data(){
        return {
            isOpen:false
        }
    },
    methods:{
        // 关闭前的回调，会暂停 Dialog 的关闭
        selfClose(){
            // 将值的改变，告诉父组件
            this.$emit('closeStatus',this.isOpen)
        }
    }    
}
</script>

<style>

</style>
