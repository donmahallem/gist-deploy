/*
 * Package @donmahallem/gist-deploy
 * Source https://donmahallem.github.io/gist-deploy/
 */

import { promises as fsp } from 'fs';
import { basename, resolve } from 'path';
import { IInputFile, ParsedInputFile } from './types';

export const loadFile: (source: IInputFile) => Promise<ParsedInputFile> = async (source: IInputFile): Promise<ParsedInputFile> => {
    const resolvedPath: string = resolve(source.source);
    return {
        content: await fsp.readFile(resolvedPath, 'utf-8'),
        name: source.name ? source.name : basename(source.source),
        source: resolvedPath,
    };
};
