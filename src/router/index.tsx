import { useRoutes } from 'react-router-dom';
import ComponentList from './formatRoute';

function Router() {
  const routeList = ComponentList || [];
  const routes = useRoutes(routeList);
  return routes;
}

export default Router;
