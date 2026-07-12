if(!global.crypto) {
  global.crypto = require('crypto')
}
//иначе тесты не видят crypto
if(!global.crypto.randomUUID) {
  global.crypto.randomUUID = jest.fn(() => '00000000-0000-0000-0000-000000000000')
}