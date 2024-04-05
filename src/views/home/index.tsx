import { Button, Card, Col, Form, Input, InputNumber, message, QRCode, Row, Select, Space, Statistic } from 'antd';
import style from './index.module.scss';
import { useState } from 'react';

const getNumberValidator = (min?: number, max?: number, rangeType = 3) => {
  return (_, value: number) => new Promise((resolve, reject) => {
    const leftClose = !!((rangeType & 0x02) >> 1);
    const rightClose = !!(rangeType & 0x01);
    const result = (min == null || (leftClose ? value >= min : value > min)) &&
      (max == null || (rightClose ? value <= max : value < max));
    if (result) resolve(value);
    else {
      let errorMsg = '';
      if (min == null) errorMsg = `数值必须小于${rightClose ? '(等于)' : ''} ${max}`;
      else if (max == null) errorMsg = `数值必须大于${leftClose ? '(等于)' : ''} ${min}`;
      else errorMsg = `数值必须在 ${min}${leftClose ? '(包含)' : ''} 到 ${max}${rightClose ? '(包含)' : ''} 之间`;
      reject(errorMsg);
    }
  });
};
const validator = (_, value) => new Promise((resolve, reject) => {
  if (value > 0) resolve(value);
  else reject('请输入大于0的数字');
});

export
function Home() {
  const [form] = Form.useForm();
  const [time1, setTime1] = useState<number>(0);
  const [time2, setTime2] = useState<number>(0);
  const [tip1, setTip1] = useState<string>("20-40滴/分");
  const [tip2, setTip2] = useState<string>("60-80滴/分");
  const [tip3, setTip3] = useState<string>("200ml=1u");
  const [minute, setMinute] = useState<number>(15);

  const handleFormChange = (values: any) => {
    let p1ml = parseFloat((values.drip_rate1 / 20).toFixed(4));
    let p2ml = parseFloat((values.drip_rate2 / 20).toFixed(4));
    let p1mlTotal = p1ml * values.minute;
    if(values.total_volume <= p1mlTotal) {
      setTime1(parseFloat((values.total_volume / p1ml).toFixed(4)));
      setTime2(0);
    } else {
      setTime1(values.minute);
      setTime2(parseFloat(((values.total_volume - p1mlTotal) / p2ml).toFixed(4)));
    }
    message.success('计算成功');
  };

  const handleSelectChange = (value: string) => {
    if(value == "1") {
      setTip1("20-40滴/分");
      setTip2("60-80滴/分");
      setTip3("200ml=1u");
    } else if(value == "2") {
      setTip1("40-100滴/分");
      setTip2("100滴/分");
      setTip3("");
    } else if(value == "3") {
      setTip1("100滴/分");
      setTip2("100滴/分");
      setTip3("20-25ml=1u");
    } else if(value == "4") {
      setTip1("200滴/分");
      setTip2("");
      setTip3("");
    } else if(value == "5") {
      setTip1("20-40滴/分");
      setTip2("40-50滴/分");
      setTip3("");
    }
  };

  const handleMinuteChange = (value: number) => {
    setMinute(value);
  };

  return <div className={style.com}>
    <Row>
      <Col span={24}>
        <Form
          className={style.form}
          layout="vertical"
          form={form}>
          <Form.Item
              label="血液成分"
              name="blood">
            <Select
                defaultValue="1"
                placeholder="请选择血液成分"
                onChange={handleSelectChange}>
              <Select key="1">红细胞</Select>
              <Select key="2">血浆</Select>
              <Select key="3">血小板</Select>
              <Select key="4">冷沉淀/凝血因子</Select>
              <Select key="5">粒细胞</Select>
            </Select>
          </Form.Item>
          <Form.Item
            label={<span>
              <span>总量(ml)</span>
              <span className={style.tip}>{tip3}</span>
            </span>}
            name="total_volume"
            rules={[{ validator: getNumberValidator(0, null, 0) }]}>
            <InputNumber
              placeholder="请输入大于0的数字"
            />
          </Form.Item>

          <Card className={style.row} title="第一阶段">
            <Form.Item
                label={<span>
                <span>第一阶段持续时间(分钟)</span>
                <span className={style.tip}>请输入大于等于15的数字</span>
              </span>}
                name="minute"
                rules={[{ validator: getNumberValidator(15, null, 3) }]}>
              <InputNumber
                  onChange={handleMinuteChange}
                  placeholder="请输入大于等于15的数字"
              />
            </Form.Item>
            <Form.Item
              label={<span>
                <span>前{minute}分钟输液滴速(滴/分)</span>
                <span className={style.tip}>{tip1}</span>
              </span>}
              name="drip_rate1"
              rules={[{ validator: getNumberValidator(1, null, 3) }]}>
              <InputNumber
                placeholder="请输入大于0的数字"
              />
            </Form.Item>
          </Card>

          <Card className={style.row} title="第二阶段">
            <Form.Item
              label={<span>
                <span>{minute}分钟后输液滴速(滴/分)</span>
                <span className={style.tip}>{tip2}</span>
              </span>}
              name="drip_rate2"
              rules={[{ validator: getNumberValidator(1, null, 3) }]}>
              <InputNumber
                min={1}
                placeholder="请输入大于0的数字"
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
