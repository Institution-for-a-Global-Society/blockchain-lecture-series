import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TokenAnsModule = buildModule("TokenAnsModule", (m) => {
  // deploy `TokenAns` contract
  const tokenAns = m.contract("TokenAns", ["Sample Token", "ST"]);

  return { tokenAns };
});

export default TokenAnsModule;
