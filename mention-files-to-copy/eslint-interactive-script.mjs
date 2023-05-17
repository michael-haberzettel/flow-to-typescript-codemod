import { resolve } from "path";
import { Core } from "eslint-interactive";

const core = new Core({
  patterns: ["src"],
  extensions: ["ts", "tsx"],
  useEslintrc: true,
});
const results = await core.lint();

const rulesToDisable = [
  "@typescript-eslint/no-empty-function",
  "@typescript-eslint/no-this-alias",
  "@typescript-eslint/no-unused-vars",
  "@typescript-eslint/no-var-requires",
  "consistent-return",
  "consistent-this",
  "no-param-reassign",
  "no-shadow",
  "no-var",
  "prefer-rest-params",
  "prefer-spread",
  "react-hooks/exhaustive-deps",
  "react-hooks/rules-of-hooks",
  "vars-on-top",
];

await core.disablePerLine(results, rulesToDisable);

console.log("complete!");
