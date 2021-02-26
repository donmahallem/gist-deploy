/**
 * Source https://github.com/donmahallem/deploy-gist
 */

import { endGroup, info, startGroup } from '@actions/core';
import { IConfig, IGithubConfig, IInputFile } from './inputs';

export const logConfig: (config: IConfig | IGithubConfig) => void = (config: IConfig): void => {
    startGroup('Config');
    info(`dry_run: ${config.dry_run}`);
    info(`gist_id:'${config.gist_id}'`);
    info(`gist_secret:'${config.github_secret}'`);
    startGroup(`files(${config.files.length})`);
    config.files.forEach((file: IInputFile): void => {
        info(`${file.source} => ${file.name}`);
    });
    endGroup();
    endGroup();
};
