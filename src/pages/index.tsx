// import yayJpg from '../assets/yay.jpg';

// export default function HomePage() {
//   return (
//     <div>
//       <h2>Yay! Welcome to umi!</h2>
//       <p>
//         <img src={yayJpg} width="388" />
//       </p>
//       <p>
//         To get started, edit <code>pages/index.tsx</code> and save to reload.
//       </p>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import WorkflowTask from "./workflowTask";
import "./index.less";
import {
  Button,
  Select,
  Space,
  Tabs,
  Table,
  Modal,
  Popconfirm,
  message,
  Tag,
  Descriptions,
  Pagination,
} from "antd";
import type { PaginationProps, TabsProps } from "antd";
import type { TableProps } from "antd";
import { Link } from "umi";
import { getData, getMiddleData } from "../api";
import { CopyTwoTone, ExclamationCircleFilled } from "@ant-design/icons";
import EChartsReact from "echarts-for-react";
import { OptionProps } from "antd/es/select";

interface DataType {
  can_deploy: number;
  environment: number;
  task_create_time: string;
  task_creator: string;
  version: string;
  id: number;
  workflow_name: string;
}

interface MiddleData {
  agent_version?: string;
  business_type?: string;
  car_city?: string;
  car_plate?: string;
  car_type?: string;
  ota_env?: string;
  avg_deploy_sr?: number;
  avg_download_sr?: number;
  workflow_name?: string;
}

type SelectOptProps = Omit<OptionProps, "children">;

const TAB_ENVIRONMENT_COLOR: Record<string, string> = {
  "0": "",
  "1": "cyan",
};

const TOP_DATERANGE: SelectOptProps[] = [{ label: "近7天", value: "7" }];

const middleLeft = (middleData: MiddleData) => {
  return [
    {
      key: "car_plate",
      label: "车牌",
      children: middleData?.car_plate ?? "",
    },
    {
      key: "business_type",
      label: "业务组",
      children: middleData?.business_type ?? "",
    },
    {
      key: "car_type",
      label: "车型：",
      children: middleData?.car_type ?? "",
    },
    {
      key: "agent_version",
      label: "Agent版本",
      children: middleData?.agent_version ?? "",
    },
    {
      key: "car_city",
      label: "城市",
      children: middleData?.car_city ?? "",
    },
    {
      key: "ota_env",
      label: "OTA环境",
      children: middleData?.ota_env ?? "",
    },
    {
      key: "workflow_name",
      label: "工作流名称",
      children: (
        <Space>
          {middleData?.workflow_name ?? ""}
          <ExclamationCircleFilled style={{ color: "#FF0000" }} />
        </Space>
      ),
    },
  ];
};

