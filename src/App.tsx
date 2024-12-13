import { ConfigProvider, theme } from 'antd';
import Container from './views/Container';
import Logo from './components/Logo';

const App: React.FC = () => {
  return (
    <ConfigProvider theme={{
      algorithm: theme.darkAlgorithm
    }}>
      <Logo />
      <Container />
    </ConfigProvider>
  );
}

export default App;
