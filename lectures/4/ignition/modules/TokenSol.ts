import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TokenSolModule = buildModule("TokenSolModule", (m) => {
  // deploy `TokenSol` contract
  const tokenSol = m.contract("TokenSol", ["Sample Token", "ST"]);

  return { tokenSol };
});

export default TokenSolModule;
