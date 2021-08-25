import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;
  it('should has 0 messages on init', () => {
    //Arrange
    service = new MessageService();
    //Act

    //Action
    expect(service.messages.length).toEqual(0);
  })
  it('should add 1 message when add function is called', () => {
    service = new MessageService();

    service.add('message');

    expect(service.messages.length).toEqual(1);
  })
  it('should clear all messages when clear is called', () => {
    service = new MessageService();

    service.add('message1');
    service.add('message2');
    service.add('message3');
    service.clear();

    expect(service.messages.length).toEqual(0);
  })
})
