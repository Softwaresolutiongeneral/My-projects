Insert into M_CHARGES_MAP (ID,CONTEXT,M_CHARGE_ID,REMARKS,CREATED_DATE,ENABLED,FF,HAS_GST) values ('10','TRANS_INVOICE','2',null,null,'Y','Y','Y');
Insert into M_CHARGES_MAP (ID,CONTEXT,M_CHARGE_ID,REMARKS,CREATED_DATE,ENABLED,FF,HAS_GST) values ('11','TRANS_INVOICE','3',null,null,'Y','Y','N');
Insert into M_CHARGES_MAP (ID,CONTEXT,M_CHARGE_ID,REMARKS,CREATED_DATE,ENABLED,FF,HAS_GST) values ('12','TRANS_INVOICE','5',null,null,'Y','Y','N');
Insert into M_CHARGES_MAP (ID,CONTEXT,M_CHARGE_ID,REMARKS,CREATED_DATE,ENABLED,FF,HAS_GST) values ('13','TRANS_INVOICE','8',null,null,'Y','Y','N');
Insert into M_CHARGES_MAP (ID,CONTEXT,M_CHARGE_ID,REMARKS,CREATED_DATE,ENABLED,FF,HAS_GST) values ('14','TRANS_INVOICE','9',null,null,'Y','Y','N');

INSERT INTO  "M_LOV_HEADER" (CODE, NAME) VALUES ('TRANS_INV_CODE', 'Transco Invoice Code values');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'INV_TYPE_CODE', 'TRANSCO_INVOICE', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'SUPNAME', 'Tamil Nadu Transmission Corporation Ltd.', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'SUPSTATE', 'Tamil Nadu', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'SUPSTATECODE', '33', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'SUPGST', '33AADCT4780AFZA', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'SUPLRADDR1', '144, Anna Salai', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'SUPLRADDR2', null, 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'SUPLIERLOCALITY', 'Chennai', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'SUPLRPINCODE', '600002', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'SUPLRPHONE', null, 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'SUPLREMAIL', 'aee2itoa@tnebnet.org', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'HSNSAC', '998631', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'INV_DESC', 'Support services to electricity, gas and water distribution', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'UQC', 'OTH', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'QUANTITY', '1', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'TRANSACTIONTYPE', 'B2B', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'DOCUMENTTYPE', 'INVOICE', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'REVERSECHRG', 'N', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'VIRTUAL_NO_PREFIX', 'TNTROAC', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'IGST', '0', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'SGST', '0.09', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'CGST', '0.09', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'BANKNAME', 'Not Provided', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'BANKBRANCH', 'Not Provided', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'BANKIFSCCODE', 'Not Provided', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'BANKACCNO', 'Not Provided', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'SUPPAN', 'Not Provided', 'Y');
INSERT INTO  "M_LOV_DETAIL" (M_LOV_CODE, CODE, VALUE_DESC, ENABLED) VALUES ('TRANS_INV_CODE', 'CESS', null, 'Y');
commit;

CREATE OR REPLACE FORCE EDITIONABLE VIEW "V_CHARGE" ("CHARGE_CODE", "CHARGE_TYPE_CODE", "CHARGE_DESC", "UNIT_CHARGE", "FORMULA", "CHARGE_DEFN_REMARKS", "CONTEXT", "FF", "HAS_GST") AS 
  SELECT charge_code, charge_type_code,charge_desc, unit_charge, formula,d.remarks charge_defn_remarks, context,ff , HAS_GST FROM  M_CHARGE_DEFN d, M_CHARGES_MAP m WHERE d.id = m.m_charge_id;


