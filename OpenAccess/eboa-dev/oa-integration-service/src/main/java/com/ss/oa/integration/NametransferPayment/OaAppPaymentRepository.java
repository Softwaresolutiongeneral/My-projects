package com.ss.oa.integration.NametransferPayment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ss.oashared.model.NameChangeApplDocmodel;
import com.ss.oashared.model.OaAppPayment;

@Repository
public interface OaAppPaymentRepository extends JpaRepository<OaAppPayment, String>   {

	
	@Query(value = "SELECT * FROM OA_APP_OLP WHERE BILL_NO = ?1 ", nativeQuery = true)
	OaAppPayment findByBillNo(String BillNo);
	
}
