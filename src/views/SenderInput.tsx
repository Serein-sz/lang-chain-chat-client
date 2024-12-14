import { Sender } from '@ant-design/x';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { Flex } from 'antd';
import { useState } from 'react';
import { useMessageStore } from '../store/store';
import { useShallow } from 'zustand/shallow';

const SenderInput: React.FC<{ className?: string }> = (props) => {
  const { className } = props;
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { getMessages, saveMessage, updateLastMessageContent } = useMessageStore(
    useShallow((state) => ({
      getMessages: state.getMessages,
      saveMessage: state.saveMessage,
      updateLastMessageContent: state.updateLastMessageContent
    })),
  );


  let ctrl = new AbortController();
  const sendMessage = async () => {
    ctrl = new AbortController();
    saveMessage(value);
    setLoading(true)
    setValue('')
    await fetchEventSource(`${import.meta.env.VITE_API_BASE_URL}/chat/`, {
      method: 'POST',
      body: JSON.stringify({
        model: "qwen2.5-coder:0.5b",
        messages: getMessages()
      }),
      signal: ctrl.signal,
      onmessage(msg) {
        updateLastMessageContent(msg.data)
      },
    })
    setLoading(false)
  }

  const cancel = () => {
    setLoading(false)
    ctrl.abort()
  }

  return (
    <Flex vertical gap="middle" className={className}>
      <Sender
        loading={loading}
        value={value}
        placeholder="Press Shift + Enter to send message"
        onChange={v => setValue(v)}
        onSubmit={sendMessage}
        onCancel={cancel}
      />
    </Flex>
  );
};



export default SenderInput;
