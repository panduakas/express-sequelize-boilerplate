const timeOut = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  timeOut,
};
