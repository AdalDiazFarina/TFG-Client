import { LimitDecimalsPipe } from './limit-decimals.pipe';

describe('LimitDecimalsPipe', () => {
  it('create an instance', () => {
    const pipe = new LimitDecimalsPipe();
    expect(pipe).toBeTruthy();
  });
});
