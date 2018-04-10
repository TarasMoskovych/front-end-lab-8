const controllers = require('./controllers/handlers.js');
const router = app => {
    app.post('/rockstar', controllers.create);
    app.get('/rockstars', controllers.findAll);
    app.get('/rockstar/:id', controllers.findById);
    app.put('/rockstar/:id', controllers.update);
    app.delete('/rockstar/:id', controllers.delete);
};

module.exports = router;