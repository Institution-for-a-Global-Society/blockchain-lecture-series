import hre from "hardhat";

async function main() {
  const contractName: any = "Greeting";
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const greetingContract = await hre.viem.getContractAt(
    contractName,
    contractAddress,
  );

  const greeting_1 = await greetingContract.read.hello();
  const greeting_2 = await greetingContract.read.hello(["IHI"]);

  console.log(`
hello(): ${greeting_1}
hello(name): ${greeting_2}
`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
