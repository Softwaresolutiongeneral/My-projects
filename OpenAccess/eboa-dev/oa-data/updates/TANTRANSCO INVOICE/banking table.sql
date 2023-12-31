-- OPENACCESS.T_TRANSCO_BANKING definition

CREATE TABLE "OPENACCESS"."T_TRANSCO_BANKING" 
   (	"BENEFICIARY_ACCOUNT_NUMBER" VARCHAR2(100), 
	"TRANSACTION_DATE" DATE, 
	"TRANSACTION_TIME" VARCHAR2(100), 
	"VALUE_DATE" DATE, 
	"VIRTUAL_ACCOUNT_NO" VARCHAR2(100), 
	"PROPOSED_ACCOUNT_TITLE" VARCHAR2(100), 
	"SENDER_NAME" VARCHAR2(100), 
	"REMITTER_NAME_RBI" VARCHAR2(100), 
	"SENDER_ACCOUNT_NUMBER" VARCHAR2(100), 
	"SENDER_BRANCH_IFSC" VARCHAR2(100), 
	"UTR" VARCHAR2(100), 
	"TRANSACTION_TYPE" VARCHAR2(100), 
	"DEBIT_CREDIT" VARCHAR2(100), 
	"TRAN_AMT" VARCHAR2(100), 
	"BILL_MONTH" VARCHAR2(100), 
	"BILL_YEAR" VARCHAR2(100), 
	"RECEIPT_NO" VARCHAR2(100), 
	"UPDATED_TIME" TIMESTAMP (6) DEFAULT systimestamp, 
	"BANKTRANSACTIONID" VARCHAR2(100), 
	"BANKNAME" VARCHAR2(100)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
