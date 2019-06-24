var express = require('express')
var mysql = require('./mysql')
var md5 = require('blueimp-md5')
var fs = require('fs')

var router = express.Router()

router.get('/', function (req, res) {
    res.render('index.html')
})
router.get('/index', function (req, res) {

    res.render('index.html')
})

router.get('/bookchange', function (req, res) {
    var bookid = req.query.bookid;
    var sql = `SELECT * FROM books WHERE bookid=${bookid}`;
    mysql(sql).then(data=>{
        res.render('bookchange.html',{
            book:data
        });
    }).catch(err=>{
        return res.status(200).json({
            err_code:1,
            message:err.message
        })
    })
})

router.post('/bookchange',function(req,res){
    const {bookname,bookid,authorname,pressname,booktime,booknum,price} = req.body;
    var sql = `UPDATE books SET bookname = '${bookname}',bookid = '${bookid}',authorname = '${authorname}',
    pressname = '${pressname}',booktime ='${booktime}',booknum =  '${booknum}',price = '${price}'
    WHERE bookid =  ${bookid};`;
    mysql(sql).then(data=>{
        return res.status(200).json({
            err_code:0,
            message:'修改成功'
        })
    }).catch(err=>{
        return res.status(200).json({
            err_code:1,
            message:'修改失败'
        })
    })

})

router.get('/bookadd', function (req, res) {
    res.render('bookadd.html')
})

router.post('/bookadd',function(req,res){
    const {bookname,authorname,pressname,booktime,booknum,price} = req.body;
    var sql = `INSERT INTO books (bookname,authorname,pressname,booktime,booknum,price) 
    VALUES ('${bookname}','${authorname}','${pressname}','${booktime}','${booknum}','${price}');`;
    mysql(sql).then(data=>{
        return res.status(200).json({
            err_code:0,
            message:'添加成功'
        })
    }).catch(err=>{
        return res.status(200).json({
            err_code:1,
            message:'添加失败'
        })
    })

})

router.get('/Publishersadd', function (req, res) {
    res.render('Publishersadd.html')
    
})
router.post('/Publishersadd',function(req,res){
    const {pressname,pressid,pressaddress} = req.body;
    var sql = `INSERT INTO press VALUES ('${pressname}','${pressid}','${pressaddress}');`;
    mysql(sql).then(data=>{
        return res.status(200).json({
            err_code:0,
            message:'添加成功'
        })
    }).catch(err=>{
        return res.status(200).json({
            err_code:1,
            message:'添加失败'
        })
    })

})
router.get('/Publisherschange', function (req, res) {
    var pressid = req.query.pressid;
    var sql = `SELECT * FROM press WHERE pressid=${pressid}`;
    mysql(sql).then(data=>{
        res.render('Publisherschange.html',{
            press:data
        });
    }).catch(err=>{
        return res.status(200).json({
            err_code:1,
            message:err.message
        })
    })
})
router.post('/Publisherschange',function(req,res){
    const {pressname,pressid,pressaddress} = req.body;
    var sql = `UPDATE press SET pressname = '${pressname}',
    pressaddress = '${pressaddress}' WHERE pressid = ${pressid}`;
    mysql(sql).then(data=>{
        return res.status(200).json({
            err_code:0,
            message:'修改成功'
        })
    }).catch(err=>{
        return res.status(200).json({
            err_code:1,
            message:'修改失败'
        })
    })

})


router.get('/writersadd', function (req, res) {
        res.render('writersadd.html');
})
router.post('/writersadd',function(req,res){
    const {authorname,authorsix,authorphone,authorage} = req.body;
    var sql = `INSERT INTO author VALUES ('${authorname}','${authorsix}','${authorphone}','${authorage}');`;
    mysql(sql).then(data=>{
        return res.status(200).json({
            err_code:0,
            message:'添加成功'
        })
    }).catch(err=>{
        return res.status(200).json({
            err_code:1,
            message:'添加失败'
        })
    })

})
router.get('/authorschange', function (req, res) {
    var authorphone = req.query.authorphone;
    var sql = `SELECT * FROM author WHERE authorphone=${authorphone}`;
    mysql(sql).then(data=>{
        res.render('writerschange.html',{
            author:data
        });
    }).catch(err=>{
        return res.status(200).json({
            err_code:1,
            message:err.message
        })
    })
})
router.post('/authorschange',function(req,res){
    const {authorname,authorsix,authorphone,authorage,oldphone} = req.body;
    var sql = `UPDATE author SET authorname = '${authorname}',authorsix = '${authorsix}',
    authorphone = '${authorphone}',authorage = '${authorage}'
    WHERE authorphone = ${oldphone};`;
    mysql(sql).then(data=>{
        return res.status(200).json({
            err_code:0,
            message:'修改成功'
        })
    }).catch(err=>{
        return res.status(200).json({
            err_code:1,
            message:'修改失败'
        })
    })

})

