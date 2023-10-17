import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [

  {
    path: '/login',
    component: Layout,
    children: [{
      path: '',
      name: 'Login',
      component: () => import('@/views/login/index')
    }]
  },
  {
    path: '/register',
    component: Layout,
    children: [{
      path: '',
      name: 'Register',
      component: () => import('@/views/login/register')
    }]
  },
  {
    path: '/',
    component: Layout,
    // redirect: '/',
    children: [{
      path: '',
      name: 'Home',
      component: () => import('@/views/home/index')
    }]
  },
  {
    path: '/download',
    component: Layout,
    children: [{
      path: '',
      name: 'DownloadWallte',
      component: () => import('@/views/download/wallet')
    }]
  },

  // {
  //   path: '/home',
  //   component: Layout,
  //   children: [{
  //     path: '',
  //     name: 'Home',
  //     component: () => import('@/views/home/index')
  //   }]
  // },

  {
    path: '/block',
    component: Layout,
    children: [{
      path: '',
      name: 'Block',
      component: () => import('@/views/block/index')
    }]
  },

  {
    path: '/mining',
    component: Layout,
    children: [{
      path: '',
      name: 'Mining',
      component: () => import('@/views/block/mining')
    }]
  },

  {
    path: '/blockinfo/:id',
    component: Layout,
    children: [{
      path: '',
      name: 'Blockinfo',
      component: () => import('@/views/blockinfo/index')
    }]
  },

  {
    path: '/lock',
    component: Layout,
    children: [{
      path: '',
      name: 'Lock',
      component: () => import('@/views/lock/index')
    }]
  },
  {
    path: '/lock/:id',
    component: Layout,
    children: [{
      path: '',
      name: 'Lockto',
      component: () => import('@/views/lock/index')
    }]
  },

  {
    path: '/absent',
    component: Layout,
    children: [{
      path: '',
      name: 'Absent',
      component: () => import('@/views/absent/absent')
    }]
  },
  {
    path: '/flowlock',
    component: Layout,
    children: [{
      path: '',
      name: 'FlowLock',
      component: () => import('@/views/lock/flowlock')
    }]
  },
  {
    path: '/bandwidthlock',
    component: Layout,
    children: [{
      path: '',
      name: 'BandwidthLock',
      component: () => import('@/views/lock/bandwidth')
    }]
  },
  {
    path: '/nodeaward',
    component: Layout,
    children: [{
      path: '',
      name: 'Nodeaward',
      component: () => import('@/views/lock/nodeaward')
    }]
  },

  {
    path: '/nodeLock',
    component: Layout,
    children: [{
      path: '',
      name: 'NodeLock',
      component: () => import('@/views/lock/nodelock')
    }]
  },

  {
    path: '/minerLock',
    component: Layout,
    children: [{
      path: '',
      name: 'MinerLock',
      component: () => import('@/views/lock/minerlock')
    }]
  },
  {
    path: '/releaseList/:id',
    component: Layout,
    children: [{
      path: '',
      name: 'ReleaseList',
      component: () => import('@/views/lock/releaseList')
    }]
  },

  {
    path: '/nodes',
    component: Layout,
    children: [{
      path: '',
      name: 'Nodes',
      component: () => import('@/views/nodes/index')
    }]
  },

  {
    path: '/nodeView/:id',
    component: Layout,
    children: [{
      path: '',
      name: 'nodeView',
      component: () => import('@/views/nodes/nodeView')
    }]
  },

  {
    path: '/nodesupple/:round',
    component: Layout,
    children: [{
      path: '',
      name: 'NodeSupple',
      component: () => import('@/views/nodes/nodesupple')
    }]
  },
  {
    path: '/nodepledge/:round',
    component: Layout,
    children: [{
      path: '',
      name: 'NodePledge',
      component: () => import('@/views/nodes/nodepledge')
    },

    ]
  },

  {
    path: '/pledge',
    component: Layout,
    children: [{
      path: '',
      name: 'Pledge',
      component: () => import('@/views/lock/pledge')
    }]
  },

  {
    path: '/extract',
    component: Layout,
    children: [{
      path: '',
      name: 'Extract',
      component: () => import('@/views/lock/extract')
    }]
  },

  

  {
    path: '/txns',
    component: Layout,
    children: [{
      path: '',
      name: 'Txns',
      component: () => import('@/views/txns/index')
    }]
  },
  {
    path: '/destroy',
    component: Layout,
    children: [{
      path: '',
      name: 'Destroy',
      component: () => import('@/views/txns/destroy.vue')
    }]
  },


  {
    path: '/txnsinfo/:id',
    component: Layout,
    children: [{
      path: '',
      name: 'Txnsinfo',
      component: () => import('@/views/txnsinfo/index')
    }]
  },
  {
    path: '/tokenstxinfo/:id',
    component: Layout,
    children: [{
      path: '',
      name: 'Tokenstxinfo',
      component: () => import('@/views/txnsinfo/info')
    }]
  },
  {
    path: '/coins/:id',
    component: Layout,
    children: [{
      path: '',
      name: 'Coins',
      component: () => import('@/views/coins/index')
    }]
  },
  {
    path: '/user',
    component: Layout,
    children: [{
      path: '',
      name: 'User',
      component: () => import('@/views/user/index')
    }]
  },
  {
    path: '/myToken',
    component: Layout,
    children: [{
      path: '',
      name: 'MyCoins',
      component: () => import('@/views/coins/myToken')
    }]
  },
  {
    path: '/myTokenInfo',
    component: Layout,
    children: [{
      path: '',
      name: 'MyTokenInfo',
      component: () => import('@/views/coins/myTokenInfo')
    }]
  },
  {
    path: '/token',
    component: Layout,
    children: [{
      path: '',
      name: 'Token',
      component: () => import('@/views/token/index')
    }]
  },
  {
    path: '/tokenInfo',
    component: Layout,
    children: [{
      path: '',
      name: 'TokenInfo',
      component: () => import('@/views/token/info')
    }]
  },

  {
    path: '/tokenDetail',
    component: Layout,
    children: [{
      path: '',
      name: 'Tokendetail',
      component: () => import('@/views/token/detail')
    }]
  },


   // Contract
   {
    path: "/contract",
    component: Layout,
    children: [
      {
        path: "",
        name: "Contract",
        component: () => import("@/views/contract/Contract.vue"),
      },
    ],
  },
  {
    path: "/contractinfo/:id",
    component: Layout,
    children: [
      {
        path: "",
        name: "ContractInfo",
        component: () => import("@/views/contract/ContractInfo.vue"),
      },
    ],
  },
  /*
  {
    path: "/contractdetail/:id",
    component: Layout,
    children: [
      {
        path: "",
        name: "ContractDetail",
        component: () => import("@/views/contract/ContractDetail.vue"),
      },
    ],
  },
  */
  {
    path: "/verifycontract",
    component: Layout,
    children: [
      {
        path: "",
        name: "VerifyContract",
        component: () => import("@/views/contract/VerifyContract.vue"),
      },
    ],
  },

  {
    path: "/verifycontract/:id",
    component: Layout,
    children: [
      {
        path: "",
        name: "VerifyContract",
        component: () => import("@/views/contract/VerifyContract.vue"),
      },
    ],
  },


  
  {
    path: '/accounts',
    component: Layout,
    children: [{
      path: '',
      name: 'Accounts',
      component: () => import('@/views/accounts/index')
    }]
  },

  {
    path: '/voter',
    component: Layout,
    children: [{
      path: '',
      name: 'Voter',
      component: () => import('@/views/voter/index')
    }]
  },
  {
    path: '/punishment',
    component: Layout,
    children: [{
      path: '',
      name: 'Punishment',
      component: () => import('@/views/punishment/index')
    }]
  },
  {
    path: '/voterinfo/:round',
    component: Layout,
    children: [{
      path: '',
      name: 'Voterinfo',
      component: () => import('@/views/voterinfo/index')
    }]
  },

  {
    path: '/apis/:id',
    component: Layout,
    children: [{
      path: '',
      name: 'Apis',
      component: () => import('@/views/api/index')
    }]
  },

  {
    path: '/accountsinfo/:id',
    component: Layout,
    children: [{
      path: '',
      name: 'Accountsinfo',
      component: () => import('@/views/accountsinfo/index')
    }]
  },

  {
    path: '/search/:id',
    component: Layout,
    children: [{
      path: '',
      name: 'Search',
      component: () => import('@/views/search/index')
    }]
  },
  {

    path: '/miner',
    component: Layout,
    children: [{
      path: '',
      name: 'miner',
      component: () => import('@/views/flowmining/miner/index')
    }]
  },
  {
    path: '/minerView/:id',
    component: Layout,
    children: [{
      path: '',
      name: 'minerView',
      component: () => import('@/views/flowmining/miner/view')
    }]
  },
  {

    path: '/flowmining',
    component: Layout,
    children: [{
      path: '',
      name: 'flowmi',
      component: () => import('@/views/flowmining/mining/index')
    }]
  },
  {

    path: '/topMiners',
    component: Layout,
    children: [{
      path: '',
      name: 'topMiners',
      component: () => import('@/views/flowmining/topMiners/index')
    }]
  },
  {

    path: '/topminingview/:id',
    component: Layout,
    children: [{
      path: '',
      name: 'topminingview',
      component: () => import('@/views/mymanage/mining/view.vue')
    }]
  },
 
  {
    path: '/flowmiView/:id',
    component: Layout,
    children: [{
      path: '',
      name: 'flowmiView',
      component: () => import('@/views/flowmining/mining/view')
    }]
  },
  {

    path: '/mymanagep',
    component: Layout,
    children: [{
      path: '/',
      component: () => import('@/views/mymanage/publicLayout'),
      children: [
        {
          path: 'makegood/:id',
          name: 'MymanageMakegoodp',
          component: () => import('@/views/mymanage/node/makeGood.vue')
        },
        {
          path: 'addNode',
          name: 'MymanageAddNodep',
          component: () => import('@/views/mymanage/node/addNode.vue')
        },
      ]
    }]
  },

  
  {

    path: '/mymanage',
    component: Layout,
    children: [{
      path: '/',
      component: () => import('@/views/mymanage/layout'),
      children: [
        {
          path: '',
          name: 'Mymanage',
          component: () => import('@/views/mymanage/overview/index.vue')
        },
        {
          path: 'pay',
          name: 'MymanagePay',
          component: () => import('@/views/mymanage/pay/index.vue')
        },
        {
          path: 'node',
          name: 'MymanageNode',
          component: () => import('@/views/mymanage/node/index.vue')
        },
        {
          path: 'producedBlock',
          name: 'producedBlock',
          component: () => import('@/views/mymanage/producedBlock/index.vue')
        },
        {
          path: 'blockreward',
          name: 'blockreward',
          component: () => import('@/views/mymanage/blockreward/index.vue')
        },
        {
          path: 'flowReward',
          name: 'flowReward',
          component: () => import('@/views/mymanage/flowReward/index.vue')
        },
        {
          path: 'bandwidthReward',
          name: 'bandwidthReward',
          component: () => import('@/views/mymanage/bandwidthReward/index.vue')
        },

        {
          path: 'makegood/:id',
          name: 'MymanageMakegood',
          component: () => import('@/views/mymanage/node/makeGood.vue')
        },
        {
          path: 'nodeBinding/:id',
          name: 'NodeBinding',
          component: () => import('@/views/mymanage/node/binding.vue')
        },
        {
          path: 'nodeUpBinding/:id',
          name: 'NodeUpBinding',
          component: () => import('@/views/mymanage/node/upbinding.vue')
        },

        {
          path: 'nodeBindingLift/:id',
          name: 'NodeBindingLift',
          component: () => import('@/views/mymanage/node/bindinglift.vue')
        },

        {
          path: 'nodeView/:id',
          name: 'mynodeView',
          component: () => import('@/views/nodes/nodeView')

        },

        {
          path: 'addNode',
          name: 'MymanageAddNode',
          component: () => import('@/views/mymanage/node/addNode.vue')
        },
        {
          path: 'pledgelist/:id',
          name: 'MymanagePledge',
          component: () => import('@/views/mymanage/node/pledge.vue')
        },
        {
          path: 'punishment/:id',
          name: 'MymanagePunishment',
          component: () => import('@/views/mymanage/node/punishment.vue')
        },
        {
          path: 'releaseList/:id',
          name: 'releaseList',
          component: () => import('@/views/mymanage/statistics/releaseList.vue')
        },
        {
          path: 'mining',
          name: 'MymanageMining',
          component: () => import('@/views/mymanage/mining/index.vue')
        },
        {
          path: 'uppledge/:id',
          name: 'MymanageUppledge',
          component: () => import('@/views/mymanage/mining/uppledge.vue')
        },
        {
          path: 'bandwidth/:id',
          name: 'MymanageBandwidth',
          component: () => import('@/views/mymanage/mining/bandwidth.vue')
        },
        {
          path: 'join/:id',
          name: 'Mymanagejoin',
          component: () => import('@/views/mymanage/mining/join.vue')
        },
        {
          path: 'flowList/:id',
          name: 'MymanageFlowList',
          component: () => import('@/views/mymanage/mining/flowList.vue')
        },
        {
          path: 'minerview/:id',
          name: 'Mymanageminerview',
          component: () => import('@/views/mymanage/mining/view.vue')
        },
        {
          path: 'binding',
          name: 'Mymanagebinding',
          component: () => import('@/views/mymanage/mining/binding.vue')
        },
        {
          path: 'bindingRevenue/:id',
          name: 'bindingRevenue',
          component: () => import('@/views/mymanage/mining/bindingRevenue.vue')
        },
        {
          path: 'bindinglift/:id',
          name: 'Mymanagebindinglift',
          component: () => import('@/views/mymanage/mining/bindinglift.vue')
        },


        {
          path: 'mininglog',
          name: 'MymanageMiningLog',
          component: () => import('@/views/mymanage/mininglog/index.vue')
        },
        {
          path: 'paylog',
          name: 'MymanagePayLog',
          component: () => import('@/views/mymanage/paylog/index.vue')
        },

        {
          path: '/withdrawal',
          component: Layout,
          name: 'Withdrawal',
          component: () => import('@/views/mymanage/withdrawal/index')
        },  
        
        {
          path: '/flowConsumption',
          component: Layout,
          name: 'flowConsumption',
          component: () => import('@/views/mymanage/flowConsumption/index')
        },  
        
        
      ]
    }]
  },
  {
    path: '/trafficMashine',
    component: Layout,
    children: [{
      path: '',
      name: 'trafficMashine',
      component: () => import('@/views/tools/trafficMashine/index.vue')
    }]
  },


  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
 mode: 'history',
  //mode: 'hash',
  // base: 'cloud',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
