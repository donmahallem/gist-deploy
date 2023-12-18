/**
 * Source https://github.com/donmahallem/deploy-gist
 */

import * as core from '@actions/core';

const KEY_GIST_ID: string = 'gist-id';
const KEY_GITHUB_SECRET: string = 'github-secret';
const KEY_DRY_RUN: string = 'dry-run';

export interface IGithubConfig {
    readonly config?: string;
    readonly configFile?: string;
    readonly directory?: string;
    readonly dryRun: boolean;
    readonly files?: string;
    readonly gistId: string;
    readonly githubSecret: string;
}
export const parseGithubConfig: () => IGithubConfig = (): IGithubConfig => {
    const required: core.InputOptions = { required: true };
    return {
        config: core.getInput('config') || undefined,
        configFile: core.getInput('config-file') || undefined,
        directory: core.getInput('dir') || undefined,
        dryRun: (core.getInput(KEY_DRY_RUN)?.toLocaleLowerCase() === 'true') ?? false,
        files: core.getInput('files') || undefined,
        gistId: core.getInput(KEY_GIST_ID, required),
        githubSecret: core.getInput(KEY_GITHUB_SECRET, required),
    };
};
