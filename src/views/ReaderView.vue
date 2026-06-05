<template>
   <div>
    <div style="margin-bottom: 20px;">
        <el-input v-model="params.readerName" style="width: 200px;" placeholder="请输入姓名"></el-input>
        <el-input v-model="params.reader_phone" style="width: 200px;margin-left: 5px;" placeholder="请输入手机号"></el-input>
        <el-button type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="findBySearch()">查询</el-button>
        <el-button type="danger" icon="el-icon-delete" style="margin-left: 10px;" @click="reset()">清空</el-button>
        <el-button type="warning" icon="el-icon-plus" style="margin-left: 10px;" @click="add()">新增</el-button>
    </div>
    <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="readerName" label="姓名" ></el-table-column>
          <el-table-column prop="readerSex" label="性别"></el-table-column>
          <el-table-column prop="readerAge" label="年龄"></el-table-column>
          <el-table-column prop="readerPhone" label="手机号"></el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope = "scope">  
          <!-- @click="scope.row"表示传入一整条数据，可以用scope.row.xxx来获取数据   edit(scope.row)表示传入一整条数据，可以用scope.row.xxx来获取数据  表示根据主键id来删除数据 -->
            <el-button type="success" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
            <el-popconfirm title="这是一段内容确定删除吗？" @confirm="del(scope.row.reader_id)">  <!--@confirm="delete(scope.row)" 表示点击确定按钮时执行delete方法-->
                <el-button type="danger" icon="el-icon-delete" slot="reference" style="margin-left: 5px;">删除</el-button>
              </el-popconfirm>
            
         </template>
      </el-table-column>
    </el-table>
   </div>
   <div style="margin-top: 20px;">

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.pageNum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="params.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>


<!-- 弹出框 -->
  <div>
    
      <el-dialog title="请填写信息" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="readerForm">
          <el-form-item label="姓名" label-width="15%">
            <el-input v-model="readerForm.readerName" autocomplete="off" style="width: 90%;"></el-input>
          </el-form-item>
          <el-form-item label="性别" label-width="15%">
            <el-radio v-model="readerForm.readerSex" label="男">男</el-radio>
            <el-radio v-model="readerForm.readerSex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="年龄" label-width="15%">
            <el-input v-model="readerForm.readerAge" autocomplete="off" style="width: 90%;"></el-input>
          </el-form-item>
          <el-form-item label="电话" label-width="15%">
            <el-input v-model="readerForm.readerPhone" autocomplete="off" style="width: 90%;"></el-input>
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
import request from '@/utils/request';

    export default {
        name: 'ReaderView',
      data() {
        return {
            params:{
              readerName: '',
              readerPhone: '',
              pageNum:1,
              pageSize:5
            },
          tableData: [],
          total: 0,
          dialogFormVisible:false,  //弹出框-表示先不让他被看到（false）
          readerForm: {}  //弹出框-表单数据
        }
      },
      created() {
        
        this.findBySearch();
    },
    methods: {
       
        findBySearch(){
          request.get("/reader/readerSearch", {
            params: this.params
          }).then(res =>{
            if(res.code === '0'){  //请求成功
                this.tableData = res.data.list;
                this.total = res.data.total;
              }
              else{

              }
          })
        },

        reset(){  //清空搜索条件
          this.params = {
            readerName: '',
            readerPhone: '',
            pageNum:1,
            pageSize:5
          }
          this.findBySearch(); //重新加载数据
        },
        handleSizeChange(pageSize){  //分页大小
          this.params.pageSize = pageSize;  //修改当前页码-每页显示条数
          this.findBySearch();  //重新加载数据

        },

        handleCurrentChange(pageNum){  //当前页面的改变
          this.params.pageNum = pageNum;
          this.findBySearch();  //重新加载数据
        },
        add(){  //新增
          this.readerForm = {};  //清空表单数据
          this.dialogFormVisible = true;  //弹出框-显示 
             },
        submit(){ //提交新增或编辑
          // 判断是新增还是编辑
          const url = this.readerForm.reader_id ? "/reader" : "/reader";
          const method = this.readerForm.reader_id ? "put" : "post";
          
          request({
            url: url,
            method: method,
            data: this.readerForm
          }).then(res =>{
            if(res.code === '0'){  //请求成功
              this.$message({
                message: this.readerForm.reader_id ? '修改成功' : '新增成功',
                type: 'success'
              });
              this.dialogFormVisible = false;  //关闭弹出框
              this.findBySearch();  //刷新数据
            }
            else{
              this.$message({
                message:res.msg,
                type: 'error'
              });

            }

        }
      );
      },
        edit(obj){  //编辑-将当前行的数据赋值给弹出框的表单数据
          this.readerForm = obj;  //将当前行的数据赋值给弹出框的表单数据
          this.dialogFormVisible = true;  //弹出框-显示
        },
        del(reader_id){  //删除-弹出框确认删除
          request.delete("/reader/"+reader_id).then(res =>{
            if(res.code === '0'){  //请求成功-删除成功
              this.$message({
                message:"删除成功",
                type: 'success'
              });
              this.findBySearch();  //重新加载数据
            }
            else{  //请求失败-显示错误信息
              this.$message({
                message:res.msg,
                type: 'error'
              });
             

            }
        })

        }
}
}
  </script>