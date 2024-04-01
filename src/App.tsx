import { ConfigProvider, Layout } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { RouteView } from './routes';
import './App.scss';

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
            <h1>Demo</h1>
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
