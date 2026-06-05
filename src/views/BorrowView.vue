<template>
    <div>
        <!-- 输入框 -->
        <div style="margin-bottom: 15px;">
            <el-input v-model="params.bname" style="width: 200px;"  placeholder="请输入图书名称"></el-input> 
            <el-input v-model="params.readerName" style="width: 200px; margin-left: 10px;"  placeholder="请输入借阅者姓名"></el-input>
            <el-button type="primary" style="margin-left: 10px;" @click="findBySearch()"  icon="el-icon-search">查询</el-button>
            <el-button type="danger" style="margin-left: 10px;" @click="reset()"  icon="el-icon-delete">清空</el-button>
            <el-button type="warning" style="margin-left: 10px;" @click="add()" icon="el-icon-plus">新增借阅</el-button>
        </div>
        
        <!-- 表格 -->
        <div>
            <el-table
        :data="tableData"
        style="width: 200%">
        <el-table-column prop="bid" label="借阅编号" width="100"></el-table-column> 
        <el-table-column prop="bname" label="图书名称" width="180"></el-table-column>
        <el-table-column prop="borrowDate" label="借阅日期" width="120"></el-table-column>
        <el-table-column prop="returnDate" label="归还日期" width="120"></el-table-column>
        <el-table-column prop="readerName" label="借阅者" width="120"></el-table-column>
        <el-table-column prop="status" label="借阅状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === '已归还' ? 'success' : 'warning'">
              {{ scope.row.status || '借阅中' }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="550">
          <template slot-scope="scope">
            <!-- 归还按钮：只针对未归还的记录显示 -->
            <el-button 
              v-if="scope.row.status !== '已归还'" 
              type="success" 
              @click="returnBook(scope.row)" 
              icon="el-icon-check"
              size="mini">
              归还
            </el-button>
            <el-button type="primary" @click="edit(scope.row)" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="del(scope.row.bid)">  
              <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
        </el-table>
        </div>
        
        <!-- 分页 -->
        <div style="margin-top: 20px;">
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
        
        <!-- 借阅弹窗 -->
        <div> 
          <el-dialog :title="isEdit ? '编辑借阅信息' : '新增借阅'" :visible.sync="dialogFormVisible" width="40%">
              <el-form :model="form" label-width="100px">
                <el-form-item label="图书名称">
                  <el-select v-model="form.bookId" placeholder="请选择图书" style="width: 100%" filterable>
                    <el-option
                      v-for="book in bookList"
                      :key="book.bookId"
                      :label="book.bookName"
                      :value="book.bookId">
                    </el-option>
                  </el-select>
                </el-form-item>
                
                <el-form-item label="借阅者">
                  <el-select v-model="form.readerId" placeholder="请选择读者" style="width: 100%" filterable>
                    <el-option
                      v-for="reader in readerList"
                      :key="reader.readerId"
                      :label="reader.readerName"
                      :value="reader.readerId">
                    </el-option>
                  </el-select>
                </el-form-item>
                
                <el-form-item label="借阅日期">
                  <el-date-picker
                    v-model="form.borrowDate"
                    type="date"
                    placeholder="选择借阅日期"
                    style="width: 100%"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
                
                <el-form-item label="应还日期">
                  <el-date-picker
                    v-model="form.returnDate"
                    type="date"
                    placeholder="选择应还日期"
                    style="width: 100%"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
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
  name: 'BorrowView',
  data() {
    return {
      params:{
        bname: '',
        readerName: '',
        pageNum: 1,
        pageSize: 5,
      },
      tableData: [],
      total: 0,
      dialogFormVisible: false,
      isEdit: false,
      form: {
        bid: null,
        bookId: null,
        readerId: null,
        borrowDate: '',
        returnDate: '',
      },
      bookList: [], // 图书列表
      readerList: [], // 读者列表
    }
  },
  created() {
    this.findBySearch();
    this.loadBookList();
    this.loadReaderList();
  },
  methods: {
    // 加载图书列表
    loadBookList() {
      request.get("/book/bookSearch", { params: { pageNum: 1, pageSize: 100 } }).then(res => {
        if(res.code === '0') {
          this.bookList = res.data.list;
        }
      });
    },
    // 加载读者列表
    loadReaderList() {
      request.get("/reader/readerSearch", { params: { pageNum: 1, pageSize: 100 } }).then(res => {
        if(res.code === '0') {
          this.readerList = res.data.list;
        }
      });
    },
    
    findBySearch(){
      request.get("/borrow/borrowSearch", {
        params: this.params
      }).then(res => {
        if(res.code === '0'){
          this.tableData = res.data.list;
          this.total = res.data.total;
        }else{
          this.$message.error(res.msg);
        }
      }).catch(error => {
        console.error('查询失败：', error);
      })
    },
    
    add(){
      this.isEdit = false;
      this.form = {
        bid: null,
        bookId: null,
        readerId: null,
        borrowDate: new Date().toISOString().slice(0, 10),  // 默认今天
        returnDate: '',
      };
      this.dialogFormVisible = true;
    },
    
    edit(obj){
      this.isEdit = true;
      this.form = {...obj};
      this.dialogFormVisible = true;
    },
    
    // 归还图书
    returnBook(row){
      this.$confirm('确认归还此图书？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const returnData = {
          ...row,
          status: '已归还',
          returnDate: new Date().toISOString().slice(0, 10) // 自动设置为今天
        };
        request.put('/borrow/return', returnData).then(res => {
          if(res.code === '0'){
            this.$message.success('归还成功');
            this.findBySearch();
          }else{
            this.$message.error(res.msg);
          }
        });
      }).catch(() => {});
    },
    
    reset(){
      this.params = {
        bname: '',
        readerName: '',
        pageNum: 1,
        pageSize: 5
      }
      this.findBySearch();
    },
    
    handleSizeChange(pageSize){
      this.params.pageSize = pageSize;
      this.findBySearch();
    },
    
    handleCurrentChange(pageNum){
      this.params.pageNum = pageNum;
      this.findBySearch();
    },
    
    submit(){
      if(!this.form.bookId || !this.form.readerId) {
        this.$message.error('请选择图书和借阅者');
        return;
      }
      
      request.post('/borrow', this.form).then(res => {
        if(res.code === '0'){
          this.$message.success(this.form.bid ? '修改成功' : '新增成功');
          this.dialogFormVisible = false;
          this.findBySearch();
        }else{
          this.$message.error(res.msg || '操作失败');
        }
      }).catch(error => {
        console.error('请求错误：', error);
        this.$message.error('操作失败，请检查后端接口');
      });
    },
    
    del(bid){
      request.delete("/borrow/" + bid).then(res => {
        if(res.code === '0'){
          this.$message.success('删除成功');
          this.findBySearch();
        }else{
          this.$message.error(res.msg);
        }
      });
    }
  }
}
</script>
 