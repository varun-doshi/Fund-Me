import "./App.css";
import { useState, useEffect } from "react";
import abi from "./contract/chai.json";
import { ethers } from "ethers";
import Buy from "./componenets/Buy";
import Memos from "./componenets/Memos";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [signerAcc, setSignerAcc] = useState("");

  const connectWallet = async () => {
    const contractAddress = "0x604d377a1edC3577e97f16116A074Baa92418B9a";
    const contractABI = abi.abi;
    try {
      const { ethereum } = window;
      if (ethereum) {
        await ethereum.request({
          method: "eth_requestAccounts",
        });

        ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const signerAcc = await signer.getAddress();
        console.log(signerAcc);
        setSignerAcc(signerAcc);
        setState({ provider, signer, contract });
      } else {
        alert("Please install Metamask");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);
  // console.log(state);

  return (
    <div>
      <h1 className="fundTitle" style={{ color: "#EFF5F5", fontSize: "2 rem" }}>
        Fund Me
      </h1>
      <h1 className="addr">Your Address:{signerAcc}</h1>
      <Buy state={state} />
      <Memos state={state} />
    </div>
  );
}

export default App;
