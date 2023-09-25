package com.ss.oashared.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="T_NAME_TRANSFER_STATUS_LOG")
public class NameChangeApplStatuslogmodel {
	
	@Id
	@Column(name="ID")
	private String Id;
	@Column(name="T_APPL_ID" ) 
	private String Applid;
	@Column(name="APPL_STATUS") 
	private String ApplStatus;
	@Column(name="APPL_REMARKS")
	private String ApplRemarks;
	@Column(name="CREATED_DATE" )
	private Date CreatedDate;
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
	public String getApplStatus() {
		return ApplStatus;
	}
	public void setApplStatus(String applStatus) {
		ApplStatus = applStatus;
	}
	public String getApplRemarks() {
		return ApplRemarks;
	}
	public void setApplRemarks(String applRemarks) {
		ApplRemarks = applRemarks;
	}
	public Date getCreatedDate() {
		return CreatedDate;
	}
	public void setCreatedDate(Date createdDate) {
		CreatedDate = createdDate;
	}
	@Override
	public String toString() {
		return "NameChangeApplStatuslogmodel [Id=" + Id + ", Applid=" + Applid + ", ApplStatus=" + ApplStatus
				+ ", ApplRemarks=" + ApplRemarks + ", CreatedDate=" + CreatedDate + ", getId()=" + getId()
				+ ", getApplid()=" + getApplid() + ", getApplStatus()=" + getApplStatus() + ", getApplRemarks()="
				+ getApplRemarks() + ", getCreatedDate()=" + getCreatedDate() + ", getClass()=" + getClass()
				+ ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
	}
	public NameChangeApplStatuslogmodel(String id, String applid, String applStatus, String applRemarks,
			Date createdDate) {
		super();
		Id = id;
		Applid = applid;
		ApplStatus = applStatus;
		ApplRemarks = applRemarks;
		CreatedDate = createdDate;
	}
	
	public NameChangeApplStatuslogmodel() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	
	
	
	

	
}
