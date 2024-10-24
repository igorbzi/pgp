create database pgp;

create table users(
  cpf varchar(15) not null,
  username varchar(255) not null,
  user_password varchar(100) not null,
  user_email varchar(50) unique not null,
  user_phone varchar(15) unique not null,
  user_phone2 varchar(15),
  user_address varchar(255) not null,
  user_type smallint not null,
  primary key(cpf)
);

create table services(
  cod_service serial,
  service_name varchar(255) not null,
  service_price numeric(15, 2) not null,
  service_type integer not null,
  service_description varchar(600),
  material_disp boolean,
  primary key(cod_service),
  foreign key(service_type) references service_type(cod_type_service)
)

create table service_type(
  cod_type_service serial,
  type_name varchar(255) not null,
  primary key(cod_type_service)
)
