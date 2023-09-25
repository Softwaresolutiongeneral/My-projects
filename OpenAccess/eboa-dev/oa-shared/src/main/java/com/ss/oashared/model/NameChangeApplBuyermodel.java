package com.ss.oashared.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;

@Entity
@Table(name ="T_NAME_TRANSFER_APPL_BUYER")
public class NameChangeApplBuyermodel {
	
	@Id
	@Column(name="ID")
	private String Id;
	@Column(name="M_COMPANY_SELLER_ID")
	private String SellerId;
	@Column(name="M_COMPANY_SELLER_SERVICE_NO")
	private String SellerServiceNo;
	@Column(name="M_COMPANY_BUYER_SERVICE_ID")
	private String BuyerServiceId ;
	@Column(name="M_COMPANY_BUYER_SERVICE_NO")
	private String BuyerServiceNo;
	@Column(name="T_NAME_TRANSFER_APPL_ID")
	private String ApplicationId;
	@Column(name="BUYER_COMPANY_NAME")
	private String BuyerCompanyName;
	@Column(name="BUYER_ORG_ID")
	private String BuyerOrgId;
	@Column(name="BUYER_ORG_CODE")
	private String BuyerOrgCode;
	@Column(name="QUANTUM")
	private String Quantum;
	@Column(name="BUYER_INJECTION_VOLTAGE")
	private String BuyerInjectionVoltage;
	@Column(name="BUYER_INJECTION_VOLTAGE_NAME")
	private String BuyerInjectionVoltageName;
	@Column(name="DRAWAL_VOLTAGE_CODE")
	private String DrawalVoltageCode;
	@Column(name="DRAWAL_VOLTAGE_NAME")
	private String DrawalVoltageName;
	@Column(name="REMARKS")
	private String Remarks;
	@Column(name="CREATED_BY")
	private String CreatedBy;
	@Column(name="CREATED_DATE")
	private LocalDateTime CreatedDate;
	@Column(name="ENABLED")
	private String Enabled;
	@Column(name="SHARE_PERCENTAGE")
	private String SharePercentage;
	
	
	public String getSharePercentage() {
		return SharePercentage;
	}
	public void setSharePercentage(String sharePercentage) {
		SharePercentage = sharePercentage;
	}
	public String getId() {
		return Id;
	}
	public void setId(String id) {
		Id = id;
	}
	public String getSellerId() {
		return SellerId;
	}
	public void setSellerId(String sellerId) {
		SellerId = sellerId;
	}
	public String getSellerServiceNo() {
		return SellerServiceNo;
	}
	public void setSellerServiceNo(String sellerServiceNo) {
		SellerServiceNo = sellerServiceNo;
	}
	public String getBuyerServiceId() {
		return BuyerServiceId;
	}
	public void setBuyerServiceId(String buyerServiceId) {
		BuyerServiceId = buyerServiceId;
	}
	public String getBuyerServiceNo() {
		return BuyerServiceNo;
	}
	public void setBuyerServiceNo(String buyerServiceNo) {
		BuyerServiceNo = buyerServiceNo;
	}
	public String getApplicationId() {
		return ApplicationId;
	}
	public void setApplicationId(String applicationId) {
		ApplicationId = applicationId;
	}
	public String getBuyerCompanyName() {
		return BuyerCompanyName;
	}
	public void setBuyerCompanyName(String buyerCompanyName) {
		BuyerCompanyName = buyerCompanyName;
	}
	public String getBuyerOrgId() {
		return BuyerOrgId;
	}
	public void setBuyerOrgId(String buyerOrgId) {
		BuyerOrgId = buyerOrgId;
	}
	public String getBuyerOrgCode() {
		return BuyerOrgCode;
	}
	public void setBuyerOrgCode(String buyerOrgCode) {
		BuyerOrgCode = buyerOrgCode;
	}
	public String getQuantum() {
		return Quantum;
	}
	public void setQuantum(String quantum) {
		Quantum = quantum;
	}
	public String getBuyerInjectionVoltage() {
		return BuyerInjectionVoltage;
	}
	public void setBuyerInjectionVoltage(String buyerInjectionVoltage) {
		BuyerInjectionVoltage = buyerInjectionVoltage;
	}
	public String getBuyerInjectionVoltageName() {
		return BuyerInjectionVoltageName;
	}
	public void setBuyerInjectionVoltageName(String buyerInjectionVoltageName) {
		BuyerInjectionVoltageName = buyerInjectionVoltageName;
	}
	public String getDrawalVoltageCode() {
		return DrawalVoltageCode;
	}
	public void setDrawalVoltageCode(String drawalVoltageCode) {
		DrawalVoltageCode = drawalVoltageCode;
	}
	public String getDrawalVoltageName() {
		return DrawalVoltageName;
	}
	public void setDrawalVoltageName(String drawalVoltageName) {
		DrawalVoltageName = drawalVoltageName;
	}
	public String getRemarks() {
		return Remarks;
	}
	public void setRemarks(String remarks) {
		Remarks = remarks;
	}
	public String getCreatedBy() {
		return CreatedBy;
	}
	public void setCreatedBy(String createdBy) {
		CreatedBy = createdBy;
	}
	public LocalDateTime getCreatedDate() {
		return CreatedDate;
	}
	public void setCreatedDate(LocalDateTime createdDate) {
		CreatedDate = createdDate;
	}
	public String getEnabled() {
		return Enabled;
	}
	public void setEnabled(String enabled) {
		Enabled = enabled;
	}
	@Override
	public String toString() {
		return "NameChangeApplBuyermodel [Id=" + Id + ", SellerId=" + SellerId + ", SellerServiceNo=" + SellerServiceNo
				+ ", BuyerServiceId=" + BuyerServiceId + ", BuyerServiceNo=" + BuyerServiceNo + ", ApplicationId="
				+ ApplicationId + ", BuyerCompanyName=" + BuyerCompanyName + ", BuyerOrgId=" + BuyerOrgId
				+ ", BuyerOrgCode=" + BuyerOrgCode + ", Quantum=" + Quantum + ", BuyerInjectionVoltage="
				+ BuyerInjectionVoltage + ", BuyerInjectionVoltageName=" + BuyerInjectionVoltageName
				+ ", DrawalVoltageCode=" + DrawalVoltageCode + ", DrawalVoltageName=" + DrawalVoltageName + ", Remarks="
				+ Remarks + ", CreatedBy=" + CreatedBy + ", CreatedDate=" + CreatedDate + ", Enabled=" + Enabled
				+ ", getId()=" + getId() + ", getSellerId()=" + getSellerId() + ", getSellerServiceNo()="
				+ getSellerServiceNo() + ", getBuyerServiceId()=" + getBuyerServiceId() + ", getBuyerServiceNo()="
				+ getBuyerServiceNo() + ", getApplicationId()=" + getApplicationId() + ", getBuyerCompanyName()="
				+ getBuyerCompanyName() + ", getBuyerOrgId()=" + getBuyerOrgId() + ", getBuyerOrgCode()="
				+ getBuyerOrgCode() + ", getQuantum()=" + getQuantum() + ", getBuyerInjectionVoltage()="
				+ getBuyerInjectionVoltage() + ", getBuyerInjectionVoltageName()=" + getBuyerInjectionVoltageName()
				+ ", getDrawalVoltageCode()=" + getDrawalVoltageCode() + ", getDrawalVoltageName()="
				+ getDrawalVoltageName() + ", getRemarks()=" + getRemarks() + ", getCreatedBy()=" + getCreatedBy()
				+ ", getCreatedDate()=" + getCreatedDate() + ", getEnabled()=" + getEnabled() + ", getClass()="
				+ getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
	}
	public NameChangeApplBuyermodel(String id, String sellerId, String sellerServiceNo, String buyerServiceId,
			String buyerServiceNo, String applicationId, String buyerCompanyName, String buyerOrgId,
			String buyerOrgCode, String quantum, String buyerInjectionVoltage, String buyerInjectionVoltageName,
			String drawalVoltageCode, String drawalVoltageName, String remarks, String createdBy,
			LocalDateTime createdDate, String enabled) {
		super();
		Id = id;
		SellerId = sellerId;
		SellerServiceNo = sellerServiceNo;
		BuyerServiceId = buyerServiceId;
		BuyerServiceNo = buyerServiceNo;
		ApplicationId = applicationId;
		BuyerCompanyName = buyerCompanyName;
		BuyerOrgId = buyerOrgId;
		BuyerOrgCode = buyerOrgCode;
		Quantum = quantum;
		BuyerInjectionVoltage = buyerInjectionVoltage;
		BuyerInjectionVoltageName = buyerInjectionVoltageName;
		DrawalVoltageCode = drawalVoltageCode;
		DrawalVoltageName = drawalVoltageName;
		Remarks = remarks;
		CreatedBy = createdBy;
		CreatedDate = createdDate;
		Enabled = enabled;
	}
	public NameChangeApplBuyermodel() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

}
