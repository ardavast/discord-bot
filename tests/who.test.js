import { describe, it, expect } from 'vitest';
import { formatUsers } from '../commands/who.js';

describe('formatUsers()', () => {
    it('empty', () => {
        expect(formatUsers([])).toBe(
            'No one in the lab'
        );
    });

    it('1 mystery labber', () => {
        expect(formatUsers([{}])).toBe(
            "People in the lab: 1\n" +
            "Anonymous labber"
        );
    });

    it('7 mystery labbers', () => {
        expect(formatUsers(Array(7).fill({}))).toBe(
            "People in the lab: 7\n" +
            "Anonymous labber x7"
        );
    });

});
