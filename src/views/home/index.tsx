import { Button, Card, Col, Form, Input, InputNumber, message, QRCode, Row, Select, Space, Statistic } from 'antd';
import style from './index.module.scss';
import { useState } from 'react';

export
function Home() {
  const [form] = Form.useForm();
  const [time1, setTime1] = useState<number>(0);
  const [time2, setTime2] = useState<number>(0);

  const handleFormChange = (values: any) => {
    const time1 = values.time1;
    const infused_volume1 = (time1 * values.drip_rate1) / values.gtt_rate;
    const infused_volume2 = values.total_volume - infused_volume1;
    const time2 = (infused_volume2 * values.gtt_rate) / values.drip_rate2;
    setTime1(time1);
    setTime2(time2);
    message.success('计算成功');
  };

  return <div className={style.com}>
    <Row>
      <Col span={24}>
        <Form
          className={style.form}
          layout="vertical"
          form={form}>
          <Form.Item
            label={<span>
              <span>总量(ml)</span>
              <span className={style.tip}>请输入大于0的数字</span>
            </span>}
            name="total_volume"
            rules={[{ required: true, message: '请输入总量' }]}>
            <InputNumber
              min={0}
              placeholder="请输入总量"
            />
          </Form.Item>

          <Form.Item
            label={<span>
              <span>第一阶段输血时间(min)</span>
              <span className={style.tip}>请输入大于0的数字</span>
            </span>}
            name="time1"
            rules={[{ required: true, message: '请输入第一阶段输血时间' }]}>
            <InputNumber
              min={1}
              placeholder="请输入第一阶段输血时间"
            />
          </Form.Item>

          <Form.Item
            label={<span>
              <span>点滴系数</span>
              <span className={style.tip}>请输入大于0的数字</span>
            </span>}
            name="gtt_rate"
            rules={[{ required: true, message: '请输入点滴系数' }]}>
            <InputNumber
              min={0}
              placeholder="请输入点滴系数"
            />
          </Form.Item>

          <Card className={style.row} title="第一阶段">
            <Form.Item
              label={<span>
                <span>第一阶段输液滴速(滴/min)</span>
                <span className={style.tip}>请输入大于0的数字</span>
              </span>}
              name="drip_rate1"
              rules={[{ required: true, message: '请输入第一阶段输液滴速' }]}>
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
                <span className={style.tip}>请输入大于0的数字</span>
              </span>}
              name="drip_rate2"
              rules={[{ required: true, message: '请输入第二阶段输液滴速' }]}>
              <InputNumber
                min={1}
                placeholder="请输入第二阶段输液滴速"
              />
            </Form.Item>
          </Card>

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
            <pre className={style.pre}>
              <Statistic
                title="第一阶段时间"
                value={time1}
                suffix="分钟"
              />
              <Statistic
                title="第二阶段时间"
                value={time2}
                suffix="分钟"
              />
              <Statistic
                title="总时间"
                value={time1 + time2}
                suffix="分钟"
              />
            </pre>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  </div>;
}
