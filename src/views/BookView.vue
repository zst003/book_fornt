<template>
    <div>
        <!-- 输入框 -->
         <!-- style="margin-bottom: 15px;表示下边距为15px -->
        <div style="margin-bottom: 15px;">
            <el-input v-model="params.book_name" style="width: 200px;"  placeholder="请输入图书名称"></el-input>
            <el-input v-model="params.book_author" style="width: 200px; margin-left: 10px;"  placeholder="请输入图书作者"></el-input>
            <el-button type="primary" style="margin-left: 10px;" @click="findBySearch()"  icon="el-icon-search">查询</el-button>
            <el-button type="danger" style="margin-left: 10px;" @click="reset()"  icon="el-icon-delete">清空</el-button>
            <el-button type="warning" style="margin-left: 10px;" @click="add()" icon="el-icon-plus">新增</el-button>
        </div>
        
        <!-- 表格 -->
        <div>
            <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column prop="book_name" label="图书名称"></el-table-column>
        <el-table-column prop="book_author" label="图书作者"></el-table-column>
        <el-table-column prop="book_price" label="图书价格"></el-table-column>
        <el-table-column prop="book_press" label="图书出版社"></el-table-column>
        <el-table-column prop="book_img" label="图书封面">
            <template slot-scope="scope" >
                <img :src="scope.row.book_img" style="width: 50px; height: 50px;">
            </template>
        </el-table-column>

        <el-table-column label="操作">
          <!-- slot-scope="scope" 表示当前行的数据 -->
          <template slot-scope="scope">
            <el-button type="success" @click="edit(scope.row)" icon="el-icon-edit">编辑</el-button>
            <!-- @confirm ="del(scope.row)" 表示点击删除按钮时，执行del方法，并传入当前行的数据,根据id来进行删除操作 -->
            <el-popconfirm title="确定删除吗？" @confirm ="del(scope.row.book_id)">  
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
                <el-form-item label="图书名称" label-width="20%">
                  <el-input v-model="form.book_name" autocomplete="off" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="图书作者" label-width="20%">
                  <el-input v-model="form.book_author" autocomplete="off" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="图书价格" label-width="20%">
                  <el-input v-model="form.book_price" autocomplete="off" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="图书出版社" label-width="20%">
                  <el-input v-model="form.book_press" autocomplete="off" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="图书封面" label-width="20%" prop="picture">
                  <!-- :on-preview="handlePreview" -->
                  <el-upload
                            class="upload-demo"
                            action="http://localhost:8087/book/upload"
                            
                            :on-success="handleSuccess"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                          </el-upload>

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
  name: 'BookView',
  data() {
  return {
          params:{
              book_name: '',
              book_author: '',
              pageNum: 1,   //表示当前页码
              pageSize: 5,   //表示每页显示的条数



          },
            tableData: [],
            total: 0,
            dialogFormVisible: false, //不是不看到弹窗，而是弹窗默认是隐藏的
            form: {
              picture:'',
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
        handleSuccess(response, file, fileList) {
          // 上传成功的处理
          console.log(response, file, fileList);
          if (response.code === '0') {
            this.$message.success('图片上传成功');
            // 假设 response.data.url 是上传后返回的图片 URL
            this.form.book_img = response.data; // 将图片 URL 保存到表单数据中
          } else {
            this.$message.error(response.msg);
          }
          // console.log("图片上传成功返回的访问路径是:",file.response.data);
          // this.dataForm.picture = file.response.data
        },
        handleRemove(file, fileList) {
          // 文件移除时的处理
          console.log(file, fileList);
          this.fileList = fileList; // 更新文件列表
          if (fileList.length === 0) {
            this.form.book_img = ''; // 如果没有文件，清空表单中的图片信息
          }
        },

                findBySearch(){  //查询方法
                              request.get("/book/bookSearch", {
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
                                  name: '',
                                  phone: '',
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
                                
                                request.post("/book",this.form).then(res=>{
                                  if(res.code === '0'){

                                    this.$message.success('操作成功');
                                    this.dialogFormVisible = false;  //弹窗关闭
                                    this.findBySearch();  //重新加载表格
                                  
                                
                                  }else{
                                    this.$message.error(res.msg);

                                  }
                                })
                               
                              },
                del(book_id){
                               request.delete("/book/"+book_id).then(res=>{
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
  <!--根据上面的代码我该如何完善上传图面，并且把图片插入到数据库的功能-->
  <!-- 上传图片 -->
  <!-- <el-upload class="upload-demo" action="http://localhost:8087/book/upload" :on-preview="handlePreview" :on-success="handleSuccess" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
    <el-button size="small" type="primary" v-model="form.book_img">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload> -->
  <!-- 图片插入到数据库 -->
  <!-- <el-button type="primary" @click="handlePictureSuccess()">插入图片</el-button> -->

  <!-- 图片插入到数据库 -->
  <!-- <el-button type="primary" @click="handlePictureSuccess()">插入图片</el-button> -->
   <!-- <script>
    export default {
      data() {
        return {
          dataForm: {
            picture: ''
          },
          fileList: []
        }
      },
      methods: {
        handlePictureSuccess() {
          this.dataForm.picture = this.fileList[0].url;
          console.log(this.dataForm);
          // 调用插入图片的接口
          // request.post("/book/upload", this.dataForm).then(res => {
          //   if (res.code === '0') {
          //     this.$message.success('图片插入成功');
          //   } else {
          //     this.$message.error(res.msg);
          //   }
          // })
        },
        handlePreview(file) {
          console.log(file);
        },
        handleSuccess(response, file, fileList) {
          console.log('上传成功', response);
          this.fileList.push({
            name: file.name,
            url: response.data.url
          })
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
          console.log('移除文件', file, fileList);
        },
        handleError(err, file) {
          console.error('上传失败', err);
        }
      }
        }
  </script> -->

 