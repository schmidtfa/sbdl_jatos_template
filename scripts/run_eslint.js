const { ESLint } = require("eslint");
const fs = require("fs");

(async function main() {
    let src_folder = 'src_examples';
    if(fs.existsSync('src')) {
        src_folder = 'src';
    }
    // 1. Create an instance with the `fix` option.
    const eslint = new ESLint(
        {
            fix: true,
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
    );

    // 2. Lint files. This doesn't modify target files.
    const results = await eslint.lintFiles(src_folder);

    // 3. Modify the files with the fixed code.
    await ESLint.outputFixes(results);

    // 4. Format the results.
    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);

    // 5. Output it.
    console.log(resultText);
})().catch((error) => {
    process.exitCode = 1;
    console.error(error);
});