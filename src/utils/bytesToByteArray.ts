import { ethers } from "ethers";

export const bytesToByteArray = (input: string) => {
  return ethers.getBytes(input);
};
