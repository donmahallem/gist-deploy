import * as core from '@actions/core'
import { resolveInputFiles } from './parse-config';
import { parseConfigFile } from './parse-config-file';
import { IConfig, IConfigFile, InputFile } from './types';

const KEY_GIST_ID: string = 'gist_id';
const KEY_GITHUB_SECRET: string = 'github_secret';
const KEY_DRY_RUN: string = 'dry_run';

export const getConfig: () => Promise<IConfig> = async (): Promise<IConfig> => {
    const required: core.InputOptions = { required: true };
    const github_secret: string = core.getInput(KEY_GITHUB_SECRET, required);
    const gist_id: string = core.getInput(KEY_GIST_ID, required);
    const dry_run: boolean = (core.getInput(KEY_DRY_RUN)?.toLocaleLowerCase() === 'true') ?? false;
    const config_file: string = core.getInput('config_file');
    const config: string = core.getInput('config');
    const directory: string = core.getInput('dir');
    const file: string = core.getInput('file');

    const fileConfig: IConfigFile = await parseConfigFile(config_file);
    const gistFiles: InputFile[] = resolveInputFiles(fileConfig.files);
    core.info(config);
    core.info(directory);
    core.info(file);

    const inp: IConfig = {
        dry_run,
        github_secret,
        gist_id,
        files: gistFiles,
    }
    return inp
}
