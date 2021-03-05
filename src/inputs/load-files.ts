/**
 * Source https://github.com/donmahallem/deploy-gist
 */

import { loadFile } from './load-file';
import { IInputFile, ParsedInputFile } from './types';

export const loadFiles: (sources: IInputFile[]) => Promise<ParsedInputFile[]> =
    async (sources: IInputFile[]): Promise<ParsedInputFile[]> => {
        const loadPromises: Promise<ParsedInputFile>[] =
            sources.map((inp: IInputFile): Promise<ParsedInputFile> => {
                return loadFile(inp);
            });
        return Promise.all(loadPromises);
    };
