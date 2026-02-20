import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AMMModule = buildModule("AMMModule", (m) => {
  // deploy `AMM` contract
  const xToken = m.contract("ERC20", ["X Token", "XT", 18], { id: "XToken"});
  const yToken = m.contract("ERC20", ["Y Token", "YT", 18], { id: "YToken"});
  const ammAns = m.contract("AMM", [xToken, yToken]);

  return { ammAns };
});

export default AMMModule;
