<?php
header('content-type:application/json;'); 
if($_SERVER['REQUEST_METHOD']=="DELETE"){

	echo json_encode(array("status"=>1));

}else if($_SERVER['REQUEST_METHOD']=="PUT"){

	echo json_encode(array("status"=>true));

}else if($_SERVER['REQUEST_METHOD']=="POST"){

   // echo json_encode(array("status"=>true));
 
}else{
echo '{
	"id": 19613463,
	"data": [
		{
			"content": {
				"bgcolor": "white",
				"m_tb": "10px",
				"notice": "自定义模块"
			},
			"type": "notice"
		},
		{
			"content": {
				"bgcolor": "white",
				"m_tb": "10px",
				"notice": "自定义模块"
			},
			"type": "search"
		},
		{
			"content": {
				"position": 1,
				"style": 1,
				"title": "自定义模块"
			},
			"type": "title"
		},
		{
			"content": {
				"style": 1,
				"pd_tb": "5px",
				"m_tb": "5px",
				"item_list": [
					{
						"title": "卖茶叶的小姑娘",
						"img": "images/2.png",
						"url": "#goods/11111"
					},
					{
						"title": "到公司",
						"img": "images/2.jpg",
						"url": "#goods/22222"
					}
				]
			},
		   "type": "slide"
		}
	],
	"header": {
		"id": 1,
		"name": "头部-1",
		"style": 0
	},
	"name": "Blue."
} 
';
}
