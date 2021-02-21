
import { basename, resolve, } from 'path';
import { InputFile, OptionalNameInputFile } from './types';


export const resolveInputFiles: (files: OptionalNameInputFile[]) => InputFile[] = (files: OptionalNameInputFile[]): InputFile[] => {
    return files
        .map((inp: OptionalNameInputFile): InputFile => {
            return {
                name: inp.name ? inp.name : basename(inp.source),
                source: resolve(inp.source),
            };
        });
}
