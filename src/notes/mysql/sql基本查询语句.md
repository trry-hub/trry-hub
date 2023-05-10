USE `database_jiuzhou_1.0.0`;
# SELECT * FROM `t_detail`;

SELECT `title`,price FROM `t_detail`;

# 查询常量值
SELECT 100;
SELECT 'JOHN';

# 5.查询表达式
SELECT 100%98;

# 6.查询函数
SELECT VERSION();

# 7.起别名

#方式一
SELECT 100%98 AS 结果;

#方式二
SELECT title 标题, price 价格 FROM t_detail;

#案例： 查询price，显示结果为 out put

SELECT price AS "out put" FROM t_detail;

# 8. 去重

#案例：查询商品价格

SELECT DISTINCT price FROM t_detail;

# 9. +号的作用
# 案例： 标题和价格合成一个字段 

/*
	mysql 中 + 号：
	仅仅只有一个功能： 运算符
	select 100+90; 两个操作都为数值型，则做加法运算
	select '123'+90; 其中一方为字符型，试图将字符型数值转换成数值型
														如果转换成功，则继续做加法晕眩
														如果转换失败，则将字符型数值转换成0
														
	select null+10; 只要其中乙方为null，则结果肯定为null

*/
# SELECT title+price AS 姓名 FROM t_detail;

SELECT CONCAT(title,price) AS 姓名 FROM t_detail;











-- USE t_goods;
--
# 进阶2： 条件查询
/*
	语法： 
					select 
									查询列表
					from
									表名
					where
									筛选条件;
									
分类：

				一、按条件表达式筛选
				
				条件运算符： > < = != <> <= >=


​				
				二、按逻辑表达式筛选
				逻辑运算符：
								&& || !
								and or not
								
				&&和and: 两个条件都为true，结果为true，反之为false
				||或or:  只要又一个条件为true,结果为true，反之为false
				!或not：如果链接的条件本身为false,结果为true，反之为false
								
				三、模糊查询
							
							like
							between and
							in
							is null
*/#一、按条件表达式筛选
#案例1: 查询id在大于50小于100的商品
SELECT
	* 
FROM
	t_goods 
WHERE
	id > 50 && id < 840; #案例2：查询type_id等于2的所有商品的价格和商品名称
SELECT goods_title, goods_price FROM t_goods WHERE type_id = 2; USE t_detail; #二、按逻辑表达式筛选
#案例1：查询价格在900到1000之间的商品
SELECT * FROM t_detail WHERE id > 10 
AND id < 500;#三、模糊查询
/*

like
特点：
			1. 一般和通配符搭配使用
					通配符：
					%  任意多个字符，包含0个字符
					_  任意单个字符
bewteen and
in
is null is not null

*/#1.like
#案例1：查询商品名中包含字符a的商品信息
SELECT
	* 
FROM
	t_goods 
WHERE
	goods_title LIKE '%冷鲜%';#案例2：查询商品名中第二个字符为利第五个字符为冠的商品名称和价格
SELECT
	goods_price,
	goods_title 
FROM
	t_goods 
WHERE
	goods_title LIKE '_利__冠%';#案例3：查询商品名中第二个字符为_的商品名
SELECT
	goods_title 
FROM
	t_goods 
WHERE
	goods_title LIKE '_\_%';#------------------------------
#推荐
SELECT
	goods_title 
FROM
	t_goods 
WHERE
	goods_title LIKE '_$_%' ESCAPE '$';#2.between and
/*
1.使用between and 可以提高语句的简介度
2.包含临界值
3.两个临界值不要调换顺序

*/#案例1：查询商品id在800到920之间的员工信息
SELECT
	* 
FROM
	t_goods 
WHERE
	id >= 800 
	AND id <= 920;#--------------------------------
SELECT
	* 
FROM
	t_goods 
WHERE
	id BETWEEN 800 
	AND 920;#3.in
/*
	
含义： 判断某个字段的值是否属于in列表中的某一项
特点： 
			1.使用in提高语句简洁度
			2.in列表的值类型必须一致或兼容
*/#案例：查询商品名称是 惠氏S-26金装爱儿乐婴儿配方奶粉1段400g、圣元优博盖诺安婴儿配方奶粉1段900g中的一个商品名的商品
SELECT
	* 
FROM
	t_goods 
WHERE
	goods_title IN ( '惠氏S-26金装爱儿乐婴儿配方奶粉1段400g', '圣元优博盖诺安婴儿配方奶粉1段900g' ) #4.is null
/*

=或<>不能用于判断null值
is null或is not null 可以判断null值

*/#案例：查询没有价格的商品
SELECT
	* 
FROM
	t_goods 
WHERE
	goods_price IS NULL;#安全等于： <=>
#案例1.查询没有价格的商品
SELECT
	* 
FROM
	t_goods 
WHERE
	goods_price <=> NULL;#案例2.查询id为900的商品信息
SELECT
	* 
FROM
	t_goods 
WHERE
	Id <=> 900;# is null pk <=>
/*

IS NULL: 仅仅可以判断null值，可读性较高，建议使用
<=>:既可以判断null值，又可以判断普通的数值，可读性较低
*/


#查看表结构
DESC t_goods;




#进阶3：排序查询

