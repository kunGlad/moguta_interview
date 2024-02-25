import http from "../utils/requerst";
// 引入我们二次封装的axios实例

// 接口调用封装
// 请求首页数据
export const getData = () => {
  // /home/getData接口地址
  // 返回一个promise对象
  return http.get("/home/getData");
};

export const getMiddleData = () => {
  return http.get("/home/getMiddleData");
};
