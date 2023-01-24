import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';

const viewsDir = path.resolve(__dirname, 'views');
const server = express()
  .engine(
    '.hbs',
    engine({
      extname: '.hbs',
      layoutsDir: path.resolve(viewsDir, 'layouts'),
      partialsDir: path.resolve(viewsDir, 'partials'),
      defaultLayout: 'default',
    })
  )
  .set('view engine', '.hbs')
  .set('views', viewsDir);

server.get('/', (_, res) => {
  res.render('home', { title: 'Home' });
});

server.listen(3000, () => {
  console.log('🚀 Server has been started: http://localhost:3000');
});
