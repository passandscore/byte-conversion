import { ethers } from "ethers";

export const isValidBytesLike = (input: string) => {
  const isBytesLike = ethers.isBytesLike(input);
  if (!isBytesLike) {
    return false;
  }
  return true;
};
