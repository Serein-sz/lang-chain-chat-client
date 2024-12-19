
import React from 'react';
import { Divider, Layout, Select, theme } from 'antd';
import MessageBox from './MessageBox';
import SenderInput from './SenderInput';
import ConversationsManage from './ConversationsManage';
import { useModelStore } from '../store/modelStore';
import { useShallow } from 'zustand/shallow';

const { Content, Footer, Sider } = Layout;

const Container: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  theme.useToken();

  const { model, setCurrentModel } = useModelStore(useShallow((state) => ({
    model: state.model,
    setCurrentModel: state.setCurrentModel,
  })))

  return (
    <Layout>
      <Content className='px-12 mt-12'>
        <Layout
          className='py-6 h-[calc(100vh-112px)]'
          style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <ConversationsManage className='w-full' />
          </Sider>
          <Divider type='vertical' className='h-full' />
          <Content className='relative px-6'>
            <Select
              className='absolute top-1 left-[50%] w-48 translate-x-[-50%]'
              value={model}
              onChange={setCurrentModel}
              options={[
                { value: 'qwen2.5-coder:0.5b', label: <span>qwen2.5-coder:0.5b</span> },
                { value: 'qwen2.5-coder:1.5b', label: <span>qwen2.5-coder:1.5b</span> },
              ]} />
            <MessageBox className='overflow-y-auto h-[calc(100%-72px)] p-4' />
            <SenderInput className='absolute bottom-0 w-[calc(100%-48px)]' />
          </Content>
        </Layout>
      </Content>
      <Footer className='text-center h-16'>
        AI Assistant ©{new Date().getFullYear()} Created by WangQiang
      </Footer>
    </Layout>

  );
};

export default Container;
