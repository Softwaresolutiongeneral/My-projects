--T_ACTIVITY_LOG_SEQ

   CREATE SEQUENCE "T_ACTIVITY_LOG_SEQ"  MINVALUE 0 MAXVALUE 9999999999999 INCREMENT BY 1 START WITH 53014126 NOCACHE  ORDER  CYCLE  NOKEEP  NOSCALE  GLOBAL ;

--T_SLDC_NOC_SEQ

   CREATE SEQUENCE "T_SLDC_NOC_SEQ"  MINVALUE 1 MAXVALUE 99999999999 INCREMENT BY 1 START WITH 148 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE  GLOBAL ;

--EXT_SAMAST_APPLN_SEQ

   CREATE SEQUENCE "EXT_SAMAST_APPLN_SEQ"  MINVALUE 1 MAXVALUE 99999999999 INCREMENT BY 1 START WITH 221 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE  GLOBAL ;

--T_SLDC_NOC_LINE_SEQ

   CREATE SEQUENCE "T_SLDC_NOC_LINE_SEQ"  MINVALUE 1 MAXVALUE 99999999999 INCREMENT BY 1 START WITH 61 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE  GLOBAL ;

--T_SLDC_NOC_CODE_SEQ

   CREATE SEQUENCE "T_SLDC_NOC_CODE_SEQ"  MINVALUE 1 MAXVALUE 99999999999 INCREMENT BY 1 START WITH 148 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE  GLOBAL ;

--EXT_SAMAST_APPLN_APPROVAL_SEQ

   CREATE SEQUENCE "EXT_SAMAST_APPLN_APPROVAL_SEQ"  MINVALUE 1 MAXVALUE 99999999999 INCREMENT BY 1 START WITH 121 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE  GLOBAL ;

--L_IMP_SAMAST_APP_SEQ

   CREATE SEQUENCE "L_IMP_SAMAST_APP_SEQ"  MINVALUE 1 MAXVALUE 99999999999 INCREMENT BY 1 START WITH 121 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE  GLOBAL ;

--INT_SAMAST_APPLN_SEQ

  CREATE SEQUENCE "INT_SAMAST_APPLN_SEQ"  MINVALUE 1 MAXVALUE 99999999999 INCREMENT BY 1 START WITH 121 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE  GLOBAL ;


--EXT_SAMAST_APPLN_APPROVAL

