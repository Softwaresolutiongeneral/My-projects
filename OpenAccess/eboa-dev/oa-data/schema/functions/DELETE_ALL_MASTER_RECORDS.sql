CREATE OR REPLACE FUNCTION OPENACCESS."DELETE_ALL_MASTER_RECORDS" RETURN VARCHAR2 AS
BEGIN

 DELETE FROM T_OAA;
 DELETE FROM F_AGREEMENT_LINE;
 DELETE FROM F_AGREEMENT;
 DELETE FROM T_EWA_LINE;
 DELETE FROM T_EWA;
 DELETE FROM T_STANDING_CLEARENCE;
 DELETE FROM T_EPA_LINES;
 DELETE FROM T_EPA ;
 DELETE FROM T_PPA;
 DELETE FROM T_CONSENT;
 DELETE FROM T_NOC_GENERATOR_LINE;
 DELETE FROM T_NOC_GENERATOR;
 DELETE FROM T_NOC;
 DELETE FROM T_INPRINCIPLE_APPLN_LINE;
 DELETE FROM T_INPRINCIPLE_APPLN;
 DELETE FROM T_ES_INTENT_LINE;
 DELETE FROM T_ES_INTENT;
 DELETE FROM T_CS_ID_TABLEA;
 DELETE FROM T_CS_ID_TABLEB;
 DELETE FROM T_CS_LOAN;
 DELETE FROM T_CS_QUANTUM_ALLOCATION;
 DELETE FROM T_CS;
 DELETE FROM M_TRADE_RELATIONSHIP;
 DELETE FROM M_GENERATOR ;
 DELETE FROM M_POWERPLANT ;
 DELETE FROM T_COMPANY_NAME_CHANGE;
 DELETE FROM T_COMPANY_METER_CHANGE;

 DELETE FROM M_COMPANY_SHAREHOLDER;
 DELETE FROM M_COMPANY_METER where id in (select M_COMPANY_METER_ID FROM V_COMPANY_SERVICE WHERE COMP_SER_TYPE_CODE = '03' AND NOT (m_company_code = 'IEX' OR m_company_code = 'TNEB'));
 DELETE FROM M_COMPANY_SERVICE where id in  (select id FROM V_COMPANY_SERVICE WHERE COMP_SER_TYPE_CODE = '03' AND NOT (m_company_code = 'IEX' OR m_company_code = 'TNEB'));
 DELETE FROM M_COMPANY where id in  (select M_COMPANY_ID FROM V_COMPANY_SERVICE WHERE COMP_SER_TYPE_CODE = '03' AND NOT (m_company_code = 'IEX' OR m_company_code = 'TNEB'));

 UPDATE M_SIGNUP SET IS_COMPLETE = 'N' WHERE PURPOSE = '02';

 COMMIT;

 return 'SUCCESS';
 END DELETE_ALL_MASTER_RECORDS;
