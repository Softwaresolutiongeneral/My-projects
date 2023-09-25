package com.ss.oa.integration.NametransferPayment;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.zip.CRC32;

import com.ss.oashared.model.NameChangeApplBuyermodel;
import com.ss.oashared.model.OaAppPayment;
import javax.persistence.EntityManager;
import javax.servlet.http.HttpSession;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.ss.oa.vo.NameTransferPayment;
//import com.iipl.tnebht.application.ApplicationMasSwp;
//import com.iipl.tnebht.application.ApplicationMasSwpPK;
//import com.iipl.tnebht.application.ApplicationMasUpt;
//import com.iipl.tnebht.application.SwpApplicationIdAdditionalInputVO;
//import com.iipl.tnebht.application.SwpApplicationIdDetailsVO;
//import com.iipl.tnebht.application.SwpApplicationIdInputVO;
//import com.iipl.tnebht.billing.HtAppOlp;
//import com.iipl.tnebht.billing.HtAppRecon;
//import com.iipl.tnebht.billing.HtAppVal;
//import com.iipl.tnebht.common.AESTNEB;
//import com.iipl.tnebht.common.CodeGenerationDao;
//import com.iipl.tnebht.common.CommonSessionDataUtil;
//import com.iipl.tnebht.consumer.OnlinePaymentReceiptBo;
//import com.iipl.tnebht.date.DateUtility;
//import com.iipl.tnebht.enumcls.CodeType;
//import com.iipl.tnebht.mail.BankListBo;
//import com.iipl.tnebht.mail.HtAppOlpFo;
//import com.iipl.tnebht.mail.OnlinePaymentBo;
//import com.iipl.tnebht.mail.Paydetail;
//import com.iipl.tnebht.mail.PaymentDetailsBo;
//import com.iipl.tnebht.userManagement.UserAccount;

@Repository("onlinePaymentServiceDao")
public class OnlinePaymentServiceDaoImpl  {

	@Autowired
	private EntityManager entityManager;

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	@Autowired
	private HtAes htaes;
	
	@Autowired
	private OaAppPaymentRepository oaAppPaymentRepository;
	
	
	@Autowired
	private AESEncryptionDecryption encryptiondecryption;

//	@Autowired
//	private CodeGenerationDao codeGenerationDao;
//
//	@Autowired
//	private CommonSessionDataUtil commonSessionDataUtil;