router.get('/orderadd', function (req, res) {
        res.render('orderadd.html');
})
router.post('/orderadd',function(req,res){
    const {orderid,bookname,ordertime,purchaser,purchaseraddress,purchaserphone} = req.body;
    var sql = `INSERT INTO orders
    VALUES ('${orderid}','${bookname}','${ordertime}','${purchaser}','${purchaseraddress}','${purchaserphone}');`;
    mysql(sql).then(data=>{
        return res.status(200).json({
            err_code:0,
            message:'添加成功'
        })
    }).catch(err=>{
        return res.status(200).json({
            err_code:1,
            message:'添加失败'
        })
    })

})
router.get('/orderchange', function (req, res) {
    var orderid = req.query.orderid;
    var sql = `SELECT * FROM orders WHERE orderid=${orderid}`;
    mysql(sql).then(data=>{
        res.render('orderchange.html',{
            order:data
        });
    }).catch(err=>{
        return res.status(200).json({
            err_code:1,
            message:err.message
        })
    })
})
router.post('/orderchange',function(req,res){
    const {orderid,bookname,ordertime,purchaser,purchaseraddress,purchaserphone} = req.body;
    var sql = `UPDATE orders SET bookname = '${bookname}',ordertime = '${ordertime}',
    purchaser = '${purchaser}',purchaseraddress ='${purchaseraddress}',purchaserphone ='${purchaserphone}'
    WHERE orderid = ${orderid};`;
    mysql(sql).then(data=>{
        return res.status(200).json({
            err_code:0,
            message:'修改成功'
        })
    }).catch(err=>{
        return res.status(200).json({
            err_code:1,
            message:'修改失败'
        })
    })

})

router.post('/selectbook',function(req,res){
    const {guanjzi} = req.body;
    var sql =` SELECT * FROM books WHERE bookname LIKE '%${guanjzi}%'`;
    mysql(sql).then(data=>{
        var dataString = JSON.stringify(data);
        var  data = JSON.parse(dataString);
        return res.status(200).json({
            rouse:data
        })
    }).catch(err=>{
        return res.status(200).json({

        })
    })

})
router.post('/selectPublishers',function(req,res){
    const {guanjzi} = req.body;
    var sql =` SELECT * FROM press WHERE pressname LIKE '%${guanjzi}%'`;
    mysql(sql).then(data=>{
        var dataString = JSON.stringify(data);
        var  data = JSON.parse(dataString);
        return res.status(200).json({
            rouse:data
        })
    }).catch(err=>{
        return res.status(200).json({

        })
    })

})
router.post('/selectwriters',function(req,res){
    const {guanjzi} = req.body;
    var sql =` SELECT * FROM author WHERE authorname LIKE '%${guanjzi}%'`;
    mysql(sql).then(data=>{
        var dataString = JSON.stringify(data);
        var  data = JSON.parse(dataString);
        return res.status(200).json({
            rouse:data
        })
    }).catch(err=>{
        return res.status(200).json({

        })
    })

})
router.post('/selectorder',function(req,res){
    const {guanjzi} = req.body;
    var sql =` SELECT * FROM orders WHERE purchaser LIKE '%${guanjzi}%'`;
    mysql(sql).then(data=>{
        var dataString = JSON.stringify(data);
        var  data = JSON.parse(dataString);
        return res.status(200).json({
            rouse:data
        })
    }).catch(err=>{
        return res.status(200).json({

        })
    })

})


