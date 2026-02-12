import hre from "hardhat";

async function main() {
  const publicClient = await hre.viem.getPublicClient();

  const tokenContract = await hre.viem.getContractAt("Token", "0x");

  const name = await tokenContract.read.name();
  const symbol = await tokenContract.read.symbol();
  const totalSupplyBefore = await tokenContract.read.totalSupply();

  console.log(`
🪧 トークン情報:
    トークン名: ${name}
    トークンシンボル: ${symbol}
    総流通量: ${totalSupplyBefore}
`);

  const hash_1 = await tokenContract.write.mint([10000n]);
  const receipt_1 = await publicClient.waitForTransactionReceipt({ hash: hash_1 });
  console.log(`✅ Minted 10,000 tokens in block ${receipt_1.blockNumber}\n`);

  const hash_2 = await tokenContract.write.burn([3000n]);
  const receipt_2 = await publicClient.waitForTransactionReceipt({ hash: hash_2 });
  console.log(`✅ Burned 3,000 tokens in block ${receipt_2.blockNumber}`);

  const totalSupplyAfter = await tokenContract.read.totalSupply();

  console.log(`
🪧 トークン総流通量: ${totalSupplyAfter}
`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
