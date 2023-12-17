export const bytesToBinary = (input: string) => {
  try {
    let binaryString = "";

    // Start from the third character to skip the "0x" prefix
    for (let i = 2; i < input.length; i++) {
      const hexDigit = input[i];
      const binaryDigit = parseInt(hexDigit, 16).toString(2).padStart(4, "0");
      binaryString += binaryDigit;
    }

    return binaryString;
  } catch (e) {
    console.log(`Error converting ${input} to binary`);
  }
  return "";
};
