import { ethers } from "ethers";

export const bytesToUtf8 = (input: string) => {
  const bytesLike = ethers.getBytes(input);
  return ethers.toUtf8String(bytesLike);
};