const downloadSuccessRateOption = {
  title: [
    //标题组件，数组里的一个对象表示一个标题组件
    {
      text: "下载成功率",
      left: "center",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
  ],
  series: [
    //系列
    {
      name: "下载成功率",
      type: "pie", //pie类型的图实现环形图
      radius: ["50%", "55%"], //数组的话，表示内圆和外圆的半径大小，相对于宽高中较小的那一个。
      center: ["50%", "50%"], //圆心坐标
      avoidLabelOverlap: false, //是否启用防止标签重叠策略
      startAngle: 270, //第一个数据开始绘制的角度，以正交直角坐标系为标准
      label: {
        //每个数据的标签
        show: true, //设置为true则显示第一个数据
        position: "center", //位置居中
        formatter: "{d}%", //{d}表示数据在总数据中的百分比
        fontSize: 14,
        fontWeight: 900,
      },
      color: ["#F3F3F3", "#28A745"],
      emphasis: {
        //高亮，即鼠标经过时的样式
        scale: false, //表示不放大item
      },
      labelLine: {
        show: true,
      },
      data: [
        {
          value: 0,
          name: "",
        },
      ],
    },
  ],
};
const developmentSuccessRateOption = {
  title: [
    //标题组件，数组里的一个对象表示一个标题组件
    {
      text: "部署成功率",
      left: "center",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
  ],
  series: [
    //系列
    {
      name: "部署成功率",
      type: "pie", //pie类型的图实现环形图
      radius: ["50%", "55%"], //数组的话，表示内圆和外圆的半径大小，相对于宽高中较小的那一个。
      center: ["50%", "50%"], //圆心坐标
      avoidLabelOverlap: false, //是否启用防止标签重叠策略
      startAngle: 270, //第一个数据开始绘制的角度，以正交直角坐标系为标准
      label: {
        //每个数据的标签
        show: true, //设置为true则显示第一个数据
        position: "center", //位置居中
        formatter: "{d}%", //{d}表示数据在总数据中的百分比
        fontSize: 14,
        fontWeight: 900,
        color: "#28A745",
      },
      color: ["#28A745", "#F3F3F3"], //系列的颜色
      emphasis: {
        //高亮，即鼠标经过时的样式
        scale: false, //表示不放大item
      },
      labelLine: {
        show: true,
      },
      data: [
        {
          value: 100,
          name: "",
          // emphasis: {
          //   label: {
          //     show: false, //这个数据高亮时不显示label，就不会显示替遮住第一个数据的label值了
          //   },
          // },
        },
      ],
    },
  ],
};
export default function HomePage() {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [modalShowData, setModalShowData] = useState<DataType>();
  const [tableData, setTableData] = useState<DataType[]>();
  const [middleData, setMiddleData] = useState<MiddleData>();
  const [isCreateWorkFlowTaskOpen, setIsCreateWorkFlowTaskOpen] =
    useState(false);
  const [count, setCount] = useState(0);

  const showDetail = (record: DataType) => {
    setIsDetailOpen(true);
    setModalShowData(record);
  };
  const handleDetailShow = () => {
    setIsDetailOpen(false);
  };
  const handleDetailCancel = () => {
    setIsDetailOpen(false);
  };

  const confirm = () => {
    message.success("Click on Yes");
  };
  const cancel = () => {
    message.error("Click on No");
  };

  const handleChange = (val: string) => {
    console.log(val);
  };
  const tabChange = (tab: string) => {};

  const createWorkFlowShow = () => {
    setIsCreateWorkFlowTaskOpen(true);
  };

  useEffect(() => {
    getData().then((res: any) => {
      //使用getData封装方法
      if (res.status === 200) {
        setTableData(res?.data?.data || []);
        setCount(res.data?.count);
      }
    });
  }, []);

  useEffect(() => {
    getMiddleData().then((res: any) => {
      //使用getMiddleData封装方法
      if (res.status === 200) {
        setMiddleData(res?.data || []);
      }
    });
  }, []);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "工作流名称",
      dataIndex: "workflow_name",
      key: "workflow_name",
      render: (text, record) => {
        const environment = record.environment + "";
        return (
          <Space>
            <div>{text}</div>
            <div>
              {environment === "1" && (
                <Tag color={TAB_ENVIRONMENT_COLOR[environment]}>release</Tag>
              )}
            </div>
          </Space>
        );
      },
    },
    {
      title: "版本",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "任务创建时间",
      dataIndex: "task_create_time",
      key: "task_create_time",
    },
    {
      title: "任务创建者",
      dataIndex: "task_creator",
      key: "task_creator",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {
              showDetail(record);
            }}
          >
            详情
          </Button>

          <Popconfirm
            title="部署"
            description="确认部署吗？"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link">部署</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const showTotal: PaginationProps["showTotal"] = (total) =>
    `数据共 ${total} 条`;

  const TAB_ITEMS: TabsProps["items"] = [
    {
      key: "category",
      label: "类别",
      children: "这里是类别",
    },
    {
      key: "deploymentWorkflow",
      label: "部署工作流",
      children: (
        <div>
          <Table
            columns={columns}
            dataSource={tableData}
            rowKey={(row) => row.version + row.task_create_time}
            pagination={{
              total: count,
              showTotal: showTotal,
              showSizeChanger: true,
            }}
          />
        </div>
      ),
    },
    {
      key: "authorizedUsers",
      label: "授权用户",
      children: "这里是授权用户",
    },
  ];

  return (
    <div className="container">
      <Modal
        title="工作流详情信息"
        open={isDetailOpen}
        onOk={handleDetailShow}
        onCancel={handleDetailCancel}
      >
        <div>
          <p>工作流名称： {modalShowData?.workflow_name}</p>
          <p>版本： {modalShowData?.version}</p>
          <p>任务创建时间： {modalShowData?.task_create_time}</p>
          <p>任务创建者： {modalShowData?.task_creator}</p>
        </div>
      </Modal>
      {isCreateWorkFlowTaskOpen && (
        <WorkflowTask
          isCreateWorkFlowTaskOpen={isCreateWorkFlowTaskOpen}
          setIsCreateWorkFlowTaskOpen={setIsCreateWorkFlowTaskOpen}
        />
      )}

      <div className="top">
        <Space className="top_left">
          <h3>bj-10-10-10-97</h3>
          <Tag color="green">在线</Tag>
          <CopyTwoTone />
        </Space>
        <div className="top_right">
          <Space wrap>
            <Select
              defaultValue="7"
              style={{ width: 80 }}
              options={TOP_DATERANGE}
              onChange={handleChange}
            ></Select>
            <Link to="/docs">
              <Button type="primary" onClick={() => <Link to="/docs" />}>
                WebShell
              </Button>
            </Link>
            <Button disabled>DFDI Console</Button>
          </Space>
        </div>
      </div>
      <div className="middle">
        <div className="middle_left">
          <Descriptions
            items={middleLeft(middleData ?? {})}
            labelStyle={{ color: "#000" }}
          />
        </div>
        <div className="middle_right">
          <div className="middle_right_echarts">
            <EChartsReact
              option={downloadSuccessRateOption}
              style={{ height: "150px" }}
            />
          </div>
          <div className="middle_right_echarts">
            <EChartsReact
              option={developmentSuccessRateOption}
              style={{ height: "150px" }}
            />
          </div>
        </div>
      </div>
      <div className="content">
        <div className="tabs">
          <Tabs
            defaultActiveKey="1"
            items={TAB_ITEMS}
            onChange={tabChange}
            tabBarExtraContent={
              <Button type="primary" onClick={createWorkFlowShow}>
                新建工作流任务
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}
