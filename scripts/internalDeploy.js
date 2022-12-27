const hre = require("hardhat");

async function getBalance(address) {
  const balBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balBigInt);
}

async function logBalance(addresses) {
  let i = 0;
  for (const address of addresses) {
    console.log(`Balance of Account ${i}:${await getBalance(address)}`);
    i++;
  }
}

async function logMemos(Memos) {
  for (const memo of Memos) {
    console.log(
      `Name:${memo.name}, Message:${memo.message}, Address:${memo.from}, Time:${memo.timestamp}`
    );
  }
}

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const chai = await hre.ethers.getContractFactory("chai");
  const contract = await chai.deploy();
  await contract.deployed();

  console.log("Contract deployed to:", contract.address);

  const addresses = [
    owner.address,
    from1.address,
    from2.address,
    from3.address,
  ];
  console.log("before");
  await logBalance(addresses);

  const amount = { value: hre.ethers.utils.parseEther("1") };
  await contract.connect(from1).buyChai("V", "Whats up?", amount);
  await contract.connect(from2).buyChai("Q", "What up?", amount);
  await contract.connect(from3).buyChai("Z", "Wa up?", amount);

  console.log("after");
  await logBalance(addresses);

  const Memos = await contract.getMemos();
  await logMemos(Memos);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
