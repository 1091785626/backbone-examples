<?php
header('content-type:application/json;'); 
if($_SERVER['REQUEST_METHOD']=="DELETE"){

    //success
    echo '{}';
    //error
    //echo '有一个错误';

}else if($_SERVER['REQUEST_METHOD']=="PUT"){
    //success
    echo '{
        "data": [
            {
                "icon":"&#xe66f;",
                "title": "aa"
            },
            {
                "icon":"&#xe60f;",
                "title": "vv"
            },
            {
                "icon":"&#xe61f;",
                "title": "dd"
            },
            {
                "icon":"&#xe63f;",
                "title": "ff"
            }
        ],
        "id": 111,
        "style": 0
    } ';
    //error
    //echo '有一个错误';

}else if($_SERVER['REQUEST_METHOD']=="POST"){

   // echo json_encode(array("status"=>true));
 echo '{
    "status": 1,
    "id": 123
}
    ';

}else{
echo '{

    "data": [
        {
            "icon":"&#xe65f;",
            "title": "footer-1"
        },
        {
            "icon":"&#xe63f;",
            "title": "footer-2"
        },
        {
            "icon":"&#xe62f;",
            "title": "footer-3"
        },
        {
            "icon":"&#xe61f;",
            "title": "footer-4"
        }
    ],
    "id": 111,
    "style": 1
} 
';
}
