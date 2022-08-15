import {useState} from "react";

import useManager from "./hooks/useManager";
import usePlayers from "./hooks/usePlayers";
import useBalance from "./hooks/useBalance";
import getAccounts from "./utils/getAccounts";
import lottery from "./lottery";
import web3 from "./web3";

import "./App.css";

const App = () => {
  const {managerAddress} = useManager();
  const {players} = usePlayers();
  const {balance} = useBalance();
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  const onEnterClick = async (event) => {
    event.preventDefault();
    if (value === "") {
      return;
    }

    const accounts = await web3.eth.getAccounts();

    setMessage("Waiting on transaction success...");
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, "ether"),
    });
    setMessage("You have been entered!");
    setValue("");
  }

  const onPickWinnerClick = async (event) => {
    event.preventDefault();
    const accounts = await getAccounts();
    setMessage("Waiting on transaction success...");

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    setMessage("A winner has been picked!");
  }

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>
        This contract is managed by {managerAddress}
        There are currently {players.length} players competing to win {web3.utils.fromWei(balance, "ether")} ether!
      </p>

      <hr />
      <form onSubmit={onEnterClick} >
        <h4>Want to try you luck</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input value={value} onChange={event => setValue(event.target.value) } />
        </div>
        <button type="submit">Enter</button>
      </form>

      <hr />
      <h4>Ready to pick a winner ?</h4>
      <button type="submit" onClick={onPickWinnerClick}>Pick a winner</button>
      <hr />
      <h1>{message}</h1>
    </div>
  );
};
export default App;
