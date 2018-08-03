<template>
  <el-container>
    <el-aside></el-aside>
    <el-main>
      <h3>任务列表</h3>
      <!-- search -->
      <el-form
        :inline="true"
        class="demo-form-inline">
        <el-form-item v-if="admin">
          <el-button
            type="primary"
            @click="$router.push('/add')">
            新增任务
          </el-button>
          <el-button
            type="primary"
            @click="allTask">
            全部任务
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="search.developerFilter"
            placeholder="开发人员"
            @change="developerFilter">
            <el-option
              v-for="(item, index) in developer"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
          <el-select
            v-model="search.statusFilter"
            placeholder="任务状态"
            @change="statusFilter">
            <el-option
              v-for="(item, index) in status"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- table -->
      <el-table
        :data="tableData"
        :default-sort = "{prop: 'status'}"
        stripe
        style="width: 1000px;">
        <el-table-column
          type="index"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="num"
          label="任务编号"
          width="120px">
          <template slot-scope="scope">
            <a :href="'http://jira.saicmobility.com:8080/browse/' + scope.row.num" target="_blank">APP-{{scope.row.num}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="任务名称">
        </el-table-column>
        <el-table-column
          prop="developer"
          label="开发人员"
          width="100px"
          align="center">
          <template slot-scope="scope">
            <el-tag size="mini"
              v-if="developer[scope.row.developer]">
              {{developer[scope.row.developer]}}
            </el-tag>
            <el-tag size="mini" type="info" v-else>暂无分配</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="任务状态"
          width="120px"
          align="center">
          <template slot-scope="scope">
            <el-tag
              size="mini"
              type="danger"
              v-if="scope.row.status == 0">
              未开始
            </el-tag>
            <el-tag
              size="mini"
              type="success"
              v-if="scope.row.status == 1">
              进行中
            </el-tag>
            <el-tag
              size="mini"
              type="info"
              v-if="scope.row.status == 2">
              已完成
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="tag"
          label="任务标签"
          width="140px"
          align="center">
          <template slot-scope="scope">
            <el-tag
              type="danger"
              size="mini"
              v-if="scope.row.tag == 0">
              未开发
            </el-tag>
            <el-tag
              type="warning"
              size="mini"
              v-if="scope.row.tag == 1">
              前端mock数据完成
            </el-tag>
            <el-tag
              type="success"
              size="mini"
              v-if="scope.row.tag == 2">
              后端联调完成
            </el-tag>
            <el-tag
              type="info"
              size="mini"
              v-if="scope.row.tag == 3">
              102测试完成
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="textarea"
          label="任务备注"
          width="160px">
          <template slot-scope="scope">
            {{scope.row.textarea}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="80px"
          align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="$router.push('/add/' + scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      // 开发人员
      developer: [
        '许明浩',
        '李林林',
        '汤雅冰',
        '赵盼盼',
        '肖秋林',
        '刘伟',
        '张帅',
        '高杨',
        '刘虎林',
        '刘先逸',
        '彭龙斌',
        '马勇',
        '吕士杰'
      ],
      // 状态
      status: [
        '未开始',
        '开发中',
        '已完成'
      ],
      // 标签
      tags: [
        '未开发',
        '前端mock数据完成',
        '后端联调完成',
        '102测试完成'
      ],
      // 表格数据
      tableData: [],
      // 数据搜索
      search: {
        developerFilter: '',
        statusFilter: ''
      },
      // 虚拟管理员
      admin: localStorage.getItem('leelean')
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init (params) {
      this.$ajax({
        method: 'get',
        url: '/api/list',
        params: params || ''
      }).then((res) => {
        if (res.data.status) {
          this.tableData = res.data.payload
        } else {
          this.tableData = []
        }
      })
    },

    // 根据开发人员查询
    developerFilter (index) {
      this.search.statusFilter = ''
      let params = {
        developer: index
      }
      this.init(params)
    },

    // 根据状态查询
    statusFilter (index) {
      this.search.developerFilter = ''
      let params = {
        status: index
      }
      this.init(params)
    },

    // 显示全部任务
    allTask () {
      if (this.search.developerFilter === '' && this.search.statusFilter === '') {
        return false
      }
      this.search.developerFilter = this.search.statusFilter = ''
      this.init()
    }
  }
}
</script>

<style scoped>
h3{
  width: 600px;
  font-size: 28px;
  margin: 10px 0 30px 0;
}
a{
  color: #409EFF;
  font-weight: bolder;
}
</style>
