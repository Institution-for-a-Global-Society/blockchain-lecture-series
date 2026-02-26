import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const VPPModule = buildModule("VPPModule", (m) => {
  // deploy `ERC20` contract
  const stablecoin = m.contract("ERC20", ["Japanese Yen", "JPY", 18]);
  // deploy `VPP` contract
  const vpp = m.contract("VPP", [stablecoin]);

  return { vpp };
});

export default VPPModule;
