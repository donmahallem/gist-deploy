/**
 * Source https://github.com/donmahallem/deploy-gist
 */

import { endGroup, info, startGroup } from '@actions/core';
import { IConfig, IGithubConfig } from './inputs';

const logObject: (obj: object) => void = (obj: object): void => {
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object') {
        } else if (typeof value === 'string') {

        }
        switch (typeof value) {
            case 'object':
                startGroup(key);
                logObject(value);
                endGroup();
                break;
            case 'string':
            case 'boolean':
            case 'number':
            case 'undefined':
                info(`${key}: ${value}`);
                break;
        }
    }
}

export const logConfig: (config: IConfig | IGithubConfig) => void = (config: IConfig): void => {
    startGroup('Config');
    logObject(config);
    endGroup();
};
