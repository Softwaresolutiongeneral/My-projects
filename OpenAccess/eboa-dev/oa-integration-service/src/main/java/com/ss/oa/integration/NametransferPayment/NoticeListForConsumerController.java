package com.ss.oa.integration.NametransferPayment;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import com.ss.oa.vo.NameTransferPayment;

//import com.google.gson.Gson;
//import com.google.gson.GsonBuilder;
//import com.iipl.tnebht.collection.OnlinePaymentService;
//import com.iipl.tnebht.consumer.OnlinePaymentReceiptBo;
//import com.iipl.tnebht.mail.BankListBo;
//import com.iipl.tnebht.mail.OnlinePaymentBo;
import com.ss.oashared.model.OaAppPayment;

@RestController
@RequestMapping("/noticeList")
public class NoticeListForConsumerController {

	@PersistenceContext
	protected EntityManager entityManager;

//	@Autowired
//	RegistrationService registrationService;
//
	@Autowired
	OnlinePaymentServiceDaoImpl onlinePaymentService;
//
	
	@Autowired
	private OaAppPaymentRepository oaAppPaymentRepository;
	
//	@RequestMapping(value = "/list", method = RequestMethod.GET)
//	public ModelAndView noticeList(HttpSession httpSession, HttpServletRequest httpServletRequest,
//			@RequestParam(value = "resultMsg", required = false) String resultMsg) {
//		ModelAndView mav = new ModelAndView("noticeList_list");
//		mav.addObject("resultMsg", resultMsg);
//
//		return mav;
//	}
//
//	@RequestMapping(value = "/paglist", method = RequestMethod.GET)
//	public @ResponseBody String paglist(HttpServletRequest request) {
//		request.setAttribute("tblName", "APPLICATION_MAS");
//		request.setAttribute("iDisplayLength", "10");
//		request.setAttribute("iDisplayStart", "0");
//		Object paginationList = registrationService.getNoticeListForConsumer(request);
//		Gson gson = new GsonBuilder().setPrettyPrinting().create();
//		String json2 = gson.toJson(paginationList);
//		return json2;
//
//	}
//
//	@RequestMapping(value = "/getRegistrationDetail", method = RequestMethod.GET)
//	public ModelAndView getStatusDetail(HttpServletRequest httpServletRequest, @RequestParam("ackNo") String ackNo,
//			@RequestParam("orgName") String orgName) {
//		ModelAndView mav = null;
//
//		ApplnFeasibilityM value = registrationService.getApplnFeasibilityMDetails(ackNo);
//
//		int regnFee = 0;
//		int emdFee = 0;
//		int totalFee = 0;
//
//		if (value != null) {
//			regnFee = value.getRegnFee();
//			emdFee = value.getEmdFee();
//			totalFee = value.getTotalFee();
//		}
//		
//		String htAppOlpCount = onlinePaymentService.getHtAppOlpDetails(ackNo, totalFee);
//
//		String htAppReconCount = onlinePaymentService.getHtAppReconDetails(ackNo, totalFee);
//
//		mav = new ModelAndView("notice_for_registration_details");
//		mav.addObject("regnFee", regnFee);
//		mav.addObject("emdFee", emdFee);
//		mav.addObject("totalFee", totalFee);
//		mav.addObject("ackNo", ackNo);
//		mav.addObject("orgName", orgName);
//		if (regnFee > 0) {
//			mav.addObject("checkRegFee", true);
//		} else {
//			mav.addObject("checkRegFee", false);
//		}
//
//		if (htAppOlpCount != null && htAppReconCount != null
//				&& (htAppOlpCount.equalsIgnoreCase("success") || htAppOlpCount.equalsIgnoreCase("pending"))) {
//			mav.addObject("checkRegPay", false);
//		} else {
//			mav.addObject("checkRegPay", true);
//		}
//		return mav;
//
//	}
//
//	@RequestMapping(value = "/getEstimationDetail", method = RequestMethod.GET)
//	public ModelAndView getEstimationDetail(HttpServletRequest httpServletRequest, @RequestParam("ackNo") String ackNo,
//			@RequestParam("orgName") String orgName) {
//		ModelAndView mav = null;
//
//		ApplnEstimationMas value = registrationService.getApplicationEstimationMasByAckNo(ackNo);
//
//		int devFee = 0;
//		int mcdFee = 0;
//		int ocFee = 0;
//		int totalFee = 0;
//		int estimationCharges = 0;
//
//		if (value.getDevAmnt() != null) {
//			devFee = Integer.valueOf(value.getDevAmnt().toString());
//			mcdFee = Integer.valueOf(value.getMcdAmnt().toString());
//			ocFee = Integer.valueOf(value.getOtherAmnt().toString());
//			totalFee = Integer.valueOf(value.getEstSanctionAmnt().toString());
//			estimationCharges = totalFee - (devFee + mcdFee + ocFee);
//		}
//		
//		String htAppOlpCount = onlinePaymentService.getHtAppOlpDetails(ackNo, totalFee);
//
//		String htAppReconCount = onlinePaymentService.getHtAppReconDetails(ackNo, totalFee);
//
//		mav = new ModelAndView("notice_for_estimation_details");
//		mav.addObject("devFee", devFee);
//		mav.addObject("mcdFee", mcdFee);
//		mav.addObject("ocFee", ocFee);
//		mav.addObject("totalFee", totalFee);
//		mav.addObject("estimationCharges", estimationCharges);
//		mav.addObject("ackNo", ackNo);
//		mav.addObject("orgName", orgName);
//		if (totalFee > 0) {
//			mav.addObject("checkEstFee", true);
//		} else {
//			mav.addObject("checkEstFee", false);
//		}
//
//		if (htAppOlpCount != null && htAppReconCount != null
//				&& (htAppOlpCount.equalsIgnoreCase("success") || htAppOlpCount.equalsIgnoreCase("pending"))) {
//			mav.addObject("checkEstPay", false);
//		} else {
//			mav.addObject("checkEstPay", true);
//		}
//		return mav;
//
//	}

