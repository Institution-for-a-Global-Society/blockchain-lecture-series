import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const GreetingModule = buildModule("GreetingModule", (m) => {
  // deploy `Greeting` contract
  const greeting = m.contract("Greeting");

  return { greeting };
});

export default GreetingModule;
