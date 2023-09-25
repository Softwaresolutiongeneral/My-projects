package com.ss.oashared.model;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.context.annotation.Scope;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Table(name="T_NAME_CHANGE_APPL")
@Entity

public class NameChangeApplmodel {
	@Id
	@Column(name="ID")
	private Integer id ;
	@Column(name="M_COMPANY_SERVICE_ID")
	private String ServiceId;
	@Column(name="M_COMPANY_EXSITING_NAME") 
	private String ServiceExsitingName;
	@Column(name="M_COMPANY_NEW_NAME")  
	private String ServiceNewName;
	@Column(name="FLOW_TYPE") 
	private String Flowtype;
	@Column(name="FUEL_TYE_CODE")
	private String FuelTypeCode;
	@Column(name="TYPE_OF_SS") 
	private String  TypeOfSs;
	@Column(name="APPL_STATUS") 
	private String ApplStatus;
	@Column(name="CREATE_DATE") 
	private LocalDateTime CreatedDate;
	@Column(name="CREATED_BY") 
	private String CreatedBy;
	@Column(name="APPL_FLOWTYPE")  
	private String ApplFlowType;
	@Column(name="APPL_SCHEME")
	private String ApplScheme;
	@Column(name="M_COMPANY_SERVICE_NO")
	private String ServiceNo;
	@Column(name="DATE_OF_COMMISSION")
	private String DateOfCommission;
	@Column(name="SCHEME")
	private String IsRec;
	@Column(name="INJECTION_VOLTAGE")
	private String InjectionVoltage;
	@Column(name="M_SUBSTATION_NAME")
	private String SubstationName;
	@Column(name="CAPACITY")
	private String Capacity;
	@Column(name="AGGREMENT_VALIDITY_DATE")
	private String AggrementValidityDate;
	@Column(name="TYPE_OF_APPLICATION")
	private String Typeofappl;
	@Column(name="TOTAL_CHARGES")
	private String TotalCharges;
	@Column(name="CUS_ADDR")
	private String CusAddrs;
	@Column(name="IS_PAID")
	private String Ispaid;
	@Column(name="APPL_REMARKS")
	private String ApplRemarks;
	@Column(name="IS_ORDERCOPY_UPLOADED")
	private String Isordercopyuploaded;
	
	
	@Transient
	private List<NameChangeApplBuyermodel> BuyerDetailsList; 
	@Transient
	private List<NameChangeApplDocmodel> DocumentList; 
	
	@Transient
	private List<NameChangeApplPaymentmodel> BillPayment; 
	
	@Transient
	private  NameChangeApplNewGenDetailmodel NewGenDetails; 
	
	@Transient
	private  List<NameChangeApplStatuslogmodel> ApplStatusList; 
	
	
	
	
	public List<NameChangeApplStatuslogmodel> getApplStatusList() {
		return ApplStatusList;
	}
	public void setApplStatusList(List<NameChangeApplStatuslogmodel> applStatusList) {
		ApplStatusList = applStatusList;
	}
	public NameChangeApplNewGenDetailmodel getNewGenDetails() {
		return NewGenDetails;
	}
	public void setNewGenDetails(NameChangeApplNewGenDetailmodel newGenDetails) {
		NewGenDetails = newGenDetails;
	}
	public String getApplRemarks() {
		return ApplRemarks;
	}
	public void setApplRemarks(String applRemarks) {
		ApplRemarks = applRemarks;
	}
	
	
	
