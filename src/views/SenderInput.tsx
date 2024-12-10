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

  const { appendMessage, updateLastMessageContent } = useMessageStore(
    useShallow((state) => ({ appendMessage: state.appendMessage, updateLastMessageContent: state.updateLastMessageContent })),
  );


  let ctrl = new AbortController();
  const sendMessage = async () => {
    ctrl = new AbortController();
    appendMessage({
      id: Date.now().toString(),
      role: 'user',
      content: value,
      loading: false
    })
    appendMessage({
      id: Date.now().toString(),
      role: 'ai',
      content: '',
      loading: true
    })
    setLoading(true)
    const message = value
    setValue('')
    await fetchEventSource('http://localhost:8000/chat/', {
      method: 'POST',
      body: JSON.stringify({
        text: message
      }),
      signal: ctrl.signal,
      onopen: async (res) => {
        console.log('res.ok: ', res.ok);
      },
      onmessage(msg) {
        if (isEnglishString(msg.data)) {
          msg.data = msg.data + ' '
        }
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

const regex = /^[a-zA-Z]+$/;
function isEnglishString(str: string) {
  return regex.test(str);
}

export default SenderInput;
