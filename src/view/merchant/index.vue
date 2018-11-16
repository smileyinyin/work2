<template>
  <div class="merchant">
    <h3 class="pb10">商户管理</h3>
    <Card>
      <Row class="pb20" type="flex">
        <i-col style="flex:1">
          <Row type="flex" justify="end" class="mb10">
            <Input v-model="searchForm.channelName" placeholder="供应链名称" clearable class="w120 mr20"/>
            <Select v-model="searchForm.status" placeholder="全部状态" clearable class="w120 mr20">
              <!-- <Option value="1" key="1">草稿</Option>
              <Option value="2" key="2">提交</Option> -->
              <Option value="3" key="3">正常</Option>
              <!-- <Option value="4" key="4">审核失败</Option> -->
              <Option value="5" key="5">停业</Option>
            </Select>
            <i-input v-model="searchForm.name" placeholder="商户名称" clearable class="w120 mr20"></i-input>
            <DatePicker v-model="date" type="datetimerange" placement="bottom-end" placeholder="创建时间" class="w150 mr20"></DatePicker>
          </Row>
          <Row type="flex" justify="end" class="mb10">
            <Select v-model="searchForm.belongTo" placeholder="供应链提供者" clearable class="w120 mr20">
              <Option value="1" >直属渠道人</Option>
              <Option value="2" >城市合伙人</Option>
              <Option value="3" >渠道合伙人</Option>
            </Select>
            <Select v-model="searchForm.branchCompany" placeholder="分公司" clearable class="w120 mr20">
              <Option v-for="item in companyList" :key="item.id">{{ item.name }}</Option>
            </Select>
          </Row>
        </i-col>
        <i-col>
          <Button type="primary" @click="getMerchantList(1)" icon="search">查 询</Button>
        </i-col>
      </Row>
      <Table border :columns="columns" :data="tableData"></Table>
      <Row type="flex" justify="end" align="middle" style="margin-top: 10px">
        <Page :total="pager.totalCounts" show-sizer
              :page-size="pager.pageSize" :current.sync="pager.currentPage"
              @on-change="getMerchantList"
              @on-page-size-change="changePageSize"
        > </Page>
      </Row>
    </Card>
  </div>
</template>

<script>
import { formatDate } from '@/libs/util'
import { getMerchantsList } from '@/api/merchant'
import makeColums from './data/merchant-columns'

export default {
  name: 'merchant',
  data() {
    return {
      companyList: [],
      date: [],
      searchForm: { // 搜索条件
        channelName: '',
        status: '',
        name: '',
        belongTo: '',
        branchCompany: ''
      },
      pager: {
        currentPage: 1,
        pageSize: 20,
        totalCounts: 0
      },
      columns: makeColums.call(this),
      tableData: []
    }
  },
  created() {
    this.getMerchantList()
  },
  methods: {

    // 跳转账号信息
    goAccountInfo(params) {
      this.$router.push({ name: 'accountInfo', query: { merchantId: params.row.id } })
    },

    // 跳转门店列表
    goStoreList(params) {
      this.$router.push({ name: 'storeList', query: { merchantId: params.row.id } })
    },

    // 跳转会员列表
    goMemberList(params) {
      this.$router.push({ name: 'memberList', query: { merchantId: params.row.id } })
    },

    // 查询商户列表
    getMerchantList(page) {
      this.pager.currentPage = page || this.pager.currentPage
      let query = Object.assign(
        {},
        this.searchForm,
        this.pager,
        {
          startTime: formatDate(this.date[0], 'yyyy-MM-dd hh:mm:ss'),
          endTime: formatDate(this.date[1], 'yyyy-MM-dd hh:mm:ss')
        }
      )
      getMerchantsList(query).then(res => {
        this.tableData = res.data
        this.pager.totalCounts = res.totalCounts
      })
    },

    // 分页size
    changePageSize(size) {
      this.pager.pageSize = size
      this.getMerchantList()
    }
  }
}
</script>

<style lang="less" scoped>
.merchant {
  /deep/ .link {
    padding: 5px;
    cursor: pointer;
    color: #2d8cf0;
  }
}
</style>
