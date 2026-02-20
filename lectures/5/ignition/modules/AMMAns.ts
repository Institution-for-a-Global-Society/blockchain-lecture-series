import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AMMAnsModule = buildModule("AMMAnsModule", (m) => {
  // deploy `AMMAns` contract
  const xToken = m.contract("ERC20", ["X Token", "XT", 18], { id: "XToken"});
  const yToken = m.contract("ERC20", ["Y Token", "YT", 18], { id: "YToken"});
  const ammAns = m.contract("AMMAns", [xToken, yToken]);

  return { ammAns };
});

export default AMMAnsModule;
