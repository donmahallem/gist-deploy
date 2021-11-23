/*
 * Package @donmahallem/gist-deploy
 * Source https://donmahallem.github.io/gist-deploy/
 */

import * as core from '@actions/core';
import * as github from '@actions/github';
import { Endpoints } from '@octokit/types';
import fs from 'fs';
import path from 'path';
import { IGithubConfig } from './inputs';

export type CoreType = typeof core;
type GistUpdateParamater = Endpoints['PATCH /gists/{gist_id}']['parameters'];
type GistUpdateResponse = Endpoints['PATCH /gists/{gist_id}']['response'];
export const syncFiles = async (config: IGithubConfig, githubCore?: CoreType): Promise<void> => {
    githubCore?.startGroup('Read file content');
    const workSpace: string = process.env.GITHUB_WORKSPACE as string;
    const filePath: string = path.join(workSpace, config.gistId);
    const content: string = fs.readFileSync(filePath, 'utf-8');
    githubCore?.info(`[INFO] Done with file "${filePath}"`);
    githubCore?.endGroup();

    githubCore?.startGroup('Deploy to gist');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const octokit: any = github.getOctokit(config.githubSecret);
    const fileName: string = path.basename(filePath);
    githubCore?.startGroup('Files to sync');

    const params: GistUpdateParamater = {
        files: {
            [fileName]: {
                content,
                fileName,
            },
        },
        gist_id: config.gistId,
    };
    githubCore?.info(`[INFO] Done with gist "${config.gistId}/${fileName}"`);
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
    const response: GistUpdateResponse = (await octokit.gists.update(params)) as GistUpdateResponse;

    githubCore?.info(`[INFO] Done with gist "${config.gistId}/${fileName}" - ${response.status}`);
    githubCore?.endGroup();

    githubCore?.info('[INFO] Action successfully completed');
};
