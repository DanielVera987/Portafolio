const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect('mongodb://127.0.0.1/moviesreview', { useNewUrlParser: true, useUnifiedTopology: true});

app.listen(app.get('port'), () => {
  console.log(`run app in ${app.get('port')}`);
});