/**
 * Build & Minification Script for js_form_validation
 * 
 * Responsibilities:
 * 1. Minifies the injected CSS styles (removes whitespace, newlines, comments, spaces around tokens).
 * 2. Minifies inline SVG markup.
 * 3. Preserves public APIs documented in README.md:
 *    - `disallowedDomains` (global array)
 *    - `patterns` (global object containing text, number, email, etc.)
 *    - HTML data-attributes (`rs-form-field`, `rs-form-type`, etc.)
 *    - CSS custom properties (`--rs-bubble-*`)
 * 4. Mangles and compresses all private/internal logic using Terser.
 * 5. Generates the production bundle `validation_script.min.js`.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const sourcePath = path.join(__dirname, "validation_script.js");
const outputPath = path.join(__dirname, "validation_script.min.js");
const tempPath = path.join(__dirname, ".temp_preprocessed.js");

function minifyCss(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, "")
    // Collapse whitespace and newlines
    .replace(/\s+/g, " ")
    // Remove space around delimiters
    .replace(/\s*([{}:;,>])\s*/g, "$1")
    // Remove unnecessary semicolon before closing brace
    .replace(/;}/g, "}")
    .trim();
}

function minifySvg(svg) {
  return svg
    .replace(/>\s+</g, "><")
    .replace(/\s+/g, " ")
    .trim();
}

function build() {
  console.log("Reading source file:", sourcePath);
  let source = fs.readFileSync(sourcePath, "utf8");

  // 1. Minify CSS inside style.textContent = `...`
  source = source.replace(
    /(style\.textContent\s*=\s*`)([\s\S]*?)(`;)/,
    (match, prefix, cssContent, suffix) => {
      const minified = minifyCss(cssContent);
      return `${prefix}${minified}${suffix}`;
    }
  );

  // 2. Minify SVG inside icon.innerHTML = `...`
  source = source.replace(
    /(icon\.innerHTML\s*=\s*`)([\s\S]*?)(`;)/,
    (match, prefix, svgContent, suffix) => {
      const minified = minifySvg(svgContent);
      return `${prefix}${minified}${suffix}`;
    }
  );

  // Write preprocessed code to temp file
  fs.writeFileSync(tempPath, source, "utf8");

  // 3. Minify JS using Terser
  // Keep disallowedDomains and patterns intact as documented in README.md
  const isWindows = process.platform === "win32";
  const npxCmd = isWindows ? "npx.cmd" : "npx";
  const terserCmd = `${npxCmd} -y terser "${tempPath}" -c passes=2,unsafe_arrows=true -m reserved=['disallowedDomains','patterns'] -o "${outputPath}"`;

  console.log("Running Terser minification...");
  execSync(terserCmd, { stdio: "inherit" });

  // Cleanup temp file
  if (fs.existsSync(tempPath)) {
    fs.unlinkSync(tempPath);
  }

  // 4. Report statistics
  const srcSize = fs.statSync(sourcePath).size;
  const outSize = fs.statSync(outputPath).size;
  const reduction = (((srcSize - outSize) / srcSize) * 100).toFixed(1);

  console.log("\nMinification complete!");
  console.log(`Original: ${(srcSize / 1024).toFixed(2)} KB (${srcSize} bytes)`);
  console.log(`Minified: ${(outSize / 1024).toFixed(2)} KB (${outSize} bytes)`);
  console.log(`Reduction: ${reduction}%\n`);
}

build();
