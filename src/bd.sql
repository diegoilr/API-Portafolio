CREATE TABLE capacitacion (
    id_capacitacion                  NUMBER NOT NULL,
    fecha_visita                     DATE NOT NULL,
    desc_capacitacion                VARCHAR2(100) 
     NOT NULL, 
    registro_accidente_id_accidente  NUMBER NOT NULL,
    profesional_rut_profesional      NUMBER NOT NULL
);

ALTER TABLE capacitacion ADD CONSTRAINT capacitacion_pk PRIMARY KEY ( id_capacitacion );

CREATE TABLE cliente (
    rut_cliente         NUMBER NOT NULL,
    nombre_cliente      VARCHAR2(50)
     NOT NULL,
    apellido_cliente    VARCHAR2(50)
     NOT NULL,
    tel_cliente         NUMBER,
    nombre_usuario      VARCHAR2(50)
     NOT NULL,
    password_usuario    VARCHAR2(20)
     NOT NULL,
    empresa_id_empresa  NUMBER NOT NULL
);

ALTER TABLE cliente ADD CONSTRAINT cliente_pk PRIMARY KEY ( rut_cliente,
                                                            nombre_usuario );

CREATE TABLE empresa (
    id_empresa      NUMBER NOT NULL,
    nombre_empresa  VARCHAR2(50)
     NOT NULL
);

ALTER TABLE empresa ADD CONSTRAINT empresa_pk PRIMARY KEY ( id_empresa );

CREATE TABLE profesional (
    rut_profesional       NUMBER NOT NULL,
    nombre_profesional    VARCHAR2(50)
     NOT NULL,
    apellido_profesional  VARCHAR2(50)
     NOT NULL,
    tel_profesional       NUMBER
);

ALTER TABLE profesional ADD CONSTRAINT profesional_pk PRIMARY KEY ( rut_profesional );

CREATE TABLE registro_accidente (
    id_accidente            NUMBER NOT NULL,
    descripcion_acc         VARCHAR2(200)
     NOT NULL,
    fecha_accidente         DATE NOT NULL,
    cliente_rut_cliente     NUMBER NOT NULL,
    cliente_nombre_usuario  VARCHAR2(50)
     NOT NULL
);

ALTER TABLE registro_accidente ADD CONSTRAINT registro_accidente_pk PRIMARY KEY ( id_accidente );

ALTER TABLE capacitacion
    ADD CONSTRAINT capacitacion_profesional_fk FOREIGN KEY ( profesional_rut_profesional )
        REFERENCES profesional ( rut_profesional );

ALTER TABLE capacitacion
    ADD CONSTRAINT capacitacion_registro_accidente_fk FOREIGN KEY ( registro_accidente_id_accidente )
        REFERENCES registro_accidente ( id_accidente );

ALTER TABLE cliente
    ADD CONSTRAINT cliente_empresa_fk FOREIGN KEY ( empresa_id_empresa )
        REFERENCES empresa ( id_empresa );

ALTER TABLE registro_accidente
    ADD CONSTRAINT registro_accidente_cliente_fk FOREIGN KEY ( cliente_rut_cliente,
                                                               cliente_nombre_usuario )
        REFERENCES cliente ( rut_cliente,
                             nombre_usuario );





INSERT INTO empresa (id_empresa, nombre_empresa)
VALUES (2, 'Empresa 2');

INSERT INTO cliente (rut_cliente, nombre_cliente, apellido_cliente, tel_cliente, nombre_usuario, password_usuario, empresa_id_empresa)
VALUES (22345678-9, 'Test2','Test2', 12345678,'usuario2', '123', 2);

select * from cliente;

commit;