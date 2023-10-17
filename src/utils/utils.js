import { ethers, BigNumber } from "ethers";
import { Decimal } from 'decimal.js'
import * as api from "@/api/api";
const utils = {}
utils.MAINTOKEN = "NFC"

const avgBlockTimeNum = window.$url.avgBlockTime
let totalBlockNumber = null

utils.getNumber = function (val, tokenA, tokenB, isOrd = true) {



  if (isOrd) {
    return utils.getNumberA(val, tokenA, tokenB);
  } else {
    return utils.getNumberB(val, tokenA, tokenB)
  }
}

utils.clearZero = function (value, num = 4) {
  if (utils.isEmpty(value)) {
    return "0"
  }
  if (typeof value == "string") {
    value = value.trim()
  }
  value = new Decimal(value || 0).toFixed()
  try {
    value = ethers.utils.formatUnits(BigNumber.from((value || 0) + ""))
    let minus = ""
    if (value < 0) {
      minus = "-"
    }
    value = minus + utils.weedZero(value, num)
  } catch (error) {
  }
  return value
}

utils.lockingTime = function (startTime, avgBlockTime = avgBlockTimeNum, unlocknumber, releaseHeigth) {
  avgBlockTime = avgBlockTime === null ? avgBlockTimeNum : avgBlockTime;
  let lockTime = totalBlockNumber/* Math.floor(
    (new Date().getTime() - startTime) / (avgBlockTime * 1000)
  );*/
  let nowNumber = unlocknumber + releaseHeigth - lockTime;

  if (nowNumber > 0) {

    return Math.ceil(nowNumber / 8640);


  }

  return 0;
}
utils.getNowHeight = async function () {
  return new Promise((resolve, reject) => {

    api
      .postJson("/platform/getBlockNumber", "")
      .then((response) => {
        const data = response.result || {};
        totalBlockNumber = data.totalBlockNumber
        resolve()
      }).catch(err => {
        resolve(err)
      })


  });

}
utils.lockingNumber = function (
  startTime,
  avgBlockTime = avgBlockTimeNum,
  unlocknumber,
  releaseHeigth,
  releaseinterval,
  totalAmount
) {
  avgBlockTime = avgBlockTime === null ? avgBlockTimeNum : avgBlockTime;
  let lockTime = totalBlockNumber/*Math.floor(
    (new Date().getTime() - startTime) / (avgBlockTime * 1000)
  );*/


  nowNumber = lockTime - (unlocknumber + releaseHeigth);
  if (nowNumber > 0) {
    return utils.clearZero(totalAmount, 4);
  }

  let nowNumber = unlocknumber - lockTime;
  if (nowNumber >= 0) {
    return 0;
  }
  nowNumber = lockTime - unlocknumber;
  if (releaseHeigth > 0 && releaseinterval > 0 && nowNumber > 0) {
    return utils.clearZero(
      (nowNumber / releaseinterval / (releaseHeigth / releaseinterval)) *
      totalAmount,
      4
    );
  }

  return 0;
}


utils.numberF = 18;





utils.isEmpty = function (val) {
  if (val === undefined || val === null || (val + '').trim() === '') {
    return true
  } else {
    return false
  }
}

