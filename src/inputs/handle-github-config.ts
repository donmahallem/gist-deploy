/*
 * Package @donmahallem/gist-deploy
 * Source https://donmahallem.github.io/gist-deploy/
 */

import { parseConfigFile } from './parse-config-file';
import { IGithubConfig } from './parse-github-config';
import { IConfigFile, IInputFile } from './types';

export const handleGithubConfig = async (cfg: IGithubConfig): Promise<IInputFile[]> => {
    const gistFiles: IInputFile[] = [];
    if (cfg.configFile) {
        const cfgFile: IConfigFile = await parseConfigFile(cfg.configFile);
        gistFiles.push(...cfgFile.files);
    }
    return gistFiles;
};
