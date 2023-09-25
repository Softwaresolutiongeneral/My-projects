package com.ss.oa.master.namechangeappl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ss.oashared.model.NameChangeApplNewGenDetailmodel;

public interface NameChangeApplNewGenDetailRepository extends JpaRepository<NameChangeApplNewGenDetailmodel, String> {

	
	
	@Query(value = "SELECT T_NAME_CHANGE_NEW_GEN_SEQ.nextval FROM dual", nativeQuery=true)
	 Long getNextSeriesId();
	
	
	
	@Query(value = "select * from T_NAME_TRANSFER_APPL_NEW_GEN_DETAIL where T_NAME_TRANSFER_APPL_ID = ?1", nativeQuery=true)
	NameChangeApplNewGenDetailmodel getbyapplid (String id);
	
	
	
	
	
}
