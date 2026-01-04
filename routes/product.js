import express from 'express';
import db from '../models/db.js';

const router = express.Router();

// 每周上新接口
router.get('/new',async(req,res)=>{
    try{
        //从数据库查数据
        const [rows] = await db.execute(
            'SELECT * FROM products as a left join product_images as b on a.id = b.product_id ' +
            'where b.is_cover = 1 AND a.is_new_arrival = 1;'
        )

        //返回数据
        res.json({
            code: 200,
            msg: 'success',
            data: rows
        })
    } catch(error){
        console.error('获取每周上新失败',error);
        res.status(500).json({
            code: 500,
            msg: '服务器内部错误'
        })
    }
})

// 每日推荐
router.get('/recommend',async(req,res) => {
    try {
        //从数据库查数据
        const [rows] = await db.execute(
            'SELECT * FROM products as a left join product_images as b on a.id = b.product_id ' +
            'where b.is_cover = 1 AND a.is_daily_recommend = 1;'
        )
        //返回数据
        res.json({
            code: 200,
            msg: 'success',
            data: rows
        })
    }catch(error){
        console.error('获取每日推荐失败',error);
        res.status(500).json({
            code: 500,
            msg: '服务器内部错误'
        })
    }
})

// 热销商品
router.get('/list',async(req,res) => {
    try {
        //从数据库查数据
        const [rows] = await db.execute(
            'SELECT * FROM products as a left join product_images as b on a.id = b.product_id ' +
            'where b.is_cover = 1;'
        )
        //返回数据
        res.json({
            code: 200,
            msg: 'success',
            data: rows
        })
    }catch(error){
        console.error('获取热销商品失败',error);
        res.status(500).json({
            code: 500,
            msg: '服务器内部错误'
        })
    }
})


export default router;