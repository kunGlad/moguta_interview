import React, { Dispatch } from "react";
import { Form, Input, Modal } from "antd";

export interface FieldType {
  agent_version: string | undefined;
  business_type?: string;
  car_city?: string;
  car_plate?: string;
  car_type?: string;
  ota_env?: string;
  avg_deploy_sr?: number;
  avg_download_sr?: number;
  workflow_name: string | undefined;
}

interface IProps {
  isCreateWorkFlowTaskOpen: boolean;
  setIsCreateWorkFlowTaskOpen: Dispatch<boolean>;
}

export default ({
  isCreateWorkFlowTaskOpen,
  setIsCreateWorkFlowTaskOpen,
}: IProps) => {
  const [form] = Form.useForm();
  const { validateFields } = form;

  const onFinish = () => {
    validateFields()
      .then((values) => {
        // do something
        console.log(values);
        setIsCreateWorkFlowTaskOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onCancel = () => {
    setIsCreateWorkFlowTaskOpen(false);
  };

  return (
    <Modal
      title="新建工作流任务"
      open={isCreateWorkFlowTaskOpen}
      onOk={onFinish}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form
        name="workflow_task"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
      >
        <Form.Item<FieldType>
          label="工作流名称"
          name="workflow_name"
          rules={[
            { required: true, message: "Please input your workflow_name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="版本"
          name="agent_version"
          rules={[
            { required: true, message: "Please input your agent_version!" },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
