import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TokenModule = buildModule("TokenModule", (m) => {
  // deploy `Token` contract
  const token = m.contract("Token", ["Sample Token", "ST"]);

  return { token };
});

export default TokenModule;
