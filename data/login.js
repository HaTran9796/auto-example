const passedUser = {username: 'admin@gmail.com', company: 'Synesthesias', password: '12345678'}
const failedUser = {username: '', company: '', password: ''}
const passwordInvalid = {username: '', company: '', password: '1'}
const inactiveCompany = { username: 'abc@gmail.com', company: 'Demo-1', password: '12345678Aa@'}
const inactiveUser = { username: 'a@gmail.com', company: 'Ha-test', password: '12345678Aa@'}
const emailInvalid = { username: 'a@gmail', company: 'Ha-test', password: '12345678Aa@'}

module.exports = {
  passedUser,
  failedUser,
  passwordInvalid,
  inactiveCompany,
  inactiveUser,
  emailInvalid,
};