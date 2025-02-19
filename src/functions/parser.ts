import { RpyProgram } from "../vscode-extension/src/interpreter/program";
import { LogCategory, logCatMessage } from "../vscode-extension/src/logger";
import { AST } from "../vscode-extension/src/parser/ast-nodes";
import { DocumentParser } from "../vscode-extension/src/parser/parser";
import { RenpyStatementRule } from "../vscode-extension/src/parser/renpy-grammar-rules";
import { LogLevel, TextDocument } from "../vscode-extension/src/utilities/vscode-wrappers";

export async function testParser() {
    let document = new TextDocument(
        `
label start:
    "Hello, World!"
`,
        "start.rpy"
    );

    const parser = new DocumentParser(document as any);
    await parser.initialize();

    const statementParser = new RenpyStatementRule();
    const ast = new AST();

    while (parser.hasNext()) {
        parser.skipEmptyLines();

        if (statementParser.test(parser)) {
            ast.append(statementParser.parse(parser));
            parser.expectEOL();
        }

        if (parser.hasNext()) {
            parser.next();
        }
    }

    const errors: any[] = [];
    for (const error of parser.errors) {
        logCatMessage(LogLevel.Error, LogCategory.Parser, parser.getErrorMessage(error));
        // errors.push(error.errorRange.toVSRange(activeEditor.document));
    }

    logCatMessage(LogLevel.Debug, LogCategory.Parser, ast.toString());

    const program = new RpyProgram();
    ast.process(program);

    for (const error of program.errorList) {
        logCatMessage(LogLevel.Error, LogCategory.Parser, error.message);

        if (error.errorLocation !== null) {
            errors.push(error.errorLocation.range);
        }
    }

    ast.toString();
    // activeEditor.setDecorations(errorDecorationType, errors);
}
