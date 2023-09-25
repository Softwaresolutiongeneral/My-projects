SELECT * FROM T_METER_READING_HDR WHERE  reading_year='2020' AND READING_MONTH IN ('03','04');
SELECT * FROM T_METER_READING_SLOT WHERE  T_METER_READING_HDR_ID IN (SELECT id FROM T_METER_READING_HDR WHERE reading_year='2020' AND READING_MONTH IN ('03','04'));

SELECT * FROM T_GEN_STMT WHERE stmt_year='2020' AND stmt_month IN ('03','04');
SELECT * FROM T_GEN_STMT_SLOT WHERE T_GEN_STMT_ID IN (SELECT id FROM T_GEN_STMT WHERE stmt_year='2020' AND stmt_month IN ('03','04'));
SELECT * FROM T_GEN_STMT_CHARGE WHERE T_GEN_STMT_ID IN (SELECT id FROM T_GEN_STMT WHERE stmt_year='2020' AND stmt_month IN ('03','04'));
SELECT * FROM T_GEN_OTHER_CHARGES WHERE year='2020' AND MONTH IN ('03','04');
SELECT * FROM T_GEN_OTHER_SUB_CHARGES WHERE T_GEN_OTHER_CHARGE_ID IN (SELECT id FROM T_GEN_OTHER_CHARGES WHERE year='2020' AND MONTH IN ('03','04'));
