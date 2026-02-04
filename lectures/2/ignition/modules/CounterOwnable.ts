import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CounterOwnableModule = buildModule("CounterOwnableModule", (m) => {
  // deploy `CounterOwnable` contract
  const counterOwnable = m.contract("CounterOwnable", [5]);

  return { counterOwnable };
});

export default CounterOwnableModule;
