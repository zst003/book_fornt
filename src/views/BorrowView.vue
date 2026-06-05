<template>
    <div>
        <!-- 输入框 -->
         <!-- style="margin-bottom: 15px;表示下边距为15px -->
        <div style="margin-bottom: 15px;">
          <!-- v-model实现 数据双向绑定 -->
            <el-input v-model="params.bname" style="width: 200px;"  placeholder="请输入图书名称"></el-input> 
            <el-input v-model="params.reader_name" style="width: 200px; margin-left: 10px;"  placeholder="请输入借阅者姓名"></el-input>
            <el-button type="primary" style="margin-left: 10px;" @click="findBySearch()"  icon="el-icon-search">查询</el-button>
            <el-button type="danger" style="margin-left: 10px;" @click="reset()"  icon="el-icon-delete">清空</el-button>
            <el-button type="warning" style="margin-left: 10px;" @click="add()" icon="el-icon-plus">新增</el-button>
        </div>
        
        <!-- 表格 -->
        <div>
          <!-- :data="tableData"：绑定一个数据属性 tableData 作为表格的数据源，tableData 应该是一个数组，每个元素包含一行的数据。 -->
            <el-table
        :data="tableData"
        style="width: 100%">
        <!-- prop表示对应列的字段名,label表示列的标题 -->
        <el-table-column prop="bid" label="图书编号"></el-table-column> 
        <el-table-column prop="bname" label="图书名称"></el-table-column>
        <el-table-column prop="borrow_date" label="借阅日期"></el-table-column>
        <el-table-column prop="return_date" label="归还日期"></el-table-column>
        <el-table-column prop="reader_name" label="借阅者姓名"></el-table-column> 


        <el-table-column label="操作">
          <!-- slot-scope="scope" 表示当前行的数据 -->
          <template slot-scope="scope">
            <el-button type="success" @click="edit(scope.row)" icon="el-icon-edit">编辑</el-button>
            <!-- @confirm ="del(scope.row)" 表示点击删除按钮时，执行del方法，并传入当前行的数据,根据id来进行删除操作 -->
            <el-popconfirm title="确定删除吗？" @confirm ="del(scope.row.bid)">  //删除按钮
                      <el-button slot="reference" type="danger" style="margin-left: 5px;"  icon="el-icon-delete">删除</el-button>
            </el-popconfirm>
            
          </template>
            

        </el-table-column>
        </el-table>
        </div>
        <!-- 分页 -->
        <div style="margin-top: 20px;">
          
          <!-- size-change	pageSize 改变时会触发	每页条数 -->
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
                <!-- label-width表示标签宽度-->
                <el-form-item label="图书编号" label-width="20%"> 
                  <!-- //自动提示功能 -->
                  <el-input v-model="form.bid" autocomplete="off" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="图书名称" label-width="20%">
                  <el-input v-model="form.bname" autocomplete="off" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="借阅日期" label-width="20%">
                  <el-input v-model="form.borrow_date" autocomplete="off" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="归还日期" label-width="20%">
                  <el-input v-model="form.return_date" autocomplete="off" style="width: 90%"></el-input>
                </el-form-item>
                  <el-form-item label="借阅者姓名" label-width="20%">
                    <el-input v-model="form.reader_name" autocomplete="off" style="width: 90%"></el-input>

                </el-form-item>
              </el-form>
              <!-- //弹窗底部按钮 -->
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
  name: 'BorrowView',
  data() {
  return {
          params:{
              bname: '',
              reader_name: '',
              pageNum: 1,   //表示当前页码
              pageSize: 5,   //表示每页显示的条数



          },
            tableData: [],
            total: 0,
            dialogFormVisible: false, //不是不看到弹窗，而是弹窗默认是隐藏的
            form: {
              // picture:'',
            },
            fileList: [],
           
          }
         
        },
      //页面加载的时候，做一些事情在created里面
      created() {
        //调用查询函数
        this.findBySearch();
 
      },
      
      //定义一些页面上控件触发的事件调用的方法
      methods: {
                findBySearch(){  //查询方法
                              request.get("/borrow/borrowSearch", {
                                params: this.params
                              }).then(res => {
                                if(res.code === '0'){
                                  this.tableData = res.data.list;  //将查询到的结果赋值给tableData
                                    this.total = res.data.total;  //将查询到的结果的总条数赋值给total
                                }else{
                                  this.$message.error(res.msg);
                                  // ({
                                  //                   message: res.msg,
                                  //                   type: 'error'
                                  //                 });

                                }
                              })
                              },
                add(){   //新增方法
                                this.form = {};  //清空form
                                this.dialogFormVisible = true;  //弹窗显示
                              },
                edit(obj){  //编辑方法
                                this.form = obj;  //将当前行的数据赋值给form
                                this.dialogFormVisible = true;  //弹窗显示

                              },
                reset(){ //清空方法
                                this.params={
                                  bname: '',
                                  reader_name: '',
                                  pageNum:1,   //表示当前页码
                                  pageSize:5   //表示每页显示的条数
                                }
                                this.findBySearch();  //表示重新加载
                              },
                handleSizeChange(pageSize){  //分页大小改变事件
                                this.params.pageSize = pageSize;  //
                                this.findBySearch();
                              },
                handleCurrentChange(pageNum){  //分页页码改变事件
                                this.params.pageNum = pageNum;  //
                                this.findBySearch();
                              },
                submit(){  //新增或编辑方法
                                
                                request.post("/borrow",this.form).then(res=>{
                                  if(res.code === '0'){

                                    this.$message.success('操作成功');
                                    this.dialogFormVisible = false;  //弹窗关闭
                                    this.findBySearch();  //重新加载表格
                                  
                                
                                  }else{
                                    this.$message.error(res.msg);

                                  }
                                })
                               
                              },
                del(bid){
                               request.delete("/borrow/"+bid).then(res=>{
                                 if(res.code === '0'){
                                   this.$message.success('删除成功');
                                   this.findBySearch();  //重新加载表格
                                 }else{
                                  this.$message.error(res.msg);
                                 }
                                })
                              }
                            },
                 
                            
  }

  </script>
 