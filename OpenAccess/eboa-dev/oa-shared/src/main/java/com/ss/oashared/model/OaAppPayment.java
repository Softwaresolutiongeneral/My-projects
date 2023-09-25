package com.ss.oashared.model;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="OA_APP_OLP")
public class OaAppPayment {
	@Id
	@Column(name="OAAPPOLP_ID")
	private String Id;
	@Column(name="OAMASTER_ID")
	private String MasterId;
	@Column(name="TRANSACTION_ID" )
	private String TransactionId;
	@Column(name="REFNO")
	private String RefNo;
	@Column(name="NAME")
	private String Name;
	@Column(name="ADDRESS")
	private String Address;
	@Column(name="MOBILE_NO")
	private String MobileNo;
	@Column(name="EMAIL_ID")
	private String EmailId;
	@Column(name="BILLMONTH")
	private String ApplMonth;
	@Column(name="BILLYEAR")
	private String ApplYear;
	@Column(name="AMOUNT")
	private String Amount;
	@Column(name="DUEDATE")
	private LocalDate DueDate;
	@Column(name="INSTALLMENT_POS")
	private String InstallmentPos;
	@Column(name="RECEIPTNO")
	private String ReceiptNo;
	@Column(name="RECEIPTDATE")
	private String ReceiptDate;
	@Column(name="PAYMENTFLAG")
	private String PaymentFlag;
	@Column(name="BANK_REFNO")
	private String BankRefNo;
	@Column(name="MERCHANT_REFNO")
	private String MerchantRefno;
	@Column(name="TRANSACTION_STATUS")
	private String TransactionStatus;
	@Column(name="TRANSACTION_TYPE")
	private String TransactionType;
	@Column(name="TRANSACTION_STATUS_RC")
	private String TransactionStatusRc;
	@Column(name="REMARKS")
	private String Remarks;
	@Column(name="PAYMENTDT")
	private LocalDate PaymentDate;
    @Column(name="RECONDT")
	private Date ReconsDate;
	@Column(name="RESPONSEDT")
	private Date ResponseDate;
	@Column(name="BILL_NO")
	private String BillNo;
	@Column(name="HT_RECEIPTNO")
	private String HtReceiptno;
	@Column(name="ACKNO")
	private String Ackno;
	@Column(name="SWP_STATUS")
	private String SwpStatus;
	public String getId() {
		return Id;
	}
	public void setId(String id) {
		Id = id;
	}
	public String getMasterId() {
		return MasterId;
	}
	public void setMasterId(String masterId) {
		MasterId = masterId;
	}
	public String getTransactionId() {
		return TransactionId;
	}
	public void setTransactionId(String transactionId) {
		TransactionId = transactionId;
	}
	public String getRefNo() {
		return RefNo;
	}
	public void setRefNo(String refNo) {
		RefNo = refNo;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getAddress() {
		return Address;
	}
	public void setAddress(String address) {
		Address = address;
	}
	public String getMobileNo() {
		return MobileNo;
	}
	public void setMobileNo(String mobileNo) {
		MobileNo = mobileNo;
	}
	public String getEmailId() {
		return EmailId;
	}
	public void setEmailId(String emailId) {
		EmailId = emailId;
	}
	public String getApplMonth() {
		return ApplMonth;
	}
	public void setApplMonth(String applMonth) {
		ApplMonth = applMonth;
	}
	public String getApplYear() {
		return ApplYear;
	}
	public void setApplYear(String applYear) {
		ApplYear = applYear;
	}
	public String getAmount() {
		return Amount;
	}
	public void setAmount(String amount) {
		Amount = amount;
	}
	public LocalDate getDueDate() {
		return DueDate;
	}
	public void setDueDate(LocalDate dueDate) {
		DueDate = dueDate;
	}
	public String getInstallmentPos() {
		return InstallmentPos;
	}
	public void setInstallmentPos(String installmentPos) {
		InstallmentPos = installmentPos;
	}
	public String getReceiptNo() {
		return ReceiptNo;
	}
	public void setReceiptNo(String receiptNo) {
		ReceiptNo = receiptNo;
	}
	public String getReceiptDate() {
		return ReceiptDate;
	}
	public void setReceiptDate(String receiptDate) {
		ReceiptDate = receiptDate;
	}
	public String getPaymentFlag() {
		return PaymentFlag;
	}
	public void setPaymentFlag(String paymentFlag) {
		PaymentFlag = paymentFlag;
	}
	public String getBankRefNo() {
		return BankRefNo;
	}
	public void setBankRefNo(String bankRefNo) {
		BankRefNo = bankRefNo;
	}
	public String getMerchantRefno() {
		return MerchantRefno;
	}
	public void setMerchantRefno(String merchantRefno) {
		MerchantRefno = merchantRefno;
	}
	public String getTransactionStatus() {
		return TransactionStatus;
	}
	public void setTransactionStatus(String transactionStatus) {
		TransactionStatus = transactionStatus;
	}
	public String getTransactionType() {
		return TransactionType;
	}
	public void setTransactionType(String transactionType) {
		TransactionType = transactionType;
	}
	public String getTransactionStatusRc() {
		return TransactionStatusRc;
	}
	public void setTransactionStatusRc(String transactionStatusRc) {
		TransactionStatusRc = transactionStatusRc;
	}
	public String getRemarks() {
		return Remarks;
	}
	public void setRemarks(String remarks) {
		Remarks = remarks;
	}
	public LocalDate getPaymentDate() {
		return PaymentDate;
	}
	public void setPaymentDate(LocalDate localDate) {
		PaymentDate = localDate;
	}
	public Date getReconsDate() {
		return ReconsDate;
	}
	public void setReconsDate(Date reconsDate) {
		ReconsDate = reconsDate;
	}
	public Date getResponseDate() {
		return ResponseDate;
	}
	public void setResponseDate(Date responseDate) {
		ResponseDate = responseDate;
	}
	public String getBillNo() {
		return BillNo;
	}
	public void setBillNo(String billNo) {
		BillNo = billNo;
	}
	public String getHtReceiptno() {
		return HtReceiptno;
	}
	public void setHtReceiptno(String htReceiptno) {
		HtReceiptno = htReceiptno;
	}
	public String getAckno() {
		return Ackno;
	}
	public void setAckno(String ackno) {
		Ackno = ackno;
	}
	public String getSwpStatus() {
		return SwpStatus;
	}
	public void setSwpStatus(String swpStatus) {
		SwpStatus = swpStatus;
	}
	@Override
	public String toString() {
		return "OaAppPayment [Id=" + Id + ", MasterId=" + MasterId + ", TransactionId=" + TransactionId + ", RefNo="
				+ RefNo + ", Name=" + Name + ", Address=" + Address + ", MobileNo=" + MobileNo + ", EmailId=" + EmailId
				+ ", ApplMonth=" + ApplMonth + ", ApplYear=" + ApplYear + ", Amount=" + Amount + ", DueDate=" + DueDate
				+ ", InstallmentPos=" + InstallmentPos + ", ReceiptNo=" + ReceiptNo + ", ReceiptDate=" + ReceiptDate
				+ ", PaymentFlag=" + PaymentFlag + ", BankRefNo=" + BankRefNo + ", MerchantRefno=" + MerchantRefno
				+ ", TransactionStatus=" + TransactionStatus + ", TransactionType=" + TransactionType
				+ ", TransactionStatusRc=" + TransactionStatusRc + ", Remarks=" + Remarks + ", PaymentDate="
				+ PaymentDate + ", ReconsDate=" + ReconsDate + ", ResponseDate=" + ResponseDate + ", BillNo=" + BillNo
				+ ", HtReceiptno=" + HtReceiptno + ", Ackno=" + Ackno + ", SwpStatus=" + SwpStatus + ", getId()="
				+ getId() + ", getMasterId()=" + getMasterId() + ", getTransactionId()=" + getTransactionId()
				+ ", getRefNo()=" + getRefNo() + ", getName()=" + getName() + ", getAddress()=" + getAddress()
				+ ", getMobileNo()=" + getMobileNo() + ", getEmailId()=" + getEmailId() + ", getApplMonth()="
				+ getApplMonth() + ", getApplYear()=" + getApplYear() + ", getAmount()=" + getAmount()
				+ ", getDueDate()=" + getDueDate() + ", getInstallmentPos()=" + getInstallmentPos()
				+ ", getReceiptNo()=" + getReceiptNo() + ", getReceiptDate()=" + getReceiptDate()
				+ ", getPaymentFlag()=" + getPaymentFlag() + ", getBankRefNo()=" + getBankRefNo()
				+ ", getMerchantRefno()=" + getMerchantRefno() + ", getTransactionStatus()=" + getTransactionStatus()
				+ ", getTransactionType()=" + getTransactionType() + ", getTransactionStatusRc()="
				+ getTransactionStatusRc() + ", getRemarks()=" + getRemarks() + ", getPaymentDate()=" + getPaymentDate()
				+ ", getReconsDate()=" + getReconsDate() + ", getResponseDate()=" + getResponseDate() + ", getBillNo()="
				+ getBillNo() + ", getHtReceiptno()=" + getHtReceiptno() + ", getAckno()=" + getAckno()
				+ ", getSwpStatus()=" + getSwpStatus() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode()
				+ ", toString()=" + super.toString() + "]";
	}
	public OaAppPayment(String id, String masterId, String transactionId, String refNo, String name, String address,
			String mobileNo, String emailId, String applMonth, String applYear, String amount, LocalDate dueDate,
			String installmentPos, String receiptNo,String receiptDate, String paymentFlag, String bankRefNo,
			String merchantRefno, String transactionStatus, String transactionType, String transactionStatusRc,
			String remarks, LocalDate paymentDate, Date reconsDate, Date responseDate, String billNo, String htReceiptno,
			String ackno, String swpStatus) {
		super();
		Id = id;
		MasterId = masterId;
		TransactionId = transactionId;
		RefNo = refNo;
		Name = name;
		Address = address;
		MobileNo = mobileNo;
		EmailId = emailId;
		ApplMonth = applMonth;
		ApplYear = applYear;
		Amount = amount;
		DueDate = dueDate;
		InstallmentPos = installmentPos;
		ReceiptNo = receiptNo;
		ReceiptDate = receiptDate;
		PaymentFlag = paymentFlag;
		BankRefNo = bankRefNo;
		MerchantRefno = merchantRefno;
		TransactionStatus = transactionStatus;
		TransactionType = transactionType;
		TransactionStatusRc = transactionStatusRc;
		Remarks = remarks;
		PaymentDate = paymentDate;
		ReconsDate = reconsDate;
		ResponseDate = responseDate;
		BillNo = billNo;
		HtReceiptno = htReceiptno;
		Ackno = ackno;
		SwpStatus = swpStatus;
	}
	public OaAppPayment() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
}
