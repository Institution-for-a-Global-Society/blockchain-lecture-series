import hre from "hardhat";

const DECIMALS = 10n ** 18n;

async function main() {
  const contractName: any = "VPP"
  const vppContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const stablecoinContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // 0. Set up clients
  const publicClient = await hre.viem.getPublicClient();
  const clients = await hre.viem.getWalletClients();
  const owner = clients[0];
  const seller = clients[1];
  const device = clients[2];
  const buyer = clients[3];

  const stablecoinContractFromOwner = await hre.viem.getContractAt(
    "ERC20",
    stablecoinContractAddress,
    {
      client: { wallet: owner },
    },
  );

  const stablecoinContractFromBuyer = await hre.viem.getContractAt(
    "ERC20",
    stablecoinContractAddress,
    {
      client: { wallet: buyer },
    },
  );

  const vppContractFromOwner = await hre.viem.getContractAt(
    contractName,
    vppContractAddress,
    {
      client: { wallet: owner },
    },
  );

  const vppContractFromSeller = await hre.viem.getContractAt(
    contractName,
    vppContractAddress,
    {
      client: { wallet: seller },
    },
  );

  const vppContractFromDevice = await hre.viem.getContractAt(
    contractName,
    vppContractAddress,
    {
      client: { wallet: device },
    },
  );

  const vppContractFromBuyer = await hre.viem.getContractAt(
    contractName,
    vppContractAddress,
    {
      client: { wallet: buyer },
    },
  );

  // 1. Mint stablecoins to buyers (simulating an on-ramped user)
  const hash_1 = await stablecoinContractFromOwner.write.mint([
    10000n * DECIMALS,
    buyer.account.address,
  ]);
  const receipt_1 = await publicClient.waitForTransactionReceipt({ hash: hash_1 });
  console.log(`\n🪙 10,000 stablecoins minted to ${buyer.account.address} in block ${receipt_1.blockNumber}.\n`);

  // 2. Owner registers a prosumer & a device
  const hash_2 = await vppContractFromOwner.write.register([
    seller.account.address,
    device.account.address,
  ]);
  const receipt_2 = await publicClient.waitForTransactionReceipt({ hash: hash_2 });
  console.log(`✅ Prosumer (${seller.account.address}) and device (${device.account.address}) registered in block ${receipt_2.blockNumber}.\n`);

  // 3. Prosumer lists the generated energy
  const hash_3 = await vppContractFromSeller.write.list([
    10n * DECIMALS,
    100n * DECIMALS,
    device.account.address,
  ]);
  const receipt_3 = await publicClient.waitForTransactionReceipt({ hash: hash_3 });
  console.log(`⚡️ Prosumer (${seller.account.address}) listed the generated energy in block ${receipt_3.blockNumber}.\n`);

  // 4. Consumer buys the listed energy (contract acts as an escrow)
  const listingId = 0;

  const hash_4 = await stablecoinContractFromBuyer.write.approve([
    vppContractAddress,
    100n * DECIMALS,
  ]);
  const receipt_4 = await publicClient.waitForTransactionReceipt({ hash: hash_4 });
  console.log(`⭕️ 100 stablecoins approved for VPP contract by buyer (${buyer.account.address}) in block ${receipt_4.blockNumber}.\n`);

  const hash_5 = await vppContractFromBuyer.write.buy([
    listingId,
  ]);
  const receipt_5 = await publicClient.waitForTransactionReceipt({ hash: hash_5 });
  console.log(`💸 Buyer (${buyer.account.address}) buys the listed energy in block ${receipt_5.blockNumber}.\n`);

  // 5. Device delivers the energy
  const hash_6 = await vppContractFromDevice.write.confirm([
    listingId,
    true,  // this must be real proof of delivery in production (e.g., SNARKs)
  ]);
  const receipt_6 = await publicClient.waitForTransactionReceipt({ hash: hash_6 });
  console.log(`👌 Delivery of the purchased energy is confirmed and payment is settled by device (${device.account.address}) in block ${receipt_6.blockNumber}.\n`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