	public String getIsordercopyuploaded() {
		return Isordercopyuploaded;
	}
	public void setIsordercopyuploaded(String isordercopyuploaded) {
		Isordercopyuploaded = isordercopyuploaded;
	}
	public String getIspaid() {
		return Ispaid;
	}
	public void setIspaid(String ispaid) {
		Ispaid = ispaid;
	}
	public String getCusAddrs() {
		return CusAddrs;
	}
	public void setCusAddrs(String cusAddrs) {
		CusAddrs = cusAddrs;
	}
	public String getTotalCharges() {
		return TotalCharges;
	}
	public void setTotalCharges(String totalCharges) {
		TotalCharges = totalCharges;
	}
	public List<NameChangeApplPaymentmodel> getBillPayment() {
		return BillPayment;
	}
	public void setBillPayment(List<NameChangeApplPaymentmodel> billPayment) {
		BillPayment = billPayment;
	}
	public String getTypeofappl() {
		return Typeofappl;
	}
	public void setTypeofappl(String typeofappl) {
		Typeofappl = typeofappl;
	}
	public String getCapacity() {
		return Capacity;
	}
	public void setCapacity(String capacity) {
		Capacity = capacity;
	}
	public String getAggrementValidityDate() {
		return AggrementValidityDate;
	}
	public void setAggrementValidityDate(String aggrementValidityDate) {
		AggrementValidityDate = aggrementValidityDate;
	}
	public String getInjectionVoltage() {
		return InjectionVoltage;
	}
	public void setInjectionVoltage(String injectionVoltage) {
		InjectionVoltage = injectionVoltage;
	}
	public String getSubstationName() {
		return SubstationName;
	}
	public void setSubstationName(String substationName) {
		SubstationName = substationName;
	}
	public String getDateOfCommission() {
		return DateOfCommission;
	}
	public void setDateOfCommission(String dateOfCommission) {
		DateOfCommission = dateOfCommission;
	}
	public String getIsRec() {
		return IsRec;
	}
	public void setIsRec(String isRec) {
		IsRec = isRec;
	}
	public Number getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getServiceId() {
		return ServiceId;
	}
	public void setServiceId(String serviceId) {
		ServiceId = serviceId;
	}
	public String getServiceExsitingName() {
		return ServiceExsitingName;
	}
	public void setServiceExsitingName(String serviceExsitingName) {
		ServiceExsitingName = serviceExsitingName;
	}
	public String getServiceNewName() {
		return ServiceNewName;
	}
	public void setServiceNewName(String serviceNewName) {
		ServiceNewName = serviceNewName;
	}
	public String getFlowtype() {
		return Flowtype;
	}
	public void setFlowtype(String flowtype) {
		Flowtype = flowtype;
	}
	public String getFuelTypeCode() {
		return FuelTypeCode;
	}
	public void setFuelTypeCode(String fuelTypeCode) {
		FuelTypeCode = fuelTypeCode;
	}
	public String getTypeOfSs() {
		return TypeOfSs;
	}
	public void setTypeOfSs(String typeOfSs) {
		TypeOfSs = typeOfSs;
	}
	public String getApplStatus() {
		return ApplStatus;
	}
	public void setApplStatus(String applStatus) {
		ApplStatus = applStatus;
	}
	public LocalDateTime getCreatedDate() {
		return CreatedDate;
	}
	public void setCreatedDate(LocalDateTime createdDate) {
		CreatedDate = createdDate;
	}
	public String getCreatedBy() {
		return CreatedBy;
	}
	public void setCreatedBy(String createdBy) {
		CreatedBy = createdBy;
	}
	public String getApplFlowType() {
		return ApplFlowType;
	}
	public void setApplFlowType(String applFlowType) {
		ApplFlowType = applFlowType;
	}
	public String getApplScheme() {
		return ApplScheme;
	}
	public void setApplScheme(String applScheme) {
		ApplScheme = applScheme;
	}
	public String getServiceNo() {
		return ServiceNo;
	}
	public void setServiceNo(String serviceNo) {
		ServiceNo = serviceNo;
	}
	
	public List<NameChangeApplBuyermodel> getBuyerDetailsList() {
		return BuyerDetailsList;
	}
	public void setBuyerDetailsList(List<NameChangeApplBuyermodel> buyerDetailsList) {
		BuyerDetailsList = buyerDetailsList;
	}
	
	public List<NameChangeApplDocmodel> getDocumentList() {
		return DocumentList;
	}
	public void setDocumentList(List<NameChangeApplDocmodel> documentList) {
		DocumentList = documentList;
	}
	
	@Override
	public String toString() {
		return "NameChangeApplmodel [id=" + id + ", ServiceId=" + ServiceId + ", ServiceExsitingName="
				+ ServiceExsitingName + ", ServiceNewName=" + ServiceNewName + ", Flowtype=" + Flowtype
				+ ", FuelTypeCode=" + FuelTypeCode + ", TypeOfSs=" + TypeOfSs + ", ApplStatus=" + ApplStatus
				+ ", CreatedDate=" + CreatedDate + ", CreatedBy=" + CreatedBy + ", ApplFlowType=" + ApplFlowType
				+ ", ApplScheme=" + ApplScheme + ", ServiceNo=" + ServiceNo + ", DateOfCommission=" + DateOfCommission
				+ ", IsRec=" + IsRec + ", InjectionVoltage=" + InjectionVoltage + ", SubstationName=" + SubstationName
				+ ", Capacity=" + Capacity + ", AggrementValidityDate=" + AggrementValidityDate + ", Typeofappl="
				+ Typeofappl + ", TotalCharges=" + TotalCharges + ", CusAddrs=" + CusAddrs + ", Ispaid=" + Ispaid
				+ ", ApplRemarks=" + ApplRemarks + ", BuyerDetailsList=" + BuyerDetailsList + ", DocumentList="
				+ DocumentList + ", BillPayment=" + BillPayment + ", NewGenDetails=" + NewGenDetails
				+ ", ApplStatusList=" + ApplStatusList + "]";
	}
	public NameChangeApplmodel(Integer id, String serviceId, String serviceExsitingName, String serviceNewName,
			String flowtype, String fuelTypeCode, String typeOfSs, String applStatus, LocalDateTime createdDate,
			String createdBy, String applFlowType, String applScheme, String serviceNo) {
		super();
		this.id = id;
		ServiceId = serviceId;
		ServiceExsitingName = serviceExsitingName;
		ServiceNewName = serviceNewName;
		Flowtype = flowtype;
		FuelTypeCode = fuelTypeCode;
		TypeOfSs = typeOfSs;
		ApplStatus = applStatus;
		CreatedDate = createdDate;
		CreatedBy = createdBy;
		ApplFlowType = applFlowType;
		ApplScheme = applScheme;
		ServiceNo = serviceNo;
	}
	public NameChangeApplmodel() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	

}