router.post('/passworldchange',function(req,res){
    const {id,newpassworld1} = req.body;
    var sql =`UPDATE manager SET managerpassword = '${newpassworld1}'
    WHERE managerid = ${id}`;
    mysql(sql).then(data=>{
        return res.status(200).json({
            err_code:0,
            message:"修改成功！"
        })
    }).catch(err=>{
        return res.status(200).json({
            err_code:1,
            message:err.message
        })
    })

})

router.get('/main', function (req, res) {
    if(req.session.islogin == null){
        res.redirect('/');
    }else{
        var sql = `SELECT * FROM books`;
        var sql2 = `SELECT * FROM press`;
        var sql3 = `SELECT * FROM author`;
        var sql4 = `SELECT * FROM orders`;
        mysql(sql).then(_data=>{
            mysql(sql2).then(_data2=>{
                mysql(sql3).then(_data3=>{
                    mysql(sql4).then(_data4=>{
                        var dataString = JSON.stringify(_data);
                        var  data = JSON.parse(dataString);
                        var dataString2 = JSON.stringify(_data2);
                        var  data2 = JSON.parse(dataString2);
                        var dataString3 = JSON.stringify(_data3);
                        var  data3 = JSON.parse(dataString3);
                        var dataString4 = JSON.stringify(_data4);
                        var  data4 = JSON.parse(dataString4);
                         res.render('main.html',{
                            books:data,
                            press:data2,
                            author:data3,
                            order:data4,
                            islogin: req.session.islogin
                        })
                    }).catch(err=>{
                        return res.status(200).json({
                            err_code:500,
                            message:err.message
                        })
                    })
                }).catch(err=>{
                    return res.status(200).json({
                        err_code:500,
                        message:err.message
                    })
                })
            }).catch(err=>{
                return res.status(200).json({
                    err_code:500,
                    message:err.message
                })
            })
        }).catch(err=>{
            return res.status(200).json({
                err_code:500,
                message:err.message
            })
        })
    }
})

router.post('/login',function(req,res){
    const {id,passwordmd5} = req.body;
    var sql = `SELECT * FROM manager WHERE managerid=${id} AND managerpassword = '${passwordmd5}'`;
    mysql(sql).then(data=>{
        if(Array.prototype.isPrototypeOf(data) && data.length === 0){
            return res.status(200).json({
                err_code:1,
                message:'账号或者密码错误'
            })
        }else{
            var dataString = JSON.stringify(data);
            var data = JSON.parse(dataString);
            req.session.islogin = data
            return res.status(200).json({
                err_code:0,
                message:'ok'
            })
        }
    }).catch(err=>{
        return res.status(200).json({
            err_code:500,
            message:err.message
        })
    })
})


router.get('/main/bookdelete', function (req, res) {
    var bookid = req.query.bookid;
    var sql = `DELETE FROM books WHERE bookid = ${bookid}`;
    mysql(sql).then(data=>{
        res.redirect('/main')
    }).catch(err=>{
        return res.status(200).json({
            err_code:1,
            message:err.message
        })
    })
})
router.get('/press/pressdelete', function (req, res) {
    var pressid = req.query.pressid;
    var sql = `DELETE FROM press WHERE pressid = ${pressid}`;
    mysql(sql).then(data=>{
        res.redirect('/main')
    }).catch(err=>{
        return res.status(200).json({
            err_code:1,
            message:err.message
        })
    })
})

router.get('/author/authordelete', function (req, res) {
    var authorphone = req.query.authorphone;
    var sql = `DELETE FROM author WHERE authorphone = ${authorphone}`;
    mysql(sql).then(data=>{
        res.redirect('/main')
    }).catch(err=>{
        return res.status(200).json({
            err_code:1,
            message:err.message
        })
    })
})

router.get('/order/orderdelete', function (req, res) {
    var orderid = req.query.orderid;
    var sql = `DELETE FROM orders WHERE orderid = ${orderid}`;
    mysql(sql).then(data=>{
        res.redirect('/main')
    }).catch(err=>{
        return res.status(200).json({
            err_code:1,
            message:err.message
        })
    })
})

router.get('/zhuxiao', function (req, res) {
    // 清除登陆状态
    req.session.islogin = null
  
    // 重定向到登录页
    res.redirect('/index')
})


module.exports = router