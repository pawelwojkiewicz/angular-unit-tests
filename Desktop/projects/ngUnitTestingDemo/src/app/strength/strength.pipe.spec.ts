import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  it('should has weak text when less than 10', () => {
    //Arrange
    let pipe = new StrengthPipe();

    //Act
    let value = pipe.transform(5);

    //Action
    expect(value).toEqual('5 (weak)');
  })

  it('should has strong text when less equal or higher than 10', () => {
    //Arrange
    let pipe = new StrengthPipe();

    //Act
    let value = pipe.transform(10);

    //Action
    expect(value).toEqual('10 (strong)');
  })
})
