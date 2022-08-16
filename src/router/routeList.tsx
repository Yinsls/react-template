import { lazy } from 'react';
import Error404 from '@pages/error/404';

export interface RouterItem {
  name: string; // 唯一key
  path: string; // 表现路由
  title: string; // 页面标题
  component: string | JSX.Element; // 组件名
  icon?: string; // 菜单icon
  redirect?: string; // 重定向路由
  hidden?: boolean; // 是否显示菜单， 默认显示
  children?: RouterItem[]; // 子路由，需要在父路由中设置Outlet(子页面显示区域)
}

// 懒加载组件
export const asyncLoadRoute: {
  [key: string]: React.LazyExoticComponent<() => JSX.Element>;
} = {
  Test: lazy(() => import('@pages/test/index')),
};

// 路由列表
export const staticRoutes: RouterItem[] = [
  {
    name: 'home',
    title: '首页',
    path: '/',
    component: 'Test',
  },
  {
    name: '404',
    title: '404',
    path: '*',
    component: <Error404 />,
  },
];
