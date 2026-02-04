// import hre from "hardhat";

// async function main() {
//   const publicClient = await hre.viem.getPublicClient();

//   const counterPausableContract = await hre.viem.getContractAt(
//     "CounterPausable",
//     "0x",
//   );

//   const isPaused = await counterPausableContract.read.isPaused();
//   console.log(`\n❓ isPaused: ${isPaused}\n`);

//   const countBefore = await counterPausableContract.read.getCount();
//   console.log(`⏳ Count (before): ${countBefore}\n`);

//   const hash_1 = await counterPausableContract.write.pause();
//   const receipt_1 = await publicClient.waitForTransactionReceipt({ hash: hash_1 });
//   console.log(`✅ Contract paused in block ${receipt_1.blockNumber}\n`);

//   try {
//     await counterPausableContract.write.increment();
//   } catch {
//     console.log(`⚠️  コントラクト停止中 \n`);
//   }

//   const hash_2 = await counterPausableContract.write.unpause();
//   const receipt_2 = await publicClient.waitForTransactionReceipt({ hash: hash_2 });
//   console.log(`✅ Contract unpaused in block ${receipt_2.blockNumber}\n`);

//   const hash_3 = await counterPausableContract.write.increment();
//   const receipt_3 = await publicClient.waitForTransactionReceipt({ hash: hash_3 });
//   console.log(`✅ Count +6 in block ${receipt_3.blockNumber}\n`);

//   const countAfter = await counterPausableContract.read.getCount();
//   console.log(`⏳ Count (after): ${countAfter}\n`);

//   const hash_4 = await counterPausableContract.write.reset();
//   const receipt_4 = await publicClient.waitForTransactionReceipt({ hash: hash_4 });
//   console.log(`✅ Count reset in block ${receipt_4.blockNumber}\n`);

//   const countAfterReset = await counterPausableContract.read.getCount();
//   console.log(`⏳ Count (after reset): ${countAfterReset}\n`);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
