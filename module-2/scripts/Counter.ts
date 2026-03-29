import hre from "hardhat";

async function main() {
  const contractName: any = "Counter";
  const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

  const publicClient = await hre.viem.getPublicClient();

  const counterContract = await hre.viem.getContractAt(
    contractName,
    contractAddress,
  );

  const maxCount = await counterContract.read.MAX_COUNT();
  const minCount = await counterContract.read.MIN_COUNT();
  const delta = await counterContract.read.DELTA();

  console.log(`
🪧 Counterコントラクト:
    Max Count: ${maxCount}
    Min Count: ${minCount}
    Delta: ${delta}
`);

  const countBefore = await counterContract.read.getCount();
  console.log(`⏳ Count (before): ${countBefore}\n`);

  const hash_1 = await counterContract.write.increment();
  const receipt_1 = await publicClient.waitForTransactionReceipt({ hash: hash_1 });
  console.log(`✅ Count +5 in block ${receipt_1.blockNumber}\n`);

  const hash_2 = await counterContract.write.increment([10]);
  const receipt_2 = await publicClient.waitForTransactionReceipt({ hash: hash_2 });
  console.log(`✅ Count +10 in block ${receipt_2.blockNumber}\n`);

  const hash_3 = await counterContract.write.decrementConditional();
  const receipt_3 = await publicClient.waitForTransactionReceipt({ hash: hash_3 });
  console.log(`✅ Count -5 in block ${receipt_3.blockNumber}\n`);

  const countAfter = await counterContract.read.getCount();
  console.log(`⏳ Count (after): ${countAfter}\n`);

  const hash_4 = await counterContract.write.reset();
  const receipt_4 = await publicClient.waitForTransactionReceipt({ hash: hash_4 });
  console.log(`✅ Count reset in block ${receipt_4.blockNumber}\n`);

  const countAfterReset = await counterContract.read.getCount();
  console.log(`⏳ Count (after reset): ${countAfterReset}\n`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
