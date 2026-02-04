import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CounterPausableModule = buildModule("CounterPausableModule", (m) => {
  // deploy `CounterPausable` contract
  const counterPausable = m.contract("CounterPausable", [5]);

  return { counterPausable };
});

export default CounterPausableModule;
