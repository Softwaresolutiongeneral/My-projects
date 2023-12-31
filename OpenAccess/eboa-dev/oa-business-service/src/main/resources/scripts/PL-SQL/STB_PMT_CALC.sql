--------------------------------------------------------
--  File created - Monday-April-09-2018   
--------------------------------------------------------
DROP FUNCTION "OPENACCESS"."STB_PMT_CALC";
--------------------------------------------------------
--  DDL for Table M_POWERPLANT
--------------------------------------------------------

  CREATE TABLE "OPENACCESS"."M_POWERPLANT" 
   (	"ID" VARCHAR2(50 BYTE), 
	"IS_PRIMARY" CHAR(1 BYTE), 
	"VERSION" NUMBER(2,0), 
	"CODE" VARCHAR2(50 BYTE), 
	"NAME" VARCHAR2(100 BYTE), 
	"PLANT_TYPE_CODE" VARCHAR2(50 BYTE), 
	"FUEL_TYPE_CODE" VARCHAR2(50 BYTE), 
	"M_SERVICE_ID" VARCHAR2(50 BYTE), 
	"M_ORG_ID" VARCHAR2(50 BYTE), 
	"T_GRID_CONN_APPLN_ID" VARCHAR2(50 BYTE), 
	"TOTAL_CAPACITY" VARCHAR2(25 BYTE), 
	"M_SUBSTATION_ID" VARCHAR2(50 BYTE), 
	"INTERFACE_VOLTAGE_PHASE" VARCHAR2(25 BYTE), 
	"INTERFACE_VOLTAGE_FREQUENCY" VARCHAR2(25 BYTE), 
	"COMMISSION_DATE" DATE, 
	"PURPOSE" VARCHAR2(500 BYTE), 
	"ENABLED" CHAR(1 BYTE) DEFAULT 'Y', 
	"STATUS" VARCHAR2(25 BYTE), 
	"LINE1" VARCHAR2(100 BYTE), 
	"CITY" VARCHAR2(50 BYTE), 
	"STATE_CODE" VARCHAR2(50 BYTE), 
	"PINCODE" VARCHAR2(50 BYTE), 
	"VILLAGE" VARCHAR2(50 BYTE), 
	"TALUK_CODE" VARCHAR2(50 BYTE), 
	"DISTRICT_CODE" VARCHAR2(50 BYTE), 
	"PLS_SF_NO" VARCHAR2(50 BYTE), 
	"PL_VILLAGE" VARCHAR2(50 BYTE), 
	"PL_TOWN" VARCHAR2(50 BYTE), 
	"PL_TALUK_CODE" VARCHAR2(50 BYTE), 
	"PL_DISTRICT_CODE" VARCHAR2(50 BYTE), 
	"WIND_PASS_CODE" VARCHAR2(50 BYTE), 
	"WIND_ZONE_AREA_CODE" VARCHAR2(50 BYTE), 
	"APPLICATION_DT" DATE, 
	"APPROVAL_DT" DATE, 
	"REMARKS" VARCHAR2(300 BYTE), 
	"CREATED_BY" VARCHAR2(50 BYTE), 
	"CREATED_DATE" DATE DEFAULT sysdate, 
	"MODIFIED_BY" VARCHAR2(50 BYTE), 
	"MODIFIED_DATE" DATE
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
--  DDL for Function STB_PMT_CALC
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "OPENACCESS"."STB_PMT_CALC" 
(V_GS_ID VARCHAR2) RETURN VARCHAR2 
AS 
   
    V_RESULT VARCHAR(300):='SUCCESS'; 
    V_EXCEPTION_CODE VARCHAR2(150);
    V_EXCEPTION_MSG  VARCHAR2(150); 
    V_REASON VARCHAR2(200); 
    V_GS T_GEN_STMT%ROWTYPE;
    V_DOC VARCHAR2(150);
    V_DATE DATE;
    V_COMP_SERV VARCHAR2(150);
    V_STB_PMT NUMBER;


BEGIN  
   BEGIN
     SELECT TO_DATE(CONCAT(STMT_YEAR,(CONCAT(CONCAT('-',STMT_MONTH),'-01'))),'YYYY-MM-DD'),M_COMPANY_SERVICE_ID INTO V_DATE,V_COMP_SERV
     FROM T_GEN_STMT WHERE ID=V_GS_ID;     
dbms_output.put_line('V_COMP_SERV----'||V_COMP_SERV || '---DATE---' || V_DATE);

    SELECT COMMISSION_DATE INTO V_DOC FROM M_POWERPLANT WHERE M_SERVICE_ID = V_COMP_SERV;
     dbms_output.put_line('COMMISSION_DATE----'||V_DOC);

--     SELECT COUNT(*) INTO V_PERIOD1  FROM DUAL WHERE V_DOC < '2006-05-15';
     IF V_DOC < TO_DATE('2006-05-15','YYYY-MM-DD') THEN
        V_STB_PMT := '2.75';
     ELSIF V_DOC > TO_DATE('2006-05-15','YYYY-MM-DD')AND  V_DOC < TO_DATE('2009-03-19' ,'YYYY-MM-DD')THEN
      V_STB_PMT := '2.90';      
     ELSIF V_DOC > TO_DATE('2009-03-20','YYYY-MM-DD')  AND  V_DOC < TO_DATE('2009-03-31','YYYY-MM-DD')  THEN
      V_STB_PMT := '3.24';
     ELSIF V_DOC > TO_DATE('2009-04-01','YYYY-MM-DD')  AND  V_DOC <  TO_DATE('2012-07-31','YYYY-MM-DD')  THEN
      V_STB_PMT := '3.39';
     ELSIF V_DOC > TO_DATE('2012-08-01','YYYY-MM-DD') AND  V_DOC < TO_DATE('2016-03-31','YYYY-MM-DD')  THEN
      V_STB_PMT := '3.51';
     ELSIF V_DOC > TO_DATE('2016-04-01','YYYY-MM-DD')  THEN
      V_STB_PMT := '3.70';
     END IF;
  dbms_output.put_line('V_STB_PMT----'||V_STB_PMT);

      EXCEPTION
              WHEN OTHERS THEN
                V_EXCEPTION_CODE := SQLCODE;
                V_EXCEPTION_MSG  := SUBSTR(SQLERRM, 1, 100);
                V_RESULT := 'FAILURE' || ' - ' || V_EXCEPTION_CODE || ' - ' || V_EXCEPTION_MSG;
                DBMS_OUTPUT.PUT_LINE('ISSUE IN STB_PMT_CALC-'||V_RESULT);

 END;
 <<THE_END>>
IF V_RESULT = 'SUCCESS' THEN
  COMMIT;
ELSE
  v_result := v_result || ' - ' || v_reason;
END IF;
RETURN V_STB_PMT;
END STB_PMT_CALC;


/
-- Unable to render SYNONYM DDL for object PUBLIC.DBMS_OUTPUT with DBMS_METADATA attempting internal generator.
CREATE PUBLIC SYNONYM DBMS_OUTPUT FOR SYS.DBMS_OUTPUT
