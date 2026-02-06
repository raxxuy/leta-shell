import type { LauncherProvider, LauncherResult } from "@/types/launcher";
import { exec } from "@/utils";

export class CalculatorProvider implements LauncherProvider {
  name = "calculator";
  priority = 15;

  canHandle(query: string): boolean {
    // Remove whitespace for checking
    const trimmed = query.trim();

    // Must not be empty
    if (!trimmed) return false;

    // Allow: digits, operators, parentheses, decimal point, whitespace, letters for functions
    const validPattern = /^[\d+\-*/().^\s,a-z]+$/i;
    if (!validPattern.test(trimmed)) return false;

    // Define allowed function names
    const allowedFunctions = [
      "sqrt",
      "cbrt",
      "sin",
      "cos",
      "tan",
      "asin",
      "acos",
      "atan",
      "sinh",
      "cosh",
      "tanh",
      "log",
      "ln",
      "log10",
      "exp",
      "pow",
      "abs",
      "ceil",
      "floor",
      "round",
      "min",
      "max",
      "random",
      "sign",
      "pi",
      "e",
    ];

    // Extract potential function names
    const functionMatches = trimmed.match(/[a-z]+/gi) || [];

    // Check if all found functions are allowed
    for (const func of functionMatches) {
      if (!allowedFunctions.includes(func.toLowerCase())) {
        return false;
      }
    }

    // Must contain at least one digit or valid constant/function
    if (!/[\d]/.test(trimmed) && functionMatches.length === 0) {
      return false;
    }

    // Reject if it's just operators or parentheses
    if (/^[+\-*/().^\s]+$/.test(trimmed)) return false;

    return true;
  }

  private evaluateExpression(expr: string): number {
    // Replace constants (now as function calls)
    let sanitized = expr
      .replace(/\bpi\b/gi, String(Math.PI))
      .replace(/\be\b/gi, String(Math.E));

    // Replace function names with Math equivalents
    const mathFunctions = {
      sqrt: "Math.sqrt",
      cbrt: "Math.cbrt",
      sin: "Math.sin",
      cos: "Math.cos",
      tan: "Math.tan",
      asin: "Math.asin",
      acos: "Math.acos",
      atan: "Math.atan",
      sinh: "Math.sinh",
      cosh: "Math.cosh",
      tanh: "Math.tanh",
      log: "Math.log10",
      ln: "Math.log",
      log10: "Math.log10",
      exp: "Math.exp",
      pow: "Math.pow",
      abs: "Math.abs",
      ceil: "Math.ceil",
      floor: "Math.floor",
      round: "Math.round",
      trunc: "Math.trunc",
      min: "Math.min",
      max: "Math.max",
      random: "Math.random",
      sign: "Math.sign",
    };

    for (const [func, mathFunc] of Object.entries(mathFunctions)) {
      const regex = new RegExp(`\\b${func}\\b`, "gi");
      sanitized = sanitized.replace(regex, mathFunc);
    }

    // Replace ^ with **
    sanitized = sanitized.replace(/\^/g, "**");

    // Use Function constructor (safer than eval)
    const fn = new Function(`'use strict'; return (${sanitized})`);
    return fn();
  }

  async search(query: string): Promise<LauncherResult[]> {
    try {
      const result = this.evaluateExpression(query);

      if (typeof result !== "number" || !Number.isFinite(result)) {
        return [];
      }

      // Round to reasonable precision
      const rounded = Math.round(result * 1e10) / 1e10;

      return [
        {
          id: `calc-${query}`,
          type: "calc",
          title: `${rounded}`,
          description: query,
          icon: "calculator",
          score: 95,
          execute: () => {
            exec(`wl-copy "${rounded}"`);
          },
        },
      ];
    } catch {
      return [];
    }
  }
}
