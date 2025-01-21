import { useXAgent } from '@ant-design/x';

// 模型服务配置
export const MODEL_CONFIG = {
  baseURL: 'http://20.2.232.137/v1/chat-messages',
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
    // 修改请求拦截器来格式化请求数据
    requestInterceptors: [
      (config) => {
        // 格式化请求数据以匹配API要求
        const formattedData = {
          inputs: {},
          query: config.data.message,
          response_mode: "streaming",
          conversation_id: config.data.conversationId || "",
          user: config.data.userId || "default-user",
          files: config.data.files || []
        };

        config.data = formattedData;
        console.log('Sending request:', config);
        return config;
      },
    ],
    // 响应拦截器处理返回数据
    responseInterceptors: [
      (response) => {
        console.log('Received response:', response);
        return response;
      },
    ],
    // 错误处理
    onError: (error) => {
      console.error('Model service error:', error);
    },
  });

  return agent;
};

// 格式化聊天消息，增加文件支持
export const formatChatMessage = (content, options = {}) => {
  const {
    role = 'user',
    files = [],
    userId,
    conversationId
  } = options;

  return {
    role,
    message: content,
    timestamp: new Date().toISOString(),
    files: files.map(file => ({
      type: file.type || 'image',
      transfer_method: 'remote_url',
      url: file.url
    })),
    userId,
    conversationId
  };
};

// 预设的系统消息
export const SYSTEM_MESSAGES = {
  default: '你好！我是一个 AI 助手，很高兴为您服务。',
  professional: '我是一个专业的 AI 助手，专注于提供准确和专业的回答。',
  friendly: '你好！我是你的 AI 朋友，让我们开始愉快的对话吧！',
}; 