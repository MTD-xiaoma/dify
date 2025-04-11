'use client'
import React, { useEffect, useState } from 'react'
import ChatWithHistoryWrap from '@/app/components/base/chat/chat-with-history'

const Chat = () => {
  const [receivedText, setReceivedText] = useState('')

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // 安全检查：只接受来自你信任的父窗口地址
      if (!['http://localhost:8012', 'http://159.75.72.76:8012'].includes(event.origin)) return

      const { type, payload } = event.data

      if (type === 'TEXT_MESSAGE') {
        setReceivedText(payload) // 更新状态
        console.log('收到父窗口的消息:', payload)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <ChatWithHistoryWrap receivedText={receivedText} />
  )
}

export default React.memo(Chat)
