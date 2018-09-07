let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Dayo';
        let text = "let's talk";
        let message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text})
    });
});

describe('generateLocationMessage', () => {
  it('should generate currect location object', () => {
      let from = 'Oyelowo';
      let latitude = 30;
      let longitude= 22;
      let url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      let locationMessage=generateLocationMessage(from, latitude, longitude);

      expect(typeof locationMessage.createdAt).toBe('number');
      expect(locationMessage).toMatchObject({from, url});
      
  });
});
