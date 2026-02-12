import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ERC20Module = buildModule("ERC20Module", (m) => {
  // deploy `ERC20` contract
  const erc20 = m.contract("ERC20", ["Sample Token", "ST", 18]);

  return { erc20 };
});

export default ERC20Module;
