import express from "express";
import db from "../models/db.js";
import crypto from "node:crypto";
import { generateToken } from "../src/utils/auth.js";
// 推荐加上 node: 前缀，明确是内置模块
import authMiddleware from "../src/middleware/authMiddleware.js";

/**
 * SHA256 加密函数
 * @param {string} password 原始密码
 * @returns {string} 加密后的十六进制字符串
 */
export const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

const router = express.Router();

// 新增用户
router.post("/register", async (req, res) => {
  //1.获取用户提交的信息
  const { username, password, mobile } = req.body;
  //2.查询是否有同名的姓名和电话
  const [rows] = await db.query(
    "SELECT * FROM users where username = ? AND mobile = ?",
    [username, mobile]
  );
  //3.存在，提示错误
  if (rows.length > 0) {
    return res.status(400).json({
      message: "用户已存在",
    });
  }
  const pwd = hashPassword(password);
  const [result] = await db.execute(
    "INSERT INTO users (username, password_hash, mobile) VALUES (?, ?, ?)",
    [username, pwd, mobile]
  );

  const newUser = {
    id: result.insertId,
    username,
    mobile,
  };
  const jwt = await generateToken(newUser);

  return res.json({
    code: 200,
    message: "用户注册成功",
    data: {
      token: jwt,
    },
  });
});

// `id` int NOT NULL AUTO_INCREMENT COMMENT '用户唯一ID',
// `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '登录用户名',
// `password_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '哈希加密后的密码',
// `mobile` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '手机号',
// `nickname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户昵称',
// `avatar` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像URL',
// `gender` tinyint NULL DEFAULT 0 COMMENT '性别：0-保密，1-男，2-女',
// `status` tinyint NULL DEFAULT 1 COMMENT '状态：1-正常，0-禁用，2-冻结',
// 查询用户
router.get("/info", authMiddleware, async (req, res) => {
  try {
    const id = req.user.id
    const [user] = await db.execute('SELECT * FROM ' +
        'users where id = ?', [id]);
    if(user.length === 0){
        return res.status(400).json({
            code: 400,
            message: "找不到该用户"
        })
    }

    return res.json({
      code: 200,
      message: "查询用户信息:success",
      data: user[0],
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      data: "内部信息错误：" + error.message,
    });
  }
});


router.get("/list", async (req, res) => {
  try {
  const username = req.query['params[username]'];
  const mobile = req.query['params[mobile]'];
  const page = req.query['params[page]'];
  const pageSize = req.query['params[pageSize]'];

  let rawSql = 'SELECT * FROM users WHERE 1=1'

  if (username) {
    rawSql += ` AND username LIKE '%${username}%'`;
  }
  if(mobile) {
    rawSql += ` AND mobile LIKE '%${mobile}%'`;
  }

  rawSql += ` LIMIT ${(page - 1) * pageSize}, ${pageSize}`;

  const [user] = await db.execute(rawSql);
  if(user.length === 0){
      return res.status(400).json({
          code: 400,
          message: "找不到该用户"
      })
  }

  return res.json({
    code: 200,
    message: "查询用户信息",
    data: user,
  });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      data: "内部信息错误：" + error.message,
    });
  }
});

// 用户登录
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    //根据姓名查用户
    const [user] = await db.execute("SELECT * FROM users where username = ?", [
      username,
    ]);
    if (user.length === 0) {
      return res.status(400).json({
        code: 400,
        message: "用户名或密码有误，重新登录",
      });
    }
    const pwd = hashPassword(password);
    if (pwd === user[0].password_hash) {
      const token = generateToken(user[0]);
      //成功登录
      return res.json({
        code: 200,
        message: "用户成功登录",
        data: {
          token: token,
          // user: {
          //     username: user[0].username,
          //     id: user[0].id
          // }
        },
      });
    } else {
      return res.status(400).json({
        code: 400,
        message: "用户名或密码有误",
      });
    }
  } catch (error) {
    console.error("登录错误:", error);
    return res.status(500).json({
      code: 500,
      message: "内部信息错误：" + error.message,
    });
  }
});
export default router;
