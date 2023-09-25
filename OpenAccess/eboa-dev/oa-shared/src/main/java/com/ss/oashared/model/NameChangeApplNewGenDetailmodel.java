package com.ss.oashared.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="T_NAME_TRANSFER_APPL_NEW_GEN_DETAIL")
@Entity
public class NameChangeApplNewGenDetailmodel {
	@Id
	@Column(name="ID")
	private String id ;
	@Column(name="T_NAME_TRANSFER_APPL_ID")
	private String ApplId ;
	@Column(name="BANK_ACC_NO")
	private String BankAccountNo;
	@Column(name="BANK_IFSC_CODE")
	private String BankIfscCode ;
	@Column(name="BANK_NAME")
	private String BankName ;
	@Column(name="CIN")
	private String Cin ;
	@Column(name="COMPANY_TYPE_CODE")
	private String CompanyTypeCode ;
	@Column(name="CONTACT_DESIGNATION")
	private String ContactDesignation;
	@Column(name="CONTANC_EMAIL")
	private String ContactEmail ;
	@Column(name="CONTACT_FULL_NAME")
	private String ContactFullName ;
	@Column(name="CONTACT_PHONE_NO")
	private String ContactPhoneNo;
	@Column(name="GST")
	private String Gst;
	@Column(name="PAN")
	private String Pan;
	@Column(name="PLANT_ADDR")
	private String PlantAddr ;
	@Column(name="REG_OFFICE_ADDR")
	private String RegOfficeAddr ;
	@Column(name="TAN")
	private String Tan;
	
	
	
	public String getId() {
		return id;
	}



	public void setId(String id) {
		this.id = id;
	}



	public String getApplId() {
		return ApplId;
	}



	public void setApplId(String applId) {
		ApplId = applId;
	}



	



	public String getBankAccountNo() {
		return BankAccountNo;
	}



	public void setBankAccountNo(String bankAccountNo) {
		BankAccountNo = bankAccountNo;
	}



	public String getBankIfscCode() {
		return BankIfscCode;
	}



	public void setBankIfscCode(String bankIfscCode) {
		BankIfscCode = bankIfscCode;
	}



	public String getBankName() {
		return BankName;
	}



	public void setBankName(String bankName) {
		BankName = bankName;
	}



	public String getCin() {
		return Cin;
	}



	public void setCin(String cin) {
		Cin = cin;
	}



	public String getCompanyTypeCode() {
		return CompanyTypeCode;
	}



	public void setCompanyTypeCode(String companyTypeCode) {
		CompanyTypeCode = companyTypeCode;
	}



	public String getContactDesignation() {
		return ContactDesignation;
	}



	public void setContactDesignation(String contactDesignation) {
		ContactDesignation = contactDesignation;
	}



	public String getContactEmail() {
		return ContactEmail;
	}



	public void setContactEmail(String contactEmail) {
		ContactEmail = contactEmail;
	}



	public String getContactFullName() {
		return ContactFullName;
	}



	public void setContactFullName(String contactFullName) {
		ContactFullName = contactFullName;
	}



	public String getContactPhoneNo() {
		return ContactPhoneNo;
	}



	public void setContactPhoneNo(String contactPhoneNo) {
		ContactPhoneNo = contactPhoneNo;
	}



	public String getGst() {
		return Gst;
	}



	public void setGst(String gst) {
		Gst = gst;
	}



	public String getPan() {
		return Pan;
	}



	public void setPan(String pan) {
		Pan = pan;
	}



	public String getPlantAddr() {
		return PlantAddr;
	}



	public void setPlantAddr(String plantAddr) {
		PlantAddr = plantAddr;
	}



	public String getRegOfficeAddr() {
		return RegOfficeAddr;
	}



	public void setRegOfficeAddr(String regOfficeAddr) {
		RegOfficeAddr = regOfficeAddr;
	}



	public String getTan() {
		return Tan;
	}



	public void setTan(String tan) {
		Tan = tan;
	}



	@Override
	public String toString() {
		return "NameChangeApplNewGenDetailmodel [id=" + id + ", ApplId=" + ApplId + ", BankAccountNo=" + BankAccountNo
				+ ", BankIfscCode=" + BankIfscCode + ", BankName=" + BankName + ", Cin=" + Cin + ", CompanyTypeCode="
				+ CompanyTypeCode + ", ContactDesignation=" + ContactDesignation + ", ContactEmail=" + ContactEmail
				+ ", ContactFullName=" + ContactFullName + ", ContactPhoneNo=" + ContactPhoneNo + ", Gst=" + Gst
				+ ", Pan=" + Pan + ", PlantAddr=" + PlantAddr + ", RegOfficeAddr=" + RegOfficeAddr + ", Tan=" + Tan
				+ ", getId()=" + getId() + ", getApplId()=" + getApplId() + ", getBankAccountNO()=" + getBankAccountNo()
				+ ", getBankIfscCode()=" + getBankIfscCode() + ", getBankName()=" + getBankName() + ", getCin()="
				+ getCin() + ", getCompanyTypeCode()=" + getCompanyTypeCode() + ", getContactDesignation()="
				+ getContactDesignation() + ", getContactEmail()=" + getContactEmail() + ", getContactFullName()="
				+ getContactFullName() + ", getContactPhoneNo()=" + getContactPhoneNo() + ", getGst()=" + getGst()
				+ ", getPan()=" + getPan() + ", getPlantAddr()=" + getPlantAddr() + ", getRegOfficeAddr()="
				+ getRegOfficeAddr() + ", getTan()=" + getTan() + ", getClass()=" + getClass() + ", hashCode()="
				+ hashCode() + ", toString()=" + super.toString() + "]";
	}



	public NameChangeApplNewGenDetailmodel() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	
	
	
	
	 
	

}
