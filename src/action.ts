/**
 * Source https://github.com/donmahallem/deploy-gist
 */

import * as core from '@actions/core';
import * as github from '@actions/github';
import { syncFiles, IInputFile } from '@donmahallem/sync-gist';
import { parseGithubConfig, IGithubConfig, handleGithubConfig } from './inputs';
import { logConfig } from './log-config';

export const action = async (): Promise<void> => {
    const config: IGithubConfig = parseGithubConfig();
    const octokit: any = github.getOctokit(config.githubSecret);
    logConfig('Github Config', config);
    const inputFiles: IInputFile[] = await handleGithubConfig(config);
    logConfig('Parsed Config', { files: inputFiles } as any);
    if (!config.dryRun) {
        await syncFiles(config as any, octokit);
    } else {
        core.info(`Not syncing files. Dry run!`);
    }
    core.setOutput('files', {});
};
action()
    .catch((err: any): void => {
        core.setFailed(err?.message || 'An error occured');
    });
