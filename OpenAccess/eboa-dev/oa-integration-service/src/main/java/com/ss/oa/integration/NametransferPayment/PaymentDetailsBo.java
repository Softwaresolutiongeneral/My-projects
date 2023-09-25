package com.ss.oa.integration.NametransferPayment;

import java.util.List;

public class PaymentDetailsBo {

	private String Bank;
	private List<Paydetail> Paydetail;

	public String getBank() {
		return Bank;
	}

	public void setBank(String bank) {
		Bank = bank;
	}

	public List<Paydetail> getPaydetail() {
		return Paydetail;
	}

	public void setPaydetail(List<Paydetail> paydetail) {
		Paydetail = paydetail;
	}


}
