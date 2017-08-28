import {Router} from 'director/build/director';
import {autorun} from 'mobx';
import {viewsForDirector} from './utils';
const createDirectorRouter = (views, store, init, routerOverrides) => {
  new Router({
    ...viewsForDirector(views, store)
  }).configure({
    ...{ html5history: true},
    ...routerOverrides || {}
  }).init(init);
};
const startRouter = (views, store, init, routerOverrides) => {
  //create director configuration
  createDirectorRouter(views, store, init, routerOverrides);
  //autorun and watch for path changes
  autorun(() => {
    const {currentPath} = store.router;
    if (currentPath !== window.location.pathname) {
      window.history.pushState(null, null, currentPath)
    }
  });
};
export default startRouter;
