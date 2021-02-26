/**
 * Source https://github.com/donmahallem/deploy-gist
 */

import * as core from '@actions/core';

const KEY_GIST_ID: string = 'gist_id';
const KEY_GITHUB_SECRET: string = 'github_secret';
const KEY_DRY_RUN: string = 'dry_run';

export interface IGithubConfig {
    readonly config?: string;
    readonly configFile?: string;
    readonly directory?: string;
    readonly dry_run: boolean;
    readonly files?: string;
    readonly gist_id: string;
    readonly github_secret: string;
}
export const parseGithubConfig: () => IGithubConfig = (): IGithubConfig => {
    const required: core.InputOptions = { required: true };
    return {
        config: core.getInput('config') || undefined,
        configFile: core.getInput('config_file') || undefined,
        directory: core.getInput('dir') || undefined,
        dry_run: (core.getInput(KEY_DRY_RUN)?.toLocaleLowerCase() === 'true') ?? false,
        files: core.getInput('file') || undefined,
        gist_id: core.getInput(KEY_GIST_ID, required),
        github_secret: core.getInput(KEY_GITHUB_SECRET, required),
    };
};
