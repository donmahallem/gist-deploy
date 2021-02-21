/**
 * Source https://github.com/donmahallem/deploy-gist
 */

import * as core from '@actions/core';
import { resolveInputFiles } from './parse-config';
import { parseConfigFile } from './parse-config-file';
import { IConfig, IConfigFile, IInputFile } from './types';

const KEY_GIST_ID: string = 'gist_id';
const KEY_GITHUB_SECRET: string = 'github_secret';
const KEY_DRY_RUN: string = 'dry_run';

export const getConfig: () => Promise<IConfig> = async (): Promise<IConfig> => {
    const required: core.InputOptions = { required: true };
    const githubSecret: string = core.getInput(KEY_GITHUB_SECRET, required);
    const gistId: string = core.getInput(KEY_GIST_ID, required);
    const dryRun: boolean = (core.getInput(KEY_DRY_RUN)?.toLocaleLowerCase() === 'true') ?? false;
    const configFile: string = core.getInput('config_file');
    const config: string = core.getInput('config');
    const directory: string = core.getInput('dir');
    const file: string = core.getInput('file');

    const fileConfig: IConfigFile = await parseConfigFile(configFile);
    const gistFiles: IInputFile[] = resolveInputFiles(fileConfig.files);
    core.info(config);
    core.info(directory);
    core.info(file);

    const inp: IConfig = {
        dry_run: dryRun,
        files: gistFiles,
        gist_id: gistId,
        github_secret: githubSecret,
    };
    return inp;
};
