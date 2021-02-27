/**
 * Source https://github.com/donmahallem/deploy-gist
 */

import { endGroup, info, startGroup } from '@actions/core';
import { IConfig, IGithubConfig } from './inputs';

const logObject: (obj: object) => void = (obj: object): void => {
    for (const [key, value] of Object.entries(obj)) {
        switch (typeof value) {
            case 'object':
                if (Array.isArray(value)) {
                    startGroup(`${key}[${value.length}]`);
                    for (const item of value) {
                        logObject(item);
                    }
                    endGroup();
                } else {
                    startGroup(key);
                    logObject(value);
                    endGroup();
                }
                break;
            case 'string':
                info(`${key}: '${value}'`);
                break;
            case 'boolean':
            case 'number':
            case 'undefined':
                info(`${key}: ${value}`);
                break;
            case 'function':
                info(`${key}: ${value.name ? value.name : 'function'}()`);
                break;
        }
    }
}

export const logConfig: (config: IConfig | IGithubConfig) => void = (config: IConfig): void => {
    startGroup('Config');
    logObject(config);
    endGroup();
};
