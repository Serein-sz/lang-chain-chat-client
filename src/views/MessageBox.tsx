import React, { useEffect, useRef } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Bubble, type BubbleProps } from '@ant-design/x';
import { useMessageStore } from '../store/store';
import { useShallow } from 'zustand/shallow';
import markdownit from 'markdown-it';
import { Space } from 'antd';

const md = markdownit({ html: true, breaks: true });

const renderMarkdown: BubbleProps['messageRender'] = (content) => (
  <div dangerouslySetInnerHTML={{ __html: md.render(content) }} />
);

const fooAvatar: React.CSSProperties = {
  color: '#f56a00',
  backgroundColor: '#fde3cf',
};

const barAvatar: React.CSSProperties = {
  color: '#fff',
  backgroundColor: '#87d068',
};

const MessageBox: React.FC<{ className?: string }> = (props) => {

  const { className } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const { messages } = useMessageStore(
    useShallow((state) => ({ messages: state.messages })),
  );

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current?.scrollHeight });
  }, [messages]);

  return (
    <div ref={containerRef} className={className}>
      <Space direction='vertical' size='middle' className='w-full h-full' >
        {
          messages.map((message, index) => (
            <Bubble
              key={index}
              placement={message.role === 'human' ? 'end' : 'start'}
              content={message.content}
              messageRender={renderMarkdown}
              typing={{ step: 2, interval: 10 }}
              avatar={{ icon: <UserOutlined />, style: message.role === 'human' ? barAvatar : fooAvatar }}
              loading={message.loading}
            />
          ))
        }
      </Space>
    </div>
  );
}

export default MessageBox;
