import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const GreetingAnsModule = buildModule("GreetingAnsModule", (m) => {
  // deploy `GreetingAns` contract
  const greetingAns = m.contract("GreetingAns");

  return { greetingAns };
});

export default GreetingAnsModule;
