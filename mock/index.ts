import mockjs from "mockjs";

export default {
  // 使用 mockjs 等三方库
  "/api/home/getData": mockjs.mock({
    count: 5,
    data: [
      {
        can_deploy: 0, // 0: 不能部署, 1: 可以部署
        environment: 0, // 0: dev, 1: release
        task_create_time: "2023-05-11 13:08:17",
        task_creator: "Fan",
        version: "v3.2.0",
        id: 1,
        workflow_name: "Devcar-v3.2.0-20230411.1",
      },
      {
        can_deploy: 1,
        environment: 0,
        task_create_time: "2023-04-17 14:24:05",
        task_creator: "Shen",
        version: "V3.2.7",
        id: 8,
        workflow_name: "Devcar-V3.2.7-20230413.8",
      },
      {
        can_deploy: 1,
        environment: 1,
        task_create_time: "2023-04-12 14:07:47",
        task_creator: "LiLei",
        version: "V3.2.7",
        id: 6,
        workflow_name: "Devcar-V3.2.7-20230412.6",
      },
      {
        can_deploy: 1,
        environment: 0,
        task_create_time: "2023-04-12 12:18:00",
        task_creator: "LiLei",
        version: "V3.2.9",
        id: 5,
        workflow_name: "Devcar-V3.2.9-20230412.5",
      },
      {
        can_deploy: 1,
        environment: 1,
        task_create_time: "2023-04-12 11:49:53",
        task_creator: "LiLei",
        version: "V3.2.8",
        id: 3,
        workflow_name: "Devcar-V3.2.8-20230412.3",
      },
    ],
  }),
  "/api/home/getMiddleData": mockjs.mock({
    agent_version: "v2.3.24",
    business_type: "B",
    car_city: "北京",
    car_plate: "10.10.10.97",
    car_type: "X86",
    ota_env: "local_test",
    avg_deploy_sr: 100,
    avg_download_sr: 0,
    workflow_name: "Devcar-v3.2.0-20230411.1",
  }),
};
