import hre from "hardhat";
import { formatUnits } from 'viem';

const DECIMALS = 10n ** 18n;

async function main() {
  const contractName: any = "AMM"
  const ammContractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  const xContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const yContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  // 0. Set up clients
  const publicClient = await hre.viem.getPublicClient();
  const clients = await hre.viem.getWalletClients();
  const client_1 = clients[0];
  const client_2 = clients[1];

  const xTokenContract = await hre.viem.getContractAt(
    "ERC20",
    xContractAddress,
  );
  const yTokenContract = await hre.viem.getContractAt(
    "ERC20",
    yContractAddress,
  );
  const yTokenContractFromClient2 = await hre.viem.getContractAt(
    "ERC20",
    yContractAddress,
    {
      client: { wallet: client_2 },
    },
  );

  const ammContractFromClient1 = await hre.viem.getContractAt(
    contractName,
    ammContractAddress,
    {
      client: { wallet: client_1 },
    },
  );

  const ammContractFromClient2 = await hre.viem.getContractAt(
    contractName,
    ammContractAddress,
    {
      client: { wallet: client_2 },
    },
  );

  // 1. Mint tokens
  const hash_1 = await xTokenContract.write.mint([
    1000000n * DECIMALS,
    client_1.account.address,
  ]);
  const receipt_1 = await publicClient.waitForTransactionReceipt({ hash: hash_1 });
  console.log(`✅ 1,000,000 X tokens minted to ${client_1.account.address} in block ${receipt_1.blockNumber}.\n`);

  const hash_2 = await yTokenContract.write.mint([
    1000000n * DECIMALS,
    client_1.account.address,
  ]);
  const receipt_2 = await publicClient.waitForTransactionReceipt({ hash: hash_2 });
  console.log(`✅ 1,000,000 Y tokens minted to ${client_1.account.address} in block ${receipt_2.blockNumber}.\n`);

  const hash_3 = await xTokenContract.write.mint([
    500000n * DECIMALS,
    client_2.account.address,
  ]);
  const receipt_3 = await publicClient.waitForTransactionReceipt({ hash: hash_3 });
  console.log(`✅ 500,000 X tokens minted to ${client_2.account.address} in block ${receipt_3.blockNumber}.\n`);

  const hash_4= await yTokenContract.write.mint([
    500000n * DECIMALS,
    client_2.account.address,
  ]);
  const receipt_4 = await publicClient.waitForTransactionReceipt({ hash: hash_4 });
  console.log(`✅ 500,000 X tokens minted to ${client_2.account.address} in block ${receipt_4.blockNumber}.`);

  await displayLPInfo(ammContractFromClient1, client_1.account.address);

  // 2. Add liquidity (1st time)
  const hash_5 = await xTokenContract.write.approve([
    ammContractAddress,
    10n * DECIMALS,
  ]);
  const receipt_5 = await publicClient.waitForTransactionReceipt({ hash: hash_5 });
  console.log(`✅ 10 X tokens approved for AMM by ${client_1.account.address} in block ${receipt_5.blockNumber}.\n`);

  const hash_6 = await yTokenContract.write.approve([
    ammContractAddress,
    1000n * DECIMALS,
  ]);
  const receipt_6 = await publicClient.waitForTransactionReceipt({ hash: hash_6 });
  console.log(`✅ 1,000 Y tokens approved for AMM by ${client_1.account.address} in block ${receipt_6.blockNumber}.\n`);

  const hash_7 = await ammContractFromClient1.write.addLiquidity([
    10n * DECIMALS,
    1000n * DECIMALS,
  ]);
  const receipt_7 = await publicClient.waitForTransactionReceipt({ hash: hash_7 });
  console.log(`✅ Liquidity added by ${client_1.account.address} in block ${receipt_7.blockNumber}.`);

  await displayLPInfo(ammContractFromClient1, client_1.account.address);

  // 3. Swap Y and X
  await displayBalances(xTokenContract, yTokenContract, client_2.account.address);

  const hash_8 = await yTokenContractFromClient2.write.approve([
    ammContractAddress,
    250n * DECIMALS,
  ]);
  const receipt_8 = await publicClient.waitForTransactionReceipt({ hash: hash_8 });
  console.log(`✅ 250 Y tokens approved for AMM by ${client_2.account.address} in block ${receipt_8.blockNumber}.`);

  const hash_9 = await ammContractFromClient2.write.swap([
    yContractAddress,
    250n * DECIMALS,
  ]);
  const receipt_9 = await publicClient.waitForTransactionReceipt({ hash: hash_9 });
  console.log(`✅ 250 Y tokens swapped in block ${receipt_9.blockNumber}.`);

  await displayBalances(xTokenContract, yTokenContract, client_2.account.address);

  // 4. Add liquidity (2nd time)
  const hash_10 = await xTokenContract.write.approve([
    ammContractAddress,
    8n * DECIMALS,
  ]);
  const receipt_10 = await publicClient.waitForTransactionReceipt({ hash: hash_10 });
  console.log(`✅ 8 X tokens approved for AMM by ${client_1.account.address} in block ${receipt_10.blockNumber}.\n`);

  const hash_11 = await yTokenContract.write.approve([
    ammContractAddress,
    1250n * DECIMALS,
  ]);
  const receipt_11 = await publicClient.waitForTransactionReceipt({ hash: hash_11 });
  console.log(`✅ 1,000 Y tokens approved for AMM by ${client_1.account.address} in block ${receipt_11.blockNumber}.\n`);

  const hash_12 = await ammContractFromClient1.write.addLiquidity([
    8n * DECIMALS,
    1250n * DECIMALS,
  ]);
  const receipt_12 = await publicClient.waitForTransactionReceipt({ hash: hash_12 });
  console.log(`✅ Liquidity added by ${client_1.account.address} in block ${receipt_12.blockNumber}.`);

  await displayLPInfo(ammContractFromClient1, client_1.account.address);

  // 5. Swap Y and X (2nd time)
  const hash_13 = await yTokenContractFromClient2.write.approve([
    ammContractAddress,
    250n * DECIMALS,
  ]);
  const receipt_13 = await publicClient.waitForTransactionReceipt({ hash: hash_13 });
  console.log(`✅ 250 Y tokens approved for AMM by ${client_2.account.address} in block ${receipt_13.blockNumber}.`);

  const hash_14 = await ammContractFromClient2.write.swap([
    yContractAddress,
    250n * DECIMALS,
  ]);
  const receipt_14 = await publicClient.waitForTransactionReceipt({ hash: hash_14 });
  console.log(`✅ 250 Y tokens swapped in block ${receipt_14.blockNumber}.`);

  await displayBalances(xTokenContract, yTokenContract, client_2.account.address);

  // 6. Remove liquidity (entirely)
  const hash_15 = await ammContractFromClient1.write.removeLiquidity([200n * DECIMALS]);
  const receipt_15 = await publicClient.waitForTransactionReceipt({ hash: hash_15 });
  console.log(`✅ Liquidity remove by ${client_1.account.address} in block ${receipt_15.blockNumber}.`);

  await displayLPInfo(ammContractFromClient1, client_1.account.address);
}

// Display LP info
const displayLPInfo = async (ammContract: any, address: any) => {
  const k_4: any = await ammContract.read.calcK();
  const shares_4: any = await ammContract.read.balanceOf([address]);

  console.log(`
🪧 LP情報
  K: ${formatUnits(k_4, 18)}
  LP share: ${formatUnits(shares_4, 18)}
`);
}

// Display balances of a trader
const displayBalances = async (xTokenContract: any, yTokenContract: any, address: any) => {
  const balanceOfXTokens: any = await xTokenContract.read.balanceOf([address]);
  const balanceOfYTokens: any = await yTokenContract.read.balanceOf([address]);

  console.log(`
🪧 トークン残高:
    X: ${formatUnits(balanceOfXTokens, 18)}
    Y: ${formatUnits(balanceOfYTokens, 18)}
`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
