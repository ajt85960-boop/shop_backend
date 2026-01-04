import express from 'express';
import db from '../models/db.js';

const router = express.Router();

// 商品详情
router.get('/:id',async(req,res)=>{
    try{
        const productId = req.params.id

        //从数据库查数据
        const [[detail],[images]] = await Promise.all([
            db.execute(`SELECT * FROM product_skus where product_id = ${productId};`),
            db.execute(`SELECT * FROM product_images where product_id = ${productId} and is_cover = 1;`),
        ])

        // 4. 组装数据并返回
        const productDetail = {
            ...detail[0],   // 展开商品基本信息
            images: images,   // 放入图片数组
        };

        //返回数据
        res.json({
            code: 200,
            msg: 'success',
            data: productDetail
        })
    } catch(error){
        console.error('获取商品详情失败',error);
        res.status(500).json({
            code: 500,
            msg: '服务器内部错误'
        })
    }
})

export default router;