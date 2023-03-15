import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // 根组件，在其中控制路由
import reportWebVitals from './reportWebVitals'
import { ConfigProvider } from 'antd' // antd全局配置
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/store'
import zhCN from 'antd/es/locale/zh_CN' // antd中文包
import 'moment/locale/zh-cn' // 日期选择中文(待替换为datejs)
import 'antd/dist/antd.less' // antd less样式

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  // 这会导致组件重复渲染两遍
  // <React.StrictMode></React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
