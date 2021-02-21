import { info, startGroup, endGroup } from '@actions/core'
import { IConfig, InputFile } from "./inputs";

export const logConfig: (config: IConfig) => void = (config: IConfig): void => {
    startGroup('Config');
    info(`dry_run: ${config.dry_run}`);
    info(`gist_id:'${config.gist_id}'`);
    info(`gist_secret:'${config.github_secret}'`);
    startGroup(`files(${config.files.length}`);
    config.files.forEach((file: InputFile): void => {
        info(`${file.source} => ${file.name}`);
    });
    endGroup();
    endGroup();
}
