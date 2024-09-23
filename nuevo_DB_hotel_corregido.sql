begin;


drop table if exists public.usuario_data_base cascade;
create table usuario_data_base (
id_usuario  serial primary key ,
name varchar not null ,
apellido_1ro varchar not null,
apellido_2do varchar not null
);


drop table if exists public.dependencia cascade;
create table dependencia (
id_dependencia serial primary key ,
nombre varchar ,
direccion varchar not null,
telefono varchar (11)
);

drop table if exists public.local cascade;
create table local ( 
id_local  serial primary key ,
nombre_dpto varchar not null ,
id_dependencia serial references dependencia (id_dependencia)
);

drop table if exists public.maquina cascade;
create table maquina (
id_maquina serial primary key,
id_local int references local (id_local),
nombre_equipo varchar not null,
direccion_ip varchar (15) not null ,
direccion_mac varchar (18)

);

drop table if exists public.roles cascade;
create table roles (
id_rol serial primary key ,
nombre_rol varchar not null 

);


drop table if exists public.cargo cascade;
create table cargo  (
id_cargo serial primary key ,
nombre_cargo varchar not null 
);

drop table if exists public.trabajador cascade;
create table trabajador (
id_trabajador serial primary key,
ci numeric (12) ,
id_local integer references local (id_local ),
id_rol int  references roles (id_rol),
id_cargo integer references cargo (id_cargo ), 
nombre_apellidos  varchar  not null ,
telefono numeric ,
usuario varchar ,
correo varchar 
);

drop table if exists public.servicios cascade;
create table servicios (
id_trabajador int primary key references trabajador ( id_trabajador),
id_maquina int references maquina (id_maquina),
horario varchar not null,
cesn boolean ,
cesi boolean ,
chat_nacional boolean ,
chat_internaconal boolean ,
internet_nacional boolean , 
internet boolean ,
cesn_pcc boolean ,
cesi_pcc boolean ,
chat_nacional_pcc boolean ,
chat_internaconal_pcc boolean ,
internet_nacional_pcc boolean , 
internet_pcc boolean ,
asbse varchar ,
assm varchar ,
fecha_alta date not null ,
fecha_baja date 
);


insert into dependencia ( nombre, direccion) values ( ' Hotel Las Americas ', 'Ferreiro' ) ;

insert into local (nombre_dpto,id_dependencia ) values ( 'Direcciòn ', 1),
('Carpeta',1),('Economìa',1),('Recursos Humanos ',1),
('Servicios Tècnicos ',1),
('Gastronomìa',1),
('Almacèn',1),
('Cocina',1),
('Informatica', 1); 


insert into maquina ( nombre_equipo,id_local,direccion_ip, direccion_mac) values 
('JCARPETA',2,'10.120.209.27','7C:05:07:2A:79:A4'),
('JEFE.CONTAB',3,'10.120.209.60','00:22:15:65:C 0:8D'),
('DIRECTOR',1,'10.120.209.32','00:71:C2:14:7:D5'),
('CARPETA',2,'10.120.209.28','10.120.209.28'),
('CHEFT',8,'10.120.209.40','54:04:A6:40:EA:AA'),
('LOBBYBAR',6,'10.120.209.36','14:DD:A9:7D:5C:EC'),
('STECNICOS',5,'10.120.209.29','D0:17:C 2:96:31:0E'),
('INFORMATICO',9,'10.120.209.9','A8:5E:45:B4:2D:8D'),
('ALMCEN',7,'10.120.209.26','7C:05:07:3A:C 8:20'),
('RRHH',4,'10.120.209.41','60:A4:4C:4F:25:52'),
('ESPEC.CONTAB',3,'10.120.209.101','90:B1:1C:0E:85:4A'),
('ECONOMICO2',3,'10.120.209.104','00:0C:29:0C:85:78');

insert into roles (id_rol,nombre_rol) values 
(1,'Jefe que solicita'),
(2,'Jefe que autoriza '),
(3,'Administrador de Redes '),
(4,'Subordinado');


