import { IInputFile } from '@donmahallem/sync-gist';
import { IGithubConfig } from './parse-github-config';
import { parseConfigFile } from './parse-config-file';
import { IConfigFile } from './types';

export const handleGithubConfig = async (cfg: IGithubConfig): Promise<IInputFile[]> => {
    const gistFiles: IInputFile[] = [];
    if (cfg.configFile) {
        const cfgFile: IConfigFile = await parseConfigFile(cfg.configFile);
        gistFiles.push(...cfgFile.files);
    }
    return gistFiles;
}
