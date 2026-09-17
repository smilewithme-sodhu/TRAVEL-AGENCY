const fs = require('fs');
let code = fs.readFileSync('server/src/modules/booking/__tests__/BookingStateMachine.test.ts', 'utf8');

code = code.split('txMock..mockResolvedValueOnce([mockBooking]);').join('txMock..mockResolvedValueOnce([mockBooking]).mockResolvedValueOnce([]);');

fs.writeFileSync('server/src/modules/booking/__tests__/BookingStateMachine.test.ts', code);
