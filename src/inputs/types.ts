
export interface InputFile {
    name: string;
    source: string;
}

export type OptionalNameInputFile = (Partial<Pick<InputFile, 'name'>> & Omit<InputFile, 'name'>);

export interface IConfig {
    readonly dry_run: boolean;
    readonly github_secret: string;
    readonly gist_id: string;
    readonly files: InputFile[];
}

export interface IConfigFile {
    readonly files: OptionalNameInputFile[];
}
