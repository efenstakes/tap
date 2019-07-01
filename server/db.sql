-- Tap database script

-- if db exists delete it and then re-create it afresh
drop database if exists `tap`;
create database `tap`;


-- keep user data
create table `users` (
   `id` int auto_increment,
   `name` varchar(50) not null unique,
   `passcode` varchar(190) not null,
   `phone` varchar(14) not null,
   `email` varchar(90),
   `city` varchar(50),
   `dob` date not null,
   `verified` boolean default false,
   `joined_on` datetime default NOW(),
   `user_type` enum('SERVICE_PROVIDER', 'USER', 'ADMIN') default 'USER',
   `is_company` boolean default false,
   primary key(id)
);


-- keep SERVICE REQUESTS
create table `service_requests`(
   `id` int auto_increment,
   `service_provider` int not null,
   `made_by` int default null,
   `cost` double(10, 2),
   
   `service` varchar (30) not null,
   `description` longtext,
   `rating` int default null,
   `is_accepted` boolean default false,

   `made_on` datetime default NOW(),
   foreign key(service_provider) references users(id)
   foreign key(made_by) references users(id),
   primary key(id)
);