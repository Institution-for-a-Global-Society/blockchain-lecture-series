import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CounterOwnableAnsModule = buildModule("CounterOwnableAnsModule", (m) => {
  // deploy `CounterOwnableAns` contract
  const counterOwnableAns = m.contract("CounterOwnableAns", [5]);

  return { counterOwnableAns };
});

export default CounterOwnableAnsModule;
