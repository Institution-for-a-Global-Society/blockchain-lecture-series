import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ERC20AnsModule = buildModule("ERC20AnsModule", (m) => {
  // deploy `ERC20Ans` contract
  const erc20Ans = m.contract("ERC20Ans", ["Sample Token", "ST", 18]);

  return { erc20Ans };
});

export default ERC20AnsModule;
