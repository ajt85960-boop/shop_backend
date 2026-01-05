import jwt from "jsonwebtoken";
import {SECRET_KEY} from "../utils/auth.js";
// 建议放到环境变量

/**
 * JWT 鉴权中间件
 */
export default function authMiddleware(req, res, next) {
    // 1️⃣ 从请求头中获取 token
    // 常见格式：Authorization: Bearer xxx.yyy.zzz
    const authHeader = req.headers['authorization']

    if (!authHeader) {
        return res.status(403).json({
            code: 403,
            message: 'No token provided'
        })
    }

    const parts = authHeader.split(' ')
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(403).json({
            code: 403,
            message: 'Invalid token format'
        })
    }

    const token = parts[1]

    // 2️⃣ 校验并解密 token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                code: 403,
                message: 'Invalid or expired token'
            })
        }

        // 3️⃣ 将解密后的信息注入到上下文（req）
        // 这是 Express 中“上下文注入”的常见做法
        console.dir(decoded);
        req.user = decoded

        // 放行请求
        next()
    })
}

