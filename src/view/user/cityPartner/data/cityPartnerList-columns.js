import { formatDate } from '@/libs/util'
import { statusList } from '../../data'

export default function() {
  let columns = [
    { title: '序号', type: 'index' },
    { title: '合伙人名称', key: 'partnerName' },
    { title: '分公司', key: 'controlledCompanyName' },
    { title: '地址', key: 'address', width: 160 },
    { title: '法人', key: 'legalPersonName' },
    { title: '账号', key: 'mobile' },
    {
      title: '状态',
      key: 'status',
      render: (h, params) => {
        let { color, name } = statusList.find(item => item.code === params.row.status) || {}
        return h('span', { style: { color } }, name)
      }
    },
    {
      title: '创建时间',
      key: 'createTime',
      width: 140,
      render: (h, params) => {
        return h('span', formatDate(params.row.createTime, 'yyyy-MM-dd hh:mm'))
      }
    },
    {
      title: '操作',
      key: 'time',
      Width: 50,
      render: (h, params) => {
        return h('div', [
          h('Button', {
            props: { size: 'small', type: 'primary' },
            style: { marginRight: '5px' },
            on: {
              click: () => {
                this.$router.push({ name: 'cityPartnerCheck', query: { id: params.row.userId } })
              }
            }
          }, '查看')
        ])
      }
    }
  ]

  return columns
}
