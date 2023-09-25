package com.ss.oashared.model;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;

import java.time.LocalDateTime;

import javax.persistence.Column;

@Entity
@Table(name ="T_NAME_TRANSFER_APPL_DOC")
public class NameChangeApplDocmodel {
	@Id
	@Column(name="ID")
	private String Id;
	
	
	@Column(name="DOC_CODE" ) 
	private String DocCode;
	@Column(name="DOC_NAME") 
	private String DocName;
	@Column(name="DOC_DESC")
	private String DocDesc;
	@Column(name="T_NAME_CHANGE_APPL_ID" )
	private String ApplicationId;
	@Column(name="CREATED_DATE")
	private LocalDateTime CreatedDate;
	@Column(name="CREATED_BY" ) 
	private String CreatedBy;
	@Column(name="IS_UPLOADED")
	private String IsUploaded;
	@Column(name="DOC_PATH")
	private String Documentpath;
	
	
	
	
	public String getDocumentpath() {
		return Documentpath;
	}
	public void setDocumentpath(String documentpath) {
		Documentpath = documentpath;
	}
	public String getId() {
		return Id;
	}
	public void setId(String id) {
		Id = id;
	}
	public String getDocCode() {
		return DocCode;
	}
	public void setDocCode(String docCode) {
		DocCode = docCode;
	}
	public String getDocName() {
		return DocName;
	}
	public void setDocName(String docName) {
		DocName = docName;
	}
	public String getDocDesc() {
		return DocDesc;
	}
	public void setDocDesc(String docDesc) {
		DocDesc = docDesc;
	}
	public String getApplicationId() {
		return ApplicationId;
	}
	public void setApplicationId(String applicationId) {
		ApplicationId = applicationId;
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
	public String getIsUploaded() {
		return IsUploaded;
	}
	public void setIsUploaded(String isUploaded) {
		IsUploaded = isUploaded;
	}
	@Override
	public String toString() {
		return "NameChangeApplDocmodel [Id=" + Id + ", DocCode=" + DocCode + ", DocName=" + DocName + ", DocDesc="
				+ DocDesc + ", ApplicationId=" + ApplicationId + ", CreatedDate=" + CreatedDate + ", CreatedBy="
				+ CreatedBy + ", IsUploaded=" + IsUploaded + ", getId()=" + getId() + ", getDocCode()=" + getDocCode()
				+ ", getDocName()=" + getDocName() + ", getDocDesc()=" + getDocDesc() + ", getApplicationId()="
				+ getApplicationId() + ", getCreatedDate()=" + getCreatedDate() + ", getCreatedBy()=" + getCreatedBy()
				+ ", getIsUploaded()=" + getIsUploaded() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode()
				+ ", toString()=" + super.toString() + "]";
	}
	public NameChangeApplDocmodel(String id, String docCode, String docName, String docDesc, String applicationId,
			LocalDateTime createdDate, String createdBy, String isUploaded) {
		super();
		Id = id;
		DocCode = docCode;
		DocName = docName;
		DocDesc = docDesc;
		ApplicationId = applicationId;
		CreatedDate = createdDate;
		CreatedBy = createdBy;
		IsUploaded = isUploaded;
	}
	public NameChangeApplDocmodel() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	

}
