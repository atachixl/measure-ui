import { Button, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import style from './index.module.scss';
import { useState } from 'react';

export
function Home() {
  const [result, setResult] = useState<string>('');

  const handleFormChange = (values: any) => {
    console.log(values);
    setResult(JSON.stringify(values));
  };

  return <div className={style.com}>
    <Row gutter={16}>
      <Col span={12}>
        <Form
          className={style.form}
          layout="vertical"
          onValuesChange={(_, values) => handleFormChange(values)}>
          <Form.Item
            label="数字"
            name="a">
            <InputNumber
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
        </Form>
      </Col>
      <Col span={12}>
        <pre className={style.pre}>{result}</pre>
      </Col>
    </Row>
  </div>;
}