insert into cargo (nombre_cargo) values ('Director '),
('Jefe de Recursos Humanos' ),
('Jefe de Recepcion'),
('Jefe de Ama de Llaves '),
('Jefe de Economia'),
('Jefe de Servicios Tecnicos' ),
('Jefe de A+B '),
('Encargado de Almacen '),
('Chef de Cocina'),
('Comercial'),
('Administrador de Red'),
('Recepcionistas'),
('Especialista en Contabilidad '),
('Energetica '),
('Dependiente' ),
('Cajero de Gastronomia'),
('Dependiente de Almacen'),
('Aistentes de Cocina '),
('Informàtico '),
(' Especialista en Recursos Humanos ');

insert into trabajador (ci,id_local,id_rol,id_cargo,nombre_apellidos, telefono ,usuario,correo) values
 (73121609805,5,1,6,'ANGEL LUIS  PEREZ  PILAR','+53565784534','ANGEL.PEREZ ','angel.perez@hamericas.cu'),
 (69083112665,5,4,14,' RODISBEL  CRUZ  RIOS','+5359625364','RODISBEL.CRUZ','rodisbelcruz@hamericas.cu'),
 (69031206442,5,4,14,'ALBERT  GONZALES  FRANCO','+5356584512','ALBERT.GONZALES', 'albertgonzales@hamericas.cu'),
( 53051867344,2,1,3, 'Raul Diaz del Maso', 5623654589,'Raul.Diaz ','rauldiaz@hamericas.cu'),
(55110267477,2,4,12, 'Migdalia Pino Ramos',5356984512,'Migdalia.Pino','migdaliapino@hamericas.cu' ),
(58030785764,2,4,12, 'Heriberto Rosales Pacheco',5356497582,'Heriberto.Rosales','heribertorosales@hamericas.cu' ),
(59111308142,2,4,12, 'Carlos Gonzalez Gomez', 5369452156,'Carlos.Gonzalez ','carlosgonzale@hamericas.cu'),
(61032578969,2,4,12,'Nelson Carmenate Marquez',5369845123,'Nelson.Carmenate','nelsoncarmenate@hamericas.cu'),
(64112380123,2,4,12, 'Pedro Gonzalez del Foyo',5369845126,'Pedro.Gonzalez','pedrogonzales@hamericas.cu' ),
(65101788353,2,4,12,'Daysi Bonne Torres',5356984512,'Daysi.Bonne ','daysibonne@hamericas.cu' ),
(66020578495,2,4,12,'Lidice Romero Amondaray',5356984512,'Lidice.Romero','lidiceromero@hamericas.cu' ),
(66072176555,8,1,9, 'Carmen Medina Ruiz', 5359456874 ,'Carmen.Medina','carmenmedina@hamericas.cu'),
(67080376423,8,4,18, 'Luis Riestra Gonzalez',5364216985,'Luis.Riestra ','luisriestra@hamericas.cu' ),
(68111946586,8,4,18, 'Oscar Garcia Fernandez',5369421356,'Oscar.Garcia','oscargarcia@hamericas.cu'),
(73021888477,8,4,18, 'Yanisleydis Morales Chirino',5352546894,'Yanisleydis.Morales','yanisleydimorales@hamericas.cu' ),
(74072876533,8,4,18, 'Laura Cuza Barrios',5359642158,'Laura Cuza','lauracruza@hamericas.cu'),
(75052111793,4,1,2, 'LILIAN  RAMIREZ  AGUILAR',536265489545,'LILIAN.RAMIREZ','lilianramirez@hamericas.cu'),
(80041823411,4,4,20, 'Yanisley Morales Chirino',552124896,'Yanisley.Rosales','yanileyrosales@hamericas.cu'),
(63101613852 , 4,4,20, 'Maura Gonzales Barrios',5359568545,'Maura.Gonzales','mauragonzales@hamericas.cu'),
(65112107846, 4,4,20,'Magaly Espinel Freire',5364215648,'Magaly.Espinel ','magalyespinel@hamericas.cu'),
(77101324481,3,1,5,'Marcia Sanchez Cano',5364236325,'Marcia.Sanchez','mariasanchez@hamericas.cu'),
(71082107061,3,4,13,'Juana Garcia Rosales',5356894712,'Juana.Garcia','juanagarcia@hamericas.cu'),
(68112227821, 3,4,13,'Carlos Mesa Fermin',5369423156,'Carlos.Mesa','carlosmesa@hamericas.cu'),
(75082011573,7,1,9,'IRIS MERCEDES  REGUIFEROS  SIERRA',5369636254,'IRIS.REGUIFEROS','irisreguiferos@hamericas.cu'),
(68040728177,7,4,17,'LILIAN  RAMIREZ  AGUILAR',536265489545,'LILIAN.RAMIREZ','lilianramirez@hamericas.cu'),
(74121209998,6,1,7,'LUZ MARIA  LARDUE  CARBONELL',5365645623,'LUZ.LARDUE ','luzlardue@hamericas.cu'),
(70081428334,6,4,16,'ODALYS  MARTINEZ  PEREZ',53648945142,'ODALYS.MARTINEZ','odalismartinez@hamericas.cu'),
(66022309579,6,4,16,'RICCIS  CORELLA  HERRERA',5366985124,'RICCIS.CORELLA','riccisorella@hamericas.cu'),
(95120547456,6,4,16,'TAMARA ESTHER  DONATIEN  CASTILLO',53636549789,'TAMARA.DONATIEN','tamaradonatien@hamericas.cu'),
(76082211679,6,4,15,'YOIKA  MASSO  CARDINES',5368656214,'YOIKA.MASSO','yoikamasso@hamericas.cu'),
(96091402411,6,4,15,'LIANET MARITZA  BARBADOS  BORY',5364125689,'LIANET.BARBADOS','lianetbarbados@hamericas.cu'),
(89030442653,6,4,15,'ISANDRA  OTERO  CALZADILLA',5368564592,'ISANDRA.OTERO ','isandraortero@hamericas.cu'),
(78021431971,6,4,15,'ADRIANNE  FERNANDEZ  DEL RIO',5354789561,'ADRIANNE.FERNANDEZ','adriannefernandez@hamericas.cu'),
(69111512824,6,4,15,'ARNOLIS   PARDO  MARQUEZ',5367456985,'ARNOLIS.PARDO','arnolispatrdo@hamericas.cu'),
(70042208454,6,4,15,'CANDIDA  ARGUELLES  ORTEGA',5364598623,'CANDIDA.ARGUELLES','candidaarguelles@hamericas.cu'),
(53041310267,9,3,19,' JUAN CARLOS  CALUNGA  CORREOSO',5359864512,'JUAN.CALUNGA','juancalunga@hamericas.cu'),
(90110846037,1,2,1,'AVIS ROSA  LELIEBRE  LA O',5354698541,'AVIS.LELIEBRE','avisleliebre@hamericas.cu');


