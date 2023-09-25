package com.ss.smartoffice.soservice.seed.paymentTerms;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss.smartoffice.shared.model.SmartOfficeException;

@RestController
@RequestMapping("seed/payment-terms")
@Scope("prototype")
public class PaymentTermsService {
	@Autowired
	PaymentTermsRepository paymentTermsRepository;
	
	@GetMapping
	public Iterable<PaymentTerms> getPaymentTerms() throws SmartOfficeException {
		return paymentTermsRepository.findAll();
	}

	@GetMapping("/{id}")
	public Optional<PaymentTerms> getPaymentTermsById(@PathVariable(value = "id") int id) throws SmartOfficeException {
		return paymentTermsRepository.findById(id);
	}
	
	@PostMapping
	public PaymentTerms addPaymentTerms(@RequestBody PaymentTerms paymentTerms) throws SmartOfficeException {
		return paymentTermsRepository.save(paymentTerms); 
	}
	
	@PatchMapping("/{id}")
	public PaymentTerms updatePaymentTerms(@RequestBody PaymentTerms paymentTerms) throws SmartOfficeException {
		return paymentTermsRepository.save(paymentTerms);
	}
	
	@DeleteMapping("/{id}")
	public void deletePaymentTerms(@PathVariable(value = "id") int id) throws SmartOfficeException {
		paymentTermsRepository.deleteById(id);

	}
}
