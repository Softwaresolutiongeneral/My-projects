package com.ss.oa.integration.NametransferPayment;

import java.util.List;

public class Paydetail {

	private String cuscode;
	private String reason;
	private String billMonth;
	private String amount;
	private String duedate;
	private String billYear;
	private String address;
	private String billno;
	private String tension;
	private String cname;
	private String billid;

	public String getCuscode() {
		return cuscode;
	}

	public void setCuscode(String cuscode) {
		this.cuscode = cuscode;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getBillMonth() {
		return billMonth;
	}

	public void setBillMonth(String billMonth) {
		this.billMonth = billMonth;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getDuedate() {
		return duedate;
	}

	public void setDuedate(String duedate) {
		this.duedate = duedate;
	}

	public String getBillYear() {
		return billYear;
	}

	public void setBillYear(String billYear) {
		this.billYear = billYear;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getBillno() {
		return billno;
	}

	public void setBillno(String billno) {
		this.billno = billno;
	}

	public String getTension() {
		return tension;
	}

	public void setTension(String tension) {
		this.tension = tension;
	}

	public String getCname() {
		return cname;
	}

	public void setCname(String cname) {
		this.cname = cname;
	}

	

	public String getOaid() {
		return billid;
	}

	public void setOaid(String oaid) {
		this.billid = oaid;
	}

	@Override
	public String toString() {
		return "Paydetail [cuscode=" + cuscode + ", reason=" + reason + ", billMonth=" + billMonth + ", amount="
				+ amount + ", duedate=" + duedate + ", billYear=" + billYear + ", address=" + address + ", billno="
				+ billno + ", tension=" + tension + ", cname=" + cname + ", oaid=" + billid + ", getCuscode()="
				+ getCuscode() + ", getReason()=" + getReason() + ", getBillMonth()=" + getBillMonth()
				+ ", getAmount()=" + getAmount() + ", getDuedate()=" + getDuedate() + ", getBillYear()=" + getBillYear()
				+ ", getAddress()=" + getAddress() + ", getBillno()=" + getBillno() + ", getTension()=" + getTension()
				+ ", getCname()=" + getCname() + ", getOaid()=" + getOaid() + ", getClass()=" + getClass()
				+ ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
	}

	public Paydetail(String cuscode, String reason, String billMonth, String amount, String duedate, String billYear,
			String address, String billno, String tension, String cname, String oaid) {
		super();
		this.cuscode = cuscode;
		this.reason = reason;
		this.billMonth = billMonth;
		this.amount = amount;
		this.duedate = duedate;
		this.billYear = billYear;
		this.address = address;
		this.billno = billno;
		this.tension = tension;
		this.cname = cname;
		this.billid = oaid;
	}

	public Paydetail() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	
}
