import { getRandomItem, Facts } from './page';

describe('getRandomItem function', () => {
    it('returns null for an empty array', () => {
        const result = getRandomItem([]);
        expect(result).toBeNull();
    });

    it('returns a random item from the array', () => {
        const mockArray: Facts[] = [
            { _id: '1', text: 'Fact 1', createdAt: '2023-01-01', used: 'no' },
            { _id: '2', text: 'Fact 2', createdAt: '2023-01-02', used: 'yes' },
            { _id: '3', text: 'Fact 3', createdAt: '2023-01-03', used: 'no' },
        ];

        // Mock Math.random to always return 0.5 (midpoint)
        const originalMathRandom = Math.random;
        Math.random = jest.fn(() => 0.5);

        const result = getRandomItem(mockArray);

        // Restore the original Math.random implementation
        Math.random = originalMathRandom;

        expect(result).toBeDefined();
        expect(mockArray).toContain(result as Facts);
    });
});
