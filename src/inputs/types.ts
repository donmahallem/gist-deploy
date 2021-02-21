/**
 * Source https://github.com/donmahallem/deploy-gist
 */

export interface IInputFile {
    name: string;
    source: string;
}

export type OptionalNameInputFile = (Partial<Pick<IInputFile, 'name'>> & Omit<IInputFile, 'name'>);

export interface IConfig {
    readonly dry_run: boolean;
    readonly github_secret: string;
    readonly gist_id: string;
    readonly files: IInputFile[];
}

export interface IConfigFile {
    readonly files: OptionalNameInputFile[];
}
