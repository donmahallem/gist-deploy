/**
 * Source https://github.com/donmahallem/deploy-gist
 */

import { JSONSchemaType } from 'ajv';
import Ajv, { ValidateFunction } from 'ajv';
import { IConfig, IConfigFile } from './types';


export const FILES_SCHEMA: JSONSchemaType<IConfig['files']> = {
    $id: 'files_schema',
    items: {
        properties: {
            name: {
                nullable: true,
                pattern: '^([^\/]+)$',
                type: 'string',
            },
            source: {
                nullable: false,
                pattern: '^(.+)\/([^\/]+)$',
                type: 'string',
            }
        },
        required: ['source'],
        additionalProperties: false,
        type: 'object',
    },
    type: 'array',
};

export const CONFIG_FILE_SCHEMA: JSONSchemaType<IConfigFile> = {
    properties: {
        files: {
            $ref: 'files_schema',
        }
    },
    type: 'object',
    required: ['files'],
}

const ajvInstance: Ajv = new Ajv();
ajvInstance.addSchema(FILES_SCHEMA);
export const validateConfig: ValidateFunction<IConfigFile> = ajvInstance.compile(CONFIG_FILE_SCHEMA);
