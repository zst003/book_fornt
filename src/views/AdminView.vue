<template>
    <div>
        <!-- 输入框 -->
         <!-- style="margin-bottom: 15px;表示下边距为15px -->
        <div style="margin-bottom: 15px;">
          <!-- v-model实现 数据双向绑定 -->
            <el-input v-model="params.name" style="width: 200px;"  placeholder="请输入姓名"></el-input>
            <el-input v-model="params.phone" style="width: 200px; margin-left: 10px;"  placeholder="请输入联系方式"></el-input>
            <el-button type="primary" style="margin-left: 10px;" @click="findBySearch()"  icon="el-icon-search">查询</el-button>
            <el-button type="danger" style="margin-left: 10px;" @click="reset()"  icon="el-icon-delete">清空</el-button>
            <el-button type="warning" style="margin-left: 10px;" @click="add()" icon="el-icon-plus">新增</el-button>
        </div>
        
        <!-- 表格 -->
        <div>
          <!-- :data="tableData" 表示绑定数据，数据绑定-->
            <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="phone" label="联系方式"></el-table-column>
        <el-table-column label="操作">
          <!-- slot-scope="scope" 表示当前行的数据 -->
          <template slot-scope="scope">
            <!-- @click="edit(scope.row)" 表示点击编辑按钮时，执行edit方法，并传入当前行的数据  
              其中scope.row表示当前行的数据-->
            <el-button type="success" @click="edit(scope.row)" icon="el-icon-edit">编辑</el-button>
            <!-- @confirm ="del(scope.row)" 表示点击删除按钮时，执行del方法，并传入当前行的数据,根据id来进行删除操作 
             用于在执行某些操作前弹出确认对话框，询问用户是否继续-->
            <el-popconfirm title="确定删除吗？" @confirm ="del(scope.row.id)">  
                      <el-button slot="reference" type="danger" style="margin-left: 5px;"  icon="el-icon-delete">删除</el-button>
            </el-popconfirm>
            
          </template>
            

        </el-table-column>
        </el-table>
        </div>
        <!-- 分页 -->
        <div style="margin-top: 20px;">
          
          <!-- size-change	pageSize 改变时会触发	每页条数 
           @size-change="handleSizeChange"：这是一个事件监听器，当用户改变每页显示的条目数时触发。handleSizeChange是Vue实例中定义的方法，用于处理每页条目数变化时的逻辑。
           @current-change="handleCurrentChange"：这是一个事件监听器，当用户切换到不同的页面时触发。handleCurrentChange是Vue实例中定义的方法，用于处理当前页码变化时的逻辑。
           :current-page="params.pageNum"：这是一个属性绑定，将分页组件的当前页码绑定到Vue实例的params.pageNum数据属性上。这样，当params.pageNum的值变化时，分页组件的当前页码也会相应更新。
           :page-sizes="[5,10,15,20]"：这是一个属性绑定，定义了一个数组，包含用户可以选择的每页显示条目数的选项。
           :page-size="params.pageSize"：这是一个属性绑定，将分页组件的每页显示条目数绑定到Vue实例的params.pageSize数据属性上。
            layout="total, sizes, prev, pager, next"：这个属性定义了分页组件的布局和功能。它包括：
            total：显示总条目数。
            sizes：显示每页条目数的选择器。
            prev：显示上一页的按钮。
            pager：显示页码列表。
            next：显示下一页的按钮。
            :total="total"：这是一个属性绑定，将分页组件的总条目数绑定到Vue实例的total数据属性上。-->
            <el-pagination 
            @size-change= "handleSizeChange" 
            @current-change= "handleCurrentChange"
            :current-page="params.pageNum"
            :page-sizes="[5,10,15,20]"
            :page-size="params.pageSize"
            layout="total, sizes, prev, pager, next"
            :total="total">
            </el-pagination>
        </div>
        <!-- 弹窗 -->
         <div> 
          <!-- :visible.sync="dialogFormVisible" 表示弹窗的显示状态，当dialogFormVisible的值改变时，弹窗的显示状态也会改变 -->
          <el-dialog title="请填写信息" :visible.sync="dialogFormVisible" width="30%">
              <el-form :model="form">
                <el-form-item label="姓名" label-width="15%">
                  <el-input v-model="form.name" autocomplete="off" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="性别" label-width="15%">
                  <el-radio v-model="form.sex" label="男">男</el-radio>
                  <el-radio v-model="form.sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="年龄" label-width="15%">
                  <el-input v-model="form.age" autocomplete="off" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="电话" label-width="15%">
                  <el-input v-model="form.phone" autocomplete="off" style="width: 90%"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
              </div>
            </el-dialog>
         </div>
    </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'AdminView',
  data() {
  return {
          params:{
              name: '',
              phone: '',
              pageNum: 1,   //表示当前页码
              pageSize: 5   //表示每页显示的条数
          },
            tableData: [],
            total: 0,
            dialogFormVisible: false, //不是不看到弹窗，而是弹窗默认是隐藏的
            form: {

            },
          }
        },
      //页面加载的时候，做一些事情在created里面
      // 生命周期钩子
      created() {
        //调用查询函数
        this.findBySearch();
      },
       //路由钩子
      //  包含组件方法的对象
      //定义一些页面上控件触发的事件调用的方法
      methods: {
                findBySearch(){
                              request.get("/admin/search", {
                                params: this.params
                              }).then(res => {
                                if(res.code === '0'){
                                  this.tableData = res.data.list;  //将查询到的结果赋值给tableData
                                    this.total = res.data.total;  //将查询到的结果的总条数赋值给total
                                }else{
                                  this.$message({
                                                    message: res.msg,
                                                    type: 'success'
                                                  });

                                }
                              })
                              },
                              add(){
                                this.form = {};  //清空form
                                this.dialogFormVisible = true;  //弹窗显示
                              },
                              edit(obj){
                                this.form = obj;  //将当前行的数据赋值给form
                                this.dialogFormVisible = true;  //弹窗显示

                              },
                              reset(){
                                this.params={
                                  name: '',
                                  phone: '',
                                  pageNum:1,   //表示当前页码
                                  pageSize:5   //表示每页显示的条数
                                }
                                this.findBySearch();  //表示重新加载
                              },
                              handleSizeChange(pageSize){
                                this.params.pageSize = pageSize;  //
                                this.findBySearch();
                              },
                              handleCurrentChange(pageNum){
                                this.params.pageNum = pageNum;  //
                                this.findBySearch();
                              },
                              submit(){
                                request.post("/admin",this.form).then(res=>{
                                  if(res.code === '0'){
                                    this.$message({
                                                    message: '操作成功',
                                                    type: 'success'
                                                  });
                                    this.dialogFormVisible = false;  //弹窗关闭
                                    this.findBySearch();  //重新加载表格

                                  }else{
                                    this.$message({
                                                    message: res.msg,
                                                    type: 'error'
                                                  });

                                  }
                                })
                              },
                              del(id){
                               request.delete("/admin/"+id).then(res=>{
                                 if(res.code === '0'){
                                   this.$message({
                                                 message: '删除成功',
                                                 type: 'success'
                                   });
                                   this.findBySearch();  //重新加载表格
                                 }else{
                                   this.$message({
                                                 message: res.msg,
                                                 type: 'success'
                                   });
                                 }
                                })
                              }
                            }
                            
                            
  }

  </script>