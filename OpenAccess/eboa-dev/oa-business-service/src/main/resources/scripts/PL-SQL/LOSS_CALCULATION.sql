--------------------------------------------------------
--  File created - Monday-April-09-2018   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Function LOSS_CALCULATION
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "OPENACCESS"."LOSS_CALCULATION" 
(INJECTION_CODE IN VARCHAR2,
DRAWAL_CODE IN  VARCHAR2,
INJECTED_UNITS IN VARCHAR2,
TRANS_LOSS OUT NUMBER,DIST_LOSS OUT NUMBER,
TOTAL_LOSS OUT NUMBER,DRAWAL_UNITS OUT NUMBER)
RETURN VARCHAR2
IS
    V_LOSS_CALCULATION M_LOSS_CALC_CHART%ROWTYPE;
    V_REASON VARCHAR2(200); 
    V_RESULT VARCHAR(300):='SUCCESS'; 
    V_EXCEPTION_CODE VARCHAR2(150);
    V_EXCEPTION_MSG  VARCHAR2(150);  

BEGIN  
   BEGIN
-- DBMS_OUTPUT.PUT_LINE('INJECTION_CODE'||INJECTION_CODE);
--  DBMS_OUTPUT.PUT_LINE('DRAWAL_CODE'||DRAWAL_CODE);
        SELECT * INTO V_LOSS_CALCULATION FROM M_LOSS_CALC_CHART WHERE INJECTION_VOLTAGE_CODE=INJECTION_CODE AND DRAWAL_VOLTAGE_CODE=DRAWAL_CODE ;
-- DBMS_OUTPUT.PUT_LINE('TRANS_LOSS'||V_LOSS_CALCULATION.TRANS_LOSS_PERCENT);
-- DBMS_OUTPUT.PUT_LINE('DIST_LOSS'||V_LOSS_CALCULATION.DIST_LOSS_PERCENT);
--  DBMS_OUTPUT.PUT_LINE('INJECTED_UNITS'||INJECTED_UNITS);

--          DBMS_OUTPUT.PUT_LINE('DISTLOSS'||V_LOSS_CALCULATION.DIST_LOSS_PERCENT*INJECTED_UNITS);
--           DBMS_OUTPUT.PUT_LINE('INJECTED_UNITS'||INJECTED_UNITS);
        TRANS_LOSS := V_LOSS_CALCULATION.TRANS_LOSS_PERCENT*INJECTED_UNITS;
        TRANS_LOSS :=TO_BINARY_FLOAT(TRANS_LOSS)/100;
--         DBMS_OUTPUT.PUT_LINE('TRANS_LOSS'||TRANS_LOSS);
          DIST_LOSS := V_LOSS_CALCULATION.DIST_LOSS_PERCENT*INJECTED_UNITS;
        DIST_LOSS :=TO_BINARY_FLOAT(DIST_LOSS)/100;
--         DBMS_OUTPUT.PUT_LINE('DISTLOSS'||DIST_LOSS);

        TOTAL_LOSS :=TRANS_LOSS+DIST_LOSS;
        DRAWAL_UNITS := INJECTED_UNITS- TOTAL_LOSS;
--         DBMS_OUTPUT.PUT_LINE('DRAWAL_UNITS'||DRAWAL_UNITS);

--               DBMS_OUTPUT.PUT_LINE('TOTAL_LOSS'||TOTAL_LOSS);

      EXCEPTION
              WHEN OTHERS THEN
                V_EXCEPTION_CODE := SQLCODE;
                V_EXCEPTION_MSG  := SUBSTR(SQLERRM, 1, 100);
                V_RESULT := 'FAILURE' || ' - ' || V_EXCEPTION_CODE || ' - ' || V_EXCEPTION_MSG;
                DBMS_OUTPUT.PUT_LINE('ISSUE IN CREATE_STB-'||V_RESULT);

 END;
 <<THE_END>>
IF V_RESULT = 'SUCCESS' THEN
  COMMIT;
ELSE
  v_result := v_result || ' - ' || v_reason;
END IF;
RETURN TOTAL_LOSS;
--RETURN DISTLOSS;
--RETURN TOTAL_LOSS;
END ;


/