	@PostMapping(value = "/pay")
	public NameTransferPayment pay(@RequestBody NameTransferPayment paymentdetails) {

		
       
		NameTransferPayment bankList = onlinePaymentService.findBankList(paymentdetails);
		
		
		System.out.println(bankList);

		return bankList;

	}
	
	@PostMapping(value = "/processpayment")
	public String ProcessPayment(@RequestBody NameTransferPayment paymentdetails) {

		
		try {
		String checksum=onlinePaymentService.onlinePay(paymentdetails);
		//System.out.println(bankList);

		return checksum;
		}
		catch(Exception e ){
			return "failure";
		}

	}
	
	
	@GetMapping(value = "/paymentvalidation")
    public String PaymentValidation(@RequestParam String BillNo) {
		String result = null;
		Date date = new Date();
		Timestamp ts = new Timestamp(date.getTime());
		
		try {
			
			
			OaAppPayment ValidBill =oaAppPaymentRepository.findByBillNo(BillNo);
			
			
			if (ValidBill != null) {
				
			System.out.println(ValidBill.getBillNo());
			
			if (ValidBill.getBillNo().equals(BillNo)) {
				result = BillNo +"|"+"0"+"|"+ ts + "|true";
				return result;
			}
			
			
			}
			else {
				result = BillNo +"|" +"0"+"|"+ ts + "|false";
				return result;
			}
		
		}
			
		catch(Exception e ){
			System.out.println(e);
			return BillNo +"|" +"0"+"|"+ ts + "|false";
		}
		return BillNo +"|" +"0"+"|"+ ts + "|false";

	}
    
	
	
	
	
	
	
	
//	@RequestMapping(value = "/onlinePaymentReceipt", method = RequestMethod.GET)
//	public @ResponseBody ModelAndView onlinePaymentReceipt(HttpSession httpSession,
//			HttpServletRequest httpServletRequest,
//			@RequestParam("onlinePaymentReceipt") OnlinePaymentReceiptBo onlinePaymentReceipt) {
//		ModelAndView mav = new ModelAndView("onlinePaymentNotice");
//		mav.addObject("onlinePaymentReceipt", onlinePaymentReceipt);
//		return mav;
//	}
//
//	@RequestMapping(value = "/onlinePayment", method = RequestMethod.GET)
//	public @ResponseBody String onlinePayment(HttpSession httpSession, HttpServletRequest httpServletRequest,
//			@RequestParam("code") String bankCode, @RequestParam("consumerNo") String consumerNo,
//			@RequestParam("Description") String Description, @RequestParam("totalFee") String totalFee, RedirectAttributes redirectAttributes) {
//
//		OnlinePaymentBo onlinePayBo = new OnlinePaymentBo();
//		onlinePayBo.setConsumerNo(consumerNo);
//		onlinePayBo.setCode(bankCode);
//		onlinePayBo.setDescription(Description);
//		onlinePayBo.setTotalFee(totalFee);
//		String bankList = onlinePaymentService.onlinePay(onlinePayBo, httpSession);
//
//		System.out.println(bankList);
//
//		return bankList;
//
//	}

	@RequestMapping(value = "/reDirectURL")
	public void reDirectURL(HttpSession httpSession, HttpServletRequest httpServletRequest,
			@RequestParam("ackNo") String ackNo, @RequestParam("bankCode") String bankCode,
			@RequestParam("bankName") String bankName,
			@RequestParam(value = "resultMsg", required = false) String resultMsg,
			RedirectAttributes redirectAttributes) {

		HttpServletResponse response = null;
		String url = null;

		try {
			response.sendRedirect(url);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
