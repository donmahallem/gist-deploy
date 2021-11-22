/*
 * Package @donmahallem/gist-deploy
 * Source https://donmahallem.github.io/gist-deploy/
 */

import { promises as fsp } from 'fs';
import { IConfigFile } from './types';
import { createConfigValidator } from './validate-config';

export const parseConfigFile: (filePath: string) => Promise<IConfigFile> = async (filePath: string): Promise<IConfigFile> => {
    const fileContent: string = await fsp.readFile(filePath, 'utf-8');
    const parsedFileContent: IConfigFile = JSON.parse(fileContent) as IConfigFile;
    const validator: (data: any) => true = createConfigValidator();
    validator(parsedFileContent);
    return parsedFileContent;
};
