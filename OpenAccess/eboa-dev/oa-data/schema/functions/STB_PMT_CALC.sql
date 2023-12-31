CREATE OR REPLACE FUNCTION OPENACCESS."STB_PMT_CALC" 
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
-- dbms_output.put_line('V_COMP_SERV----'||V_COMP_SERV || '---DATE---' || V_DATE);

    SELECT COMMISSION_DATE INTO V_DOC FROM M_POWERPLANT WHERE M_SERVICE_ID = V_COMP_SERV;
     -- dbms_output.put_line('COMMISSION_DATE----'||V_DOC);

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
  -- dbms_output.put_line('V_STB_PMT----'||V_STB_PMT);

      EXCEPTION
              WHEN OTHERS THEN
                V_EXCEPTION_CODE := SQLCODE;
                V_EXCEPTION_MSG  := SUBSTR(SQLERRM, 1, 100);
                V_RESULT := 'FAILURE' || ' - ' || V_EXCEPTION_CODE || ' - ' || V_EXCEPTION_MSG;
                -- dbms_output.put_line('ISSUE IN STB_PMT_CALC-'||V_RESULT);

 END;
 <<THE_END>>
IF V_RESULT = 'SUCCESS' THEN
  COMMIT;
ELSE
  v_result := v_result || ' - ' || v_reason;
END IF;
RETURN V_STB_PMT;
END STB_PMT_CALC;