/*
语法：
			select 查询列表
			from 表
			【where 筛选条件】
			order by 排序列表 【ase|desc】

特点：
			1.asc代表的是升序，desc代表的是降序
			如果不写，默认是升序
			
			2.order by子句中可以支持单个字段、多个字段、表达式、函数、别名
			3.order by子句一般是放在查询语句的最后面，limit子句除外

*/

#案例：查询商品信息，要求id从大到小排序

SELECT * FROM t_goods ORDER BY id DESC;
SELECT * FROM t_goods ORDER BY id ASC;

#案例：按商品名称的长度排序【按函数排序】

SELECT id,goods_title,LENGTH(goods_title) 长度 
FROM 
t_goods 
ORDER BY 长度 DESC;

#案例：查询商品信息，要求先按商品名称长度升序排序，在按id降序排序

SELECT id,goods_title, LENGTH(goods_title) AS 商品名称长度 FROM t_goods ORDER BY LENGTH(goods_title) ASC, id desc;


SELECT * FROM t_goods LIMIT 5,10;



#进阶4：常见函数

/*

概念：类似于java的方法，将一组逻辑语句封装在方法体中，对外暴露方法名
好处：1、隐藏了实现细节 2、提高代码的重用性
调用：select 函数名(实参列表) 【from 表】;
特点： 

			1.叫什么（函数名）
			2.干什么（函数功能）

分类：
			1、单行函数
			如 concat 、length、ifnull等
			2、分组函数
			

			功能：做统计使用，又称为统计函数、聚合函数、组函数
*/


# 一、字符函数

#length 获取参数数值的字节个数
SELECT LENGTH('john');

SELECT LENGTH('张三丰hahaha');

SHOW VARIABLES LIKE '%char%';


#2.concat 拼接字符串

SELECT CONCAT(goods_title,'_',goods_price) AS title FROM t_goods;

#3.upper、lower

SELECT UPPER('price');
SELECT LOWER('PRICE');

#示例 将商品名称大写，价格小写，然后拼接
SELECT CONCAT(UPPER(goods_title),'_',LOWER(goods_price)) 姓名 FROM t_goods;

#4.substr、substring
注意：索引从1开始
# 截取从指定索引出后面的所有字符
SELECT SUBSTR('李莫愁爱上了陆展元',7) out_put;

#截取从指定索引处指定字符长度的字符
SELECT SUBSTR('李莫愁爱上了陆展元',1,3) out_put;


#5.instr 返回子串第一次出现的索引，如果找不到返回0

SELECT INSTR('杨不爱上了殷六侠','殷六侠') AS out_put;


#6.trim

SELECT LENGTH(TRIM('              张翠山          ')) AS out_put;

SELECT TRIM('a' FROM 'aaaaaaaaaaaaaaa张翠山aaaaaaaaaaaaaa') AS out_put;

#7.lpad 用指定的字符实现左填充指定长度

SELECT LPAD('殷素素',10,'*') AS oup_put;

#8.rpad 用指定的字符实现右填充指定长度

SELECT RPAD('殷素素',12,'12') AS oup_put;

#9.replace 替换

SELECT REPLACE('周芷若周芷若周芷若周芷若周芷若周芷若爱上了张无忌','周芷若','赵敏') AS out_put;


#二、数学函数

#round 四舍五入

SELECT ROUND(-1.55);

SELECT ROUND(1.55,1);

#ceil 向上取整，返回>=该参数的最小整数

SELECT CEIL(-1.02);


#floor 向下取整，返回<=该参数的最大整数
SELECT FLOOR(-9.99);

#truncate 截断

SELECT TRUNCATE(1.69999,1);

#mod取余

/*
	
	mod(a,b) : a-a/b*b
	
	mod(-10,-3):-10- (-10)/(-3)*(-3) =-1

*/

SELECT MOD(-10,-3);

SELECT 10%3;

#三、日期函数

#now 返回当前系统日期+时间

SELECT NOW();

#curdate 返回当前系统日期，不包含时间
SELECT CURDATE();

#curtime 返回当前时间，不包含日期
SELECT CURTIME();

#可以获取指定的部分，年、月、日、小时、分钟、秒
SELECT YEAR(NOW()) 年;
SELECT YEAR('1998-1-1') 年;

SELECT MONTH('1998-1-1') 月;
SELECT MONTHNAME(NOW()) 月;

#str_to_date 将字符通过指定的格式转换成日期

SELECT STR_TO_DATE('1998-3-2','%Y-%c-%d') AS out_put;

#查询入职日期为1992-4-3的员工信息
SELECT * FROM t_goods WHERE goods_id = '1992-4-3';

SELECT * FROM t_goods WHERE goods_id = STR_TO_DATE('4-3 1992','%c-%d %Y');


#date_format 将日期转换成字符

SELECT DATE_FORMAT(NOW(),'%Y年%m月%d日') AS out_put;

#查询有奖金的员工名和入职日期(xx月/xx日 xx年)

SELECT DATE_FORMAT(NOW(),'%m月/%d日 %y年') 入职日期;


#四、其他函数

SELECT VERSION();
SELECT DATABASE();
SELECT USER();

# 五、流程控制函数

#if函数： if esle 的效果

SELECT IF(10>5,'大','小');









# #### 视频50集