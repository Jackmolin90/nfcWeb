import utils from "./utils"
const clearZero = function (val) {
    return utils.clearZero(val)
}
const valMap = {
    0: "additions.blockpledge",
    1: "additions.flowpledge",
};
const additions = {
    NFC: {
        Exch: [
            { title: "additions.fuladdr", name: "param1" },
            { title: "mymanage.nfcnumber", name: "param3", valFun: clearZero },
            { title: "additions.fulnumber", name: "param4", valFun: clearZero },
        ],
        Bind: [
            { title: "additions.deviceaddress", name: "param1" },
            { title: "mymanageMining.revenuesaddress", name: "param2" },
            {
                title: "additions.revenuetype",
                name: "param3",
                isT: true,
                valMap,
            },
            { title: "additions.contractaddress", name: "param5" },
            { title: "additions.multisignature", name: "param6" },
        ],
        Unbind: [
            { title: "additions.deviceaddress", name: "param1" },
            { title: "additions.deviceatype", name: "param3", isT: true, valMap },
        ],
        Rebind: [
            { title: "additions.deviceaddress", name: "param1" },
            { title: "mymanageMining.revenuesaddress", name: "param2" },
            { title: "additions.revenuetype", name: "param3", isT: true, valMap },
            { title: "additions.contractaddress", name: "param5" },
            { title: "additions.multisignature", name: "param6" },
        ],
        CandReq: [
            { title: "absent.address", name: "param1" },
            { title: "additions.pledgenfc", name: "param4", valFun: clearZero },
        ],
        CandExit: [{ title: "absent.address", name: "param1" }],
        CandPnsh: [
            { title: "lock.minerAddress", name: "param1" },
            { title: "node.repairPayment", name: "param3" },
            { title: "node.recharge", name: "param4" },
        ],
        FlwReq: [
            { title: "lock.minerAddress", name: "param1" },
            { title: "mymanageMining.allege", name: "param3" },
            { title: "mymanageNode.pledgenum", name: "param4", valFun: clearZero  },
            { title: "pledge.operator", name: "param5" },
        ],
        FlwExit: [{ title: "mining.minerAddress", name: "param1" }],
    },
    SSC: {
        ExchRate: [
            {
                title: "additions.exchangeratio",
                name: "param1",
                valFun: (val) => {
                    if (!val) {
                        return val;
                    }
                    return val / 10000;
                },
            },
        ],
        Deposit: [{ title: "additions.miningpledge", name: "param1", valFun: clearZero }],
        CndLock: [
            { title: "additions.lockupstage", name: "param1" },
            { title: "additions.freedupstage", name: "param2" },
            { title: "additions.interval", name: "param3" },
        ],
        FlwLock: [
            { title: "additions.lockupstage", name: "param1" },
            { title: "additions.freedupstage", name: "param2" },
            { title: "additions.interval", name: "param3" },
        ],
        RwdLock: [
            { title: "additions.lockupstage", name: "param1" },
            { title: "additions.freedupstage", name: "param2" },
            { title: "additions.interval", name: "param3" },
        ],
        WdthPnsh: [
            { title: "additions.deviceaddress", name: "param1" },
            { title: "additions.fulnumber", name: "param2", valFun: clearZero  },
        ],
    },
}

export default additions;