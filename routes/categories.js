import express from 'express';
import db from '../models/db.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    // 查询数据库
    try {
        // 1. 查询数据库，按 sort_order 降序排列
        const [rows] = await db.execute(
            'SELECT id, name, parent_id, sort_order, icon FROM categories ORDER BY sort_order DESC, id ASC'
        );

        // 3. 如果前端需要树形结构 (递归处理)
        const categoryTree = buildTree(rows, 0);

        res.json({
            code: 200,
            msg: 'success',
            data: categoryTree
        });
    } catch (error) {
        console.error('获取分类失败:', error);
        res.status(500).json({
            code: 500,
            msg: '服务器内部错误'
        });
    }
});


/**
 * 将扁平数据转换为树形结构的辅助函数
 */
function buildTree(list, parentId) {
    return list
        .filter(item => item.parent_id === parentId)
        .map(item => ({
            ...item,
            children: buildTree(list, item.id) // 递归查找子类
        }));
}

export default router;
