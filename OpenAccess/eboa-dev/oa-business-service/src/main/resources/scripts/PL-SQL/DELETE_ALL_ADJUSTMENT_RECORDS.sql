--------------------------------------------------------
--  File created - Monday-April-09-2018   
--------------------------------------------------------
DROP FUNCTION "OPENACCESS"."DELETE_ALL_ADJUSTMENT_RECORDS";
--------------------------------------------------------
--  DDL for Table F_ENERGY_CHARGES
--------------------------------------------------------

  CREATE TABLE "OPENACCESS"."F_ENERGY_CHARGES" 
   (	"ID" VARCHAR2(50 BYTE), 
	"REMARKS" VARCHAR2(100 BYTE), 
	"CHARGE_CODE" VARCHAR2(50 BYTE), 
	"CHARGE_DESC" VARCHAR2(100 BYTE), 
	"CHARGE_TYPE_CODE" VARCHAR2(50 BYTE), 
	"UNIT_CHARGE" VARCHAR2(50 BYTE), 
	"TOTAL_CHARGES" VARCHAR2(50 BYTE), 
	"F_ENERGY_SALE_ORDER_ID" VARCHAR2(50 BYTE), 
	"CREATED_BY" VARCHAR2(100 BYTE), 
	"CREATED_DATE" DATE DEFAULT sysdate, 
	"ENABLED" CHAR(1 BYTE) DEFAULT 'Y', 
	"M_COMPANY_SERVICE_ID" VARCHAR2(50 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table F_ENERGY_LEDGER
--------------------------------------------------------

  CREATE TABLE "OPENACCESS"."F_ENERGY_LEDGER" 
   (	"ID" VARCHAR2(50 BYTE), 
	"M_ORG_ID" VARCHAR2(50 BYTE), 
	"M_COMPANY_ID" VARCHAR2(50 BYTE), 
	"M_COMPANY_SERVICE_ID" VARCHAR2(50 BYTE), 
	"SERVICE_TYPE_CODE" VARCHAR2(50 BYTE), 
	"MONTH" VARCHAR2(50 BYTE), 
	"YEAR" VARCHAR2(50 BYTE), 
	"FROM_DT" DATE, 
	"TO_DT" DATE, 
	"C1" VARCHAR2(50 BYTE), 
	"C2" VARCHAR2(50 BYTE), 
	"C3" VARCHAR2(50 BYTE), 
	"C4" VARCHAR2(50 BYTE), 
	"C5" VARCHAR2(50 BYTE), 
	"LEDGER_DATE" DATE, 
	"ENERGY_IN" VARCHAR2(50 BYTE), 
	"ENERGY_OUT" VARCHAR2(50 BYTE), 
	"NULLIFY" VARCHAR2(50 BYTE), 
	"REMARKS" VARCHAR2(500 BYTE), 
	"F_ENERGY_SALE_ORDER_ID" VARCHAR2(50 BYTE), 
	"D_COMP_NAME" VARCHAR2(100 BYTE), 
	"D_COMP_CODE" VARCHAR2(50 BYTE), 
	"D_COMP_SERV_NUMBER" VARCHAR2(100 BYTE), 
	"D_ORG_NAME" VARCHAR2(100 BYTE), 
	"D_ORG_CODE" VARCHAR2(50 BYTE), 
	"F_ENERGY_SALE_ORDER_LINES_ID" VARCHAR2(100 BYTE), 
	"CREATED_BY" VARCHAR2(100 BYTE), 
	"CREATED_DATE" DATE DEFAULT sysdate, 
	"IS_CAPTIVE" CHAR(1 BYTE), 
	"FUEL_TYPE_CODE" VARCHAR2(50 BYTE), 
	"ENABLED" CHAR(1 BYTE) DEFAULT 'Y'
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table F_ENERGY_SALE_ORDER
--------------------------------------------------------

  CREATE TABLE "OPENACCESS"."F_ENERGY_SALE_ORDER" 
   (	"ID" VARCHAR2(50 BYTE), 
	"T_ENERGY_SALE_ID" VARCHAR2(50 BYTE), 
	"SELLER_COMP_SERV_ID" VARCHAR2(50 BYTE), 
	"SELLER_END_ORG_ID" VARCHAR2(50 BYTE), 
	"MONTH" VARCHAR2(50 BYTE), 
	"YEAR" VARCHAR2(50 BYTE), 
	"INJECTING_VOLTAGE_CODE" VARCHAR2(50 BYTE), 
	"FROM_DT" DATE, 
	"TO_DT" DATE, 
	"LOSS" VARCHAR2(50 BYTE), 
	"MULTIPLE_BUYERS" CHAR(1 BYTE), 
	"USAGE_DETAIL_AVAIL" CHAR(1 BYTE), 
	"SIMPLE_ENERGY_SALE" CHAR(1 BYTE), 
	"TOTAL_C1" VARCHAR2(50 BYTE), 
	"TOTAL_C2" VARCHAR2(50 BYTE), 
	"TOTAL_C3" VARCHAR2(50 BYTE), 
	"TOTAL_C4" VARCHAR2(50 BYTE), 
	"TOTAL_C5" VARCHAR2(50 BYTE), 
	"TOTAL_GEN_UNITS_SOLD" VARCHAR2(50 BYTE), 
	"TOTAL_BC1" VARCHAR2(50 BYTE), 
	"TOTAL_BC2" VARCHAR2(50 BYTE), 
	"TOTAL_BC3" VARCHAR2(50 BYTE), 
	"TOTAL_BC4" VARCHAR2(50 BYTE), 
	"TOTAL_BC5" VARCHAR2(50 BYTE), 
	"TOTAL_BANKING_UNITS_SOLD" VARCHAR2(50 BYTE), 
	"TOTAL_UNITS_SOLD" VARCHAR2(50 BYTE), 
	"D_SELL_COMP_NAME" VARCHAR2(100 BYTE), 
	"D_SELL_COMP_CODE" VARCHAR2(50 BYTE), 
	"D_SELL_COMP_SERV_NUMBER" VARCHAR2(100 BYTE), 
	"D_SELL_ORG_NAME" VARCHAR2(100 BYTE), 
	"D_SELL_ORG_CODE" VARCHAR2(50 BYTE), 
	"TOTAL_GC1" VARCHAR2(50 BYTE), 
	"TOTAL_GC2" VARCHAR2(50 BYTE), 
	"TOTAL_GC3" VARCHAR2(50 BYTE), 
	"TOTAL_GC4" VARCHAR2(50 BYTE), 
	"TOTAL_GC5" VARCHAR2(50 BYTE), 
	"BANKING_SERVICE_ID" VARCHAR2(100 BYTE), 
	"BANKING_SERVICE_NUMBER" VARCHAR2(100 BYTE), 
	"SELLER_COMP_ID" VARCHAR2(100 BYTE), 
	"CREATED_BY" VARCHAR2(100 BYTE), 
	"CREATED_DATE" DATE, 
	"ENABLED" CHAR(1 BYTE) DEFAULT 'Y'
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table F_ENERGY_SALE_ORDER_LINES
--------------------------------------------------------

  CREATE TABLE "OPENACCESS"."F_ENERGY_SALE_ORDER_LINES" 
   (	"ID" VARCHAR2(50 BYTE), 
	"F_ENERGY_SALE_ORDER_ID" VARCHAR2(50 BYTE), 
	"T_ENERGY_SALE_ID" VARCHAR2(50 BYTE), 
	"BUYER_END_ORG_ID" VARCHAR2(50 BYTE), 
	"BUYER_END_SS_ID" VARCHAR2(50 BYTE), 
	"BUYER_COMP_SERV_ID" VARCHAR2(50 BYTE), 
	"C1" VARCHAR2(50 BYTE), 
	"C2" VARCHAR2(50 BYTE), 
	"C3" VARCHAR2(50 BYTE), 
	"C4" VARCHAR2(50 BYTE), 
	"C5" VARCHAR2(50 BYTE), 
	"GEN_UNITS_SOLD" VARCHAR2(50 BYTE), 
	"BC1" VARCHAR2(50 BYTE), 
	"BC2" VARCHAR2(50 BYTE), 
	"BC3" VARCHAR2(50 BYTE), 
	"BC4" VARCHAR2(50 BYTE), 
	"BC5" VARCHAR2(50 BYTE), 
	"BANKING_UNITS_SOLD" VARCHAR2(50 BYTE), 
	"TOTAL_UNITS_SOLD" VARCHAR2(50 BYTE), 
	"D_BUYER_COMP_NAME" VARCHAR2(100 BYTE), 
	"D_BUYER_COMP_CODE" VARCHAR2(50 BYTE), 
	"D_BUYER_COMP_SERV_NAME" VARCHAR2(100 BYTE), 
	"D_BUYER_ORG_NAME" VARCHAR2(100 BYTE), 
	"D_BUYER_ORG_CODE" VARCHAR2(50 BYTE), 
	"D_BUYER_SS_NAME" VARCHAR2(100 BYTE), 
	"GC1" VARCHAR2(50 BYTE), 
	"GC2" VARCHAR2(50 BYTE), 
	"GC3" VARCHAR2(50 BYTE), 
	"GC4" VARCHAR2(50 BYTE), 
	"GC5" VARCHAR2(50 BYTE), 
	"BUYER_COMP_ID" VARCHAR2(100 BYTE), 
	"D_DRAWAL_VOLTAGE_CODE" VARCHAR2(100 BYTE), 
	"CREATED_BY" VARCHAR2(100 BYTE), 
	"CREATED_DATE" DATE DEFAULT sysdate, 
	"ENABLED" CHAR(1 BYTE) DEFAULT 'Y', 
	"UNIT_COST" VARCHAR2(100 BYTE), 
	"TOTAL_AMOUNT_PAYABLE" VARCHAR2(100 BYTE), 
	"TOTAL_AMOUNT_CHARGABLE" VARCHAR2(100 BYTE), 
	"NET_AMOUNT_PAYABLE" VARCHAR2(100 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table IMP_MR_HEADER
--------------------------------------------------------

  CREATE TABLE "OPENACCESS"."IMP_MR_HEADER" 
   (	"ID" VARCHAR2(50 BYTE), 
	"IMPORT_DT" DATE, 
	"FROM_DT" DATE, 
	"TO_DT" DATE, 
	"STATUS" VARCHAR2(50 BYTE), 
	"REMARKS" VARCHAR2(500 BYTE), 
	"ERROR" VARCHAR2(500 BYTE), 
	"MR_SOURCE_CODE" VARCHAR2(50 BYTE), 
	"CREATED_BY" VARCHAR2(50 BYTE), 
	"CREATED_DATE" DATE DEFAULT sysdate, 
	"MODIFIED_BY" VARCHAR2(50 BYTE), 
	"MODIFIED_DATE" DATE, 
	"ENABLED" CHAR(1 BYTE) DEFAULT 'Y', 
	"CODE" VARCHAR2(50 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table IMP_MR_LINES
--------------------------------------------------------

  CREATE TABLE "OPENACCESS"."IMP_MR_LINES" 
   (	"ID" VARCHAR2(50 BYTE), 
	"STATUS_CODE" VARCHAR2(50 BYTE), 
	"REMARKS" VARCHAR2(500 BYTE), 
	"IMP_MR_HEADER_ID" VARCHAR2(50 BYTE), 
	"METER_NO" VARCHAR2(100 BYTE), 
	"MF" VARCHAR2(50 BYTE), 
	"SERVICE_NO" VARCHAR2(50 BYTE), 
	"SYS_DT" VARCHAR2(50 BYTE), 
	"INIT_READING_DT" VARCHAR2(50 BYTE), 
	"FINAL_READING_DT" VARCHAR2(50 BYTE), 
	"IMP_INIT_S1" VARCHAR2(50 BYTE), 
	"IMP_INIT_S2" VARCHAR2(50 BYTE), 
	"IMP_INIT_S3" VARCHAR2(50 BYTE), 
	"IMP_INIT_S4" VARCHAR2(50 BYTE), 
	"IMP_INIT_S5" VARCHAR2(50 BYTE), 
	"IMP_FINAL_S1" VARCHAR2(50 BYTE), 
	"IMP_FINAL_S2" VARCHAR2(50 BYTE), 
	"IMP_FINAL_S3" VARCHAR2(50 BYTE), 
	"IMP_FINAL_S4" VARCHAR2(50 BYTE), 
	"IMP_FINAL_S5" VARCHAR2(50 BYTE), 
	"EXP_INIT_S1" VARCHAR2(50 BYTE), 
	"EXP_INIT_S2" VARCHAR2(50 BYTE), 
	"EXP_INIT_S3" VARCHAR2(50 BYTE), 
	"EXP_INIT_S4" VARCHAR2(50 BYTE), 
	"EXP_INIT_S5" VARCHAR2(50 BYTE), 
	"EXP_FINAL_S1" VARCHAR2(50 BYTE), 
	"EXP_FINAL_S2" VARCHAR2(50 BYTE), 
	"EXP_FINAL_S3" VARCHAR2(50 BYTE), 
	"EXP_FINAL_S4" VARCHAR2(50 BYTE), 
	"EXP_FINAL_S5" VARCHAR2(50 BYTE), 
	"CREATED_BY" VARCHAR2(50 BYTE), 
	"CREATED_DATE" DATE DEFAULT sysdate, 
	"MODIFIED_BY" VARCHAR2(50 BYTE), 
	"MODIFIED_DATE" DATE, 
	"READING_MONTH" VARCHAR2(50 BYTE), 
	"READING_YEAR" VARCHAR2(50 BYTE), 
	"IMP_RKVAH_INIT" VARCHAR2(50 BYTE), 
	"IMP_RKVAH_FINAL" VARCHAR2(50 BYTE), 
	"EXP_RKVAH_INIT" VARCHAR2(50 BYTE), 
	"EXP_RKVAH_FINAL" VARCHAR2(50 BYTE), 
	"IMP_KVAH_INIT" VARCHAR2(50 BYTE), 
	"IMP_KVAH_FINAL" VARCHAR2(50 BYTE), 
	"EXP_KVAH_INIT" VARCHAR2(50 BYTE), 
	"EXP_KVAH_FINAL" VARCHAR2(50 BYTE), 
	"REF_NO" VARCHAR2(100 BYTE), 
	"ENABLED" CHAR(1 BYTE) DEFAULT 'Y'
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table T_ENERGY_SALE
--------------------------------------------------------

  CREATE TABLE "OPENACCESS"."T_ENERGY_SALE" 
   (	"ID" VARCHAR2(50 BYTE), 
	"T_GEN_STMT_ID" VARCHAR2(50 BYTE), 
	"SELLER_COMP_SERV_ID" VARCHAR2(50 BYTE), 
	"SELLER_END_ORG_ID" VARCHAR2(50 BYTE), 
	"MONTH" VARCHAR2(50 BYTE), 
	"YEAR" VARCHAR2(50 BYTE), 
	"INJECTING_VOLTAGE_CODE" VARCHAR2(50 BYTE), 
	"FROM_DT" DATE, 
	"TO_DT" DATE, 
	"LOSS" VARCHAR2(50 BYTE), 
	"MULTIPLE_BUYERS" CHAR(1 BYTE), 
	"USAGE_DETAIL_AVAIL" CHAR(1 BYTE), 
	"SIMPLE_ENERGY_SALE" CHAR(1 BYTE), 
	"C1" VARCHAR2(50 BYTE), 
	"C2" VARCHAR2(50 BYTE), 
	"C3" VARCHAR2(50 BYTE), 
	"C4" VARCHAR2(50 BYTE), 
	"C5" VARCHAR2(50 BYTE), 
	"NET_GENERATION" VARCHAR2(50 BYTE), 
	"NET_ALLOCATION" VARCHAR2(50 BYTE), 
	"STATUS_CODE" VARCHAR2(100 BYTE), 
	"TOTAL_BANK_UNITS_USED" VARCHAR2(100 BYTE), 
	"BC1" VARCHAR2(100 BYTE), 
	"BC2" VARCHAR2(100 BYTE), 
	"BC3" VARCHAR2(100 BYTE), 
	"BC4" VARCHAR2(100 BYTE), 
	"BC5" VARCHAR2(100 BYTE), 
	"GC1" VARCHAR2(50 BYTE), 
	"GC2" VARCHAR2(50 BYTE), 
	"GC3" VARCHAR2(50 BYTE), 
	"GC4" VARCHAR2(50 BYTE), 
	"GC5" VARCHAR2(50 BYTE), 
	"IS_STB" CHAR(1 BYTE), 
	"AVAIL_C1" VARCHAR2(100 BYTE), 
	"AVAIL_C2" VARCHAR2(100 BYTE), 
	"AVAIL_C3" VARCHAR2(100 BYTE), 
	"AVAIL_C4" VARCHAR2(100 BYTE), 
	"AVAIL_C5" VARCHAR2(100 BYTE), 
	"AVAIL_GC1" VARCHAR2(100 BYTE), 
	"AVAIL_GC2" VARCHAR2(100 BYTE), 
	"AVAIL_GC3" VARCHAR2(100 BYTE), 
	"AVAIL_GC4" VARCHAR2(100 BYTE), 
	"AVAIL_GC5" VARCHAR2(100 BYTE), 
	"AVAIL_BC1" VARCHAR2(100 BYTE), 
	"AVAIL_BC2" VARCHAR2(100 BYTE), 
	"AVAIL_BC3" VARCHAR2(100 BYTE), 
	"AVAIL_BC4" VARCHAR2(100 BYTE), 
	"AVAIL_BC5" VARCHAR2(100 BYTE), 
	"CREATED_BY" VARCHAR2(100 BYTE), 
	"CREATED_DATE" DATE DEFAULT sysdate, 
	"M_SUBSTATION_ID" VARCHAR2(100 BYTE), 
	"ENABLED" CHAR(1 BYTE) DEFAULT 'Y', 
	"NET_CHARGES_ALLOCATED" VARCHAR2(50 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table T_ES_CHARGE
--------------------------------------------------------

  CREATE TABLE "OPENACCESS"."T_ES_CHARGE" 
   (	"ID" VARCHAR2(50 BYTE), 
	"T_ENERGY_SALE_ID" VARCHAR2(50 BYTE), 
	"M_COMP_SERV_ID" VARCHAR2(50 BYTE), 
	"CHARGE_CODE" VARCHAR2(50 BYTE), 
	"TOTAL_CHARGE" VARCHAR2(50 BYTE), 
	"CREATED_BY" VARCHAR2(100 BYTE), 
	"CREATED_DATE" DATE DEFAULT sysdate, 
	"ENABLED" CHAR(1 BYTE) DEFAULT 'Y'
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table T_ES_USAGE_DETAIL
--------------------------------------------------------

  CREATE TABLE "OPENACCESS"."T_ES_USAGE_DETAIL" 
   (	"ID" VARCHAR2(50 BYTE), 
	"T_ENERGY_SALE_ID" VARCHAR2(50 BYTE), 
	"BUYER_COMP_SERV_ID" VARCHAR2(50 BYTE), 
	"USAGE_DATE" DATE, 
	"C1" VARCHAR2(50 BYTE), 
	"C2" VARCHAR2(50 BYTE), 
	"C3" VARCHAR2(50 BYTE), 
	"C4" VARCHAR2(50 BYTE), 
	"C5" VARCHAR2(50 BYTE), 
	"TOTAL" VARCHAR2(50 BYTE), 
	"CREATED_DATE" DATE DEFAULT sysdate, 
	"ENABLED" CHAR(1 BYTE) DEFAULT 'Y'
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table T_ES_USAGE_SUMMARY
--------------------------------------------------------

  CREATE TABLE "OPENACCESS"."T_ES_USAGE_SUMMARY" 
   (	"ID" VARCHAR2(50 BYTE), 
	"T_ENERGY_SALE_ID" VARCHAR2(50 BYTE), 
	"BUYER_END_ORG_ID" VARCHAR2(50 BYTE), 
	"BUYER_END_SS_ID" VARCHAR2(50 BYTE), 
	"C1" VARCHAR2(50 BYTE), 
	"C2" VARCHAR2(50 BYTE), 
	"C3" VARCHAR2(50 BYTE), 
	"C4" VARCHAR2(50 BYTE), 
	"C5" VARCHAR2(50 BYTE), 
	"TOTAL" VARCHAR2(50 BYTE), 
	"BUYER_COMP_SERV_ID" VARCHAR2(50 BYTE), 
	"M_TRADE_RELATIONSHIP_ID" VARCHAR2(50 BYTE), 
	"CREATED_DATE" DATE DEFAULT sysdate, 
	"ENABLED" CHAR(1 BYTE) DEFAULT 'Y', 
	"REMARKS" VARCHAR2(100 BYTE), 
	"UNIT_COST" VARCHAR2(100 BYTE), 
	"TOTAL_AMOUNT_PAYABLE" VARCHAR2(100 BYTE), 
	"TOTAL_AMOUNT_CHARGABLE" VARCHAR2(100 BYTE), 
	"NET_AMOUNT_PAYABLE" VARCHAR2(100 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table T_GEN_STMT
--------------------------------------------------------

  CREATE TABLE "OPENACCESS"."T_GEN_STMT" 
   (	"ID" VARCHAR2(50 BYTE), 
	"STATUS_CODE" VARCHAR2(50 BYTE), 
	"REMARKS" VARCHAR2(500 BYTE), 
	"M_COMPANY_METER_ID" VARCHAR2(50 BYTE), 
	"REF_NUMBER" VARCHAR2(100 BYTE), 
	"T_MR_IDS" VARCHAR2(100 BYTE), 
	"MF" VARCHAR2(50 BYTE), 
	"MACHINE_CAPACITY" VARCHAR2(50 BYTE), 
	"STMT_GEN_DATE" DATE, 
	"STMT_MONTH" VARCHAR2(50 BYTE), 
	"STMT_YEAR" VARCHAR2(50 BYTE), 
	"INIT_STMT_DT" DATE, 
	"FINAL_STMT_DT" DATE, 
	"RKVAH_INIT" VARCHAR2(50 BYTE), 
	"RKVAH_FINAL" VARCHAR2(50 BYTE), 
	"RKVAH_DIFF" VARCHAR2(50 BYTE), 
	"RKVAH_UNITS" VARCHAR2(50 BYTE), 
	"KVAH_INIT" VARCHAR2(50 BYTE), 
	"KVAH_FINAL" VARCHAR2(50 BYTE), 
	"KVAH_DIFF" VARCHAR2(50 BYTE), 
	"KVAH_UNITS" VARCHAR2(50 BYTE), 
	"TOTAL_IMPORT_GEN" VARCHAR2(50 BYTE), 
	"TOTAL_EXPORT_GEN" VARCHAR2(50 BYTE), 
	"M_ORG_ID" VARCHAR2(50 BYTE), 
	"M_COMPANY_ID" VARCHAR2(50 BYTE), 
	"M_COMPANY_SERVICE_ID" VARCHAR2(50 BYTE), 
	"DISP_COMPANY_NAME" VARCHAR2(100 BYTE), 
	"DISP_SERVICE_NUMBER" VARCHAR2(50 BYTE), 
	"INJECTING_VOLTAGE_CODE" VARCHAR2(50 BYTE), 
	"DISP_ORG_NAME" VARCHAR2(100 BYTE), 
	"POWER_FACTOR" VARCHAR2(50 BYTE), 
	"NET_GENERATION" VARCHAR2(50 BYTE), 
	"TOTAL_CHARGED_AMOUNT" VARCHAR2(50 BYTE), 
	"C1" VARCHAR2(50 BYTE), 
	"C2" VARCHAR2(50 BYTE), 
	"C3" VARCHAR2(50 BYTE), 
	"C4" VARCHAR2(50 BYTE), 
	"C5" VARCHAR2(50 BYTE), 
	"CREATED_BY" VARCHAR2(100 BYTE), 
	"CREATED_DT" DATE, 
	"MODIFIED_BY" VARCHAR2(100 BYTE), 
	"MODIFIED_DT" DATE, 
	"PENALTY_RATE" VARCHAR2(100 BYTE), 
	"COMMISSION_DATE" DATE, 
	"CREATED_DATE" DATE DEFAULT sysdate, 
	"ENABLED" CHAR(1 BYTE) DEFAULT 'Y', 
	"FILE_NAME" VARCHAR2(50 BYTE), 
	"DISP_FUEL_TYPE_CODE" VARCHAR2(100 BYTE), 
	"DISP_FUEL_TYPE_NAME" VARCHAR2(100 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table T_GEN_STMT_CHARGE
--------------------------------------------------------

  CREATE TABLE "OPENACCESS"."T_GEN_STMT_CHARGE" 
   (	"ID" VARCHAR2(50 BYTE), 
	"REMARKS" VARCHAR2(100 BYTE), 
	"T_GEN_STMT_ID" VARCHAR2(50 BYTE), 
	"CHARGE_CODE" VARCHAR2(50 BYTE), 
	"CHARGE_DESC" VARCHAR2(100 BYTE), 
	"CHARGE_TYPE_CODE" VARCHAR2(50 BYTE), 
	"UNIT_CHARGE" VARCHAR2(50 BYTE), 
	"TOTAL_CHARGES" VARCHAR2(50 BYTE), 
	"CREATED_DATE" DATE DEFAULT sysdate, 
	"ENABLED" CHAR(1 BYTE) DEFAULT 'Y'
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table T_GEN_STMT_SLOT
--------------------------------------------------------

  CREATE TABLE "OPENACCESS"."T_GEN_STMT_SLOT" 
   (	"ID" VARCHAR2(50 BYTE), 
	"REMARKS" VARCHAR2(500 BYTE), 
	"REF_NUMBER" VARCHAR2(100 BYTE), 
	"T_GEN_STMT_ID" VARCHAR2(50 BYTE), 
	"SLOT_CODE" VARCHAR2(50 BYTE), 
	"IMP_INIT" VARCHAR2(50 BYTE), 
	"IMP_FINAL" VARCHAR2(50 BYTE), 
	"IMP_DIFF" VARCHAR2(50 BYTE), 
	"IMP_UNITS" VARCHAR2(50 BYTE), 
	"EXP_INIT" VARCHAR2(50 BYTE), 
	"EXP_FINAL" VARCHAR2(50 BYTE), 
	"EXP_DIFF" VARCHAR2(50 BYTE), 
	"EXP_UNITS" VARCHAR2(50 BYTE), 
	"BANKED_BALANCE" VARCHAR2(50 BYTE), 
	"NET_UNITS" VARCHAR2(100 BYTE), 
	"CREATED_BY" VARCHAR2(100 BYTE), 
	"CREATED_DT" DATE, 
	"CREATED_DATE" DATE DEFAULT sysdate, 
	"ENABLED" CHAR(1 BYTE) DEFAULT 'Y'
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table T_METER_READING_HDR
--------------------------------------------------------

  CREATE TABLE "OPENACCESS"."T_METER_READING_HDR" 
   (	"ID" VARCHAR2(50 BYTE), 
	"M_COMPANY_METER_ID" VARCHAR2(50 BYTE), 
	"STATUS_CODE" VARCHAR2(50 BYTE), 
	"REMARKS" VARCHAR2(500 BYTE), 
	"IMP_BATCH_ID" VARCHAR2(100 BYTE), 
	"MF" VARCHAR2(50 BYTE), 
	"SYS_DT" DATE, 
	"READING_MONTH" VARCHAR2(50 BYTE), 
	"READING_YEAR" VARCHAR2(50 BYTE), 
	"INIT_READING_DT" DATE, 
	"FINAL_READING_DT" DATE, 
	"TOTAL_IMPORT_GEN" VARCHAR2(50 BYTE), 
	"TOTAL_EXPORT_GEN" VARCHAR2(50 BYTE), 
	"CREATED_BY" VARCHAR2(50 BYTE), 
	"CREATED_DATE" DATE DEFAULT sysdate, 
	"MODIFIED_BY" VARCHAR2(50 BYTE), 
	"MODIFIED_DATE" DATE, 
	"RKVAH_DIFF" VARCHAR2(100 BYTE), 
	"RKVAH_UNITS" VARCHAR2(100 BYTE), 
	"KVAH_DIFF" VARCHAR2(100 BYTE), 
	"KVAH_UNITS" VARCHAR2(100 BYTE), 
	"IMP_RKVAH_INIT" VARCHAR2(100 BYTE), 
	"EXP_RKVAH_INIT" VARCHAR2(100 BYTE), 
	"IMP_RKVAH_FINAL" VARCHAR2(100 BYTE), 
	"EXP_RKVAH_FINAL" VARCHAR2(100 BYTE), 
	"IMP_KVAH_INIT" VARCHAR2(100 BYTE), 
	"EXP_KVAH_INIT" VARCHAR2(100 BYTE), 
	"IMP_KVAH_FINAL" VARCHAR2(100 BYTE), 
	"EXP_KVAH_FINAL" VARCHAR2(100 BYTE), 
	"NET_GEN_UNITS" VARCHAR2(100 BYTE), 
	"GS_BATCH_ID" VARCHAR2(100 BYTE), 
	"M_GEN_STMT_ID" VARCHAR2(100 BYTE), 
	"ENABLED" CHAR(1 BYTE) DEFAULT 'Y', 
	"CODE" VARCHAR2(50 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table T_METER_READING_SLOT
--------------------------------------------------------

  CREATE TABLE "OPENACCESS"."T_METER_READING_SLOT" 
   (	"ID" VARCHAR2(50 BYTE), 
	"T_METER_READING_HDR_ID" VARCHAR2(50 BYTE), 
	"REMARKS" VARCHAR2(500 BYTE), 
	"REF_NUMBER" VARCHAR2(100 BYTE), 
	"SLOT_CODE" VARCHAR2(50 BYTE), 
	"IMP_INIT" VARCHAR2(50 BYTE), 
	"IMP_FINAL" VARCHAR2(50 BYTE), 
	"IMP_DIFF" VARCHAR2(50 BYTE), 
	"IMP_UNITS" VARCHAR2(50 BYTE), 
	"EXP_INIT" VARCHAR2(50 BYTE), 
	"EXP_FINAL" VARCHAR2(50 BYTE), 
	"EXP_DIFF" VARCHAR2(50 BYTE), 
	"EXP_UNITS" VARCHAR2(50 BYTE), 
	"CREATED_BY" VARCHAR2(50 BYTE), 
	"CREATED_DATE" DATE DEFAULT sysdate, 
	"MODIFIED_BY" VARCHAR2(50 BYTE), 
	"MODIFIED_DATE" DATE, 
	"NET_UNITS" VARCHAR2(100 BYTE), 
	"ENABLED" CHAR(1 BYTE) DEFAULT 'Y'
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table T_PROCESS_GS
--------------------------------------------------------

  CREATE TABLE "OPENACCESS"."T_PROCESS_GS" 
   (	"ID" VARCHAR2(100 BYTE), 
	"SYS_DT" DATE, 
	"STATUS" VARCHAR2(100 BYTE), 
	"START_DT" DATE, 
	"END_DT" DATE, 
	"REMARKS" VARCHAR2(200 BYTE), 
	"CREATED_DATE" DATE DEFAULT sysdate, 
	"ENABLED" CHAR(1 BYTE) DEFAULT 'Y'
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Function DELETE_ALL_ADJUSTMENT_RECORDS
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "OPENACCESS"."DELETE_ALL_ADJUSTMENT_RECORDS" RETURN VARCHAR2 AS 
BEGIN

DELETE FROM F_ENERGY_CHARGES;
DELETE FROM F_ENERGY_LEDGER;
DELETE FROM F_ENERGY_SALE_ORDER_LINES;
DELETE FROM F_ENERGY_SALE_ORDER;
DELETE FROM T_ES_CHARGE;
DELETE FROM T_ES_USAGE_DETAIL;
DELETE FROM T_ES_USAGE_SUMMARY;
DELETE FROM T_ENERGY_SALE;
DELETE FROM T_GEN_STMT_CHARGE;
DELETE FROM T_GEN_STMT_SLOT;
DELETE FROM T_GEN_STMT;
DELETE FROM T_METER_READING_SLOT;
DELETE FROM T_METER_READING_HDR;
DELETE FROM T_PROCESS_GS;
delete from IMP_MR_LINES;
DELETE  from IMP_MR_HEADER;
COMMIT;

return 'SUCCESS';
END DELETE_ALL_ADJUSTMENT_RECORDS;

/
