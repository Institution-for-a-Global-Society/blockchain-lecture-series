import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CounterPausableAnsModule = buildModule("CounterPausableAnsModule", (m) => {
  // deploy `CounterPausableAns` contract
  const counterPausableAns = m.contract("CounterPausableAns", [5]);

  return { counterPausableAns };
});

export default CounterPausableAnsModule;
