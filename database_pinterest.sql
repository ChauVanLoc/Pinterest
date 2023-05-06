create database pinterest;
use pinterest;
create table user(
	user_id int primary key auto_increment,
    full_name varchar(100) not null,
    birth_day datetime,
    description varchar(500),
    email varchar(100) not null,
    password varchar(100) not null
);
INSERT INTO `user` (`user_id`, `full_name`, `birth_day`, `description`, `email`, `password`) VALUES
(1, 'Chau Van Loc', NULL, 'My name is Chau Van Loc. I am a web developer', 'locchau.220401@gmail.com', '111111'),
(2, 'Le Tan Hai', NULL, 'Toi ten là Le Tan Hai', 'tanhai@gmail.com', '111111'),
(3, 'Pham Nguyen Thang', NULL, 'Toi la gay', 'thangpham@gmail.com', '111111');
create table image(
	image_id int primary key auto_increment,
    name varchar(100) not null,
    path varchar(2800) not null,
    description varchar(500),
    created timestamp default current_timestamp,
    user_id int,
    foreign key(user_id) references user(user_id)
);
INSERT INTO `image` (`image_id`, `name`, `path`, `description`, `created`, `user_id`) VALUES
(1, 'Cat Fat', 'https://i.pinimg.com/564x/4b/a8/c8/4ba8c871d5e3148e29c39bb16923b220.jpg', 'Here has a cat fat', '2023-04-28 15:29:49', 1),
(2, 'Holiday April 30', 'https://i.pinimg.com/564x/0d/d1/e8/0dd1e8c1bb6688824f8e9dd2fe3a12bf.jpg', 'This is a bigger holiday in my country', '2023-04-28 15:31:57', 2),
(3, 'Luffy with gear five', 'https://i.pinimg.com/564x/57/c2/78/57c27842ef9d374ed4e55dbbfbc86dd7.jpg', 'Luffy\'s gear 5', '2023-04-28 15:33:25', 3),
(4, 'Zoro cool', 'https://i.pinimg.com/736x/be/46/80/be46809c2fc8654535693b9ebc60c7d3.jpg', 'Zoro is very cool', '2023-04-28 15:35:01', 1),
(5, 'background image for smart phone', 'https://i.pinimg.com/564x/87/7a/a1/877aa1c2384356a2756013b2de0f9f40.jpg', NULL, '2023-04-28 15:37:37', 3),
(6, 'Leu leu', 'https://i.pinimg.com/564x/df/a5/a5/dfa5a578af03c658ba31cbf7622d6c11.jpg', 'Cat show emotion', '2023-04-28 15:38:38', 2),
(7, 'Dog\'s smile', 'https://i.pinimg.com/564x/a7/ee/81/a7ee812b5dbcfb1c00a2d841332af1ef.jpg', NULL, '2023-04-28 15:40:05', 1);
create table comment(
	comment_id int primary key auto_increment,
    content varchar(1000) not null,
    created datetime not null default current_timestamp,
    parent_id int,
    user_id int,
    image_id int,
    foreign key (user_id) references user(user_id),
    foreign key (image_id) references image(image_id),
    foreign key (parent_id) references comment(comment_id)
);
INSERT INTO `comment` (`comment_id`, `content`, `created`, `parent_id`, `user_id`, `image_id`) VALUES
(1, 'Wow i love this image', '2023-04-28 22:45:51', NULL, 1, 2),
(2, 'Today I am glad when looking a cute cat\'s smile', '2023-04-28 22:48:00', NULL, 1, 7),
(3, 'This is very nice with my phone', '2023-04-28 22:49:43', NULL, 1, 5),
(4, 'I love image', '2023-04-28 22:50:21', NULL, 2, 4),
(5, 'Oh very cool', '2023-04-28 22:50:47', NULL, 2, 3),
(6, 'haha', '2023-04-28 22:51:07', NULL, 3, 7);
create table img_emotion(
	user_id int,
    image_id int,
    status Enum('like', 'love', 'wow', 'angry', 'sad', 'haha', 'heart') not null,
    created timestamp not null default current_timestamp,
    primary key (user_id, image_id),
    foreign key (user_id) references user(user_id),
    foreign key (image_id) references image(image_id)
);
insert into img_emotion values (2, 1, 'haha', current_timestamp()), (2, 4, 'love', current_timestamp()),
(3, 1, 'haha', current_timestamp()), (2, 5, 'haha', current_timestamp());
create table cmt_emotion(
	user_id int,
    comment_id int,
    status Enum('like', 'love', 'wow', 'angry', 'sad', 'haha', 'heart') not null,
    created timestamp not null default current_timestamp,
    primary key (user_id, comment_id),
    foreign key (user_id) references user(user_id),
    foreign key (comment_id) references comment(comment_id)
);
insert into cmt_emotion values (1, 1, 'like', current_timestamp()), (1, 3, 'like', current_timestamp()),
(1, 5, 'angry', current_timestamp()), (2, 3, 'like', current_timestamp()),
(2, 4, 'haha', current_timestamp()), (3, 3, 'sad', current_timestamp());
create table saved(
	saved_id int primary key auto_increment,
    user_id int,
    image_id int,
    created datetime not null default current_timestamp,
    foreign key (user_id) references user(user_id),
    foreign key (image_id) references image(image_id)
);
insert into saved values (0, 1, 2, current_timestamp()), (0, 2, 4, current_timestamp()),
(0, 3, 2, current_timestamp()), (0, 1, 3, current_timestamp()),
(0, 2, 1, current_timestamp()), (0, 2, 6, current_timestamp());