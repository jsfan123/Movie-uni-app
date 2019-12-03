<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="Title"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.importance"
        placeholder="Imp"
        clearable
        style="width: 90px"
        class="filter-item"
      >
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select
        v-model="listQuery.type"
        placeholder="Type"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in calendarTypeOptions"
          :key="item.key"
          :label="item.display_name+'('+item.key+')'"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="listQuery.sort"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >Search</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >Add</el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >Export</el-button>
      <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey=tableKey+1"
      >reviewer</el-checkbox>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="电影名称" width="110">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="电影导演" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.director }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电影主演" align="center">
        <template slot-scope="scope">{{ scope.row.protagonist }}</template>
      </el-table-column>
      <el-table-column label="电影分数" align="center">
        <template slot-scope="scope">{{ scope.row.score }}</template>
      </el-table-column>
      <el-table-column label="电影类型" align="center">
        <template slot-scope="scope">{{ scope.row.movieType }}</template>
      </el-table-column>
      <el-table-column label="电影原名" align="center">
        <template slot-scope="scope">{{ scope.row.originalName }}</template>
      </el-table-column>
      <el-table-column label="制片国家/地区" align="center">
        <template slot-scope="scope">{{ scope.row.producerPlace }}</template>
      </el-table-column>
      <el-table-column label="语言" align="center">
        <template slot-scope="scope">{{ scope.row.language }}</template>
      </el-table-column>
      <el-table-column label="上映时间" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.releaseDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时长" align="center">
        <template slot-scope="scope">{{ scope.row.totalTime }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.row)"></el-button>
          <el-button type="success" icon="el-icon-delete" circle @click="handleRemove(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      title="编辑电影信息"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      :wrapperClosable="false"
      size="35%"
      ref="drawer"
    >
      <el-form :model="model" label-width="120px">
        <el-form-item label="名称">
          <el-input v-model="model.name" type="text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="导演">
          <el-input v-model="model.director" type="text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="主演">
          <el-input v-model="model.protagonist" type="textarea" :autosize="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电影封面">
          <el-input v-model="model.poster" type="text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="预告片截图">
          <el-input v-model="model.cover" type="text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="预告片">
          <el-input v-model="model.trailer" type="text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分数">
          <el-input v-model="model.score" type="text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="model.movieType" type="text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电影 原名">
          <el-input v-model="model.originalName" type="text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="制片国家/地区">
          <el-input v-model="model.producerPlace" type="text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="语言">
          <el-input v-model="model.language" type="text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上映时间">
          <el-input v-model="model.releaseDate" type="text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时长">
          <el-input v-model="model.totalTime" type="text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="情节描述">
          <el-input v-model="model.plotDesc" type="textarea" :autosize="true" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button @click="cancelFun">取 消</el-button>
        <el-button
          type="primary"
          @click="$refs.drawer.closeDrawer()"
          :loading="formLoading"
        >{{ formLoading ? '提交中 ...' : '确 定' }}</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getList, create, save } from "@/api/movie";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      dialog: false,
      formLoading: false,
      timer: null,
      pageSize: 5,
      currentPage: 1,
      search: "",
      model: {},
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
    };
  },
  created() {
    this.fetchData();
  },
  components: {},
  methods: {
    // 获取 电影列表数据
    fetchData() {
      this.listLoading = true;
      getList({
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        search: this.search
      }).then(response => {
        console.log(response.data);
        this.list = response.data;
        this.listLoading = false;
      });
    },
    // 编辑电影信息
    handleEdit(val) {
      // 弹出对话框，进行信息编辑
      this.model = Object.assign({}, val);
      this.dialog = true;
    },
    // 关闭 drawer 前触发
    handleClose(done) {
      if (this.formLoading) {
        return;
      }
      this.$confirm("确定要提交表单吗？")
        .then(_ => {
          this.formLoading = true;
          this.saveFun(this.model);
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.formLoading = false;
            }, 400);
          }, 2000);
        })
        .catch(_ => {
          done();
          this.cancelFun();
        });
    },
    // 删除 单个电影
    handleRemove(val) {},
    // 取消编辑  信息
    cancelFun() {
      this.$message({
        type: "warning",
        message: "已取消编辑！"
      });
      this.dialog = false;
    },
    async saveFun(data) {
      console.log("我是保存的方法");
      // 编辑
      save(data).then(res => {
        if (res.data.statusCode == 200) {
          this.$message.success(res.data.message);
        } else {
          this.$message.error(res.data.message);
        }
        this.dialog = false;
      });
    }
  }
};
</script>

<style >
/* 调整 抽屉的样式 */
.el-drawer__header {
  align-items: center;
  margin-bottom: 20px;
}
.el-drawer__body {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.el-drawer__body .el-form {
  padding-right: 40px;
  flex: 1;
  overflow: auto;
}
.demo-drawer__footer {
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 2px solid #409eff;
}
</style>