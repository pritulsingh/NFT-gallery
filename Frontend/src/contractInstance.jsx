import web3 from "./web3";
import abi from "./contracts/abi.json";
const address = "0xE91E0638d064A110A7f3E1eE0013eC859F457E39";
const instance = new web3.eth.Contract(abi, address);
export default instance;
