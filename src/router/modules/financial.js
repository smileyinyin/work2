import Main from '@/view/main/index'

// 财务管理
export default [
  {
    path: '/withdrawCashMenu',
    name: 'withdrawCashMenu',
    meta: {
      title: '财务管理',
      icon: '_bokuanmingxi'
    },
    component: Main,
    children: [
      {
        path: '/withdrawCash',
        name: 'withdrawCash',
        meta: {
          title: '代理结算',
          icon: '_dingdan'
        },
        component: () => import('@/view/withdrawCash/index')
      },
      {
        path: '/pos-fl-share',
        name: 'pos-fl-share',
        meta: {
          title: '交易记录',
          icon: 'connection-bars'
        },
        component: () => import('@/view/trading/pos-fl-share')
      }
      // {
      //   path: '/tixian-record',
      //   name: 'tixian-record',
      //   meta: {
      //     hideInMenu: true
      //   },
      //   component: () => import('@/view/withdrawCash/tixian-record')
      // },
      // {
      //   path: '/partner',
      //   name:'pantner',
      //   meta: {
      //     title:'合伙人账单',
      //     icon: 'person',
      //   },
      //   component: () => import('@/view/withdrawCash/partner')
      // },
      // {
      //   path: '/partners',
      //   name: 'partners',
      //   meta: {
      //     hideInMenu: true
      //   },
      //   component: () => import('@/view/withdrawCash/partners')
      // },
      // {
      //   path: '/makeMoney',
      //   name:'makeMoney',
      //   meta: {
      //     title:'打款记录',
      //     icon: '_dingdan',
      //   },
      //   component: () => import('@/view/withdrawCash/makeMoney')
      // },
      // {
      //   path: '/online-shop',
      //   name: 'online-shop',
      //   meta: {
      //     title: '线上商家流水',
      //     icon: 'arrow-graph-up-right'
      //   },
      //   component: () => import('@/view/withdrawCash/online-shop')
      // },
      // {
      //   path: '/online-gy',
      //   name: 'online-gy',
      //   meta: {
      //     title: '线上供应链流水',
      //     icon: 'arrow-graph-up-right'
      //   },
      //   component: () => import('@/view/withdrawCash/online-gy')
      // },
    ]
  }
]
