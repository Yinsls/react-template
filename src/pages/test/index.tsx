import { useEffect, useRef } from 'react';
import { Button } from 'antd';
import { setToken } from '@/store/login/loginSlice';
import { testQuestApi } from '@api/test/index';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import './index.scss';

export default function Test() {
  const dispatch = useDispatch();
  const { token } = useSelector((state: any) => state.login);
  const complexObj = useRef<any>({
    age: 18,
    date: new Date(),
  });

  useEffect(() => {
    const cloneObj = JSON.parse(JSON.stringify(complexObj.current)); // 使用JSON方式深拷贝数据, date被转化为字符串
    const lodashObj = _.cloneDeep(complexObj.current); // 使用lodash深拷贝数据 date值与源数据一致(Date类型)
    console.log(cloneObj, lodashObj, complexObj.current);
  }, []);

  const getData = async () => {
    await testQuestApi();
  };

  return (
    <div className="box">
      <div className="inner">Index</div>
      <button onClick={() => getData()}>请求接口</button>
      token: {token}
      <Button
        type="primary"
        onClick={() => dispatch(setToken(new Date().getTime()))}
      >
        antd Button
      </Button>
    </div>
  );
}
