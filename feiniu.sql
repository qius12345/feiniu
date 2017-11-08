CREATE DATABASE fn CHARSET=UTF8;
USE fn;

CREATE TABLE fn_user(
uid INT PRIMARY KEY AUTO_INCREMENT,
uname VARCHAR(20),
upwd VARCHAR(32)
);
INSERT INTO fn_user VALUES(null,'dongdong','123');
INSERT INTO fn_user VALUES(null,'xiaohua','123');
INSERT INTO fn_user VALUES(null,'naicha','123');
INSERT INTO fn_user VALUES(null,'13500000000','abc123');
INSERT INTO fn_user VALUES(null,'13600000000','abcd123');
INSERT INTO fn_user VALUES(null,'13700000000','abcd123');


CREATE TABLE fn_cart(
cid INT PRIMARY KEY AUTO_INCREMENT,
pid INT,
uid INT,
count INT
);
INSERT INTO fn_cart VALUES(null,1,4,2);
INSERT INTO fn_cart VALUES(null,3,4,2);



CREATE TABLE fn_product(
pid INT PRIMARY KEY AUTO_INCREMENT,
pname VARCHAR(200),
price DECIMAL(10,2),
pic  VARCHAR(100)
);
INSERT INTO fn_product VALUES
(1,'不二家 棒棒糖20支装（香醇牛奶+乳酸牛奶）116g/袋',15.00,'images/producting/1.jpg'),
(2,'不二家 棒棒糖20支装（果味）125g/袋',13.5,'images/producting/2.jpg'),
(3,'康元 什锦夹心饼干 1000g/袋',14.9,'images/producting/3.jpg'),
(4,'不二家 棒棒糖8支装（清爽）50g/袋',6.5,'images/producting/4.jpg'),
(5,'康元 什锦夹心饼干 1000g/袋',51.8,'images/producting/5.jpg'),
(6,'不二家 棒棒糖8支装（清爽）50g/袋',6.5,'images/producting/6.jpg'),
(7,'不二家 棒棒糖（草莓牛奶味+芒果牛奶味）8支装46g/袋',6.5,'images/producting/7.jpg'),
(8,'不二家 棒棒糖8支装（清爽）50g/袋',6.5,'images/producting/8.jpg'),
(9,'康元 可可卜 夹心饼干 350g/袋',14.9,'images/producting/9.jpg'),
(10,'康元 巧克力威化饼干 115g/袋',6.5,'images/producting/10.jpg'),
(11,'不二家 牛奶棒棒糖20支装（奶茶味+巧克力味）',15,'images/producting/11.jpg'),
(12,'云间 尤利克清凉软糖 40g/袋',2.5,'images/producting/12.jpg'),
(13,'云间  儿童休闲 水果味软糖  450g/罐',21.5,'images/producting/13.jpg'),
(14,'康元 草莓味威化饼干  115g/袋',6.5,'images/producting/14.jpg'),
(15,'康元 椰子奶油饼干 200g/袋',11.9,'images/producting/15.jpg'),
(16,'康元 椰子奶油饼干 200g/袋',11.9,'images/producting/16.jpg'),
(17,'康元 牛奶威化饼干 115g/袋',11.9,'images/producting/17.jpg'),
(18,'云间 儿童休闲 水果味软糖 350g/罐',11.8,'images/producting/18.jpg'),
(19,'不二家 牛奶棒棒糖20支装(抹茶牛奶味+咖啡牛奶味) 116g/袋',15,'images/producting/19.jpg'),
(20,'云间 上海特产 花生牛轧糖 400g/袋',20.9,'images/producting/20.jpg'),
(21,'云间 奶油话梅糖 158g/袋',8.5,'images/producting/21.jpg'),
(22,'康元 香葱芝麻家庭克力架饼干 640g/袋',24.9,'images/producting/22.jpg'),
(23,'康元 奶味家庭克力架饼干 640g/袋',24.9,'images/producting/23.jpg'),
(24,'康元 家庭克力架饼干 640g/袋',24.9,'images/producting/24.jpg'),
(25,'云间 上海特产 花生牛轧糖 400g/袋',20.9,'images/producting/20.jpg'),
(26,'云间 奶油话梅糖 158g/袋',8.5,'images/producting/21.jpg'),
(27,'康元 香葱芝麻家庭克力架饼干 640g/袋',24.9,'images/producting/22.jpg'),
(28,'康元 奶味家庭克力架饼干 640g/袋',24.9,'images/producting/23.jpg'),
(29,'康元 家庭克力架饼干 640g/袋',24.9,'images/producting/24.jpg'),
(30,'不二家 棒棒糖20支装（香醇牛奶+乳酸牛奶）116g/袋',15.00,'images/producting/1.jpg'),
(31,'不二家 牛奶棒棒糖20支装（奶茶味+巧克力味）',15,'images/producting/11.jpg'),
(32,'云间 尤利克清凉软糖 40g/袋',2.5,'images/producting/12.jpg');
