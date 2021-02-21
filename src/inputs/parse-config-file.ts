/**
 * Source https://github.com/donmahallem/deploy-gist
 */

import { promises as fsp } from 'fs';
import { IConfigFile } from './types';
import { validateConfig } from './validate-config';

export const parseConfigFile: (filePath: string) => Promise<IConfigFile> = (filePath: string): Promise<IConfigFile> => {
    return fsp.readFile(filePath)
        .then((fileContent: Buffer): IConfigFile => {
            const parsedJson: IConfigFile = JSON.parse(fileContent.toString('utf8'));
            validateConfig(parsedJson);
            return parsedJson;
        });
};