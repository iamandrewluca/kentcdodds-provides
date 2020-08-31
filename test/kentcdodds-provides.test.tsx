import { kentcdoddsProvides } from '../src';

describe('it', () => {
  it('provides without crashing', () => {
    const [
      Provider,
      useState,
      useDispatch,
      useStateAndDispatch,
    ] = kentcdoddsProvides(state => state, 0);

    expect(Provider).not.toBeUndefined();
    expect(useState).not.toBeUndefined();
    expect(useDispatch).not.toBeUndefined();
    expect(useStateAndDispatch).not.toBeUndefined();
  });
});
