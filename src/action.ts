/**
 * Source https://github.com/donmahallem/deploy-gist
 */

import * as core from '@actions/core';
import * as github from '@actions/github';
import { syncFiles } from '@donmahallem/sync-gist';
import { parseGithubConfig, IGithubConfig } from './inputs';
import { logConfig } from './log-config';

export const action = async (): Promise<void> => {
    const config: IGithubConfig = parseGithubConfig();
    const octokit: any = github.getOctokit(config.github_secret);
    logConfig(config);
    logConfig({ arr: [{ cool: true }, 29.3], kk: 'yes' } as any);
    if (!config.dry_run) {
        syncFiles(config as any, octokit);
    } else {
        core.info(`Not syncing files. Dry run!`);
    }
};
action()
    .catch((err: any): void => {
        core.setFailed(err?.message || 'An error occured');
    });