CREATE TABLE "T_INVOICE_HDR" 
   (	"ID" VARCHAR2(50), 
	"M_ORG_ID" VARCHAR2(50), 
	"M_ORG_NAME" VARCHAR2(100), 
	"INVCODE" VARCHAR2(100), 
	"INVOICETYPE" VARCHAR2(100), 
	"COMMDT" VARCHAR2(100), 
	"INVOICEDT" DATE, 
	"LINE_YEAR" VARCHAR2(50), 
	"LINE_MONTH" VARCHAR2(50), 
	"CUSNAME" VARCHAR2(200), 
	"CUSEMAIL" VARCHAR2(200), 
	"CUSPHNO" VARCHAR2(200), 
	"CUSSTATE" VARCHAR2(50), 
	"CUSADDRESS" VARCHAR2(1000), 
	"CUSPIN" VARCHAR2(50), 
	"CUSSTATECODE" VARCHAR2(50), 
	"CUSPAN" VARCHAR2(100), 
	"CUSGST" VARCHAR2(100), 
	"AGMTTYPE" VARCHAR2(100), 
	"M_COMPANY_ID" VARCHAR2(100), 
	"M_COMP_SERV_ID" VARCHAR2(100), 
	"M_COMP_SERV_NO" VARCHAR2(100), 
	"SUPNAME" VARCHAR2(200), 
	"M_SUBSTATION_ID" VARCHAR2(100), 
	"M_SUBSTATION_CODE" VARCHAR2(100), 
	"M_SUBSTATION_NAME" VARCHAR2(200), 
	"EEOPERATION" VARCHAR2(100), 
	"REFINVNO" VARCHAR2(100), 
	"SUPSTATE" VARCHAR2(50), 
	"SUPSTATECODE" VARCHAR2(50), 
	"SUPPAN" VARCHAR2(100), 
	"SUPGST" VARCHAR2(100), 
	"INVFROMDT" DATE, 
	"INVTODT" DATE, 
	"AGMTDT" DATE, 
	"AMENDT" DATE, 
	"AGMTDURATION" VARCHAR2(50), 
	"SUBTOTALFORGST" NUMBER, 
	"SUBTOTALFOROTHERS" NUMBER, 
	"IGSTTAXPER" NUMBER, 
	"CGSTTAXPER" NUMBER, 
	"SGSTTAXPER" NUMBER, 
	"INVAMTINWORDS" VARCHAR2(500), 
	"BANKNAME" VARCHAR2(500), 
	"BANKBRANCH" VARCHAR2(500), 
	"BANKIFSCCODE" VARCHAR2(50), 
	"BANKACCNO" VARCHAR2(50), 
	"CREATEDBY" VARCHAR2(50), 
	"CREATEDDATE" DATE, 
	"MODIFIEDBY" VARCHAR2(50), 
	"MODIFIEDDATE" DATE, 
	"PDFDOCID" VARCHAR2(50), 
	"DOCID" VARCHAR2(50), 
	"INVSTATUS" VARCHAR2(100), 
	"INVCREATEDBY" VARCHAR2(100), 
	"INVCREATEDDATE" DATE, 
	"INVFORWARDDATE" DATE, 
	"INVFORWARDBY" VARCHAR2(50), 
	"INVAPPROVEDDATE" DATE, 
	"INVAPPROVEDBY" VARCHAR2(50), 
	"ZENPOSTEDDATE" DATE, 
	"SGSTTAXAMT" NUMBER, 
	"CGSTTAXAMT" NUMBER, 
	"IGSTTAXAMT" NUMBER, 
	"TOTALTAXAMT" NUMBER, 
	"TOTALINVAMT" NUMBER, 
	"SUBTOTALOTHERS" NUMBER, 
	"EMAILSENTDT" DATE, 
	"ISEMAILSENT" VARCHAR2(50), 
	"EMAILSENTBY" VARCHAR2(50), 
	"QRCODE" VARCHAR2(100), 
	"QRCODERECEIVEDDT" DATE, 
	"SUPLRADDR1" VARCHAR2(30), 
	"SUPLRADDR2" VARCHAR2(30), 
	"SUPLIERLOCALITY" VARCHAR2(20), 
	"SUPLRPINCODE" VARCHAR2(6), 
	"SUPLRPHONE" VARCHAR2(12), 
	"SUPLREMAIL" VARCHAR2(75), 
	"DOCUMENTTYPE" VARCHAR2(10), 
	"HSNSAC" VARCHAR2(10), 
	"DESCRIPTI0N" VARCHAR2(100), 
	"UQC" VARCHAR2(3), 
	"QUANTITY" VARCHAR2(10), 
	"ZENIRN" VARCHAR2(100), 
	"ZENACKNO" VARCHAR2(100), 
	"STATUSCONS" VARCHAR2(20), 
	"TRANSACTIONTYPE" VARCHAR2(5), 
	"CESS" VARCHAR2(5), 
	"REVERSECHRG" CHAR(1), 
	"VIRTUALACCOUNTNO" VARCHAR2(17), 
	"QTRNUMBER" VARCHAR2(100), 
	"QTRRECIVDATE" DATE, 
	"ZENREMARKS" VARCHAR2(4000), 
	"FUEL_TYPE" VARCHAR2(100), 
	"CAPACITY" VARCHAR2(100), 
	"FLOW_TYPE" VARCHAR2(100)
   );

CREATE TABLE T_INVOICE_LINE
   (	"LINEID" NUMBER, 
	"T_INV_HDR_ID" VARCHAR2(80), 
	"ITEMNO" VARCHAR2(80), 
	"CHARGECODE" VARCHAR2(80), 
	"ITEMNAME" VARCHAR2(200), 
	"ITEMCODE" VARCHAR2(80), 
	"ITEMDESC" VARCHAR2(400), 
	"ITEMNOTES" VARCHAR2(400), 
	"ITEMUNITCODE" NUMBER, 
	"ITEMUNITNAME" NUMBER, 
	"ITEMRATE" NUMBER, 
	"ITEMBEFORETAXAMT" NUMBER, 
	"HASGST" VARCHAR2(50), 
	"IGSTAXPER" NUMBER, 
	"CGSTAXPER" NUMBER, 
	"SGSTAXPER" NUMBER, 
	"IGSTAXAMT" NUMBER, 
	"CGSTAXAMT" NUMBER, 
	"SGSTAXAMT" NUMBER, 
	"ITEMTAXAMT" NUMBER, 
	"ITEMTOTALAMT" NUMBER, 
	"ITEMINVHDRID" VARCHAR2(80), 
	"ITEMINVLINEID" VARCHAR2(80), 
	"CREATEDBY" VARCHAR2(80), 
	"CREATEDDATE" DATE, 
	"MODIFIEDBY" VARCHAR2(100), 
	"MODIFIEDDATE" DATE, 
	"QRCODERECEIVEDDT" DATE, 
	"QRCODE" VARCHAR2(100), 
	"ISEMAILSENT" VARCHAR2(50), 
	"EMAILSENTBY" VARCHAR2(100), 
	"EMAILSENTDT" DATE, 
	"ITEMUNITCOUNT" FLOAT(126)
   );
CREATE SEQUENCE  "T_INVOICE_HDR_ID_SEQ"  MINVALUE 10000 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 10000 ;
CREATE SEQUENCE  "T_INVOICE_HDR_CODE_SEQ"  MINVALUE 10000 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 10000 ;
CREATE SEQUENCE  "T_INVOICE_LINE_ID_SEQ"  MINVALUE 10000 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 10000 ;

ALTER TABLE T_GEN_STMT_CHARGE ADD  TOTAL_CHARGES_BAK VARCHAR2(50);
ALTER TABLE M_CHARGES_MAP ADD  HAS_GST VARCHAR2(50);
