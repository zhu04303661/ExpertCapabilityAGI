import { useXAgent } from '@ant-design/x';

// 模型服务配置
export const MODEL_CONFIG = {
  baseURL: 'http://20.2.232.137/v1/chat-messages',
  model: 'gpt-3.5-turbo',
  // 可以添加其他配置项
  headers: {
    'Content-Type': 'application/json',
    // 在实际使用时添加你的 API key
    'Authorization': 'Bearer app-rntVpOSvDxkafdkcgDgUCiAl'
  },
};

// 创建模型服务的自定义 Hook
export const useModelService = () => {
  const [agent] = useXAgent({
    ...MODEL_CONFIG,
    // 可以添加请求拦截器
    requestInterceptors: [
      (config) => {
        // 在发送请求前做些什么
        console.log('Sending request:', config);
        return config;
      },
    ],
    // 可以添加响应拦截器
    responseInterceptors: [
      (response) => {
        // 处理响应数据
        console.log('Received response:', response);
        return response;
      },
    ],
    // 错误处理
    onError: (error) => {
      console.error('Model service error:', error);
      // 可以添加错误处理逻辑
    },
  });

  return agent;
};

// 预设的系统消息
export const SYSTEM_MESSAGES = {
  default: '你好！我是一个 AI 助手，很高兴为您服务。',
  professional: '我是一个专业的 AI 助手，专注于提供准确和专业的回答。',
  friendly: '你好！我是你的 AI 朋友，让我们开始愉快的对话吧！',
};

// 工具函数：格式化聊天消息
export const formatChatMessage = (content, role = 'user') => {
  return {
    role,
    content,
    timestamp: new Date().toISOString(),
  };
}; 