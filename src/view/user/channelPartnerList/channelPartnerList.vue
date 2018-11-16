<template>
  <div>
    <h3 class="mb10">渠道合伙人管理</h3>
    <Card>
      <Row :gutter="10" type="flex" class="mb20">
        <i-col type="flex" style="flex:1">
          <i-input v-model="searchForm.mobile" placeholder="手机号码" clearable class="w140 mr20"></i-input>
          <i-input v-model="searchForm.partnerName" placeholder="合伙人名称" clearable class="w120 mr20"></i-input>
          <Select v-model="searchForm.controlledCompanyName" placeholder="分公司" clearable class="w120 mr10">
            <Option v-for="item in companyList" :value="item.username" :key="item.id">{{ item.username }}</Option>
          </Select>
        </i-col>
        <i-col>
          <DatePicker class="w200 mr20" v-model="datetime" type="datetimerange" placement="bottom-end" placeholder="选择日期"></DatePicker>
        </i-col>
        <i-col>
          <i-button type="primary" @click="getPartnerList(1)" icon="search">查 询</i-button>
        </i-col>
      </Row>
      <Row :gutter="10" type="flex" class="mb20">
        <i-col>
          <Select v-model="searchForm.parentId" placeholder="所属城市合伙人" clearable class="w120 mr20">
            <Option v-for="(item, index) in belongToList" :value="item.userId" :key="index">{{ item.partnerName }}</Option>
          </Select>
        </i-col>
      </Row>
      <Table :data="tableData" :columns="columns" border></Table>
      <Row type="flex" justify="end" class="mt20">
        <Page :total="pager.totalCounts" show-sizer
              :page-size="pager.pageSize" :current.sync="pager.pageNum"
              @on-page-size-change="changePageSize"
              @on-change=" getPartnerList"
        > </Page>
      </Row>
    </Card>
  </div>
</template>

<script>
import { getPartnerList, getCompanyList, getCityPartnerList } from '@/api/user/cityPartner'
import { formatDate } from '@/libs/util'
import makeColumns from './data/channelPartnerList-columns'

export default {
  name: 'channelPartnerList',
  data() {
    return {
      datetime: [],
      companyList: [],
      belongToList: [],
      searchForm: {
        parentId: '',
        roleId: 2, // 2 表示渠道合伙人
        mobile: '',
        partnerName: '',
        controlledCompanyName: '',
        startDate: '',
        endDate: ''
      },
      pager: {
        pageNum: 1,
        pageSize: 20,
        totalCounts: 0
      },
      columns: makeColumns.call(this),
      tableData: [

      ]
    }
  },
  created() {
    this.getPartnerList()
    this.getCompanyList()
    this.getCityPartnerList()
  },
  methods: {

    // 分页 size 变化
    changePageSize(size) {
      this.pager.pageSize = size
      this.getPartnerList()
    },

    // 查询
    getPartnerList(page) {
      this.pager.pageNum = page || this.pager.pageNum
      let query = Object.assign({}, this.searchForm, this.pager, {
        startDate: formatDate(this.datetime[0], 'yyyy-MM-dd hh:mm:ss') || undefined,
        endDate: formatDate(this.datetime[1], 'yyyy-MM-dd hh:mm:ss') || undefined
      })
      getPartnerList(query).then(res => {
        this.tableData = res.data.list
        this.pager.totalCounts = res.data.total
      })
    },

    // 分公司下拉列表查询
    getCompanyList() {
      getCompanyList().then(res => {
        this.companyList = res.data
      })
    },

    // 所属城市合伙人下拉查询
    getCityPartnerList() {
      getCityPartnerList().then(res => {
        console.log(res.data)
        this.belongToList = res.data
      })
    }
  }
}
</script>
