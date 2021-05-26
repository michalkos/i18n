import { ToNumberOptions } from "../../index.d";
import { toFixed } from ".";

export function toNumber(numeric: number, options: ToNumberOptions): string {
  const negative = numeric < 0;
  const parts = toFixed(Math.abs(numeric), options.precision as number)
    .toString()
    .split(".");
  let [numericStr, precision] = parts;
  const buffer: string[] = [];
  let formattedNumber: string;
  let format = options.format || "%n";
  const sign = negative ? "-" : "";

  while (numericStr.length > 0) {
    buffer.unshift(numericStr.substr(Math.max(0, numericStr.length - 3), 3));
    numericStr = numericStr.substr(0, numericStr.length - 3);
  }

  formattedNumber = buffer.join(options.delimiter);

  if (options.stripInsignificantZeros && precision) {
    precision = precision.replace(/0+$/, "");
  }

  if ((options.precision as number) > 0 && precision) {
    formattedNumber += options.separator + precision;
  }

  if (options.signFirst) {
    format = "%s" + format;
  } else {
    format = format.replace("%n", "%s%n");
  }

  formattedNumber = format
    .replace("%u", options.unit as string)
    .replace("%n", formattedNumber)
    .replace("%s", sign);

  return formattedNumber;
}
