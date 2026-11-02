const controllers = require('./controllers');
//dont forget to add the controllers to the router.js file
const router = (app) => {
  app.get('/page1', controllers.page1);
  app.get('/page2', controllers.page2);
  app.get('/page3', controllers.page3);
  app.get('/page4', controllers.page4);
  // app.get('/getName', controllers.getName);
  app.get('*/', controllers.notFound);

  app.get('/', controllers.index);

  app.get('/*wild', controllers.notFound);

  app.post('/setName', controllers.setName);
  app.post('/createDog', controllers.createDog);
  app.post('/changeDogAge', controllers.changeDogAgeDogAge);
};

module.exports = router;
