import hre from "hardhat";

async function main() {
  const contractName: any = "ERC20";
  const contractAddress = "0xc5a5C42992dECbae36851359345FE25997F5C42d";
  const DECIMALS = 1e18;

  const publicClient = await hre.viem.getPublicClient();
  const clients = await hre.viem.getWalletClients();
  const client_1 = clients[0];
  const client_2 = clients[1];
  const client_3 = clients[2];

  const erc20ContractFromClient1 = await hre.viem.getContractAt(
    contractName,
    contractAddress,
    {
      client: { wallet: client_1 },
    },
  );

  const erc20ContractFromClient2 = await hre.viem.getContractAt(
    contractName,
    contractAddress,
    {
      client: { wallet: client_2 },
    },
  );

  const balanceOfClient1Before = await erc20ContractFromClient1.read.balanceOf([client_1.account.address]);
  const balanceOfClient2Before = await erc20ContractFromClient1.read.balanceOf([client_2.account.address]);
  const balanceOfClient3Before = await erc20ContractFromClient1.read.balanceOf([client_3.account.address]);

  console.log(`
🪧 トークン残高:
    ${client_1.account.address}: ${balanceOfClient1Before / BigInt(DECIMALS)}
    ${client_2.account.address}: ${balanceOfClient2Before / BigInt(DECIMALS)}
    ${client_3.account.address}: ${balanceOfClient3Before / BigInt(DECIMALS)}
`);

  const hash_1 = await erc20ContractFromClient1.write.mint([BigInt(10000 * DECIMALS), client_1.account.address]);
  const receipt_1 = await publicClient.waitForTransactionReceipt({ hash: hash_1 });
  console.log(`✅ Minted 10,000 tokens to ${client_1.account.address} in block ${receipt_1.blockNumber}.\n`);

  const hash_2 = await erc20ContractFromClient1.write.transfer([client_2.account.address, BigInt(1000 * DECIMALS)]);
  const receipt_2 = await publicClient.waitForTransactionReceipt({ hash: hash_2 });
  console.log(`✅ Transferred 1,000 tokens from ${client_1.account.address} to ${client_2.account.address} in block ${receipt_2.blockNumber}.\n`);

  const hash_3 = await erc20ContractFromClient1.write.approve([client_2.account.address, BigInt(3000 * DECIMALS)]);
  const receipt_3 = await publicClient.waitForTransactionReceipt({ hash: hash_3 });
  console.log(`✅ ${client_1.account.address} approved ${client_2.account.address} to spend up to 3,000 tokens to in block ${receipt_3.blockNumber}.\n`);

  const hash_4 = await erc20ContractFromClient2.write.transferFrom([client_1.account.address, client_3.account.address, BigInt(2000 * DECIMALS)]);
  const receipt_4 = await publicClient.waitForTransactionReceipt({ hash: hash_4 });
  console.log(`✅ Transferred 2,000 tokens from ${client_1.account.address} to ${client_3.account.address} in block ${receipt_4.blockNumber}.`);

  const balanceOfClient1After = await erc20ContractFromClient1.read.balanceOf([client_1.account.address]);
  const balanceOfClient2After = await erc20ContractFromClient1.read.balanceOf([client_2.account.address]);
  const balanceOfClient3After = await erc20ContractFromClient1.read.balanceOf([client_3.account.address]);

  console.log(`
🪧 トークン残高:
    ${client_1.account.address}: ${balanceOfClient1After / BigInt(DECIMALS)}
    ${client_2.account.address}: ${balanceOfClient2After / BigInt(DECIMALS)}
    ${client_3.account.address}: ${balanceOfClient3After / BigInt(DECIMALS)}
`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
