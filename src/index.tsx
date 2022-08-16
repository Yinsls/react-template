import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // 根组件，在其中控制路由
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd'; // antd全局配置
import zhCN from 'antd/es/locale/zh_CN'; // antd中文包
import 'moment/locale/zh-cn'; // 日期选择中文
import 'antd/dist/antd.less'; // antd less样式

// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import Test from './pages/test';
// import Home from './pages/home';
import { Provider } from 'react-redux';
import { store } from '@/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      {/* <BrowserRouter>
      <Routes>
        <Route path="/root" element={<App />}>
          <Route index={true} element={<Navigate to={'home'} />} />
          <Route path="test" element={<Test />} />
          <Route path="home" element={<Home />} />
          <Route path="*" element={<Home />}></Route>
        </Route>
        <Route path="/homePage" element={<Home />}></Route>
        <Route path="/home" element={<Navigate to={'/homePage'} />}></Route>
      </Routes>
    </BrowserRouter> */}

      <App />
    </ConfigProvider>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
