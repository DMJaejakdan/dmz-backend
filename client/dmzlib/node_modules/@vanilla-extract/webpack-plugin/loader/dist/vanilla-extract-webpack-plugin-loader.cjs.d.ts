import { Compiler, Compilation } from 'webpack';

interface LoaderContext {
    addDependency: (filePath: string) => void;
    addContextDependency: (filePath: string) => void;
    cacheable: (value: boolean) => void;
    target: string;
    resourcePath: string;
    context: string;
    rootContext: string;
    async: () => (err: unknown, result?: string) => void;
    hot: boolean;
    loaders: any[];
    emitError: (error: Error) => void;
    _compiler: Compiler;
    _compilation: Compilation;
    mode: 'production' | 'development' | 'none';
}

declare function export_default(this: LoaderContext, source: string): void;
declare function pitch(this: LoaderContext): void;

export { export_default as default, pitch };
