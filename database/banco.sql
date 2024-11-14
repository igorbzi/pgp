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
);

create table service_type(
  cod_type_service serial,
  type_name varchar(255) not null,
  primary key(cod_type_service)
);

create table service_user(
  cod_user varchar(15) not null,
  cod_service integer not null,
  foreign key(cod_user) references users(cpf),
  foreign key(cod_service) references services(cod_service)
);

UPDATE service_type
SET image_url = 'https://blog.accurate.com.br/wp-content/uploads/2021/08/Dia-da-Informatica.png'
WHERE type_name = 'Informática';


UPDATE service_type
SET image_url = '
https://img.freepik.com/vetores-premium/um-cartaz-de-varios-itens-incluindo-um-robo-e-um-robo_1217673-215440.jpg?semt=ais_hybrid'
WHERE type_name = 'Elétrica';


UPDATE service_type
SET image_url = 'https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-consultoria-estrategica_114360-9084.jpg'
WHERE type_name = 'Consultoria';

UPDATE service_type
SET image_url = 'https://thumbs.dreamstime.com/b/pedreiro-de-desenho-animado-no-canteiro-obras-cartoon-stonemason-builder-lan%C3%A7a-muro-tijolo-composi%C3%A7%C3%A3o-com-um-profissional-173566168.jpg'
WHERE type_name = 'Construção';

UPDATE service_type
SET image_url = 'https://img.freepik.com/vetores-premium/ilustracao-de-jardinagem-de-pessoas-pessoas-regando-as-plantas-e-cavando-o-jardim_94753-2307.jpg'
WHERE type_name = 'Jardinagem';



