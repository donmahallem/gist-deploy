/**
 * Source https://github.com/donmahallem/deploy-gist
 */

import fs from 'fs'
import path from 'path'
import * as core from '@actions/core'
import * as github from '@actions/github'
import { Endpoints } from '@octokit/types'
import { IConfig } from './inputs/types'

type CoreType = typeof core;
type GistUpdateParamater = Endpoints["PATCH /gists/{gist_id}"]["parameters"];
type GistUpdateResponse = Endpoints["PATCH /gists/{gist_id}"]["response"];
export const syncFiles = async (config: IConfig, githubCore?: CoreType): Promise<void> => {
    githubCore?.startGroup('Read file content')
    const workSpace = process.env.GITHUB_WORKSPACE as string
    const filePath = path.join(workSpace, config.gist_id)
    const content = fs.readFileSync(filePath, 'utf-8')
    githubCore?.info(`[INFO] Done with file "${filePath}"`)
    githubCore?.endGroup()

    githubCore?.startGroup('Deploy to gist')
    const octokit = github.getOctokit(config.github_secret)
    const fileName = path.basename(filePath)
    githubCore?.startGroup('Files to sync');

    const params: GistUpdateParamater = {
        gist_id: config.gist_id,
        files: {
            [fileName]: {
                fileName,
                content
            }
        }
    }
    githubCore?.info(`[INFO] Done with gist "${config.gist_id}/${fileName}"`)
    const response: GistUpdateResponse = await octokit.gists.update(params)

    githubCore?.info(`[INFO] Done with gist "${config.gist_id}/${fileName}" - ${response.status}`)
    githubCore?.endGroup()

    githubCore?.info('[INFO] Action successfully completed')
}
