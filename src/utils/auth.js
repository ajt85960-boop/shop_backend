import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_super_secret_key'; // 实际开发应放在 .env 环境变量中

/**
 * 生成 Token
 * @param {Object} user 用户信息对象
 */
export const generateToken = (user) => {
    // Payload：不要放敏感信息（如密码），只放 ID 或 角色
    const payload = {
        id: user.id,
        username: user.username
    };

    // 配置：设置过期时间（如：24小时）
    const options = {
        expiresIn: '24h'
    };

    return jwt.sign(payload, SECRET_KEY, options);
};

/**
 * 校验 Token（用于中间件）
 */
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        return null; // Token 无效或过期
    }
};