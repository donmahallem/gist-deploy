/**
 * Source https://github.com/donmahallem/deploy-gist
 */

import { endGroup, info, startGroup } from '@actions/core';
import { IConfig, IGithubConfig } from './inputs';

const logItem: (key: string, obj: object) => void = (key: string, obj: object): void => {
    switch (typeof obj) {
        case 'object':
            info(`${key}: ${JSON.stringify(obj, null, 2)}`);
            break;
        case 'string':
            info(`${key}: '${obj}'`);
            break;
        case 'boolean':
        case 'number':
        case 'undefined':
            info(`${key}: ${obj}`);
            break;
        case 'function':
            info(`${key}: ${obj.name ? obj.name : 'function'}()`);
            break;
    }
}

const logObject: (obj: object) => void = (obj: object): void => {
    for (const [key, value] of Object.entries(obj)) {
        logItem(key, value);
    }
}

export const logConfig: (group: string, config: IConfig | IGithubConfig) => void =
    (group: string, config: IConfig): void => {
        startGroup(group);
        logObject(config);
        endGroup();
    };
