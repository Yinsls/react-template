import request from '@api/axios/index';

/**
 *
 * @description 测试接口
 */
export const testQuestApi = () => {
  return request({
    method: 'get',
    url: 'api/manage/code',
  });
};
