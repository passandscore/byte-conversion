import { ethers } from "ethers";

export const bytesToDecimal = (input: string) => {
  const bytesLike = ethers.getBytes(input);
  let decimalString = "";

  for (let i = 0; i < bytesLike.length; i++) {
    const decimalByte = bytesLike[i].toString(10);
    decimalString += decimalByte;
  }

  return decimalString;
};
