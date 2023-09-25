package com.ss.oa.master.namechangeappl;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import com.ss.oashared.model.NameChangeApplPaymentmodel;

public interface NameChangeApplPaymentRepository extends JpaRepository<NameChangeApplPaymentmodel, String> {

	@Query(value = "SELECT * FROM T_NAME_TRANSFER_CHARGES_LINES WHERE T_APPL_ID = ?1 ", nativeQuery = true)
	List<NameChangeApplPaymentmodel> findByApplicationId(String ApplicationId);
	
	
}
