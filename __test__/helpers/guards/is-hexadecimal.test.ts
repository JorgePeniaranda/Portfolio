import {describe, it, expect} from "vitest";

import {isHexadecimal} from "@/helpers/guards/is-hexadecimal";

describe("isHexadecimal", () => {
  it("should return true for valid hexadecimal color codes", () => {
    expect(isHexadecimal("#FF5733")).toBe(true); // Full 6-character format
    expect(isHexadecimal("#123")).toBe(true); // Shortened 3-character format
    expect(isHexadecimal("#aBc123")).toBe(true); // Lowercase valid hex
    expect(isHexadecimal("#ABC123")).toBe(true); // Uppercase valid hex
  });

  it("should return false for invalid hexadecimal color codes", () => {
    expect(isHexadecimal("FF5733")).toBe(false); // Missing '#' symbol
    expect(isHexadecimal("123456")).toBe(false); // Missing '#' symbol
    expect(isHexadecimal("#G12345")).toBe(false); // Invalid character ('G')
    expect(isHexadecimal("#12345")).toBe(false); // Incorrect length for full hex code
    expect(isHexadecimal("#1234G7")).toBe(false); // Invalid character ('G')
  });
});
