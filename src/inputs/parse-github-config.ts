/*
 * Package @donmahallem/gist-deploy
 * Source https://donmahallem.github.io/gist-deploy/
 */

import * as core from '@actions/core';

const KEY_GIST_ID = 'gist-id';
const KEY_GITHUB_SECRET = 'github-secret';
const KEY_DRY_RUN = 'dry-run';

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
        dryRun: core.getInput(KEY_DRY_RUN)?.toLocaleLowerCase() === 'true' ?? false,
        files: core.getInput('files') || undefined,
        gistId: core.getInput(KEY_GIST_ID, required),
        githubSecret: core.getInput(KEY_GITHUB_SECRET, required),
    };
};
