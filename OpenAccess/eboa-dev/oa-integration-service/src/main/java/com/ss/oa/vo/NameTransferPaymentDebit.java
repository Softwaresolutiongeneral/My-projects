package com.ss.oa.vo;

public class NameTransferPaymentDebit {
	
	private String Status;
	private String image;
	private String Description;
	private String Code;
	public String getStatus() {
		return Status;
	}
	public void setStatus(String status) {
		Status = status;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getDescription() {
		return Description;
	}
	public void setDescription(String description) {
		Description = description;
	}
	public String getCode() {
		return Code;
	}
	public void setCode(String code) {
		Code = code;
	}
	@Override
	public String toString() {
		return "NameTransferPaymentCredit [Status=" + Status + ", image=" + image + ", Description=" + Description
				+ ", Code=" + Code + ", getStatus()=" + getStatus() + ", getImage()=" + getImage()
				+ ", getDescription()=" + getDescription() + ", getCode()=" + getCode() + ", getClass()=" + getClass()
				+ ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
	}
	public NameTransferPaymentDebit(String status, String image, String description, String code) {
		super();
		Status = status;
		this.image = image;
		Description = description;
		Code = code;
	}
	public NameTransferPaymentDebit() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	
}
