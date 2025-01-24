import { clsx, type ClassValue } from "clsx";
import { isUndefined } from "lodash";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates the remaining word count based on the provided text and maximum word limit.
 *
 * @param text - The input text to evaluate.
 * @param maxWords - The maximum number of words allowed. Defaults to 225.
 * @returns The number of remaining words. If the text length exceeds the maximum word limit, returns 0.
 */
export function getRemainingWordCount(
  text: string | undefined,
  maxWords: number = 225
): number {
  if (isUndefined(text)) return maxWords;
  const remainingWords = maxWords - text?.length;
  return remainingWords > 0 ? remainingWords : 0;
}
