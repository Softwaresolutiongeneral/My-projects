package com.ss.oa.oadocumentservice.vo;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name ="T_NAME_TRANSFER_CHARGES_LINES")
public class NameChangeApplPaymentmodel {
	@Id
	@Column(name="ID")
	private String Id;
	@Column(name="T_APPL_ID" ) 
	private String Applid;
	@Column(name="CHARGE_CODE") 
	private String Chargecode;
	@Column(name="CHARGE_DESC")
	private String ChargeDesc;
	@Column(name="CHARGE_TOTAL_AMOUNT" )
	private String ChargeTotalAmount;
	@Column(name="AC_HEAD_CHARGE")
	private String AcHeadCharge;
	@Column(name="CREATED_DATE" ) 
	private String CreatedDate;
	public String getId() {
		return Id;
	}
	public void setId(String id) {
		Id = id;
	}
	public String getApplid() {
		return Applid;
	}
	public void setApplid(String applid) {
		Applid = applid;
	}
	public String getChargecode() {
		return Chargecode;
	}
	public void setChargecode(String chargecode) {
		Chargecode = chargecode;
	}
	public String getChargeDesc() {
		return ChargeDesc;
	}
	public void setChargeDesc(String chargeDesc) {
		ChargeDesc = chargeDesc;
	}
	public String getChargeTotalAmount() {
		return ChargeTotalAmount;
	}
	public void setChargeTotalAmount(String chargeTotalAmount) {
		ChargeTotalAmount = chargeTotalAmount;
	}
	public String getAcHeadCharge() {
		return AcHeadCharge;
	}
	public void setAcHeadCharge(String acHeadCharge) {
		AcHeadCharge = acHeadCharge;
	}
	public String getCreatedDate() {
		return CreatedDate;
	}
	public void setCreatedDate(String createdDate) {
		CreatedDate = createdDate;
	}
	@Override
	public String toString() {
		return "NameChangeApplPaymentmodel [Id=" + Id + ", Applid=" + Applid + ", Chargecode=" + Chargecode
				+ ", ChargeDesc=" + ChargeDesc + ", ChargeTotalAmount=" + ChargeTotalAmount + ", AcHeadCharge="
				+ AcHeadCharge + ", CreatedDate=" + CreatedDate + ", getId()=" + getId() + ", getApplid()="
				+ getApplid() + ", getChargecode()=" + getChargecode() + ", getChargeDesc()=" + getChargeDesc()
				+ ", getChargeTotalAmount()=" + getChargeTotalAmount() + ", getAcHeadCharge()=" + getAcHeadCharge()
				+ ", getCreatedDate()=" + getCreatedDate() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode()
				+ ", toString()=" + super.toString() + "]";
	}
	public NameChangeApplPaymentmodel() {
		super();
		// TODO Auto-generated constructor stub
	}
	public NameChangeApplPaymentmodel(String id, String applid, String chargecode, String chargeDesc,
			String chargeTotalAmount, String acHeadCharge, String createdDate) {
		super();
		Id = id;
		Applid = applid;
		Chargecode = chargecode;
		ChargeDesc = chargeDesc;
		ChargeTotalAmount = chargeTotalAmount;
		AcHeadCharge = acHeadCharge;
		CreatedDate = createdDate;
	}
	
	
	
	


}
	
	
	