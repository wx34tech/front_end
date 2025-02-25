// 注意：实际生产环境应该通过后端代理API请求，不要在前端暴露API密钥
const API_KEY = 'sk-213882cd3ce24378b7cb747ea1c3fe99';

async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    if (!message) return;

    // 添加用户消息
    addMessage(message, 'user');
    userInput.value = '';

    try {
      const response = await fetch('http://59.66.196.35:3000/api/chat', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              messages: [
                  { role: "system", content: "你叫为小先，是一个乐于助人的为先34班的助手。" },
                  { role: "user", content: message }
              ]
          })
      });

        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status}`);
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        addMessage(aiResponse, 'ai');
    } catch (error) {
        console.error('错误:', error);
        addMessage(`请求失败: ${error.message}`, 'error');
    }
}

function addMessage(content, type) {
    const chatBox = document.getElementById('chatBox');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.textContent = content;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}