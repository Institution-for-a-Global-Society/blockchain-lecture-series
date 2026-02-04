// import hre from "hardhat";

// async function main() {
//   const publicClient = await hre.viem.getPublicClient();
//   const clients = await hre.viem.getWalletClients();
//   const oldOwner = clients[0];
//   const newOwner = clients[1];

//   const counterOwnableContractOldOwner = await hre.viem.getContractAt(
//     "CounterOwnable",
//     "0x",
//     {
//       client: { wallet: oldOwner },
//     },
//   );

//   const counterOwnableContractNewOwner = await hre.viem.getContractAt(
//     "CounterOwnable",
//     "0x",
//     {
//       client: { wallet: newOwner },
//     },
//   );

//   const owner = await counterOwnableContractOldOwner.read.owner();
//   console.log(`\n🕶️  Owner: ${owner}\n`);

//   const countBefore = await counterOwnableContractOldOwner.read.getCount();
//   console.log(`⏳ Count (before): ${countBefore}\n`);

//   const hash_1 = await counterOwnableContractOldOwner.write.increment();
//   const receipt_1 = await publicClient.waitForTransactionReceipt({ hash: hash_1 });
//   console.log(`✅ Count +6 in block ${receipt_1.blockNumber}\n`);

//   try {
//     await counterOwnableContractNewOwner.write.increment();
//   } catch {
//     console.log(`⚠️  OnlyOwnerエラー: ${newOwner.account.address} \n`);
//   }

//   const hash_2 = await counterOwnableContractOldOwner.write.transferOwnership([newOwner.account.address]);
//   const receipt_2 = await publicClient.waitForTransactionReceipt({ hash: hash_2 });
//   console.log(`✅ オーナー移行: ${oldOwner.account.address} → ${newOwner.account.address} in block ${receipt_2.blockNumber}\n`);

//   const hash_3 = await counterOwnableContractNewOwner.write.increment();
//   const receipt_3 = await publicClient.waitForTransactionReceipt({ hash: hash_3 });
//   console.log(`✅ Count +6 in block ${receipt_3.blockNumber}\n`);

//   const countAfter = await counterOwnableContractNewOwner.read.getCount();
//   console.log(`⏳ Count (after): ${countAfter}\n`);

//   const hash_4 = await counterOwnableContractNewOwner.write.reset();
//   const receipt_4 = await publicClient.waitForTransactionReceipt({ hash: hash_4 });
//   console.log(`✅ Count reset in block ${receipt_4.blockNumber}\n`);

//   const countAfterReset = await counterOwnableContractNewOwner.read.getCount();
//   console.log(`⏳ Count (after reset): ${countAfterReset}\n`);

//   const hash_5 = await counterOwnableContractNewOwner.write.transferOwnership([oldOwner.account.address]);
//   const receipt_5 = await publicClient.waitForTransactionReceipt({ hash: hash_5 });
//   console.log(`✅ オーナー移行: ${newOwner.account.address} → ${oldOwner.account.address} in block ${receipt_5.blockNumber}\n`);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
