/**
 * Source https://github.com/donmahallem/deploy-gist
 */

import { basename, resolve } from 'path';
import { IInputFile, OptionalNameInputFile } from './types';


export const resolveInputFiles: (files: OptionalNameInputFile[]) => IInputFile[] = (files: OptionalNameInputFile[]): IInputFile[] => {
    return files
        .map((inp: OptionalNameInputFile): IInputFile => {
            return {
                name: inp.name ? inp.name : basename(inp.source),
                source: resolve(inp.source),
            };
        });
};
