import { ethers } from "ethers";

export const bytesToBase64 = (input: string) => {
  const bytesLike = ethers.getBytes(input);
  return Buffer.from(bytesLike).toString("base64");
};
