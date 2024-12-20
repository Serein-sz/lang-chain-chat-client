import { DeleteOutlined, EditOutlined, StopOutlined } from '@ant-design/icons';
import { Conversations } from '@ant-design/x';
import type { ConversationsProps } from '@ant-design/x';
import { App, Button, type GetProp, theme } from 'antd';

const items: GetProp<ConversationsProps, 'items'> = Array.from({ length: 0 }).map((_, index) => ({
  key: `item${index + 1}`,
  label: `Conversation ${index + 1}`,
}));

const ConversationsManage: React.FC<{ className?: string }> = (props) => {
  const { className } = props;
  const { message } = App.useApp();
  const { token } = theme.useToken();

  const style = {
    background: token.colorBgContainer,
    borderRadius: token.borderRadius,
  };

  const menuConfig: ConversationsProps['menu'] = (conversation) => ({
    items: [
      {
        label: 'Operation 1',
        key: 'operation1',
        icon: <EditOutlined />,
      },
      {
        label: 'Operation 2',
        key: 'operation2',
        icon: <StopOutlined />,
        disabled: true,
      },
      {
        label: 'Operation 3',
        key: 'operation3',
        icon: <DeleteOutlined />,
        danger: true,
      },
    ],
    onClick: (menuInfo) => {
      message.info(`Click ${conversation.key} - ${menuInfo.key}`);
    },
  });


  return (
    <div className={className}>
      <div className="px-3">
        <Button color="primary" variant="outlined" block >
          Add Conversation
        </Button>
      </div>
      <div className='h-[calc(100%-42px)] mt-2 overflow-y-auto'>
        <Conversations className='pt-1' defaultActiveKey="item1" menu={menuConfig} items={items} style={style} />
      </div>
    </div>
  )
};

export default ConversationsManage;
