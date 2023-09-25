package com.ss.oa.vo;

import java.util.List;

public class NameTransferPayment {

	private String id ;
	private String iserr;
	private String message;
	private String Serviceno;
	private String totalamount;
	private String Cusname;
	private String CusAddress;
	private List<NameTransferPaymentCredit> Credit;
	private List<NameTransferPaymentDebit> Debit;
	private List<NameTransferPaymentNet> Net;
	
	
	
	
	
	public String getCusname() {
		return Cusname;
	}
	public void setCusname(String cusname) {
		Cusname = cusname;
	}
	public String getCusAddress() {
		return CusAddress;
	}
	public void setCusAddress(String cusAddress) {
		CusAddress = cusAddress;
	}
	public String getTotalamount() {
		return totalamount;
	}
	public void setTotalamount(String totalamount) {
		this.totalamount = totalamount;
	}
	public String getServiceno() {
		return Serviceno;
	}
	public void setServiceno(String serviceno) {
		Serviceno = serviceno;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getIserr() {
		return iserr;
	}
	public void setIserr(String iserr) {
		this.iserr = iserr;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public List<NameTransferPaymentCredit> getCredit() {
		return Credit;
	}
	public void setCredit(List<NameTransferPaymentCredit> credit) {
		Credit = credit;
	}
	public List<NameTransferPaymentDebit> getDebit() {
		return Debit;
	}
	public void setDebit(List<NameTransferPaymentDebit> debit) {
		Debit = debit;
	}
	public List<NameTransferPaymentNet> getNet() {
		return Net;
	}
	public void setNet(List<NameTransferPaymentNet> net) {
		Net = net;
	}
	@Override
	public String toString() {
		return "NameTransferPayment [id=" + id + ", iserr=" + iserr + ", message=" + message + ", Credit=" + Credit
				+ ", Debit=" + Debit + ", Net=" + Net + ", getId()=" + getId() + ", getIserr()=" + getIserr()
				+ ", getMessage()=" + getMessage() + ", getCredit()=" + getCredit() + ", getDebit()=" + getDebit()
				+ ", getNet()=" + getNet() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode()
				+ ", toString()=" + super.toString() + "]";
	}
	public NameTransferPayment(String id, String iserr, String message, List<NameTransferPaymentCredit> credit,
			List<NameTransferPaymentDebit> debit, List<NameTransferPaymentNet> net) {
		super();
		this.id = id;
		this.iserr = iserr;
		this.message = message;
		Credit = credit;
		Debit = debit;
		Net = net;
	}
	public NameTransferPayment() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	
	
	
}
