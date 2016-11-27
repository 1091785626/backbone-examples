<?php
header('content-type:application/json;'); 
if($_SERVER['REQUEST_METHOD']=="DELETE"){

	echo json_encode(array("status"=>1));

}else if($_SERVER['REQUEST_METHOD']=="PUT"){

	echo json_encode(array("status"=>true));

}else if($_SERVER['REQUEST_METHOD']=="POST"){

   // echo json_encode(array("status"=>true));
	echo '{
		"status": 1,
		"id": 123
	}';
}
else{
	echo '{
		"id":159
	}';
}
/*
id      手机好，可以不写
is_set  是否设置过
name    名字
sex     性别
birth   生日日期
*/