insert into servicios (id_trabajador,id_maquina,horario,cesn,cesi,chat_nacional,chat_internaconal,internet_nacional,internet,
cesn_pcc,cesi_pcc,chat_nacional_pcc,chat_internaconal_pcc ,internet_nacional_pcc, 
internet_pcc,fecha_alta ) values (2,4,'24hours',true ,true,false,false,true,true,true,true,false,false,false,false,now()),
(3,7,'24hourrs',false,false,false,false,true,true,false,false,false,false,false,false,now()),
(5,4,'24hourrs',false,false,false,false,true,true,false,false,false,false,false,false,now()),
(6,4,'24hourrs',false,false,false,false,true,true,false,false,false,false,false,false,now()),
(7,4,'24hourrs',false,false,false,false,true,true,false,false,false,false,false,false,now()),
(8,4,'24hourrs',false,false,false,false,true,true,false,false,false,false,false,false,now()),
(9,4,'24hourrs',false,false,false,false,true,true,false,false,false,false,false,false,now()),
(10,4,'24hourrs',false,false,false,false,true,true,false,false,false,false,false,false,now()),
(11,4,'24hourrs',false,false,false,false,true,true,false,false,false,false,false,false,now()),
(13,5,'24hourrs',false,false,false,false,true,true,false,false,false,false,false,false,now()),
(14,5,'24hourrs',false,false,false,false,true,true,false,false,false,false,false,false,now()),
(15,5,'24hourrs',false,false,false,false,true,true,false,false,false,false,false,false,now()),
(16,5,'24hourrs',false,false,false,false,true,true,false,false,false,false,false,false,now())

;

commit;