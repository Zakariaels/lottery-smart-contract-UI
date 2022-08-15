import web3 from "../web3";

const getAccounts = async () => {
  const accounts = await web3.eth.getAccounts();

  return accounts;
};

export default getAccounts;
