CREATE OR REPLACE FUNCTION OPENACCESS."HANDLE_DUP_FOR_HTUNITS" RETURN VARCHAR2 AS 
V_RES1 VARCHAR2(100);
V_RES2 VARCHAR2(100);
V_BATCHKEY VARCHAR2(100);
V_LOG VARCHAR2(100);

BEGIN

--SELECT ID FROM INT_SURPLUS_UNIT WHERE SUPLR_CODE='039224320143' AND SERVICE_NO='039094390403' AND READING_MNTH='1' AND READING_YR='2019' AND ROWNUM=1;
--SELECT DISTINCT SUPLR_CODE,SERVICE_NO,READING_MNTH,READING_YR FROM INT_SURPLUS_UNIT WHERE READING_MNTH='1';

--FOR surplusUnits IN (SELECT DISTINCT SUPLR_CODE,SERVICE_NO,READING_MNTH,READING_YR FROM INT_SURPLUS_UNIT WHERE READING_MNTH='1')
--LOOP
--INSERT INTO INT_SURPLUS_UNIT_2(ID,BATCH_KEY,SERVICE_NO,SUPLR_CODE,SUPLR_TYPE,READING_DT,READING_MNTH,READING_YR,C24,C1,C2,C3,C4,C5,
--CREATED_BY,CREATED_DT,MODIFIED_BY,MODIFIED_DT,BUYER_COMPANY_ID,BUYER_COMPANY_SERVICE_ID,SELLER_COMPANY_ID,SELLER_COMPANY_SERVICE_ID,FUEL_TYPE_CODE,
--IMPORT_REMARKS,SOURCE,IMPORTED,SUPLR_NAME,DELETE_FLAG)
--SELECT ID,BATCH_KEY,SERVICE_NO,SUPLR_CODE,SUPLR_TYPE,READING_DT,READING_MNTH,READING_YR,C24,C1,C2,C3,C4,C5,
--CREATED_BY,CREATED_DT,MODIFIED_BY,MODIFIED_DT,BUYER_COMPANY_ID,BUYER_COMPANY_SERVICE_ID,SELLER_COMPANY_ID,SELLER_COMPANY_SERVICE_ID,FUEL_TYPE_CODE,
--IMPORT_REMARKS,SOURCE,IMPORTED,SUPLR_NAME,DELETE_FLAG FROM INT_SURPLUS_UNIT WHERE SUPLR_CODE=surplusUnits.SUPLR_CODE 
--AND SERVICE_NO=surplusUnits.SERVICE_NO AND READING_MNTH=surplusUnits.READING_MNTH AND READING_YR=surplusUnits.READING_YR AND ROWNUM=1; 
--END LOOP;

FOR batchkey in(select distinct batch_key from int_surplus_unit_2 where READING_MNTH='1')
LOOP

V_BATCHKEY:=batchkey.batch_key;

            BANKING_BALANCE.increment_surplus_units(V_BATCHKEY,V_RES1,V_RES2);
V_LOG:=log_activity('PROCEDURE','HANDLE_DUP_FOR_HTUNITS','int_surplus_unit_2',V_BATCHKEY, V_BATCHKEY,'admin', sysdate,V_BATCHKEY);
END LOOP;
  RETURN 'SUCCESS';
END HANDLE_DUP_FOR_HTUNITS;

