import { formatDate } from '@/libs/util'
import { statusList } from '../../data'

export default function () {
  const columns = [
    { title: '序号', type: 'index' },
    { title: '分公司', key: 'controlledCompanyName' },
    { title: '隶属合伙人', key: 'parentName' },
    { title: '业务员', key: 'partnerName' },
    { title: '开户名', key: 'accountName' },
    {
      title: '创建时间',
      key: 'createTime',
      render: (h, params) => {
        return h('span', null, formatDate(params.row.createTime, 'yyyy-MM-dd hh:mm'))
      }
    },
    {
      title: '状态',
      key: 'status',
      render: (h, params) => {
        var { color, name } = statusList.find(item => params.row.status === item.code)
        return h('span', { style: { color } }, name)
      }
    },
    { title: '商户数', key: 'merchantsNumber' },
    {
      title: '操作',
      key: 'action',
      render: (h, params) => {
        return h('div', [
          h('Button', {
            props: { size: 'small', type: 'primary' },
            style: { marginRight: '5px' },
            on: {
              click: () => {
                this.$router.push({ name: 'salesCheck', query: { id: params.row.userId } })
              }
            }
          }, '查看')
        ])
      }
    }
  ]

  return columns
}
