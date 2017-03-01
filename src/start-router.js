import {Router} from 'director/build/director';
import {autorun} from 'mobx';
import {viewsForDirector} from './utils';

const createDirectorRouter = (views, store, init) => {
  new Router({
    ...viewsForDirector(views, store)
  }).configure({
    html5history: false,
    notfound:() => {
      console.log('ERROR')
    }
  }).init(init);
};

const startRouter = (views, store, init) => {
  //create director configuration
  createDirectorRouter(views, store, init);

  //autorun and watch for path changes
  autorun(() => {
    const {currentPath} = store.router;
    if (currentPath !== window.location.pathname) {
      window.history.pushState(null, null, currentPath)
    }
  });
};

export default startRouter;
