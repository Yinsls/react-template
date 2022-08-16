import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { staticRoutes, asyncLoadRoute, RouterItem } from './routeList';

interface ComponentType {
  path: string; // 表现路由
  element: JSX.Element | null; // 组件
  index?: boolean; // 匹配当前路由，只在路由重定向中使用
  children?: ComponentType[]; // 子路由
}

// 根据路径获取组件
const getComponent = (componentName: string) => {
  const Comp = asyncLoadRoute[componentName];
  if (Comp) {
    return (
      <Suspense fallback={<div>loading</div>}>
        <Comp />
      </Suspense>
    );
  }
  return;
};

// 校验组件类别: 懒加载组件 ｜ 预加载组件
const testCompType = (component: string | JSX.Element) => {
  return typeof component === 'string';
};

// 递归获取路由组件
const getLoopRoute = (routes: RouterItem[]): ComponentType[] => {
  const componentList: ComponentType[] = [];
  routes.forEach((route) => {
    const isString = testCompType(route.component);
    let componentObj: ComponentType = { path: '', element: null };

    // 重定向
    if (route.redirect) {
      componentObj = {
        index: true,
        element: <Navigate to={route.redirect} />,
      } as any;
    } else {
      // 获取路由对应组件
      const Component = isString
        ? getComponent(route.component as string)
        : (route.component as JSX.Element);

      if (!Component) {
        console.error(`不存在${route.component}组件, 请检查！！！`);
        return;
      }
      componentObj = { path: route.path, element: Component };

      // 存在子路由
      if (route.children) {
        componentObj.children = getLoopRoute(route.children);
      }
    }

    componentList.push(componentObj);
  });
  return componentList;
};

export default getLoopRoute(staticRoutes);
