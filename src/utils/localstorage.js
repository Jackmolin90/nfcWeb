const saveKey="traffic_To_addr";

const localstorage={
    setItem(token){
        localStorage.setItem(saveKey, token);
    },
    getItem(){
        return   localStorage.getItem(saveKey);
    },
    removeItem(){
        localStorage.removeItem(saveKey);
    }
} 
export default localstorage;