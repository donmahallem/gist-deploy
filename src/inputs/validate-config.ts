/**
 * Source https://github.com/donmahallem/deploy-gist
 */

import Ajv, { ErrorObject, JSONSchemaType, ValidateFunction } from 'ajv';
import { IConfig, IConfigFile } from './types';

export const FILES_SCHEMA: JSONSchemaType<IConfig['files']> = {
    $id: 'files_schema',
    items: {
        additionalProperties: false,
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
            },
        },
        required: ['source'],
        type: 'object',
    },
    type: 'array',
};

export const CONFIG_FILE_SCHEMA: JSONSchemaType<IConfigFile> = {
    properties: {
        files: {
            $ref: 'files_schema',
        },
    },
    required: ['files'],
    type: 'object',
};

const ajvInstance: Ajv = new Ajv();
ajvInstance.addSchema(FILES_SCHEMA);
export const createConfigValidator: () => ((data: any) => true) = (): ((data: any) => true) => {
    const validator: ValidateFunction<IConfigFile> = ajvInstance.compile(CONFIG_FILE_SCHEMA);
    return (data: any): true => {
        if (validator(data)) {
            return true;
        } else if (validator.errors) {
            const err: ErrorObject = validator.errors[0];
            throw new Error(err.message);
        } else {
            throw new Error('Unknown schema error');
        }
    }
}
