import { Button, Col, Form, Input, InputNumber, message, Row, Select, Space } from 'antd';
import style from './index.module.scss';
import { useState } from 'react';

export
function Home() {
  const [result, setResult] = useState<string>('');
  const [form] = Form.useForm();

  const handleFormChange = (values: any) => {
    console.log(values);
    setResult(JSON.stringify(values));
    message.success('计算成功');
  };

  return <div className={style.com}>
    <Row gutter={16}>
      <Col span={24}>
        <Form
          className={style.form}
          layout="vertical"
          form={form}>
          <Form.Item
            label={<span>
              <span>数字</span>
              <span className={style.tip}>填写50~80范围</span>
            </span>}
            name="a"
            rules={[{ required: true }]}>
            <InputNumber
              min={50}
              max={80}
              placeholder="请输入数字"
            />
          </Form.Item>
          <Form.Item
            label="文本"
            name="b">
            <Input
              placeholder="请输入文本"
            />
          </Form.Item>
          <Form.Item
            label="选项"
            name="c">
            <Select
              placeholder="请选择项目">
              <Select key="1">选项1</Select>
              <Select key="2">选项2</Select>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={() => form.resetFields()}>重置</Button>
              <Button type="primary" onClick={async () => {
                try {
                  const data = await form.validateFields();
                  handleFormChange(data);
                } catch (error) {
                  console.error(error);
                }
              }}>计算</Button>
            </Space>
          </Form.Item>
          <Form.Item label="结果">
            <pre className={style.pre}>{result}</pre>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  </div>;
}
