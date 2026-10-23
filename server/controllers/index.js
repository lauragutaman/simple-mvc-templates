// There is no reason for the name here except as an
// example of how to set something for the POST
let name = 'unknown';

const hostIndex = (req, res) => {

};

const hostPage1 = (req, res) => {
  return res.sendFile(path.resolve(`${__dirname}../../views/page1.html`));
};

const hostPage2 = (req, res) => {
  return res.sendFile(path.resolve(`${__dirname}../../views/page2.html`));
};

const getName = (req, res) => {
  return res.json({ name });
};

const setName = (req, res) => {
  console.dir(req.body);
  if (!req.body.firstname || !req.body.lastname) {
    return res.status(400).json({
      error: 'Name is required',
      id: 'you dumb',
    });

  }
  name = `${req.body.firstname} ${req.body.lastname}`;
  return res.json({ name });

};

const notFound = (req, res) => {
  return res.status(404).sendFile(path.resolve(`${__dirname}../../views/404.html`));
};

module.exports = {
  index: hostIndex,
  page1: hostPage1,
  page2: hostPage2,
  getName,
  setName,
  notFound,
};
