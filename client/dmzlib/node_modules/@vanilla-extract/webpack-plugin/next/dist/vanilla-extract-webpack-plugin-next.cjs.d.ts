import { IdentifierOption } from '@vanilla-extract/integration';
import { Compiler, Compilation, RuleSetRule } from 'webpack';

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

type Externals = any;
declare class ChildCompiler {
    externals: Externals | undefined;
    constructor(externals: Externals);
    isChildCompiler(name: string | undefined): boolean;
    getCompiledSource(loader: LoaderContext): Promise<{
        source: string;
        dependencies: string[];
    }>;
}

interface PluginOptions {
    test?: RuleSetRule['test'];
    identifiers?: IdentifierOption;
    outputCss?: boolean;
    externals?: any;
    /** @deprecated */
    allowRuntime?: boolean;
}
declare abstract class AbstractVanillaExtractPlugin {
    test: RuleSetRule['test'];
    outputCss: boolean;
    allowRuntime: boolean;
    childCompiler: ChildCompiler;
    identifiers?: IdentifierOption;
    constructor(options?: PluginOptions);
    protected inject(compiler: Compiler, virtualLoader: 'virtualFileLoader' | 'virtualNextFileLoader'): void;
}

declare class VanillaExtractPlugin extends AbstractVanillaExtractPlugin {
    static loader: string;
    apply(compiler: Compiler): void;
}

export { VanillaExtractPlugin };
