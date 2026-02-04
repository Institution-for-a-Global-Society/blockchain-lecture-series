import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CounterAnsModule = buildModule("CounterAnsModule", (m) => {
  // deploy `CounterAns` contract
  const counterAns = m.contract("CounterAns", [5]);

  return { counterAns };
});

export default CounterAnsModule;
