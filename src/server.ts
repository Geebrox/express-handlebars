import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';

const VIEW_ROUTES = [
  {
    path: '/',
    title: 'Home',
    view: 'home',
  },
  {
    path: '/message-board',
    title: 'Message board',
    view: 'message-board',
  },
  {
    path: '/average-number',
    title: 'Average number',
    view: 'average-number',
  },
];

const viewsDir = path.resolve(__dirname, 'views');
const publicDir = path.resolve(__dirname, 'public');
const server = express()
  .engine(
    '.hbs',
    engine({
      extname: '.hbs',
      layoutsDir: path.resolve(viewsDir, 'layouts'),
      partialsDir: path.resolve(viewsDir, 'partials'),
      defaultLayout: 'default',
      helpers: {
        isActiveRoute: (
          a: (typeof VIEW_ROUTES)[0],
          b: (typeof VIEW_ROUTES)[0]
        ) => {
          return a.path == b.path;
        },
      },
    })
  )
  .set('view engine', '.hbs')
  .set('views', viewsDir)
  .use(express.static(publicDir));

server.use((req, res, next) => {
  const foundViewRoute = VIEW_ROUTES.find((viewRoute) => {
    return viewRoute.path === req.path;
  });

  if (foundViewRoute) {
    res.render(foundViewRoute.view, {
      routes: VIEW_ROUTES,
      activeRoute: foundViewRoute,
    });
    return;
  }

  next();
});

server.listen(3000, () => {
  console.log('🚀 Server has been started: http://localhost:3000');
});
