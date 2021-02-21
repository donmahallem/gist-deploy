import { IConfigFile } from './types';
import { readFile } from 'fs/promises';
import { validateConfig } from './validate-config';

export const parseConfigFile: (filePath: string) => Promise<IConfigFile> = (filePath: string): Promise<IConfigFile> => {
    return readFile(filePath)
        .then((fileContent: Buffer): IConfigFile => {
            const parsedJson: IConfigFile = JSON.parse(fileContent.toString('utf8'));
            validateConfig(parsedJson);
            return parsedJson;
        });
}