utils.getUrlParams = function (str) {
  let strs = str.split('&')
  let result = new Object()
  for (var i = 0; i < strs.length; i++) {
    result[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
  }
  return result
}

utils.isInt = function (val) {
  let regPos = /^\+?[0-9][0-9]*$/
  if (regPos.test(val)) {
    return true
  } else {
    return false
  }
}

utils.isNumber = function (val) {

  let regPos = /^\d+(\.\d+)?$/
  let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ //负浮点数
  if (regPos.test(val) || regNeg.test(val)) {
    return true
  } else {

    return false
  }
}





utils.getHashCode = function (str, caseSensitive) {
  if (!caseSensitive) {
    str = str.toLowerCase();
  }
  var hash = 1315423911, i, ch;
  for (i = str.length - 1; i >= 0; i--) {
    ch = str.charCodeAt(i);
    hash ^= ((hash << 5) + ch + (hash >> 2));
  }

  return (hash & 0x7FFFFFFF);
}


utils.weedDecimals = function (val, decimals = 0) {
  if (utils.isEmpty(val)) {
    return ""
  }
  val = new Decimal(val || 0).toFixed()
  let valL = (val + "").replace(/[^\d.]/g, "").trim()
  let valArr = valL.split(".")
  let toStr = ""
  let toStrArr = (valArr.length > 1 ? valArr[1] : "").split("")
  toStrArr.forEach(item => {
    if (toStr.length < decimals) {
      toStr += item
    }
  })

  while (toStr.length < decimals) {
    toStr += "0"
  }

  return (valArr[0] || "") + toStr
}

utils.weedZero = function (val, decimals = 0) {

  if (utils.isEmpty(val)) {
    return ""
  }
  if (typeof val == "string") {
    val = val.trim()
  }
  val = new Decimal(val || 0).toFixed()
  let valL = (val + "").replace(/[^\d.]/g, "").trim()
  let valArr = valL.split(".")
  let first = ""
  let toStr = ""
  let firstArr = valArr[0];
  let toStrArr = (valArr.length > 1 ? valArr[1] : "").split("")
  let zero = false;
  for (let cd = 0; cd < firstArr.length; cd++) {
    if (zero || firstArr[cd] != "0") {
      first += firstArr[cd];
      zero = true;
    }
  }
  zero = false;

  for (let cd = toStrArr.length - 1; cd >= 0; cd--) {
    if (cd < decimals) {
      if (zero || toStrArr[cd] != "0") {
        toStr = toStrArr[cd] + toStr
        zero = true;
      }

    }
  }



  return (first || "0") + (toStr.length > 0 ? ("." + toStr) : "")


}


utils.NumberDiv = function (arg1, arg2, digit) {
  var t1 = 0, t2 = 0, r1, r2;
  try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
  try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
  r1 = Number(arg1.toString().replace(".", ""))
  r2 = Number(arg2.toString().replace(".", ""))
  var result = ((r1 / r2) * Math.pow(10, t2 - t1)).toString()
  var result2 = result.split(".")[1];
  result2 = result2.substring(0, digit > result2.length ? result2.length : digit);

  return result.split(".")[0] + "." + result2;
}
/**
 * 
 * @param {*} datas Array  
 * @param {*} xName String :"name1"
 * @param {*} yNames String: [{name:"name2",dataType:"value/key_val",getData:Function,propertys:{name: 'Email',type: 'line',stack: 'Total',}},{name:"name2"},]
 * @param {*} type String col/row
 */
utils.chartData = function (datas = [], xName, yNames = [], type = "rows") {
  let xAxisData = []
  let series = []
  let legendsData = []

  let yConfigL = []
  yNames.forEach(obj => {
    let propertysL = obj.propertys || {}
    let itemL = { ...propertysL }
    itemL.data = []
    if (itemL.name) {
      legendsData.push(itemL.name)
    }
    series.push(itemL)
    yConfigL.push({ yValue: itemL, config: obj })
  })

  if (type == "rows") {
    datas.forEach(item => {
      if (xName) {
        xAxisData.push(item[xName])
      }
      yConfigL.forEach(obj => {
        let yValueL = obj.yValue
        let configL = obj.config
        let dataL = null;
        dataL = configL.dataType == "key_val" ? ({ name: [yValueL.name], value: item[configL.name] }) : item[configL.name]
        dataL = configL.getData ? configL.getData(item, configL.name) : dataL
        yValueL.data.push(dataL)
      })

    })
  } else if (type == "cols") {

    let jsonL = Array.isArray(datas) ? (datas.length > 0 ? datas[0] : null) : datas
    if (jsonL) {
      yConfigL.forEach(obj => {
        let yValueL = obj.yValue
        let configL = obj.config
        let dataL = null;
        dataL = configL.dataType == "key_val" ? ({ name: [yValueL.name], value: jsonL[configL.name] }) : jsonL[configL.name]
        dataL = configL.getData ? configL.getData(jsonL) : dataL
        yValueL.data.push(dataL)
      })
    }


  }
  return {
    xAxisData,
    series,
    legendsData
  }
}

utils.getSuffix = function (val, aStr = "", snum = 4) {
  if (!utils.isEmpty(val)) {
    let strL = "M";
    let num = 1024;
    let numL = num;
    let valL = val;
    if (valL / numL >= 1) {
      strL = "G";
      valL = val / numL;
      numL *= num;
    }
    if (val / numL >= 1) {
      strL = "T";
      valL = val / numL;
      numL *= num;
    }
    if (val / numL >= 1) {
      strL = "P";
      valL = val / numL;
      numL *= num;
    }
    if (val / numL >= 1) {
      valL = val / numL;
      strL = "E";
    }
    return utils.weedZero(valL, snum) + " " + strL + aStr;
  }
  return val;
}


export default utils
