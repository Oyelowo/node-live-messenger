const expect = require('expect');

const {isRealString}= require('./validation');

describe('isRealString', () => {
  it('should return non-string values', () => {
      expect(isRealString(44)).not.toBe(true);
  });

  it('should reject strings with only spaces', () => {
    expect(isRealString('  ')).not.toBe(true);
  });

  it('should allow string ewith non-space characters', () => {
    expect(isRealString('  Dayo ')).toBe(true);
    expect(isRealString('lowo')).toBe(true);
  });
});

