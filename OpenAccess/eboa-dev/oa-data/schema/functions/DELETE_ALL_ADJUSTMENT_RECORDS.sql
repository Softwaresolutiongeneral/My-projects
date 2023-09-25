CREATE OR REPLACE FUNCTION OPENACCESS."DELETE_ALL_ADJUSTMENT_RECORDS" RETURN VARCHAR2 AS
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
--DELETE FROM T_METER_READING_SLOT;
--DELETE FROM T_METER_READING_HDR;
DELETE FROM T_PROCESS_GS;
delete from IMP_MR_LINES;
DELETE  from IMP_MR_HEADER;
COMMIT;

return 'SUCCESS';
END DELETE_ALL_ADJUSTMENT_RECORDS;