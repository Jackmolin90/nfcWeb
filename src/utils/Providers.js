import { ethers } from 'ethers';
import web3 from "web3";
export default class Providers {
 
    static isBluebeeMaskProvider () {
        return Boolean( window.ethereum);
    }
 
    static createProvider (url) {
        if(url){
            return new ethers.providers.Web3Provider(new web3.providers.HttpProvider(url));
        }

        if (Providers.isBluebeeMaskProvider()) {
       
            return  new ethers.providers.Web3Provider( window.ethereum );
            
        } else {
            throw Error( alert('Please install the BluebeMask wallet！') );
        }
    }
}