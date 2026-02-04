import hre from "hardhat";

async function main() {
  const greetingContract = await hre.viem.getContractAt("GreetingAns", "0x5FbDB2315678afecb367f032d93F642f64180aa3");

  const greeting_1 = await greetingContract.read.hello();
  const greeting_2 = await greetingContract.read.hello(["東北電力"]);
  const greeting_3 = await greetingContract.read.hello(["お世話になります", "東北電力"]);

  console.log(`
hello(): ${greeting_1}
hello(name): ${greeting_2}
hello(greeting, name): ${greeting_3}
`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
