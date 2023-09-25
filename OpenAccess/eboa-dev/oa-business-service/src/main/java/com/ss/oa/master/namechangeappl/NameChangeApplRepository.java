package com.ss.oa.master.namechangeappl;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ss.oashared.model.NameChangeApplmodel;




@Repository
public interface NameChangeApplRepository extends JpaRepository<NameChangeApplmodel, Integer> {

	
	
	@Query(value = "SELECT * FROM T_NAME_CHANGE_APPL WHERE APPL_STATUS  =  ?1  and APPL_STATUS NOT IN ('DRAFT','RE-SUBMITTED')   AND  M_ORG_ID = ?2 ", nativeQuery = true)
	List<NameChangeApplmodel> getAllApplByStatusandorgid(String Status,String orgid);
	@Query(value = "SELECT * FROM T_NAME_CHANGE_APPL WHERE APPL_STATUS =  ?1 and APPL_STATUS NOT IN ('DRAFT','RE-SUBMITTED') ", nativeQuery = true)
	List<NameChangeApplmodel> getAllApplByStatus(String Status);
	@Query(value = "SELECT * FROM T_NAME_CHANGE_APPL WHERE APPL_STATUS NOT IN ('DRAFT','RE-SUBMITTED')  AND  M_ORG_ID = ?1", nativeQuery = true)
	List<NameChangeApplmodel> getAllApplByorgid(String orgid);
	
	@Query(value = "SELECT * FROM T_NAME_CHANGE_APPL WHERE APPL_STATUS NOT IN ('DRAFT','RE-SUBMITTED')", nativeQuery = true)
	List<NameChangeApplmodel> getAllAppl();
	
	@Modifying
    @Transactional 
	@Query(value = "UPDATE T_NAME_CHANGE_APPL SET APPL_STATUS = ?2 WHERE ID = ?1 ", nativeQuery=true)
	           void  
	           ApproveApplication(String ApplicationId,String ApplicationStatus);
	
	@Query(value = "SELECT * FROM T_NAME_CHANGE_APPL WHERE M_COMPANY_SERVICE_NO = ?1 ", nativeQuery = true)
	NameChangeApplmodel getAllApplByServiceNo(String ServiceNo);
	
	
	@Query(value = "SELECT * FROM T_NAME_CHANGE_APPL WHERE ID = ?1 ", nativeQuery = true)
	NameChangeApplmodel getAllApplById(String ApplId);
    
	
	
	@Query(value = "SELECT * FROM T_NAME_CHANGE_APPL WHERE APPL_STATUS IN ('PAYMENT RECEIVED','UNDER APPROVAL BY NCES-AEE','UNDER APPROVAL BY NCES-EE','UNDER APPROVAL BY NCES-SE','UNDER APPROVAL BY NCES-CE','UNDER EE APPROVE FOR ORDER ISSUE','APPROVAL ISSUED')", nativeQuery = true)
	List<NameChangeApplmodel> getallpaymentrecieved();
	
	
	
}
