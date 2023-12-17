export type ConversionTools = {
  title: string;
  methodName: string;
  returnType: string;
};

export enum ByteConversionMethods {
  EMPTY_STRING = "",
  NONE = "Select option",
  DATA_LENGTH = "dataLength",
  HEXLIFY = "hexlify",
  BINARY = "binary",
  BASE64 = "base64",
  UTF8 = "UTF-8",
}