	public NameTransferPayment findBankList(NameTransferPayment onlinePayBo) {

		NameTransferPayment bankList = null;

		try {

			Base64.Encoder encoder = Base64.getEncoder();
			String userNamePwdEncoded = encoder.encodeToString("TangedcoHt|!TanHT@bill2".getBytes());

			CRC32 crc = new CRC32();
			crc.update(userNamePwdEncoded.getBytes());
			System.out.println("crc===> " + crc.getValue());
			CloseableHttpClient httpclient = HttpClients.createDefault();
			List<NameValuePair> qparams = new ArrayList<NameValuePair>();
			qparams.add(new BasicNameValuePair("Checksum", String.valueOf(crc.getValue())));
			
			HttpPost hpost = new HttpPost("http://pg.tnebnet.org/awp/TNEB/htbanklist.php");
			//HttpPost hpost = new HttpPost("https://www.tnebnet.org/awp/TNEB/htbanklist.php");
			
			UrlEncodedFormEntity enty = new UrlEncodedFormEntity(qparams, "UTF-8");
			hpost.setEntity(enty);
			
			HttpResponse response = httpclient.execute(hpost);
			HttpEntity respEntity = response.getEntity();
			InputStream is = respEntity.getContent();
			BufferedReader reader = new BufferedReader(new InputStreamReader(is, "iso-8859-1"), 8);
			StringBuilder sb = new StringBuilder();
			
			String line = null;
			while ((line = reader.readLine()) != null)
				sb.append(line + "\n");
			String resString = sb.toString();
              System.out.println(resString);
			is.close();

			try {
	            httpclient.close();
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
			Gson g = new Gson();
			bankList = g.fromJson(resString, NameTransferPayment.class);

//			if (bankList != null) {
//
//				for (OnlinePaymentBo val : bankList.getDebit()) {
//					val.setConsumerNo(onlinePayBo.getConsumerNo());
//				}
//
//				for (OnlinePaymentBo val : bankList.getCredit()) {
//					val.setConsumerNo(onlinePayBo.getConsumerNo());
//				}
//
//				for (OnlinePaymentBo val : bankList.getNet()) {
//					val.setConsumerNo(onlinePayBo.getConsumerNo());
//				}
//
//			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return bankList;

	}


	public String onlinePay(NameTransferPayment onlinePayBo) {

		
		String checkSum = "";
		try {

			Calendar c = Calendar.getInstance();

			String resString = "";
//
//			Session session = this.entityManager.unwrap(Session.class);
//			Criteria criteriaEpay = session.createCriteria(EpayTransaction.class);
//			criteriaEpay.add(Restrictions.eq("ackNo", onlinePayBo.getConsumerNo()));
//			criteriaEpay.add(Restrictions.eq("feeType", "REG"));
//			criteriaEpay.add(Restrictions.eq("status", "NP"));
//			EpayTransaction epayIns = (EpayTransaction) criteriaEpay.uniqueResult();
//
//			Criteria criteriaApMas = session.createCriteria(ApplicationMasUpt.class);
//			criteriaApMas.add(Restrictions.eq("applicationMasPK.ackNo", onlinePayBo.getConsumerNo()));
//			ApplicationMasUpt apMas = (ApplicationMasUpt) criteriaApMas.uniqueResult();

			PaymentDetailsBo paymentDetails = new PaymentDetailsBo();
			Paydetail payDetails = new Paydetail();
			OaAppPayment htAppOlpFo = new OaAppPayment();
			List<Paydetail> payDetailList = new ArrayList<Paydetail>();
//
			Base64.Encoder encoder = Base64.getEncoder();
			String htAppOlpId = (jdbcTemplate.queryForObject("select OA_APP_OLP_SEQ.nextval from dual", long.class))
					.toString();
			Long htAppReconId = jdbcTemplate.queryForObject("select OA_APP_RECON_SEQ.nextval from dual", long.class);
			
//  			 String checkSumVal = "TangedcoHt|!TanHT@bill2|" +
//        	 onlinePayBo.getServiceno();
		 
			String ackNo = "";
			if (onlinePayBo.getServiceno().length() != 12 && onlinePayBo.getServiceno().length() > 20) {
				ackNo = onlinePayBo.getServiceno().substring(2);
			} else {
				ackNo = onlinePayBo.getServiceno();
			}

			String checkSumVal = "TangedcoHt|!TanHT@bill2|" + ackNo;
			String userNamePwdEncoded = encoder.encodeToString(checkSumVal.getBytes());
			CRC32 crc = new CRC32();
			crc.update(userNamePwdEncoded.getBytes());
			System.out.println("userNamePwdEncoded===> " + crc.getValue());

			String billNo = "51600941456514656727";

			//System.out.println("httpSession.getId();--->" + httpSession.getId());

//			HtAppVal htApVal = new HtAppVal();
//			htApVal.setBillNo(billNo);
//			htApVal.setSessionId(httpSession.getId());
//			session.save(htApVal);

			payDetails.setCuscode(ackNo);
			payDetails.setReason("OA");
			payDetails.setBillMonth(String.valueOf(c.get(Calendar.MONTH)));
			//payDetails.setAmount(onlinePayBo.getTotalamount());
			payDetails.setAmount("55000");
			payDetails.setDuedate(java.time.LocalDate.now().toString());
			payDetails.setBillYear(String.valueOf(c.get(Calendar.YEAR)));
			payDetails.setAddress(onlinePayBo.getCusAddress());
			payDetails.setBillno(billNo);
			payDetails.setTension("H");
			payDetails.setCname(onlinePayBo.getCusname());
			payDetails.setOaid(htAppOlpId);
			
			System.out.println(payDetails);
			payDetailList.add(payDetails);
            if (!onlinePayBo.getCredit().isEmpty()) {
            	paymentDetails.setBank(onlinePayBo.getCredit().get(0).getCode());
            }
            if (!onlinePayBo.getDebit().isEmpty()) {
            	paymentDetails.setBank(onlinePayBo.getDebit().get(0).getCode());
            }
            if (!onlinePayBo.getNet().isEmpty()) {
            	paymentDetails.setBank(onlinePayBo.getNet().get(0).getCode());
            }
			
			paymentDetails.setPaydetail(payDetailList);
			
			System.out.println(paymentDetails);

			String gsonObj = new Gson().toJson(paymentDetails);

			String aesEncryptVal = ackNo + "|" + crc.getValue() + "|" + gsonObj + "|" + billNo + "|" + htAppOlpId
					+ "|OA" ;

			/*
			 * String aesEncryptVal = onlinePayBo.getConsumerNo() + "|" +
			 * crc.getValue() + "|" + gsonObj + "|" + billNo + "|" +
			 * onlinePayBo.getConsumerNo();
			 */

			System.out.println(aesEncryptVal);

			 checkSum = htaes.encryptAndEncode(aesEncryptVal);
			System.out.println("checkSum--->> " + checkSum);
			String Decryption = htaes.decodeAndDecrypt(checkSum);

			System.out.println(Decryption);
			
//
//			UserAccount userAccount = commonSessionDataUtil.getUserAccount();
//
//			String receiptNo = codeGenerationDao.generateReceiptNoForCounterPaymentOLP(
//					CodeType.FOR_COUNTER_PAYMENT_RECEIPT.getCodeType(), userAccount);
//
			OaAppPayment htAppOlp = new OaAppPayment();
			htAppOlp.setId(htAppOlpId);
			htAppOlp.setRefNo(ackNo);
			htAppOlp.setAckno(ackNo);
			htAppOlp.setAmount(payDetails.getAmount());
			htAppOlp.setApplMonth(payDetails.getBillMonth());
			htAppOlp.setApplYear(payDetails.getBillYear());
			htAppOlp.setBillNo(payDetails.getBillno());
			htAppOlp.setPaymentDate(java.time.LocalDate.now());
			htAppOlp.setReceiptNo(payDetails.getBillno());
			htAppOlp.setReceiptDate(java.time.LocalDate.now().toString());
			htAppOlp.setTransactionStatus("pending");
			htAppOlp.setSwpStatus("R");
			oaAppPaymentRepository.save(htAppOlp);

			
//			  HtAppRecon htAppRecon = new HtAppRecon();
//			  htAppRecon.setHtappolpId(payDetails.getHtid());
//			  htAppRecon.setRefno(payDetails.getCuscode());
//			  htAppRecon.setAmount(payDetails.getAmount());
//			  htAppRecon.setPaymentdt(new Date());
//			  htAppRecon.setReceiptno(receiptNo);
//			  htAppRecon.setReceiptdate(java.time.LocalDate.now());
//			  session.save(htAppRecon);
			 

			
			  try {
			  
			 // String decrypt = AESTNEB.decodeAndDecrypt(checkSum);
			  
			//  System.out.println("decrypt--->" + decrypt);
			  
		      CloseableHttpClient httpclient = HttpClients.createDefault();
			  List<NameValuePair> qparams = new ArrayList<NameValuePair>();
			  qparams.add(new BasicNameValuePair("Qin",String.valueOf(checkSum))); 
			  HttpPost hpost = new HttpPost("http://pg.tnebnet.org/awp/TNEB/htbankurl.php");
			//HttpPost hpost = new HttpPost("http://192.168.1.186:9090/awp-1.0/TNEB/htbankurl.php");
			  UrlEncodedFormEntity enty = new UrlEncodedFormEntity(qparams,"UTF-8"); 
			  hpost.setEntity(enty);
			  System.out.println(hpost.getEntity());
			 // HttpResponse response = httpclient.execute(hpost);
			//  HttpEntity respEntity = response.getEntity();
			//  InputStream is = respEntity.getContent();
			  
			 // System.out.println("is-------->" + is.toString());
			  
//			  BufferedReader reader = new BufferedReader(new
//			 // InputStreamReader(is, "iso-8859-1"), 8); StringBuilder sb = new
//			  StringBuilder(); 
//			  String line = null; 
//			  while ((line =
//			  reader.readLine()) != null) sb.append(line + "\n"); resString =
//			  sb.toString();
			  
			  System.out.println("the params"+qparams);
			  
			  //is.close();
			  
			  } catch (Exception e) { e.printStackTrace(); }
			 
		} catch (Exception e) {
			e.printStackTrace();
		}

		return checkSum;
	}
//
//	public String bankPayRedirect(String trk) {
//		try {
//			trk = trk.replaceAll(" ", "+");
//			String decrypt = AESTNEB.decodeAndDecrypt(trk);
//			System.out.println(decrypt);
//			/*
//			 * String[] decryptParams = decrypt.split("\\|"); decrypt =
//			 * decryptParams[1];
//			 */
//			return decrypt;
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return null;
//	}
//
//	public String getHtAppOlpDetails(String ackNo, int totalFee) {
//		try {
//			String htAppOlpSql = "SELECT COUNT(*) FROM HT_APP_OLP WHERE REFNO = ? AND AMOUNT = '" + totalFee + "'";
//			int htAppOlpCount = jdbcTemplate.queryForObject(htAppOlpSql, new Object[] { ackNo }, Integer.class);
//			if (htAppOlpCount > 0) {
//				htAppOlpSql = "SELECT NVL(TRANSACTION_STATUS,0) FROM HT_APP_OLP WHERE REFNO = ? AND AMOUNT = '"
//						+ totalFee + "' ORDER BY PAYMENTDT DESC FETCH FIRST ROW ONLY";
//				String htAppOlpStatus = jdbcTemplate.queryForObject(htAppOlpSql, new Object[] { ackNo }, String.class);
//				return htAppOlpStatus;
//			}
//			return "P";
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return null;
//	}
//
//	public String getHtAppReconDetails(String ackNo, int totalFee) {
//		try {
//			String htAppReconSql = "SELECT COUNT(*) FROM HT_APP_RECON WHERE REFNO = ? AND AMOUNT = '" + totalFee + "'";
//			int htAppReconCount = jdbcTemplate.queryForObject(htAppReconSql, new Object[] { ackNo }, Integer.class);
//			if (htAppReconCount > 0) {
//				htAppReconSql = "SELECT NVL(TRANSACTION_STATUS,0) FROM HT_APP_RECON WHERE REFNO = ? AND AMOUNT = '"
//						+ totalFee + "' ORDER BY PAYMENTDT DESC FETCH FIRST ROW ONLY";
//				String htAppReconStatus = jdbcTemplate.queryForObject(htAppReconSql, new Object[] { ackNo },
//						String.class);
//				return htAppReconStatus;
//			}
//			return "P";
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return null;
//	}
//
//	public OnlinePaymentReceiptBo onlinePaymentReceipt(String ackNo) {
//		List<OnlinePaymentReceiptBo> onlinePaymentReceiptList = new ArrayList<OnlinePaymentReceiptBo>();
//		OnlinePaymentReceiptBo onlinePaymentReceipt = new OnlinePaymentReceiptBo();
//		String[] ackNoParams = ackNo.split("\\|");
//		ackNo = ackNoParams[1];
//		String status = ackNoParams[0];
//		if (ackNo.length() != 12 && ackNo.length() <= 20) {
//			String ackNoSql = "SELECT refno FROM ht_app_olp WHERE ackno = ? order by hao.paymentDt desc fetch first row only";
//			ackNo = jdbcTemplate.queryForObject(ackNoSql, new Object[] { ackNo }, String.class);
//		}
//		try {
//			if (status.equalsIgnoreCase("0")) {
//				String htAppOlpSql = "SELECT am.ack_no as ackNo, hao.amount as amount, hao.paymentDt as paymentDt, B_HOUSE_NO as address, appln_org_name||' '||org_name as applnName, 'Payment Failed' as transactionStatus FROM application_mas am join ht_app_olp hao on am.ack_no = hao.refno WHERE ack_no = ? order by hao.paymentDt desc fetch first row only";
//				onlinePaymentReceiptList = jdbcTemplate.query(htAppOlpSql, new Object[] { ackNo },
//						new BeanPropertyRowMapper<OnlinePaymentReceiptBo>(OnlinePaymentReceiptBo.class));
//				onlinePaymentReceipt = onlinePaymentReceiptList.get(0);
//				return onlinePaymentReceipt;
//			} else {
//				String htAppOlpSql = "SELECT am.ack_no as ackNo, hao.amount as amount, hao.paymentDt as paymentDt, B_HOUSE_NO as address, appln_org_name||' '||org_name as applnName, 'Payment Initiated, status will be updated after Reconcilation' as transactionStatus FROM application_mas am join ht_app_olp hao on am.ack_no = hao.refno WHERE ack_no = ? order by hao.paymentDt desc fetch first row only";
//				onlinePaymentReceiptList = jdbcTemplate.query(htAppOlpSql, new Object[] { ackNo },
//						new BeanPropertyRowMapper<OnlinePaymentReceiptBo>(OnlinePaymentReceiptBo.class));
//				onlinePaymentReceipt = onlinePaymentReceiptList.get(0);
//				return onlinePaymentReceipt;
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return onlinePaymentReceipt;
//	}
//
	static char digits[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };

	public static char randomDecimalDigit() {
		return digits[(int) Math.floor(Math.random() * 10)];
	}
//
	public static String randomDecimalString(int ndigits) {
		StringBuilder result = new StringBuilder();
		for (int i = 0; i < ndigits; i++) {
			result.append(randomDecimalDigit());
		}
		return result.toString();
	}

//     @GetMapping()
//	public String getBillNo(String billNo) {
//
//		String result = null;
//
//		Session session = this.entityManager.unwrap(Session.class);
//		Criteria criteria = session.createCriteria(HtAppVal.class);
//		criteria.add(Restrictions.eq("billNo", billNo));
//
//		HtAppVal htApValIns = (HtAppVal) criteria.uniqueResult();
//
//		Date date = new Date();
//		Timestamp ts = new Timestamp(date.getTime());
//
//		if (htApValIns != null) {
//
//			result = billNo + "|" + htApValIns.getSessionId().trim() + "|" + ts + "|true";
//
//		} else {
//
//			result = billNo + "|" + "0" + "|" + ts + "|false";
//
//		}
//
//		return result;
//	}

}
