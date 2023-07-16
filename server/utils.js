const { v4: uuid4 } = require("uuid");

const generateId = () => {
  return uuidv4();
};

const successMsg = (res, msg) => {
  const success = {
    success: true,
    data: msg,
  };
  res.status(200).json(success);
  return;
};

const failureMsg = (res, msg) => {
  const error = {
    success: false,
    data: `${msg}`,
  };
  res.status(400).json(error);
  return;
};
const printError = (err) => {
  console.log(JSON.stringify(err));
};

module.exports = {
  successMsg,
  failureMsg,
  printError,
  generateId,
};
