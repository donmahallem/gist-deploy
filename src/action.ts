/**
 * Source https://github.com/donmahallem/deploy-gist
 */

import * as core from "@actions/core";
import * as github from '@actions/github'
import { syncFiles } from '@donmahallem/sync-gist';
import { getConfig, IConfig } from "./inputs";
import { logConfig } from "./log-config";

export const action = async () => {
    const config: IConfig = await getConfig();
    const octokit = github.getOctokit(config.github_secret)
    logConfig(config);
    if (config.dry_run !== true) {
        syncFiles(config, octokit);
    } else {
        core.info(`Not syncing files. Dry run!`);
    }
}
action();
