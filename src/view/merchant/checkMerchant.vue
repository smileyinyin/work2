<template>
<div>
  <bread-crumb :data="[
      {path: '/merchantList', title: '商户管理'},
      {title: '商户查看'}
    ]"></bread-crumb>
  <Card class="pl20 pr20">
    <divide-line placement="bottom" class="mt10 mb20">基本信息</divide-line>
    <Form :label-width="100" class="form pb30" label-position="left">
      <Row>
        <i-col span="12">
          <FormItem label="商户名">{{ baseInfo.name }}</FormItem>
          <!-- <FormItem label="商户角色">{{ getRole }}</FormItem> -->
          <FormItem label="商户简称">{{ baseInfo.alias }}</FormItem>
          <FormItem label="商户类型">{{ baseInfo.mold === 0 ? '个体' : '连锁店' }}</FormItem>
          <FormItem label="行业类别">{{ baseInfo.mcc }}</FormItem>
          <FormItem label="经营类型">{{ baseInfo.categoryName }}</FormItem>
          <FormItem label="商家地址">{{ baseInfo.province + baseInfo.city + baseInfo.district + baseInfo.adressDetail }}</FormItem>
          <FormItem label="商家简介">{{ baseInfo.briefIntroduction }}</FormItem>
          <FormItem label="商家详情">{{ baseInfo.detail }}</FormItem>
          <FormItem label="商家服务">{{ baseInfo.service }}</FormItem>
          <FormItem label="门店LOGO">
            <img v-if="baseInfo.logoImg" :src="baseInfo.logoImg" alt="门店LOGO" width="100px" height="100px">
          </FormItem>
        </i-col>
        <i-col span="12">
          <FormItem label="经纬度" >
            <b-map v-if="baseInfo.longitude" :initPoint='{lng: baseInfo.longitude, lat: baseInfo.latitude}' :isAlert="false" :width="380" :height="230"></b-map>
            <span v-else>无</span>
          </FormItem>
            <FormItem label="门头照" >
              <img v-if="baseInfo.headImg" :src="baseInfo.headImg" alt="门头照" width="100px" height="100px">
          </FormItem>
          <FormItem label="收银台照" >
            <img v-if="baseInfo.cashImg" :src="baseInfo.cashImg" alt="收银台照" width="100px" height="100px">
          </FormItem>
        </i-col>
      </Row>
    </Form>

    <divide-line placement="bottom" class="mt10 mb20">工商信息</divide-line>
    <Form :label-width="100" class="form pb30" label-position="left">
      <Row>
        <i-col span="12">
          <FormItem label="营业执照名称">{{ industry.businessName }}</FormItem>
          <!-- <FormItem label="营业执照地址">{{ industry.businessAddress }}</FormItem> -->
          <FormItem label="营业执照号">{{ industry.businessNumber }}</FormItem>
          <FormItem label="执照有效期">{{ goodTime }}</FormItem>
          <!-- <FormItem label="成立时间">{{ establishTime }}</FormItem> -->
        </i-col>
        <i-col span="12">
          <FormItem label="营业执照">
            <upload-img v-if="industry.businessLicenseImg" v-model="licenseImg" viewOnly></upload-img>
            <span v-else>无</span>
          </FormItem>
        </i-col>
      </Row>
    </Form>

    <divide-line placement="bottom" class="mt10 mb20">法人信息</divide-line>
    <Form :label-width="100" class="form pb30" label-position="left">
      <Row>
        <i-col span="12">
          <FormItem label="法人名称">{{ legalman.name }}</FormItem>
          <FormItem label="法人身份证号">{{ legalman.identityCard }}</FormItem>
          <FormItem label="身份证有效期">{{ cardGoodTime }}</FormItem>
          <FormItem label="法人联系电话">{{ legalman.mobile }}</FormItem>
          <!-- <FormItem label="邮箱">{{ legalman.email }}</FormItem> -->
        </i-col>
        <i-col span="12">
          <FormItem label="法人身份证">
            <upload-img viewOnly v-model="fontImg"></upload-img>
            <upload-img viewOnly v-model="backImg"></upload-img>
            <!-- <img :src="legalman.identityFrontImg" alt="身份证正面" width="200" height="200" style="float: left;">
            <img :src="legalman.identityBackImg" alt="身份证反面" width="200" height="200" style="float: left;"> -->
          </FormItem>
          <FormItem label="手持身份证" v-if="legalman.identityHandImg">
            <upload-img viewOnly v-model="handImg"></upload-img>
          </FormItem>
        </i-col>
      </Row>
    </Form>

    <divide-line placement="bottom" class="mt10 mb20">结算信息</divide-line>
    <Form :label-width="100" class="form pb30" label-position="left">
      <Row>
        <i-col span="12">
          <FormItem label="账户类型">{{ settleInfo.accountType === 0 ? '对公' : '对私' }}</FormItem>
          <FormItem label="开户名">{{ settleInfo.accountName }}</FormItem>
          <FormItem label="身份证号" v-if="settleInfo.identityCard">{{ settleInfo.identityCard }}</FormItem>
          <FormItem label="身份证有效期" v-if="settleInfo.identityEndTime">{{ formatCreateTime }}</FormItem>
          <FormItem label="开户账户">{{ settleInfo.accountNumber }}</FormItem>
          <!-- <FormItem label="开户总行">{{ settleInfo.bankName }}</FormItem> -->
          <FormItem label="开户地区">{{ `${settleInfo.province || ''}-${settleInfo.city || ''}-${settleInfo.area || ''}` }}</FormItem>
          <FormItem label="支行名称">{{ settleInfo.bankBranchName }}</FormItem>
          <FormItem label="预留手机">{{ settleInfo.bankMobile }}</FormItem>
          <FormItem label="联行号">{{ settleInfo.interBankNumber }}</FormItem>
          <FormItem label="商户信息表照" v-if="settleInfo.operationImg">
            <upload-img v-model="operationImg" viewOnly></upload-img>
          </FormItem>
        </i-col>
        <i-col span="12">
          <FormItem label="身份证正反照" v-if="settleInfo.identityFrontImg || settleInfo.identityBackImg">
            <upload-img v-if="settleInfo.identityFrontImg" v-model="identityFrontImg" viewOnly></upload-img>
            <upload-img v-if="settleInfo.identityBackImg" v-model="identityBackImg" viewOnly></upload-img>
          </FormItem>
          <FormItem label="开户许可证" v-if="settleInfo.accountLicenceImg">
            <upload-img v-model="accountLicenceImg" viewOnly></upload-img>
          </FormItem>
          <FormItem label="银行卡正面" v-if="settleInfo.bankFrontImg">
            <upload-img v-model="bankFrontImg" viewOnly></upload-img>
          </FormItem>
          <FormItem label="授权结算书" v-if="settleInfo.authorizedSettlementImg">
            <upload-img v-model="authorizedSettlementImg" viewOnly></upload-img>
          </FormItem>
          <FormItem label="协议照" v-if="settleInfo.protocolImg">
            <upload-img v-model="protocolImg" viewOnly></upload-img>
          </FormItem>
        </i-col>
      </Row>
    </Form>
  </Card>
</div>
</template>

<script>
import breadCrumb from '_c/breadCrumb/breadCrumb'
import divideLine from '_c/divideLine/divide-line'
import uploadImg from '_c/uploadImg/uploadImg'

export default {
  name: 'checkMerchant',
  data() {
    return {
      goodTime: '',
      cardGoodTime: '',
      fontImg: [],
      backImg: [],
      baseInfo: {},
      industry: {},
      legalman: {},
      settleInfo: {}
    }
  },
  components: { breadCrumb, divideLine, uploadImg }
}
</script>
