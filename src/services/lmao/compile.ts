import Compiler from "../../Compiler.js";
import lexer from "../../lexer.js";

export const compileLmaoCode = (lmaoCode: string): string => {
  const compiler = new Compiler(lexer);
  debugger;
  const compiledCode = compiler.compile(lmaoCode);
  return compiledCode;
};
