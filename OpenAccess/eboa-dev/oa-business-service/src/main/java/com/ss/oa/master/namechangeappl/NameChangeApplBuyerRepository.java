package com.ss.oa.master.namechangeappl;

import java.util.List;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ss.oashared.model.NameChangeApplBuyermodel;



@Repository
public interface NameChangeApplBuyerRepository extends JpaRepository<NameChangeApplBuyermodel, String>  {

	@Query(value = "SELECT * FROM T_NAME_TRANSFER_APPL_BUYER WHERE T_NAME_TRANSFER_APPL_ID = ?1", nativeQuery = true)
	List<NameChangeApplBuyermodel> findByApplicationId(String ApplicationId);
	
	
	@Query(value = "SELECT T_NAME_CHANGE_BUYER_SEQ.nextval FROM dual", nativeQuery=true)
	 Long getNextSeriesId();
	
	@Modifying
    @Transactional 
	@Query(value = "DELETE FROM T_NAME_TRANSFER_APPL_BUYER WHERE T_NAME_TRANSFER_APPL_ID=?1 AND"
			+ " M_COMPANY_SELLER_SERVICE_NO = ?2 ", nativeQuery=true)
	 void deletebyservice(String applid,String Serviceno);
	
}
