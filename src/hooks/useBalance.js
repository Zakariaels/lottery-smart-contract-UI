import {useState, useEffect} from "react";
import lottery from "../lottery";
import web3 from "../web3";

const useBalance = () => {
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const getBalance = async () => {
      const balance = await getLotteryBalance();
      setBalance(balance);
    }
    getBalance();
  }, []);

  return {balance};
};

const getLotteryBalance = async () => {
  const balance = await web3.eth.getBalance(lottery.options.address);
  return balance;
};

export default useBalance;
