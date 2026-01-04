/*
 Navicat Premium Data Transfer

 Source Server         : mysql8
 Source Server Type    : MySQL
 Source Server Version : 80040
 Source Host           : localhost:3308
 Source Schema         : shop

 Target Server Type    : MySQL
 Target Server Version : 80040
 File Encoding         : 65001

 Date: 04/01/2026 21:30:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '分类名称',
  `parent_id` int NULL DEFAULT 0 COMMENT '父级ID，0表示顶层分类',
  `sort_order` int NULL DEFAULT 0 COMMENT '排序权重',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '分类图标',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '商品分类表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES (1, '母婴用品', 0, 50, '2026-01-03 12:54:28', '/icons/menu5.svg');
INSERT INTO `categories` VALUES (2, '休闲零食', 0, 40, '2026-01-03 12:54:28', '/icons/menu4.svg');
INSERT INTO `categories` VALUES (3, '海鲜水产', 0, 30, '2026-01-03 12:54:28', '/icons/menu3.svg');
INSERT INTO `categories` VALUES (4, '服饰箱包', 0, 20, '2026-01-03 12:54:28', '/icons/menu2.svg');
INSERT INTO `categories` VALUES (5, '水果蔬菜', 0, 10, '2026-01-03 12:54:28', '/icons/menu1.svg');

-- ----------------------------
-- Table structure for product_images
-- ----------------------------
DROP TABLE IF EXISTS `product_images`;
CREATE TABLE `product_images`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '图片ID',
  `product_id` int NOT NULL COMMENT '关联商品ID',
  `image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '图片路径',
  `is_cover` tinyint(1) NULL DEFAULT 0 COMMENT '是否为封面：0-否，1-是',
  `sort_order` int NULL DEFAULT 0 COMMENT '排序',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_product_id`(`product_id`) USING BTREE,
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '商品图片表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_images
-- ----------------------------
INSERT INTO `product_images` VALUES (1, 1, '/images/img1.png', 1, 1);
INSERT INTO `product_images` VALUES (2, 1, 'https://picsum.photos/400/400?random=12', 0, 2);
INSERT INTO `product_images` VALUES (3, 1, 'https://picsum.photos/400/400?random=13', 0, 3);
INSERT INTO `product_images` VALUES (4, 2, '/images/img2.png', 1, 1);
INSERT INTO `product_images` VALUES (5, 2, 'https://picsum.photos/400/400?random=22', 0, 2);
INSERT INTO `product_images` VALUES (6, 2, 'https://picsum.photos/400/400?random=23', 0, 3);
INSERT INTO `product_images` VALUES (7, 3, '/images/img3.png', 1, 1);
INSERT INTO `product_images` VALUES (8, 3, 'https://picsum.photos/400/400?random=32', 0, 2);
INSERT INTO `product_images` VALUES (9, 3, 'https://picsum.photos/400/400?random=33', 0, 3);
INSERT INTO `product_images` VALUES (10, 4, '/images/img4.png', 1, 1);
INSERT INTO `product_images` VALUES (11, 5, '/images/img5.png', 1, 1);

-- ----------------------------
-- Table structure for product_skus
-- ----------------------------
DROP TABLE IF EXISTS `product_skus`;
CREATE TABLE `product_skus`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'SKU ID',
  `product_id` int NOT NULL COMMENT '关联商品ID',
  `spec_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '规格组合名称 (如：红色,L码)',
  `price` decimal(10, 2) NOT NULL COMMENT '规格售价',
  `stock` int NULL DEFAULT 0 COMMENT '库存数量',
  `sku_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '唯一库存编码',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `sku_code`(`sku_code`) USING BTREE,
  INDEX `idx_product_id`(`product_id`) USING BTREE,
  CONSTRAINT `product_skus_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '商品规格库存表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_skus
-- ----------------------------
INSERT INTO `product_skus` VALUES (1, 1, '钛金属色, 双开门', 6899.00, 20, 'P1-TIT-1TB');
INSERT INTO `product_skus` VALUES (2, 2, '3D环绕', 1999.00, 15, 'P4-CAMEL-XL');
INSERT INTO `product_skus` VALUES (3, 3, '索尼 经典款', 599.00, 50, 'P6-100ML-BIG');
INSERT INTO `product_skus` VALUES (4, 4, '极光绿', 1399.00, 40, 'P2-GREEN-LIMIT');
INSERT INTO `product_skus` VALUES (5, 5, '黑色 混响', 29.90, 500, 'P5-BOX-5');

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '商品ID',
  `category_id` int NOT NULL COMMENT '所属分类ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '商品名称',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '商品描述',
  `base_price` decimal(10, 2) NOT NULL COMMENT '基础展示价格',
  `is_new_arrival` tinyint(1) NULL DEFAULT 0 COMMENT '是否本周上新：0-否，1-标准',
  `is_daily_recommend` tinyint(1) NULL DEFAULT 0 COMMENT '是否每日推荐：0-否，1-是',
  `status` tinyint(1) NULL DEFAULT 1 COMMENT '状态：0-下架，1-上架',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_category`(`category_id`) USING BTREE,
  INDEX `idx_recommend`(`is_daily_recommend`, `is_new_arrival`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '商品主表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES (1, 1, '冰箱', '冰箱desc', 1299.00, 1, 0, 1, '2026-01-03 14:39:32', '2026-01-03 16:22:33');
INSERT INTO `products` VALUES (2, 2, '酷炫音响', '酷炫音响desc', 458.50, 1, 0, 1, '2026-01-03 14:39:32', '2026-01-03 16:22:43');
INSERT INTO `products` VALUES (3, 3, '头戴式耳机', '头戴式耳机desc', 899.00, 1, 0, 1, '2026-01-03 14:39:32', '2026-01-03 14:39:32');
INSERT INTO `products` VALUES (4, 4, '酷炫音响2', '酷炫音响desc', 458.50, 0, 1, 1, '2026-01-03 16:14:23', '2026-01-03 16:14:23');
INSERT INTO `products` VALUES (5, 5, '头戴式耳机2', '头戴式耳机desc', 899.00, 0, 1, 1, '2026-01-03 16:14:23', '2026-01-03 16:22:31');

SET FOREIGN_KEY_CHECKS = 1;
