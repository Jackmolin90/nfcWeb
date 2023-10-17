export default {
    PoollErc:[
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"multaddr",
                    "type":"address"
                },
                {
                    "internalType":"address",
                    "name":"to",
                    "type":"address"
                }
            ],
            "name":"bindMultAddr",
            "outputs":[
                {
                    "internalType":"bool",
                    "name":"",
                    "type":"bool"
                }
            ],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"_pooladdr",
                    "type":"address"
                },
                {
                    "internalType":"uint256",
                    "name":"_userper",
                    "type":"uint256"
                },
                {
                    "internalType":"address",
                    "name":"_owner",
                    "type":"address"
                }
            ],
            "stateMutability":"nonpayable",
            "type":"constructor"
        },
        {
            "anonymous":false,
            "inputs":[
                {
                    "indexed":false,
                    "internalType":"address",
                    "name":"multaddr",
                    "type":"address"
                },
                {
                    "indexed":false,
                    "internalType":"address",
                    "name":"to",
                    "type":"address"
                }
            ],
            "name":"BindMultAddr",
            "type":"event"
        },
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"newOwner",
                    "type":"address"
                }
            ],
            "name":"changeOwner",
            "outputs":[
    
            ],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "anonymous":false,
            "inputs":[
                {
                    "indexed":false,
                    "internalType":"address",
                    "name":"newOwner",
                    "type":"address"
                }
            ],
            "name":"ChangeOwner",
            "type":"event"
        },
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"newPooladdr",
                    "type":"address"
                }
            ],
            "name":"changePooladdr",
            "outputs":[
    
            ],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "anonymous":false,
            "inputs":[
                {
                    "indexed":false,
                    "internalType":"address",
                    "name":"newPooladdr",
                    "type":"address"
                }
            ],
            "name":"ChangePooladdr",
            "type":"event"
        },
        {
            "inputs":[
                {
                    "internalType":"uint256",
                    "name":"newUserper",
                    "type":"uint256"
                }
            ],
            "name":"changeUserper",
            "outputs":[
    
            ],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "anonymous":false,
            "inputs":[
                {
                    "indexed":false,
                    "internalType":"uint256",
                    "name":"newUserper",
                    "type":"uint256"
                }
            ],
            "name":"ChangeUserper",
            "type":"event"
        },
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"multaddr",
                    "type":"address"
                }
            ],
            "name":"GrantProfit",
            "outputs":[
                {
                    "internalType":"bool",
                    "name":"",
                    "type":"bool"
                }
            ],
            "stateMutability":"payable",
            "type":"function"
        },
        {
            "anonymous":false,
            "inputs":[
                {
                    "indexed":true,
                    "internalType":"address",
                    "name":"from",
                    "type":"address"
                },
                {
                    "indexed":true,
                    "internalType":"address",
                    "name":"to",
                    "type":"address"
                },
                {
                    "indexed":false,
                    "internalType":"uint256",
                    "name":"value",
                    "type":"uint256"
                }
            ],
            "name":"Transfer",
            "type":"event"
        },
        {
            "inputs":[
    
            ],
            "name":"owner",
            "outputs":[
                {
                    "internalType":"address",
                    "name":"",
                    "type":"address"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
    
            ],
            "name":"pooladdr",
            "outputs":[
                {
                    "internalType":"address",
                    "name":"",
                    "type":"address"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"",
                    "type":"address"
                }
            ],
            "name":"useraddrs",
            "outputs":[
                {
                    "internalType":"address",
                    "name":"",
                    "type":"address"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
    
            ],
            "name":"userper",
            "outputs":[
                {
                    "internalType":"uint256",
                    "name":"",
                    "type":"uint256"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        }
    ],


    Extract:[
        {
            "constant": true,
            "inputs": [
                {
                    "name": "who",
                    "type": "address"
                }
            ],
            "name": "releaseFund",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "rateindex",
                    "type": "uint256"
                }
            ],
            "name": "rateItem",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "who",
                    "type": "address"
                },
                {
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "lockUpItem",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "withdrawalReleaseFund",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "who",
                    "type": "address"
                }
            ],
            "name": "lockUpNumber",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "who",
                    "type": "address"
                },
                {
                    "name": "tnum",
                    "type": "uint256"
                },
                {
                    "name": "rateindex",
                    "type": "uint256"
                }
            ],
            "name": "grantTrafficProfit",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "transferor",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "lockupstart",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "rateindex",
                    "type": "uint256"
                }
            ],
            "name": "GrantTrafficProfit",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "transferor",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "lockupstart",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "lockupamount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "leftamount",
                    "type": "uint256"
                }
            ],
            "name": "WithdrawalReleaseFund",
            "type": "event"
        }
    ]
}