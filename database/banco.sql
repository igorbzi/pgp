create database pgp;

create table users(
    cpf varchar(15) not null,
    username varchar(255) not null,
    user_password varchar(100) not null,
    user_email varchar(50) unique not null,
    user_phone varchar(15) unique not null,
    user_phone2 varchar(15),
    user_address varchar(255) not null,
    primary key(cpf)
);