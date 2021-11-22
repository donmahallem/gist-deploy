/*
 * Package @donmahallem/gist-deploy
 * Source https://donmahallem.github.io/gist-deploy/
 */

export interface IInputFile {
    name?: string;
    source: string;
}
export type K = Required<IInputFile>;
export type RequiredNameInputFile = Required<IInputFile>;

export type ParsedInputFile = Required<IInputFile> & {
    content: string;
};

export interface IConfig {
    readonly dry_run: boolean;
    readonly github_secret: string;
    readonly gistId: string;
    readonly files: IInputFile[];
}

export interface IConfigFile {
    readonly files: IInputFile[];
}
