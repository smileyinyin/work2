<template>
  <div class="quantity-limit">
    <Form class="ml20" :model="formModel" ref="form" :rules="validRules" inline>
      <FormItem><span>总张数</span></FormItem>
      <FormItem class="w180" prop="total">
        <XInput v-model="formModel.total" placeholder="几张"
                :maxlength="11" @on-change="inputChangeHandler"
                :disabled="disabled"
        > </XInput>
      </FormItem>
      <FormItem><span>每月张数</span></FormItem>
      <FormItem class="w180" prop="totalMonth">
        <XInput v-model="formModel.totalMonth" placeholder="几张"
                :maxlength="11" @on-change="inputChangeHandler"
                :disabled="disabled"
        > </XInput>
      </FormItem>
      <FormItem><span>每周张数</span></FormItem>
      <FormItem class="w180" prop="totalWeek">
        <XInput v-model="formModel.totalWeek" placeholder="几张"
                :maxlength="11" @on-change="inputChangeHandler"
                :disabled="disabled"
        > </XInput>
      </FormItem>
      <FormItem><span>每天张数</span></FormItem>
      <FormItem class="w180" prop="totalDay">
        <XInput v-model="formModel.totalDay" placeholder="几张"
                :maxlength="11" @on-change="inputChangeHandler"
                :disabled="disabled"
        > </XInput>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { Input, Form, FormItem } from 'iview'
// import ValidBus from '../utils/ValidBus'
import * as validator from '../utils/validator'

const _validRules = function () {
  // const instance = this

  return {
    // total: [
    //   { validator: validator.quantity },
    //   {
    //     validator (rule, value, callback, source, options) {
    //       let total = Number(instance.formModel.total)
    //       let totalMonth = Number(instance.formModel.totalMonth)
    //       let totalWeek = Number(instance.formModel.totalWeek)
    //       let totalDay = Number(instance.formModel.totalDay)

    //       if (!total && !totalMonth && !totalWeek && !totalDay) {
    //         callback(new TypeError('总, 每月, 每周, 每天, 四个值必须填一个!'))
    //       } else {
    //         callback()
    //       }
    //     },

    //     trigger: 'blur'
    //   }
    // ],

    totalMonth: [
      { validator: validator.quantity }
      // {
      //   validator (rule, value, callback, source, options) {
      //     let totalMonth = Number(instance.formModel.totalMonth)
      //       , totalWeek = Number(instance.formModel.totalWeek)
      //       , totalDay = Number(instance.formModel.totalDay);
      //
      //     if (totalMonth < totalWeek + totalDay) {
      //       callback(new TypeError('每月张数必须大于每周, 每日张数之合!'));
      //     } else {
      //       callback();
      //     }
      //   }
      // }
    ],

    totalWeek: [
      { validator: validator.quantity }
      // {
      //   validator (rule, value, callback, source, options) {
      //     let totalWeek = Number(instance.formModel.totalWeek)
      //       , totalDay = Number(instance.formModel.totalDay);
      //
      //     if (totalWeek < totalDay) {
      //       callback(new TypeError('每周张数必须大于每日张数!'));
      //     } else {
      //       callback();
      //     }
      //   }
      // }
    ],

    totalDay: [
      { validator: validator.quantity }
    ]
  }
}

export default { data () {
  return {
    validRules: _validRules.call(this),

    formModel: {
      total: null,
      totalMonth: null,
      totalWeek: null,
      totalDay: null
    }
  }
},

props: {
  value: { type: Object,
    default () {
      return {
        total: null, totalMonth: null, totalWeek: null, totalDay: null
      }
    } },
  type: { type: String, default: 'type' },
  disabled: { type: Boolean, default: false }
},

watch: {
  value (val) {
    let { total = null, totalMonth = null, totalWeek = null, totalDay = null } = val

    this.formModel.total = total === null ? '' : String(total)
    this.formModel.totalMonth = totalMonth === null ? '' : String(totalMonth)
    this.formModel.totalWeek = totalWeek === null ? '' : String(totalWeek)
    this.formModel.totalDay = totalDay === null ? '' : String(totalDay)
  }
},

methods: {
  inputChangeHandler (e) {
    this.$emit('input', this.formModel)
  }
},

created () {
  // init model.
  this.formModel.total = this.value.total === null ? '' : String(this.value.total)
  this.formModel.totalMonth = this.value.totalMonth === null ? '' : String(this.value.totalMonth)
  this.formModel.totalWeek = this.value.totalWeek === null ? '' : String(this.value.totalWeek)
  this.formModel.totalDay = this.value.totalDay === null ? '' : String(this.value.totalDay)

  this.$emit('input', this.formModel)
},

// mounted () {
//   this.$nextTick(() => {
//     ValidBus.addValid(`quantity-limit-${this.type}`, this.$refs.form)
//   })
// },

// destroyed () {
//   ValidBus.removeValid(`quantity-limit-${this.type}`)
//   this.$emit('destroy')
// },

components: { XInput: Input, Form, FormItem }
}
</script>

<style lang="less">
  .quantity-limit {
    .ivu-form {
      display: flex; align-items: center;
    }

    .ivu-form-item {
      margin-bottom: 0;
    }
  }
</style>
