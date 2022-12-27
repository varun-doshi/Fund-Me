import { ethers } from "ethers";
import React from "react";

const Buy = ({ state }) => {
  const buyChai = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    console.log(name, message, contract);

    const amount = { value: ethers.utils.parseEther("0.0001") };
    const transaction = await contract.buyChai(name, message, amount);
    await transaction.wait();
    console.log("Transaction complete");
  };

  return (
    <div>
      <form onSubmit={buyChai}>
        <div>
          <label>Name </label>
          <input required type="text" placeholder="Enter Your Name" id="name" />
        </div>
        <div>
          <label>Message </label>
          <input
            required
            type="text"
            placeholder="Enter your Message"
            id="message"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Buy;
