<template>
  <el-container>
    <el-aside></el-aside>
    <el-main>
      <h3>{{this.id ? '编辑任务' : '新增任务'}}</h3>
      <el-form
        style="width:700px;"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px">
        <!-- 任务编号 -->
        <el-form-item
          label="任务编号"
          prop="num">
          <el-input v-model="form.num" type="number" placeholder="输入任务编号"></el-input>
        </el-form-item>

        <!-- 任务标题 -->
        <el-form-item
          label="任务标题"
          prop="title">
          <el-input v-model="form.title" placeholder="输入任务标题"></el-input>
        </el-form-item>

        <!-- 任务状态 -->
        <el-form-item label="任务状态">
          <el-radio-group
            v-model="form.status"
            size="small">
            <el-radio-button
              v-for="(item, index) in status"
              :key="index"
              :label="index">
              {{item}}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>

        <!-- 开发人员 -->
        <el-form-item label="开发人员">
          <el-select
            style="width: 202px;"
            v-model="form.developer"
            placeholder="选择开发人员">
            <el-option
              v-for="(item, index) in developer"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 任务标签 -->
        <el-form-item label="任务标签">
          <el-select
            style="width: 202px;"
            v-model="form.tag"
            placeholder="选择任务标签">
            <el-option
              v-for="(item, index) in tags"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 任务备注 -->
        <el-form-item label="任务备注">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入任务备注"
            v-model="form.textarea">
          </el-input>
        </el-form-item>

        <!-- button -->
        <el-form-item>
          <el-button>重置</el-button>
          <el-button
            type="primary"
            :loading="btnLoading"
            @click="onSubmit">
            立即创建
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      id: '',
      form: {
        num: '',
        title: '',
        developer: '',
        status: '0',
        tag: '',
        textarea: ''
      },
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
      status: [
        '未开始',
        '开发中',
        '已完成'
      ],
      tags: [
        '未开发',
        '前端mock数据完成',
        '后端联调完成',
        '102测试完成'
      ],
      rules: {
        num: [
          { required: true, message: '请输入任务编号', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请输入任务标题', trigger: 'change' }
        ]
      },
      btnLoading: false
    }
  },
  mounted () {
    this.id = this.$route.params.id
    if (this.id) {
      this.init(this.id)
    }
  },
  methods: {
    // 根据ID获取数据
    init (id) {
      this.$ajax({
        method: 'get',
        url: '/api/list',
        params: {
          id
        }
      }).then((res) => {
        if (res.data.status) {
          this.form = res.data.payload
          this.form.developer = this.developer[this.form.developer]
          this.form.tag = this.tags[this.form.tag]
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    getAjax (url) {
      this.$ajax({
        method: 'post',
        url: url,
        params: this.form
      }).then((res) => {
        this.btnLoading = false
        if (res.data.status) {
          this.$message.success('操作成功')
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 提交按钮
    onSubmit () {
      this.btnLoading = true
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 编辑 || 新增
          if (this.id) {
            this.getAjax('/api/update')
          } else {
            this.getAjax('/api/add')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
h3{
  width: 600px;
  font-size: 28px;
  margin: 10px 0 30px 100px;
}
.el-form-item__label{
  font-weight: bolder !important;
}
</style>
