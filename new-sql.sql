CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '用户唯一ID',
  `username` VARCHAR(50) NOT NULL UNIQUE COMMENT '登录用户名',
  `password_hash` VARCHAR(255) NOT NULL COMMENT '哈希加密后的密码',
  `mobile` VARCHAR(20) NOT NULL UNIQUE COMMENT '手机号',
  `nickname` VARCHAR(50) DEFAULT NULL COMMENT '用户昵称',
  `avatar` VARCHAR(500) DEFAULT NULL COMMENT '头像URL',
  `gender` TINYINT DEFAULT 0 COMMENT '性别：0-保密，1-男，2-女',
  `status` TINYINT DEFAULT 1 COMMENT '状态：1-正常，0-禁用，2-冻结',
  `register_source` VARCHAR(20) DEFAULT 'mobile' COMMENT '注册来源：mobile, wechat, web',
  `last_login_at` DATETIME DEFAULT NULL COMMENT '最后登录时间',
  `create_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  `update_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  -- 索引优化
  INDEX `idx_mobile` (`mobile`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户基础信息表';