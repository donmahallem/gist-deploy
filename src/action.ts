/*
 * Package @donmahallem/gist-deploy
 * Source https://donmahallem.github.io/gist-deploy/
 */

import * as core from '@actions/core';
import * as github from '@actions/github';
import { handleGithubConfig, parseGithubConfig, IGithubConfig, IInputFile } from './inputs';
import { logConfig } from './log-config';
import { syncFiles } from './sync-files';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const action = async (): Promise<void> => {
    const config: IGithubConfig = parseGithubConfig();
    const octokit: ReturnType<typeof github['getOctokit']> = github.getOctokit(config.githubSecret);
    logConfig('Github Config', config);
    const inputFiles: IInputFile[] = await handleGithubConfig(config);
    logConfig('Parsed Config', { files: inputFiles });
    if (!config.dryRun) {
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */
        await syncFiles(config, octokit as any);
    } else {
        core.info(`Not syncing files. Dry run!`);
    }
    core.setOutput('files', {});
};
action().catch((err: any | Error): void => {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument */
    core.setFailed(err?.message || 'An error occured');
});
