import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CounterModule = buildModule("CounterModule", (m) => {
  // deploy `Counter` contract
  const counter = m.contract("Counter", [5]);

  return { counter };
});

export default CounterModule;
