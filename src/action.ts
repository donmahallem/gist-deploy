import * as core from "@actions/core";
import { getConfig, IConfig } from "./inputs";
import { logConfig } from "./log-config";
import { syncFiles } from "./sync-files";

export const action = async () => {
    const config: IConfig = await getConfig();
    logConfig(config);
    if (config.dry_run !== true) {
        syncFiles(config, core);
    } else {
        core.info(`Not syncing files. Dry run!`);
    }
}
action();