CREATE TABLE "EXT_SAMAST_APPLN_APPROVAL" 
   (	"ID" NUMBER(10,0) DEFAULT "INT_SAMAST_APPLN_SEQ"."NEXTVAL" NOT NULL ENABLE, 
	"APP_ID" NUMBER(10,0), 
	"APPL_REF_NO" VARCHAR2(366 BYTE), 
	"APPL_NO" VARCHAR2(50 BYTE), 
	"APPL_DATE" DATE, 
	"APP_CATEGORY" VARCHAR2(100 BYTE), 
	"CUSTOMER_NAME" VARCHAR2(500 BYTE), 
	"ENTITY_INJ" VARCHAR2(150 BYTE), 
	"ENTITY_INJ_EDC" VARCHAR2(250 BYTE), 
	"ENTITY_DRL" VARCHAR2(150 BYTE), 
	"ENTITY_DRL_EDC" VARCHAR2(250 BYTE), 
	"PERIOD_START_DATE" DATE, 
	"PERIOD_END_DATE" DATE, 
	"QUANTUM" FLOAT(126), 
	"CATEGORY1" VARCHAR2(100 BYTE), 
	"CATEGORY2" VARCHAR2(100 BYTE), 
	"EOR_REG_TYPE" VARCHAR2(128 BYTE), 
	"EOS_GC_APPROVAL_NUMBER" VARCHAR2(100 BYTE), 
	"EOS_FEEDER_NAME_SELLER" VARCHAR2(250 BYTE), 
	"EOS_VOL_LVL_FEEDER" VARCHAR2(20 BYTE), 
	"EOS_INJ_SUBSTATION" VARCHAR2(250 BYTE), 
	"EOS_VOL_LVL_SUBSTATION" VARCHAR2(20 BYTE), 
	"EOC_LOSS_PER" FLOAT(126), 
	"EVACUATION_CAPACITY" FLOAT(126), 
	"EOS_UTIL_INJ_EMBED" VARCHAR2(250 BYTE), 
	"EOS_UTIL_INJ_EMBED_LABEL" VARCHAR2(50 BYTE), 
	"EOB_UTIL_DRAWAL_EMBED_LABEL" VARCHAR2(50 BYTE), 
	"EOB_UTIL_DRA_EMBED" VARCHAR2(250 BYTE), 
	"EOB_HT_CONSUMER_NUMBER" VARCHAR2(100 BYTE), 
	"EOB_FEEDER_NAME_BUYER" VARCHAR2(250 BYTE), 
	"EOB_VOL_LVL_FEEDER" VARCHAR2(20 BYTE), 
	"EOB_DRA_SUBSTATION" VARCHAR2(250 BYTE), 
	"EOB_VOL_LVL_SUBSTATION" VARCHAR2(20 BYTE), 
	"EOB_DRAWAL_LIMIT" FLOAT(126), 
	"EOB_BUYER_TYPE" VARCHAR2(20 BYTE), 
	"EOI_REG_NAME" VARCHAR2(126 BYTE), 
	"EOI_REG_ADDRESS" VARCHAR2(1000 BYTE), 
	"EOI_REG_MOBILE1_NO" VARCHAR2(128 BYTE), 
	"EDC_STATUS" VARCHAR2(20 BYTE), 
	"APPLICATION_STATUS" VARCHAR2(20 BYTE), 
	"APP_TYPE" VARCHAR2(20 BYTE), 
	"BATCH_KEY" VARCHAR2(250 BYTE), 
	"IS_CLEAN" VARCHAR2(1 BYTE), 
	"INPUT_REMARKS" VARCHAR2(250 BYTE), 
	"ENABLED" VARCHAR2(1 BYTE) DEFAULT 'Y', 
	"CREATED_BY" VARCHAR2(100 BYTE), 
	"CREATED_DT" DATE DEFAULT sysdate, 
	"MODIFIED_BY" VARCHAR2(100 BYTE), 
	"MODIFIED_DT" DATE, 
	 PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;


--EXT_SAMAST_APPLN


  CREATE TABLE "EXT_SAMAST_APPLN" 
   (	"ID" NUMBER(10,0) DEFAULT "EXT_SAMAST_APPLN_SEQ"."NEXTVAL" NOT NULL ENABLE, 
	"APP_ID" NUMBER(10,0), 
	"APPL_REF_NO" VARCHAR2(366 BYTE), 
	"APPL_NO" VARCHAR2(50 BYTE), 
	"APPL_DATE" DATE, 
	"APP_CATEGORY" VARCHAR2(100 BYTE), 
	"CUSTOMER_NAME" VARCHAR2(500 BYTE), 
	"ENTITY_INJ" VARCHAR2(150 BYTE), 
	"ENTITY_INJ_EDC" VARCHAR2(250 BYTE), 
	"ENTITY_DRL" VARCHAR2(150 BYTE), 
	"ENTITY_DRL_EDC" VARCHAR2(250 BYTE), 
	"PERIOD_START_DATE" DATE, 
	"PERIOD_END_DATE" DATE, 
	"QUANTUM" FLOAT(126), 
	"CATEGORY1" VARCHAR2(100 BYTE), 
	"CATEGORY2" VARCHAR2(100 BYTE), 
	"EOR_REG_TYPE" VARCHAR2(128 BYTE), 
	"EOS_GC_APPROVAL_NUMBER" VARCHAR2(100 BYTE), 
	"EOS_FEEDER_NAME_SELLER" VARCHAR2(250 BYTE), 
	"EOS_VOL_LVL_FEEDER" VARCHAR2(20 BYTE), 
	"EOS_INJ_SUBSTATION" VARCHAR2(250 BYTE), 
	"EOS_VOL_LVL_SUBSTATION" VARCHAR2(20 BYTE), 
	"EOC_LOSS_PER" FLOAT(126), 
	"EVACUATION_CAPACITY" FLOAT(126), 
	"EOS_UTIL_INJ_EMBED" VARCHAR2(250 BYTE), 
	"EOS_UTIL_INJ_EMBED_LABEL" VARCHAR2(50 BYTE), 
	"EOB_UTIL_DRAWAL_EMBED_LABEL" VARCHAR2(50 BYTE), 
	"EOB_UTIL_DRA_EMBED" VARCHAR2(250 BYTE), 
	"EOB_HT_CONSUMER_NUMBER" VARCHAR2(100 BYTE), 
	"EOB_FEEDER_NAME_BUYER" VARCHAR2(250 BYTE), 
	"EOB_VOL_LVL_FEEDER" VARCHAR2(20 BYTE), 
	"EOB_DRA_SUBSTATION" VARCHAR2(250 BYTE), 
	"EOB_VOL_LVL_SUBSTATION" VARCHAR2(20 BYTE), 
	"EOB_DRAWAL_LIMIT" FLOAT(126), 
	"EOB_BUYER_TYPE" VARCHAR2(20 BYTE), 
	"EOI_REG_NAME" VARCHAR2(126 BYTE), 
	"EOI_REG_ADDRESS" VARCHAR2(1000 BYTE), 
	"EOI_REG_MOBILE1_NO" VARCHAR2(128 BYTE), 
	"EDC_STATUS" VARCHAR2(20 BYTE), 
	"APPLICATION_STATUS" VARCHAR2(20 BYTE), 
	"APP_TYPE" VARCHAR2(20 BYTE), 
	"BATCH_KEY" VARCHAR2(250 BYTE), 
	"IS_CLEAN" VARCHAR2(1 BYTE), 
	"INPUT_REMARKS" VARCHAR2(250 BYTE), 
	"ENABLED" VARCHAR2(1 BYTE) DEFAULT 'Y', 
	"CREATED_BY" VARCHAR2(100 BYTE), 
	"CREATED_DT" DATE DEFAULT sysdate, 
	"MODIFIED_BY" VARCHAR2(100 BYTE), 
	"MODIFIED_DT" DATE, 
	"SELLER_NOC_STATUS" VARCHAR2(100 BYTE), 
	"BUYER_NOC_STATUS" VARCHAR2(100 BYTE), 
	"SELLER_NOC_QUANTUM" FLOAT(126), 
	"BUYER_NOC_QUANTUM" FLOAT(126), 
	"SELLER_NOC_START_DT" DATE, 
	"SELLER_NOC_END_DT" DATE, 
	"BUYER_NOC_START_DT" DATE, 
	"BUYER_NOC_END_DT" DATE, 
	 CONSTRAINT "EXT_SAMAST_APPLN_PK" PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;

--L_IMP_SAMAST_APP


  CREATE TABLE "L_IMP_SAMAST_APP" 
   (	"ID" NUMBER DEFAULT "L_IMP_SAMAST_APP_SEQ"."NEXTVAL" NOT NULL ENABLE, 
	"BATCH_KEY" VARCHAR2(250 BYTE), 
	"NO_OF_RECORDS" VARCHAR2(50 BYTE), 
	"APP_TYPE" VARCHAR2(50 BYTE), 
	"FROM_DT" DATE, 
	"TO_DT" DATE, 
	"ENABLED" VARCHAR2(1 BYTE) DEFAULT 'Y', 
	"CREATED_BY" VARCHAR2(100 BYTE), 
	"CREATED_DT" DATE DEFAULT sysdate, 
	"MODIFIED_BY" VARCHAR2(100 BYTE), 
	"MODIFIED_DT" DATE, 
	"REMARKS" VARCHAR2(250 BYTE), 
	 PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;

--INT_SAMAST_APPLN


  CREATE TABLE "INT_SAMAST_APPLN" 
   (	"ID" NUMBER(10,0) DEFAULT "INT_SAMAST_APPLN_SEQ"."NEXTVAL" NOT NULL ENABLE, 
	"APP_ID" NUMBER(10,0), 
	"APPL_REF_NO" VARCHAR2(366 BYTE), 
	"APPL_NO" VARCHAR2(50 BYTE), 
	"APPL_DATE" DATE, 
	"APP_CATEGORY" VARCHAR2(100 BYTE), 
	"CUSTOMER_NAME" VARCHAR2(500 BYTE), 
	"ENTITY_INJ" VARCHAR2(150 BYTE), 
	"ENTITY_INJ_EDC" VARCHAR2(250 BYTE), 
	"ENTITY_DRL" VARCHAR2(150 BYTE), 
	"ENTITY_DRL_EDC" VARCHAR2(250 BYTE), 
	"PERIOD_START_DATE" DATE, 
	"PERIOD_END_DATE" DATE, 
	"QUANTUM" FLOAT(126), 
	"CATEGORY1" VARCHAR2(100 BYTE), 
	"CATEGORY2" VARCHAR2(100 BYTE), 
	"EOR_REG_TYPE" VARCHAR2(128 BYTE), 
	"EOS_GC_APPROVAL_NUMBER" VARCHAR2(100 BYTE), 
	"EOS_FEEDER_NAME_SELLER" VARCHAR2(250 BYTE), 
	"EOS_VOL_LVL_FEEDER" VARCHAR2(20 BYTE), 
	"EOS_INJ_SUBSTATION" VARCHAR2(250 BYTE), 
	"EOS_VOL_LVL_SUBSTATION" VARCHAR2(20 BYTE), 
	"EOC_LOSS_PER" FLOAT(126), 
	"EVACUATION_CAPACITY" FLOAT(126), 
	"EOS_UTIL_INJ_EMBED" VARCHAR2(250 BYTE), 
	"EOS_UTIL_INJ_EMBED_LABEL" VARCHAR2(50 BYTE), 
	"EOB_UTIL_DRAWAL_EMBED_LABEL" VARCHAR2(50 BYTE), 
	"EOB_UTIL_DRA_EMBED" VARCHAR2(250 BYTE), 
	"EOB_HT_CONSUMER_NUMBER" VARCHAR2(100 BYTE), 
	"EOB_FEEDER_NAME_BUYER" VARCHAR2(250 BYTE), 
	"EOB_VOL_LVL_FEEDER" VARCHAR2(20 BYTE), 
	"EOB_DRA_SUBSTATION" VARCHAR2(250 BYTE), 
	"EOB_VOL_LVL_SUBSTATION" VARCHAR2(20 BYTE), 
	"EOB_DRAWAL_LIMIT" FLOAT(126), 
	"EOB_BUYER_TYPE" VARCHAR2(20 BYTE), 
	"EOI_REG_NAME" VARCHAR2(126 BYTE), 
	"EOI_REG_ADDRESS" VARCHAR2(1000 BYTE), 
	"EOI_REG_MOBILE1_NO" VARCHAR2(128 BYTE), 
	"EDC_STATUS" VARCHAR2(20 BYTE), 
	"APPLICATION_STATUS" VARCHAR2(20 BYTE), 
	"APP_TYPE" VARCHAR2(20 BYTE), 
	"BATCH_KEY" VARCHAR2(250 BYTE), 
	"IS_CLEAN" VARCHAR2(1 BYTE), 
	"INPUT_REMARKS" VARCHAR2(250 BYTE), 
	"ENABLED" VARCHAR2(1 BYTE) DEFAULT 'Y', 
	"CREATED_BY" VARCHAR2(100 BYTE), 
	"CREATED_DT" DATE DEFAULT sysdate, 
	"MODIFIED_BY" VARCHAR2(100 BYTE), 
	"MODIFIED_DT" DATE, 
	"PROCESS_REMARKS" VARCHAR2(2000 BYTE), 
	 PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;

--T_SLDC_NOC


  CREATE TABLE "T_SLDC_NOC" 
   (	"ID" VARCHAR2(100 BYTE) DEFAULT TO_CHAR("T_SLDC_NOC_SEQ"."NEXTVAL") NOT NULL ENABLE, 
	"NOC_PURPOSE" VARCHAR2(50 BYTE), 
	"NOC_CODE" VARCHAR2(50 BYTE), 
	"STATUS" VARCHAR2(50 BYTE), 
	"APPLIED_NO" VARCHAR2(50 BYTE), 
	"APPLIED_DT" DATE, 
	"PERIOD_START_DATE" DATE, 
	"PERIOD_END_DATE" DATE, 
	"COMP_SERV_NO" VARCHAR2(50 BYTE), 
	"COMP_NAME" VARCHAR2(50 BYTE), 
	"PLANT_ADR" VARCHAR2(200 BYTE), 
	"COMMS_ADR" VARCHAR2(200 BYTE), 
	"APP_CATEGORY" VARCHAR2(200 BYTE), 
	"INSTALL_CAP_PLANT" VARCHAR2(50 BYTE), 
	"INTL_AUXILARY" VARCHAR2(50 BYTE), 
	"INTL_INHOUSE_CONSUMP" VARCHAR2(50 BYTE), 
	"EX_BUS_AVAL" VARCHAR2(50 BYTE), 
	"APPROV_PWR_EVAC_CAP" VARCHAR2(50 BYTE), 
	"FUEL_TYPE" VARCHAR2(50 BYTE), 
	"FEEDER_WITH_VOLT_LEVEL" VARCHAR2(50 BYTE), 
	"SUBSTATION_WITH_VOLT_LEVEL" VARCHAR2(50 BYTE), 
	"GRID_APPROVAL_DT" DATE, 
	"COD_DT" VARCHAR2(50 BYTE), 
	"IS_ABT_AND_AMR" VARCHAR2(50 BYTE), 
	"IS_METER_DOWNLOAD_AND_INSTALL" VARCHAR2(50 BYTE), 
	"ABY_METER_NAME" VARCHAR2(50 BYTE), 
	"METER_MF_NAME" VARCHAR2(50 BYTE), 
	"CT_RATIO_AND_CLASS_ACC" VARCHAR2(50 BYTE), 
	"PT_RATIO_AND_CLASS_ACC" VARCHAR2(50 BYTE), 
	"TNEB_TANGEDCO_THROW_PPA" VARCHAR2(50 BYTE), 
	"IS_DATA_MONITORING_WITH_SLDC" VARCHAR2(50 BYTE), 
	"IS_COMMIT_TO_TANGEDCO" VARCHAR2(50 BYTE), 
	"CC_ARREARS_AVAL" VARCHAR2(50 BYTE), 
	"IS_COMPLY_WITH_OA_REQUIRMENT" VARCHAR2(50 BYTE), 
	"TECH_REMARK" VARCHAR2(50 BYTE), 
	"LEGAL_REMARK" VARCHAR2(50 BYTE), 
	"COMM_REMARK" VARCHAR2(50 BYTE), 
	"IS_EXISTING" VARCHAR2(50 BYTE), 
	"TARRIF" VARCHAR2(50 BYTE), 
	"CNTRCT_DEMAND" VARCHAR2(50 BYTE), 
	"REGION" VARCHAR2(50 BYTE), 
	"EDC" VARCHAR2(50 BYTE), 
	"EDC_ID" VARCHAR2(50 BYTE), 
	"SECTION" VARCHAR2(50 BYTE), 
	"EXTG_TOTAL_COMMIT" VARCHAR2(50 BYTE), 
	"CONN_FEEDER_AND_VOLT_LEVEL" VARCHAR2(50 BYTE), 
	"CONN_SUBSTATION_AND_VOLT_LEVEL" VARCHAR2(50 BYTE), 
	"EXISTING_KV" VARCHAR2(50 BYTE), 
	"EXISTING_FEEDER_TYPE" VARCHAR2(50 BYTE), 
	"NEW_TOTAL_COMMIT" VARCHAR2(50 BYTE), 
	"ELIGIBLE_QUANTUM_IN_WV" VARCHAR2(50 BYTE), 
	"IS_HT_CON_PERMIT_FOR_OA" VARCHAR2(50 BYTE), 
	"DIR_REMARK" VARCHAR2(300 BYTE), 
	"DIR_REASON" VARCHAR2(300 BYTE), 
	"CE_REMARK" VARCHAR2(300 BYTE), 
	"CE_REASON" VARCHAR2(300 BYTE), 
	"ENABLED" VARCHAR2(1 BYTE) DEFAULT 'Y', 
	"CREATED_BY" VARCHAR2(100 BYTE), 
	"CREATED_DT" DATE DEFAULT sysdate, 
	"MODIFIED_BY" VARCHAR2(100 BYTE), 
	"MODIFIED_DT" DATE, 
	"NOC_ORIGIN" VARCHAR2(100 BYTE), 
	"APPL_REF_NO" VARCHAR2(200 BYTE), 
	"APPLN_TYPE" VARCHAR2(100 BYTE), 
	"COMP_SERV_ID" VARCHAR2(100 BYTE), 
	"CATEGORY1" VARCHAR2(200 BYTE), 
	"CATEGORY2" VARCHAR2(200 BYTE), 
	"QUANTITY" NUMBER(20,5), 
	"APPROVED_QUANTITY" NUMBER(20,5), 
	 PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;

--T_SLDC_NOC_LINE


  CREATE TABLE "T_SLDC_NOC_LINE" 
   (	"ID" VARCHAR2(100 BYTE) DEFAULT TO_CHAR("T_SLDC_NOC_LINE_SEQ"."NEXTVAL") NOT NULL ENABLE, 
	"T_SLDC_NOC_ID" VARCHAR2(50 BYTE), 
	"COMP_SERV_NO" VARCHAR2(50 BYTE), 
	"COMP_NAME" VARCHAR2(150 BYTE), 
	"COMMIT_TYPE" VARCHAR2(50 BYTE), 
	"FUEL_GROUP" VARCHAR2(50 BYTE), 
	"AGGREMENT_TYPE" VARCHAR2(50 BYTE), 
	"FROM_PERIOD" DATE, 
	"TO_PERIOD" DATE, 
	"QUANTUM" VARCHAR2(50 BYTE), 
	"FLOW_TYPE" VARCHAR2(50 BYTE), 
	"NO_OF_BUYER" VARCHAR2(50 BYTE), 
	"ENABLED" VARCHAR2(1 BYTE) DEFAULT 'Y', 
	"CREATED_BY" VARCHAR2(100 BYTE), 
	"CREATED_DT" DATE DEFAULT sysdate, 
	"MODIFIED_BY" VARCHAR2(100 BYTE), 
	"MODIFIED_DT" DATE, 
	"IS_EXISTING" VARCHAR2(10 BYTE), 
	 PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;


