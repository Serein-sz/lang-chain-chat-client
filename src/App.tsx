import { ConfigProvider, theme } from 'antd';
import Container from './views/Container';

const App: React.FC = () => {
  return <ConfigProvider theme={{
    algorithm: theme.darkAlgorithm
  }}>
    <Container />
  </ConfigProvider>;
}

export default App;
