<?php
if($_SERVER['REQUEST_METHOD']=="PUT"){
     //success
    echo '{
            "img": "images/bg-test.png",
            "title": 1,
            "nowprice": 31,
            "sales": 3215,
            "seckill": true,
            "freesend": true,
            "cutprice": true
    } ';
    //error
    //echo '有一个错误';
}
else if($_SERVER['REQUEST_METHOD']=="DELETE"){

    //success
    echo '{}';
    //error
    //echo '有一个错误';

}else {
echo ' 
{
    "_count": 100,
    "data": [{
            "id": 1,
            "img": "images/bg-test.png",
            "title": 0,
            "nowprice": 31,
            "sales": 3215,
            "seckill": true,
            "freesend": true,
            "cutprice": true
        },
        {
            "id": 4,
            "img": "images/bg-test.png",
            "title": 0,
            "nowprice": 31,
            "sales": 3215,
            "seckill": true,
            "freesend": true,
            "cutprice": true
        },
        {
            "id": 1,
            "img": "images/bg-test.png",
            "title": 0,
            "nowprice": 31,
            "sales": 3215,
            "seckill": true,
            "freesend": true,
            "cutprice": true
        },
        {
            "id": 2,
            "img": "images/bg-test.png",
            "title": 0,
            "nowprice": 31,
            "sales": 3215,
            "seckill": true,
            "freesend": true,
            "cutprice": true
        },
        {
            "id": 33,
            "img": "images/bg-test.png",
            "title": 0,
            "nowprice": 31,
            "sales": 3215,
            "seckill": true,
            "freesend": true,
            "cutprice": true
        },{
            "id": 12333333333331,
            "img": "images/bg-test.png",
            "title": 0,
            "nowprice": 31,
            "sales": 3215,
            "seckill": true,
            "freesend": true,
            "cutprice": true
        },
        {
            "id": 43333333333,
            "img": "images/bg-test.png",
            "title": 0,
            "nowprice": 31,
            "sales": 3215,
            "seckill": true,
            "freesend": true,
            "cutprice": true
        },
        {
            "id": 33333333333331,
            "img": "images/bg-test.png",
            "title": 0,
            "nowprice": 31,
            "sales": 3215,
            "seckill": true,
            "freesend": true,
            "cutprice": true
        },
        {
            "id": 233333333333333333,
            "img": "images/bg-test.png",
            "title": 0,
            "nowprice": 31,
            "sales": 3215,
            "seckill": true,
            "freesend": true,
            "cutprice": true
        },
        {
            "id": 33333333333,
            "img": "images/bg-test.png",
            "title": 0,
            "nowprice": 31,
            "sales": 3215,
            "seckill": true,
            "freesend": true,
            "cutprice": true
        }]
}';
}
