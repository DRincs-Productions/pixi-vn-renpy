import { RpyProgram } from "../vscode-extension/src/interpreter/program";
import { LogCategory, logCatMessage } from "../vscode-extension/src/logger";
import { AST } from "../vscode-extension/src/parser/ast-nodes";
import { DocumentParser } from "../vscode-extension/src/parser/parser";
import { RenpyStatementRule } from "../vscode-extension/src/parser/renpy-grammar-rules";
import { DocumentRange, LogLevel, TextDocument } from "../vscode-extension/src/utilities/vscode-wrappers";

export function parser(text: string, filePath = "start.rpy") {
    let document = new TextDocument(text, filePath);

    const parser = new DocumentParser(document);
    parser.initialize();

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

    const errors: DocumentRange[] = [];
    for (const error of parser.errors) {
        logCatMessage(LogLevel.Error, LogCategory.Parser, parser.getErrorMessage(error));
        errors.push(error.errorRange);
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
    return {
        nodes: ast.nodes.buffer,
        errors: errors,
    };
}
