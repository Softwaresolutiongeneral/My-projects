package com.ss.oa.master.namechangeappl;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ss.oashared.model.NameChangeApplDocmodel;

public interface NameChangeApplDocRepositoory extends JpaRepository<NameChangeApplDocmodel, String> {

	
	@Query(value = "SELECT * FROM T_NAME_TRANSFER_APPL_DOC WHERE T_NAME_CHANGE_APPL_ID = ?1  AND DOC_CODE NOT IN ('DOCOA16','DOCOA17','DOCOA18') order by id ASC ", nativeQuery = true)
	List<NameChangeApplDocmodel> findByApplicationId(String ApplicationId);
	
	@Query(value = "SELECT * FROM T_NAME_TRANSFER_APPL_DOC WHERE T_NAME_CHANGE_APPL_ID = ?1 and DOC_CODE = ?2 and IS_UPLOADED = 'false' ", nativeQuery = true)
	NameChangeApplDocmodel findByApplicationIdanddocId(String ApplicationId,String Docid);
	
	@Query(value = "SELECT * FROM T_NAME_TRANSFER_APPL_DOC WHERE T_NAME_CHANGE_APPL_ID = ?1 and DOC_CODE = ?2 and IS_UPLOADED = 'true' ", nativeQuery = true)
	NameChangeApplDocmodel findByApplicationIdanddocIdforreset(String ApplicationId,String Docid);
	
	
}
