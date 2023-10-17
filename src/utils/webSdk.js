
import { Message } from "element-ui";
import * as ethereumjsutil from "ethereumjs-util"
import { ethers, BigNumber } from "ethers"
import i18n from '@/lang'
import Web3 from "web3"
import utils from "@/utils/utils";
import Abis from "@/utils/Abis"
var Tx = require('ethereumjs-tx');

const netUrl = window.$url.netUrl
const netId = window.$url.netId
const webSdk = {
    typeJson: {
        exch: { first: "NFC:1:Exch", assembly: ["first", "addr1", "value"] },// "NFC1Exch",
        Bind: { first: "NFC:1:Bind", assembly: ["first", "addr1", "type", "contractAddr", "signaddr"] },//"NFC1Bind",
        flwreq: { first: "NFC:1:FlwReq", assembly: ["first", "addr1", "operator", "mbps"] },//"NFC1FlwReq",
        rebind: { first: "NFC:1:Rebind", assembly: ["first", "addr1", "type", "contractAddr", "signaddr", "revenueAddr"] },
        flwexit: { first: "NFC:1:FlwExit", assembly: ["first", "addr1"] },
        candreq: { first: "NFC:1:CandReq", assembly: ["first", "addr1"] },
        candpnsh: { first: "NFC:1:CandPnsh", assembly: ["first", "addr1"] },
        candexit: { first: "NFC:1:CandExit", assembly: ["first", "addr1"] },
        unbind: { first: "NFC:1:Unbind", assembly: ["first", "addr1", "type"] }


    },
    sdkUtils: {
        networkChanged: function (fun) {
            if (window.ethereum) {
                window.ethereum.on("chainChanged", (networkIDstring) => {
                    fun(networkIDstring)
                });
            }

        },

        netWorkOk() {
            if (!window.ethereum) {
                return false;
            }
            let netIdInt = parseInt(netId, 16);
            let netIdIntL = parseInt(window.ethereum.chainId || "0", 16);

            return netIdInt == netIdIntL
        },

        accountsChanged: function (fun) {
            if (window.ethereum) {
                window.ethereum.on("accountsChanged", (accounts) => {
                    fun(accounts[0])
                });
            }
        },


        async getEnable(funL) {
            if (!window.ethereum) {
                Message.error(`Please install BluebeMask first`)
                return new Promise((resolve, reject) => {
                    reject()
                });
            }

            /*   if (!window.ethereumNX) {
                   Message.error(`Please install the BluebeMask wallet`)
                   return new Promise((resolve, reject) => {
                       reject()
                   });
               }*/

            return new Promise((resolve, reject) => {
                let rpcUrls = []
                if (netUrl.indexOf("https") < 0) {
                    rpcUrls.push(netUrl.replace("http", "https"))
                }
                rpcUrls.push(netUrl);

                //wallet_addEthereumChain
                let AddEthereumChainParameter = [{
                    chainId: netId,// A 0x-prefixed hexadecimal string
                    chainName: "NFC",
                    nativeCurrency: {
                        name: "NFC",
                        symbol: "NFC", // 2-6 characters long
                        decimals: 18,
                    },
                    rpcUrls: rpcUrls,

                }]
                let netIdInt = parseInt(netId, 16);
                window.ethereum.request({
                    method: 'eth_requestAccounts'
                }).then((addr) => {

                    window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: netId }],
                    }).then(response => {
                        resolve(response);
                    }).catch(() => {
                        window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: AddEthereumChainParameter,
                        }).then(response => {
                            resolve(response);
                        }).catch(err => {
                            Message.error(`Add Network RPC Url：${netUrl} \n chainId：${netIdInt}`);
                            reject(err)
                        })
                    })




                }).catch(err => {
                    reject(err);
                })
            })
        },


        async erc20Sign(json, value) {
            return new Promise((resolve, reject) => {
                let jsonL = {
                    data: json.data,
                    to: json.to,
                    value
                }
                this.aOri("erc20Sign", "erc20SginResult", JSON.stringify(jsonL), (hash) => {
                    resolve(hash || {})
                })

            });
        },

        getSelectAddress() {
            if (window.ethereum) {

                let address = ""
                if (window.ethereum.selectedAddress) {
                    address = window.ethereum.selectedAddress;
                } else
                    if (window.ethereum.address) {
                        address = window.ethereum.address;
                    }
                    else
                        if (window.web3.currentProvider.address) {
                            address = window.web3.currentProvider.address;
                        }

                return address;
            } else {
                return ""
            }
        },

        dataUtil(assemblyJson = {}, datas = {}) {
            let assembly = assemblyJson.assembly
            let u = ethers.utils;
            let from = webSdk.sdkUtils.getSelectAddress()

            let first = assemblyJson.first
            let addr1 = utils.isEmpty(datas.addr1) ? "" : u.getAddress(datas.addr1).slice(2).toLocaleLowerCase()
            let addr2 = utils.isEmpty(datas.addr2) ? "" : u.getAddress(datas.addr2).slice(2).toLocaleLowerCase()
            let signaddr = utils.isEmpty(datas.signaddr) ? "" : u.getAddress(datas.signaddr).slice(2).toLocaleLowerCase()
            let contractAddr = utils.isEmpty(datas.contractAddr) ? "" : u.getAddress(datas.contractAddr).slice(2).toLocaleLowerCase()
            let revenueAddr = utils.isEmpty(datas.revenueAddr) ? "" : u.getAddress(datas.revenueAddr).slice(2).toLocaleLowerCase()

            let type = datas.type
            let value = utils.isEmpty(datas.value) ? "0" : BigNumber.from(utils.weedDecimals(datas.value || "0", 18))._hex.slice(2)

            let mbps = utils.isEmpty(datas.mbps) ? "0" : Number(datas.mbps || "0").toString(16);

            let operator = utils.isEmpty(datas.operator) ? "0" : Number(datas.operator || "0").toString(16);

            let dataL = {
                first,
                addr1,
                addr2,
                signaddr,
                contractAddr,
                revenueAddr,
                value,
                type,
                mbps,
                operator
            }
            let data = ""

            assembly.forEach(key => {
                data += data.length > 0 ? (':' + dataL[key]) : dataL[key]
            })
            
            dataL = u.hexlify(u.toUtf8Bytes(data))
           
            return {
                from,
                to: from,//u.getAddress(bossAddr),
                value: "0",//val._hex,
                data: dataL
            }
        },
        hashToNX(valHex, cut = false) {
            if (valHex && valHex.substring(0, 2) === "0x") {
                valHex = valHex.trim();
                valHex = (cut ? "" : "0x") + valHex.slice(2)//NX
            }
            return valHex
        }

    },


    sdk: class {
        constructor(bassContract) {
            this.bassContract = bassContract;
        }
        getBalance() {
            let address = webSdk.sdkUtils.getSelectAddress();

            return new Promise((resolve, reject) => {

                this.bassContract.active_WalletOrSigner.provider.getBalance(address).then(response => {
                    resolve(ethers.utils.formatUnits(response));
                }).catch(err => {
                    reject(err)
                })
            })
        }

        sendTransactionTo(assembly, datas, windata) {
            if (windata) {
                windata.subContext = `<span style='color:orange'>${i18n.t("messages.pleaseconfirm")}</span>`
            }
            return new Promise((resolve, reject) => {

                let json = webSdk.sdkUtils.dataUtil(assembly, datas)
                
                window.ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [json],
                }).then(response => {

                    if (windata) {
                        windata.subContext = `<span style='color:blue'>${i18n.t("messages.confirmed")}</span>`
                        windata.closebtnshow = windata.closebtnshow !== false
                    }
                    this.waitForTransaction(response).then(re => {
                        //debugger
                        if (windata) {
                            windata.subContext = ""
                        }
                        resolve(re)
                    }).catch(err => {
                        if (windata) {
                            windata.subContext = ""
                        }
                        reject(err)
                    })

                }).catch(err => {
                    if (windata) {
                        windata.subContext = ""
                    }
                    reject(err)
                })
            });
        }

        toSignStr(random, devAdd) {
            return new Promise((resolve, reject) => {
                devAdd = devAdd.toLocaleLowerCase().slice(2);
                let from = webSdk.sdkUtils.getSelectAddress()
                from = from.toLocaleLowerCase()
                let fromL = from.slice(2)
                let signStr = random + devAdd + fromL
                let hashL = ethers.utils.toUtf8Bytes(signStr)
                let test = ethers.utils.keccak256(hashL)
                let provider = window.web3.currentProvider// this.bassContract.active_WalletOrSigner.provider
                let web3 = new Web3(provider, null, { transactionConfirmationBlocks: 1 })

                web3.eth.sign(test, from, async (err, sign) => {

                    if (err) return console.error(err)

                    console.log(ethers.utils.splitSignature(sign))

                    let singL = ethers.utils.splitSignature(sign)

                    var item = [];
                    let ethUtil = ethereumjsutil
                    item.push(ethUtil.unpadBuffer(ethUtil.toBuffer(singL.v)));
                    item.push(ethUtil.unpadBuffer(ethUtil.toBuffer(singL.r)));
                    item.push(ethUtil.unpadBuffer(ethUtil.toBuffer(singL.s)));
                    let hexv = ethUtil.rlp.encode(item);
                    let sig = '0x' + this.buf2hex(hexv);

                    resolve({ sigAdd: fromL, sig, devAdd })

                }).catch(err => {
                    reject(err)
                })
            });
        }

        toPool(contractAddr, multaddr, to, windata) {
            if (windata) {
                windata.subContext = `<span style='color:blue'>${i18n.t("messages.pleaseconfirm")}</span>`
            }
            return new Promise((resolve, reject) => {
                let contract = this.bassContract.createContractInstance(contractAddr, Abis.PoollErc, this.bassContract.active_WalletOrSigner.provider);

                contract.bindMultAddr(multaddr, to).then(response => {
                    if (windata) {
                        windata.subContext = `<span style='color:blue'>${i18n.t("messages.confirmed")}</span>`
                    }
                    this.waitForTransaction(response.hash).then(re => {
                        if (windata) {
                            windata.subContext = ""
                        }
                        resolve(re)
                    }).catch(err => {
                        if (windata) {
                            windata.subContext = ""
                        }
                        reject(err)
                    })

                }).catch(err => {
                    if (windata) {
                        windata.subContext = ""
                    }
                    reject(err)
                })
            });

        }

        buf2hex(buffer) {
            return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
        }

        async transactionSing(type, val, payAddr, toVal = true, subjoin) {
            let json = webSdk.sdkUtils.dataUtil(type, val, payAddr, toVal, subjoin)
            let provider = window.web3.currentProvider// this.bassContract.active_WalletOrSigner.provider
            let web3 = new Web3(provider, null, { transactionConfirmationBlocks: 1 })
            const web3Private = web3// privateChainWeb3;
            const nonce = await web3Private.eth.getTransactionCount(json.from);
            const gasPrice = web3.eth.getGasPrice();
            const gasLimit = web3.eth.estimateGas({
                to: json.to,
                data: json.data,
            })
            let netIdInt = parseInt(netId, 16);
            const rawTx = {
                nonce,
                gasPrice: web3.utils.toHex(gasPrice),
                gasLimit: web3.utils.toHex(gasLimit),
                to: json.to,
                value: json.value,
                data: json.data,
                from: json.from,
                chainId: netIdInt,
            };

            var tx = new Tx(rawTx);
            var hash = '0x' + this.buf2hex(tx.hash(false));

            web3.eth.sign(hash, json.from, async (err, sign) => {
                if (err) return console.error(err)
                var r = sign.substring(2, 66);
                var s = sign.substring(66, 66 + 64);
                var v = sign.substring(66 + 64);
                console.log('r: ' + r);
                console.log('s: ' + s);
                console.log('v: ' + v);

                var sig = {
                    r: '0x' + r,
                    s: '0x' + s,
                    v: parseInt(v, 16),
                }

                if (tx._chainId > 0) {
                    sig.v += tx._chainId * 2 + 8;
                }
                Object.assign(tx, sig);

                var hash = '0x' + this.buf2hex(tx.hash(true));

                var serializedTx = tx.serialize();
                let hashL = '0x' + serializedTx.toString('hex')



                window.ethereum.request({
                    method: 'eth_sendRawTransaction',
                    params: [hashL],
                }).then(response => {
                    //

                }).catch(err => {

                    reject(err)
                })

            })
        }

        toExtract(contractAddr, multaddr, windata) {
            if (windata) {
                windata.subContext = `<span style='color:blue'>${i18n.t("messages.pleaseconfirm")}</span>`
            }
            return new Promise((resolve, reject) => {
                let contract = this.bassContract.createContractInstance(contractAddr, Abis.Extract, this.bassContract.active_WalletOrSigner.provider);
                //debugger
                contract.withdrawalReleaseFund().then(response => {
                    if (windata) {
                        windata.subContext = `<span style='color:blue'>${i18n.t("messages.confirmed")}</span>`
                    }
                    // debugger
                    this.waitForTransaction(response.hash).then(re => {
                        //    debugger
                        if (windata) {
                            windata.subContext = ""
                        }
                        resolve(re)
                    }).catch(err => {
                        if (windata) {
                            windata.subContext = ""
                        }
                        
                        reject(err)
                    })

                }).catch(err => {
                    if (windata) {
                        windata.subContext = ""
                    }
                    reject(err)
                })
            });
        }

        toExtractAmount(contractAddr, multaddr) {
            return new Promise((resolve, reject) => {
                let contract = this.bassContract.createContractInstance(contractAddr, Abis.Extract, this.bassContract.active_WalletOrSigner.provider);
                contract.releaseFund(multaddr).then(response => {
                    resolve(ethers.utils.formatUnits(response))
                }).catch(err => {
                    reject(err)
                })
            })
        }

        sendTransaction(hash) {
            return new Promise((resolve, reject) => {
                let provider = this.bassContract.active_WalletOrSigner.provider

                provider.sendTransaction(hash).then(
                    response => {

                        this.waitForTransaction(response.hash).then(responset => {
                            resolve(responset)
                        }).catch(err => {
                            reject(err)
                        })
                    }).catch(err => {
                        reject(err)
                    })
            });

        }

        waitForTransaction(hash) {
            return new Promise((resolve, reject) => {
                let provider = this.bassContract.active_WalletOrSigner.provider
                //debugger                
                provider.waitForTransaction(hash)
                    .then((receipt) => {

                        if (receipt.status == 1) {
                            resolve(receipt)
                        } else {
                            reject(receipt);
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    });
            })
        }

    }

}

export default webSdk;