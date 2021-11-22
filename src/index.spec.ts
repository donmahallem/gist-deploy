/*
 * Package @donmahallem/gist-deploy
 * Source https://donmahallem.github.io/gist-deploy/
 */

import { expect } from 'chai';
import 'mocha';
import * as index from './index';

describe('index', (): void => {
    it('should export defaults', (): void => {
        expect(index).to.not.equal(undefined);
    });
});
