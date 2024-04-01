import { Button, ConfigProvider, Layout, Popover, QRCode, Space } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { RouteView } from './routes';
import './App.scss';
import cat_img from './cat.jpeg';

const { Header, Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 0,
          },
        }}>
        <Layout className="App">
          <Header className="Header">
            <span className="title">
              <img className="logo" src={cat_img} />
              <span>输液计算器</span>
            </span>
            <Popover
              content={<QRCode
                value={window.location.href}
                icon={cat_img}
              />}>
              <Button>分享二维码</Button>
            </Popover>
          </Header>
          <Content className="Content">
            <RouteView />
          </Content>
        </Layout>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
