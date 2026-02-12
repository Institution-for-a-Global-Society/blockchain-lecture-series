import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ERC20SolModule = buildModule("ERC20SolModule", (m) => {
  // deploy `ERC20Sol` contract
  const erc20Sol = m.contract("ERC20Sol", ["Sample Token", "ST", 18]);

  return { erc20Sol };
});

export default ERC20SolModule;
