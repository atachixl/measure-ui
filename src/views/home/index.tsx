import { Button, Card, Col, Form, Input, InputNumber, message, QRCode, Row, Select, Space } from 'antd';
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
              <span>总量(ml)</span>
              <span className={style.tip}></span>
            </span>}
            name="a"
            rules={[{ required: true }]}>
            <InputNumber
              min={1}
              placeholder="请输入总量"
            />
          </Form.Item>

          <Form.Item
            label={<span>
              <span>第一阶段输血时间(min)</span>
              <span className={style.tip}></span>
            </span>}
            name="a"
            rules={[{ required: true }]}>
            <InputNumber
              min={1}
              placeholder="请输入第一阶段输血时间"
            />
          </Form.Item>

          <Form.Item
            label={<span>
              <span>点滴系数</span>
              <span className={style.tip}></span>
            </span>}
            name="a"
            rules={[{ required: true }]}>
            <InputNumber
              min={1}
              placeholder="请输入点滴系数"
            />
          </Form.Item>

          <Card className={style.row} title="第一阶段">
            <Form.Item
              label={<span>
                <span>第一阶段输液滴速(滴/min)</span>
                <span className={style.tip}></span>
              </span>}
              name="a"
              rules={[{ required: true }]}>
              <InputNumber
                min={1}
                placeholder="请输入第一阶段输液滴速"
              />
            </Form.Item>
          </Card>

          <Card className={style.row} title="第二阶段">
            <Form.Item
              label={<span>
                <span>第二阶段输液滴速(滴/min)</span>
                <span className={style.tip}></span>
              </span>}
              name="a"
              rules={[{ required: true }]}>
              <InputNumber
                min={1}
                placeholder="请输入第二阶段输液滴速"
              />
            </Form.Item>
          </Card>

          {/* <Form.Item
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
          </Form.Item> */}
          <Form.Item className={style.row}>
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
