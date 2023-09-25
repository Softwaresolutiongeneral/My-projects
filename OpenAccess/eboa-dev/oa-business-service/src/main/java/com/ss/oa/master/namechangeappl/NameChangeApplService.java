package com.ss.oa.master.namechangeappl;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.ParameterMode;
import javax.persistence.PersistenceContext;
import javax.persistence.StoredProcedureQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDateTime;

import com.ss.oa.common.OpenAccessException;
import com.ss.oa.master.generatorhis.GeneratorhisRepository;
import com.ss.oa.master.generatorhis.TraderelationshipRepository;
import com.ss.oa.master.generatorhis.VcompanyserviceRepository;
import com.ss.oa.master.vo.Generatorhis;
import com.ss.oa.master.vo.VCompanyServiceHis;
import com.ss.oa.model.master.VtradeRelationship;
import com.ss.oa.transaction.vo.QuantumAllocation;

import com.ss.oashared.model.NameChangeApplmodel;
import com.ss.oashared.model.PrintPayload;
import com.ss.oashared.model.NameChangeApplDocmodel;
import com.ss.oashared.model.NameChangeApplNewGenDetailmodel;
import com.ss.oashared.model.NameChangeApplPaymentmodel;
import com.ss.oashared.common.CommonUtils;
import com.ss.oashared.model.NameChangeApplBuyermodel;
import com.ss.oashared.model.NameChangeApplStatuslogmodel;


@RestController
@RequestMapping(path ="/master/generatordetails")
public class NameChangeApplService {
	
	
	@Autowired 
	NameChangeApplRepository namechangeapplrepo ;
	
	@Autowired
	NameChangeApplDocRepositoory nameChangeApplDocRepositoory;
	
	@Autowired
	NameChangeApplNewGenDetailRepository namechangenewgenrepo;
	
	@Autowired
	NameChangeApplBuyerRepository namechangeapplbuyerrepo;
	
	@Autowired
	CommonUtils commonUtils;
	
	@Autowired
	NameChangeAppStatusRepository namechangeapplstatusrepository; 
	
	@Autowired
	NameChangeApplPaymentRepository namechangeapplpaymentrepository;
	
	@Autowired
	TraderelationshipRepository tradeRepo;
	
	
	
	@PersistenceContext
    private EntityManager entityManager;
	
	//to get generator details by serviceno
		@CrossOrigin(value ="*")
		@GetMapping("/{mCompServNumber}")
		public Optional<NameChangeApplmodel> getByServiceNo(@PathVariable(value="mCompServNumber") String mCompServNumber){
		
			 //"login" this is the name of your procedure
			Optional<NameChangeApplmodel> ServiceDetails = java.util.Optional.empty();
			try {
				
				 System.out.println("came 2");
	        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("NAME_TRANSFER_APPL.IMPORT_NAME_TRANSFER_APPL"); 
	       
	        //Declare the parameters in the same order
	        query.registerStoredProcedureParameter(1, String.class, ParameterMode.IN);
	        query.registerStoredProcedureParameter(2, String.class, ParameterMode.OUT);
	        query.registerStoredProcedureParameter(3, String.class, ParameterMode.OUT);

	        //Pass the parameter values
	        query.setParameter(1, mCompServNumber);
	        

	        //Execute query
	        
	        query.execute();
	        
	        //Get output parameters
	        String Applid = (String) query.getOutputParameterValue(2);
	        String outMessage = (String) query.getOutputParameterValue(3);
			
			
			
			
			
			System.out.println(Applid);
		    ServiceDetails = namechangeapplrepo.findById(Integer.parseInt(Applid));
			
			List<NameChangeApplBuyermodel> ServiceBuyerDetails = namechangeapplbuyerrepo.findByApplicationId(Applid);
			List<NameChangeApplDocmodel> ServiceDocumentsDetails = nameChangeApplDocRepositoory.findByApplicationId(Applid);
		    List<NameChangeApplPaymentmodel> ServicePaymentDetails = namechangeapplpaymentrepository.findByApplicationId(Applid);
			NameChangeApplNewGenDetailmodel ServiceNewGenDetails = namechangenewgenrepo.getbyapplid(Applid);
			List<NameChangeApplStatuslogmodel> ServiceApplLog = namechangeapplstatusrepository.findAll();
			ServiceDetails.get().setBuyerDetailsList(ServiceBuyerDetails);
			ServiceDetails.get().setDocumentList(ServiceDocumentsDetails);
			ServiceDetails.get().setBillPayment(ServicePaymentDetails);
			ServiceDetails.get().setNewGenDetails(ServiceNewGenDetails);
			ServiceDetails.get().setApplStatusList(ServiceApplLog);
			return ServiceDetails;
			}
			catch(Exception e){
				System.out.println(e);
				return ServiceDetails;
				
			}
			//System.out.println(namechangeapplbuyerrepo.findAll()+"---------ddsdfsfdssdaf------------");
			
		}
		
		@CrossOrigin(value ="*")
		@GetMapping("applied/{mCompServNumber}")
		public String getByServiceNoApplied(@PathVariable(value="mCompServNumber") String mCompServNumber){
		
		NameChangeApplmodel ServiceDetails ;
        ServiceDetails = namechangeapplrepo.getAllApplByServiceNo(mCompServNumber);
        if (ServiceDetails != null) {
            
            return "success";
        } else {
            
            return "failure";
        }
		}

	
		 @CrossOrigin(value ="*")
		 @PostMapping("/upload")
		 @ResponseStatus(HttpStatus.OK)
		 @ResponseBody
		  public String hello(@RequestBody MultipartFile file ,@RequestParam String documentname,
				  @RequestParam String documentcode,@RequestParam String documentuplodedby,@RequestParam String applicaionid  ) {
			 System.out.println(documentname+"-------qwqw");
			  String fileName = applicaionid+"--"+documentcode+documentname+".pdf";  
			  System.out.println(file.getName());
			    
			    try {
			    	if (file.isEmpty()) {
						throw new OpenAccessException("Failed to store empty file.");
					}
			    if (file.getSize() > 2000000) {
			    	throw new OpenAccessException("File is too large to store");
			    }
			      file.transferTo( new File("/opt/oa/data/files/" + fileName));
			     //file.transferTo( new File("C:\\upload\\" + fileName));

			      if(documentcode.equals("DOCOA2")) {
			    	 NameChangeApplmodel appl = namechangeapplrepo.getAllApplById(applicaionid);
			    	 appl.setApplStatus("NOC-ISSUED-BY-EDC");
			    	 namechangeapplrepo.save(appl);
			      }
			      NameChangeApplDocmodel docdetails = nameChangeApplDocRepositoory.findByApplicationIdanddocId(applicaionid, documentcode);
			      docdetails.setIsUploaded("true");
			      docdetails.setCreatedBy(documentuplodedby);
			      nameChangeApplDocRepositoory.save(docdetails);
			      
			      
			    } catch (Exception e) {
			    	System.out.println(e);
			      return "error";
			    } 
			    return "success";
			  }
		 
//		 @CrossOrigin(value ="*")
//			@GetMapping("/trade/{sellerCompServiceNumber}")
//			public List<VtradeRelationship> getBuyer(@PathVariable(value="sellerCompServiceNumber") String sellerCompServiceNumber){
//				return tradeRepo.findBySellerCompServiceNumber(sellerCompServiceNumber);
//				
//			}
		 
		
		 
		 @CrossOrigin(value ="*")
		 @PostMapping("/savedetails")
		 public Optional<NameChangeApplmodel> Savedetails(@RequestBody NameChangeApplmodel applicationdetls) {
			 
			 Optional<NameChangeApplmodel> applicationdetails = java.util.Optional.empty();
			 try {
			 System.out.println(applicationdetls);
			// namechangeapplbuyerrepo.saveAll(applicationdetls.getBuyerDetailsList());
		     namechangeapplrepo.save(applicationdetls);
		  
			 namechangeapplbuyerrepo.deletebyservice(applicationdetls.getId().toString(),applicationdetls.getServiceNo());
			 
			 
			 for (NameChangeApplBuyermodel buyerlist: applicationdetls.getBuyerDetailsList()) {
				 
				buyerlist.setId(namechangeapplbuyerrepo.getNextSeriesId().toString());
				 namechangeapplbuyerrepo.save(buyerlist);
				 
			 }
			 
				
			 }
			 catch (Exception e) {
				 System.out.println(e);
			 }
			 
			 
			 
			 return applicationdetails;
		 }
		 
		 @CrossOrigin(value ="*")
		 @PostMapping("/resetfile")
		 public String ResetFile(@RequestBody NameChangeApplDocmodel ResetDoc) {
		 
			 
			 try {
				 
				 NameChangeApplDocmodel docdetails = nameChangeApplDocRepositoory.
						 findByApplicationIdanddocIdforreset(ResetDoc.getApplicationId(),ResetDoc.getDocCode());
				 
				 docdetails.setIsUploaded("false");
				 nameChangeApplDocRepositoory.save(docdetails);
				 return "success"; 
			 }
			 catch (Exception e ) {
				 System.out.println(e);
				 return "failure";
				 
			 }
			 }
			 
		 
			
		 @CrossOrigin(value ="*")
		 @PostMapping("/Submit")
		 public String Submission(@RequestBody NameChangeApplmodel ApplicationSubmission) {
			 
			 try {
				 
				 if(ApplicationSubmission.getApplStatus().equals("DRAFT")) {
					 ApplicationSubmission.setApplStatus("SUBMITTED");
				 }
				 if(ApplicationSubmission.getApplStatus().equals("RE-SUBMITTED")) {
					 ApplicationSubmission.setApplStatus("NOC-ISSUED-BY-EDC");
				 }
				
				 namechangeapplrepo.save(ApplicationSubmission);
				 nameChangeApplDocRepositoory.saveAll(ApplicationSubmission.getDocumentList());
			     namechangeapplbuyerrepo.saveAll(ApplicationSubmission.getBuyerDetailsList());
				  return "success";
			 }
			 catch (Exception e) {
				 
				 System.out.println(e);
				 return "failure";
			 }
			 
			 
			
		 }
		 
		 @CrossOrigin(value="*")
		 @GetMapping("/getallappl")
		 public List<NameChangeApplmodel> getAllSubmitted(@RequestParam String status,@RequestParam String orgid ) {
			 System.out.println(status);
			 
			 if (status == null || status.equals("undefined")) {
				 System.out.println("fdffdsf");
				 status ="";
			 }
			 if (orgid == null || orgid.equals("undefined")) {
				 orgid = "";
			 }
			 
			 System.out.println(orgid + "--"+status);
			 if (orgid.equals("") && status.equals("")) {
				 return namechangeapplrepo.getAllAppl();
			 }
			 else {
				 if(orgid.equals("")) {
					 
					 return namechangeapplrepo.getAllApplByStatus(status);
				 }
				 else if(status.equals("")) {
					 return namechangeapplrepo.getAllApplByorgid(orgid);
					 
				 }
				 else {
					 return namechangeapplrepo.getAllApplByStatusandorgid(status,orgid);
					 }
				 }
				 
			 }
			
				
		 @CrossOrigin(value="*")
		 @GetMapping("/getallappl/fordfc")
		 public List<NameChangeApplmodel> getAllPaymentRecieved( ) {
			 
			 try {
			 return namechangeapplrepo.getallpaymentrecieved();
			 }
			 catch(Exception e) {
				 
				 System.out.println(e);
			 }
			return null;
		 }
			
			 
			 
		 @CrossOrigin(value="*")
		 @PostMapping("/necesapprove")
		 public String NcesApprove(@RequestBody String ApplicationId, @RequestParam String userstage) {
			 
			 try {
				 NameChangeApplmodel Application = namechangeapplrepo.getAllApplById(ApplicationId);
				 
				 if (userstage != null) {
				 if (userstage.equals("NCES-AEE") && Application.getApplStatus().equals("NOC-ISSUED-BY-EDC")) {
					 System.out.println("came in");
					 namechangeapplrepo.ApproveApplication(ApplicationId,"UNDER PROCESS BY NCES-EE");
					  return "success";
			        }
				 else if (userstage.equals("NCES-EE")&& Application.getApplStatus().equals("UNDER PROCESS BY NCES-EE")) {
					 namechangeapplrepo.ApproveApplication(ApplicationId,"PAYMENT RAISED");
					  return "success";
			        }
				 else if (userstage.equals("NCES-AEE")&& Application.getApplStatus().equals("PAYMENT RECEIVED")) {
					 namechangeapplrepo.ApproveApplication(ApplicationId,"UNDER APPROVAL BY NCES-EE");
					  return "success";
			        }
				 else if (userstage.equals("NCES-EE")&& Application.getApplStatus().equals("UNDER APPROVAL BY NCES-EE")) {
					 namechangeapplrepo.ApproveApplication(ApplicationId,"UNDER APPROVAL BY NCES-SE");
					  return "success";
			        }
				 else if (userstage.equals("NCES-SE")&& Application.getApplStatus().equals("UNDER APPROVAL BY NCES-SE")) {
					 namechangeapplrepo.ApproveApplication(ApplicationId,"UNDER APPROVAL BY NCES-CE");
					  return "success";
			        }
				 else if (userstage.equals("NCES-CE")&& Application.getApplStatus().equals("UNDER APPROVAL BY NCES-CE")) {
					 namechangeapplrepo.ApproveApplication(ApplicationId,"UNDER EE APPROVE FOR ORDER ISSUE");
					  return "success";
			        }
				 else if (userstage.equals("NCES-EE")&& Application.getApplStatus().equals("UNDER EE APPROVE FOR ORDER ISSUE")) {
					 namechangeapplrepo.ApproveApplication(ApplicationId,"APPROVAL ISSUED");
					  return "success";
			        }
				 else {
					 return "failure";
				 }
				 
				 }
				 else {
					 return "failure";
				 }
//			  namechangeapplrepo.ApproveApplication(ApplicationId,);
//			  return "success";
			 }
			 catch(Exception e) {
				 System.out.println(e);
				 return "failure";
			 
			 }
		 }
		 
		 @CrossOrigin(value="*")
		 @GetMapping("/paymentPrint/_internal")
		 public NameChangeApplmodel paymentprint(@RequestParam String ApplicationId) {
			 
			 NameChangeApplmodel Application = null;
			 
			 try {
				 
				 Application = namechangeapplrepo.getAllApplById(ApplicationId);
				 System.out.println("came hererreere");
				List<NameChangeApplPaymentmodel> paymentcharges = namechangeapplpaymentrepository.findByApplicationId(ApplicationId);
			
				    Application.setBillPayment(paymentcharges);
				
				return Application ;
			 }
			 catch(Exception e){
				 
				 System.out.println(e);
				 
			 }
			 
			 return Application ;
			 
		 }
		 
		 @CrossOrigin(value="*")
		 @PostMapping("/savepayment")
		 public String savepayment(@RequestBody List<NameChangeApplPaymentmodel> list) {
			 try {
				 if (list.get(0) != null ) {
			 namechangeapplpaymentrepository.saveAll(list);
			 return "success";
			 }
			 else {
				 return "failure";
			 }
			 }
			 catch(Exception e) {
				 
				 System.out.println(e);
				 return "failure";
			 }
		 }
		 
		 
		 
		    @CrossOrigin(value ="*")
			@GetMapping("/raisePayment")
			public String RaisePaymentAdvise(@RequestParam(value="applicationId") String applicationid){
			
		    	
		    	try {
		    		 StoredProcedureQuery query = entityManager.createStoredProcedureQuery("NAME_TRANSFER_APPL.GENERATE_APPLICATION_CHARGES"); 
		 	        //Declare the parameters in the same order
		 	        query.registerStoredProcedureParameter(1, String.class, ParameterMode.IN);
		 	        query.registerStoredProcedureParameter(2, String.class, ParameterMode.OUT);
		 	        query.registerStoredProcedureParameter(3, String.class, ParameterMode.OUT);
		 	        //Pass the parameter values
		 	        query.setParameter(1, applicationid);
		 	        //Execute query
		 	        query.execute();
		 	        //Get output parameters
		 	        String result = (String) query.getOutputParameterValue(2);
		 	        String Applid = (String) query.getOutputParameterValue(3);
		    		return result;
		    	}
		    	catch(Exception e) {
		    		
		    		return "failure";
		    	}
			}

		     @CrossOrigin(value ="*")
			 @PostMapping("/uploadOrderCopy")
			 @ResponseStatus(HttpStatus.OK)
			 @ResponseBody
			  public String UploadeOrderCopy(@RequestBody MultipartFile file ,@RequestParam String applicaionid,@RequestParam String doccode  ) {
				
				  String docPath=""; 
				 String fileName="";
				 
				  
				    
				    try {
				    	if (file.isEmpty()) {
							throw new OpenAccessException("Failed to store empty file.");
						}
				    if (file.getSize() > 2000000) {
				    	throw new OpenAccessException("File is too large to store");
				    }
				    if(doccode.equals("DOCOA16")) {
				    NameChangeApplmodel application ;
		    		 application = namechangeapplrepo.getAllApplById(applicaionid);
		    			 application.setIsordercopyuploaded("Y");
		    			 NameChangeApplDocmodel docdetails = nameChangeApplDocRepositoory.findByApplicationIdanddocId(applicaionid, "DOCOA16");
					     docdetails.setIsUploaded("true");
					     if (file.getOriginalFilename() != null && file.getOriginalFilename().contains(".")) {
							   fileName = applicaionid+"--OrderCopy."+file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
						    }
					     docPath="/opt/oa/data/files/" + fileName;
					     docdetails.setDocumentpath(docPath);
					     nameChangeApplDocRepositoory.save(docdetails);
		    			 
		    		 namechangeapplrepo.save(application);
				     file.transferTo( new File("/opt/oa/data/files/" + fileName));
				     //file.transferTo( new File("C:\\upload\\ordercopy\\" + fileName));
				    }
				    if(doccode.equals("DOCOA17")) {
					   
			    			
			    			 NameChangeApplDocmodel docdetails = nameChangeApplDocRepositoory.findByApplicationIdanddocId(applicaionid, "DOCOA17");
						     docdetails.setIsUploaded("true");
						     if (file.getOriginalFilename() != null && file.getOriginalFilename().contains(".")) {
								   fileName = applicaionid+"--OrderCopyApproval."+file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
							    }
						     docPath="/opt/oa/data/files/" + fileName;
						     docdetails.setDocumentpath(docPath);
						     nameChangeApplDocRepositoory.save(docdetails);
			    			 
			    		
					     file.transferTo( new File("/opt/oa/data/files/" + fileName));
					    // file.transferTo( new File("C:\\upload\\ordercopy\\" + fileName));
					    }
				    if(doccode.equals("DOCOA18")) {
					    NameChangeApplmodel application ;
			    		 application = namechangeapplrepo.getAllApplById(applicaionid);
			    			 application.setApplStatus("APPROVAL ISSUED");
			    			 NameChangeApplDocmodel docdetails = nameChangeApplDocRepositoory.findByApplicationIdanddocId(applicaionid, "DOCOA18");
						     docdetails.setIsUploaded("true");
						     if (file.getOriginalFilename() != null && file.getOriginalFilename().contains(".")) {
								   fileName = applicaionid+"--OrderCopyDfcRecipt."+file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
							    }
						     docPath="/opt/oa/data/files/" + fileName;
						     docdetails.setDocumentpath(docPath);
						     nameChangeApplDocRepositoory.save(docdetails);
			    			 
			    		 namechangeapplrepo.save(application);
					     // file.transferTo( new File("/opt/oa/data/files/" + fileName));
					     file.transferTo( new File("/opt/oa/data/files/" + fileName));
					    }
				     
				     

				    } catch (Exception e) {
				    	System.out.println(e);
				      return "error";
				    } 
				    return "success";
				  }
		     
		     @CrossOrigin(value = "*")
		 	@RequestMapping(value = "/print-doc/OrderCopy", method = RequestMethod.GET)
		 	public ResponseEntity<StreamingResponseBody>
		            DownloadeOrderCopy(@RequestParam(value = "applicationid", required = false) String ip1,
		            		@RequestParam(value = "doccode", required = false) String doccode )
		 			throws IOException, FileNotFoundException {
		 		

		    	 if (doccode.equals("DOCOA16")) {
				 		PrintPayload payload = new PrintPayload();
				 		payload.setFileExtension("pdf");
				 		payload.setName(PrintPayload.PrintTypes.NameTransferOrderCopy);
				 		System.out.println(payload.getFilterCriteria().put("applicationid",ip1));
				 		NameChangeApplDocmodel docdetails = nameChangeApplDocRepositoory.findByApplicationIdanddocIdforreset(payload.getFilterCriteria().put("applicationid",ip1), "DOCOA16");
				 		
				 		payload.setDocPath(docdetails.getDocumentpath());
				 		 
				 		 
				 		System.out.println(payload);
				 		return commonUtils.fetchFileAsStreamResponse(payload);
				 		}
		    	 if (doccode.equals("DOCOA17")) {
				 		PrintPayload payload = new PrintPayload();
				 		payload.setFileExtension("pdf");
				 		payload.setName(PrintPayload.PrintTypes.NameTransferOrderCopy);
				 		System.out.println(payload.getFilterCriteria().put("applicationid",ip1));
				 		NameChangeApplDocmodel docdetails = nameChangeApplDocRepositoory.findByApplicationIdanddocIdforreset(payload.getFilterCriteria().put("applicationid",ip1), "DOCOA17");
				 		
				 		payload.setDocPath(docdetails.getDocumentpath());
				 		 
				 		 
				 		System.out.println(payload);
				 		return commonUtils.fetchFileAsStreamResponse(payload);
				 		}
		    	 if (doccode.equals("DOCOA18")) {
				 		PrintPayload payload = new PrintPayload();
				 		payload.setFileExtension("pdf");
				 		payload.setName(PrintPayload.PrintTypes.NameTransferOrderCopy);
				 		System.out.println(payload.getFilterCriteria().put("applicationid",ip1));
				 		NameChangeApplDocmodel docdetails = nameChangeApplDocRepositoory.findByApplicationIdanddocIdforreset(payload.getFilterCriteria().put("applicationid",ip1), "DOCOA18");
				 		
				 		payload.setDocPath(docdetails.getDocumentpath());
				 		 
				 		 
				 		System.out.println(payload);
				 		return commonUtils.fetchFileAsStreamResponse(payload);
				 		}
		    	 return null;
		    	 
		    	 
		 		
		 	}
		     @CrossOrigin(value ="*")
			 @GetMapping("/resetOrderCopy")
			 public String ResetOrderCopy(@RequestParam String applicaionid) {
			 
				 
				 try {
					 
					 NameChangeApplmodel application ;
		    		 application = namechangeapplrepo.getAllApplById(applicaionid);
		    		 application.setIsordercopyuploaded("N");
		    		 namechangeapplrepo.save(application);
		    		 NameChangeApplDocmodel docdetails = nameChangeApplDocRepositoory.findByApplicationIdanddocIdforreset(applicaionid, "DOCOA16");
		    		 docdetails.setIsUploaded("false");
					 nameChangeApplDocRepositoory.save(docdetails);
				 		
					 return "success"; 
				 }
				 catch (Exception e ) {
					 System.out.println(e);
					 return "failure";
					 
				 }
				 }
		    
		     @CrossOrigin(value ="*")
				@GetMapping("/returnapplication")
				public String RetrunApplication(@RequestParam(value="applicationId") String applicationid,
						@RequestParam(value="applremarks") String applicationRemarks){
				
			    	
			    	try {
			    		 NameChangeApplmodel application ;
			    		 application = namechangeapplrepo.getAllApplById(applicationid);
			    		 application.setApplRemarks(applicationRemarks);
			    		 application.setApplStatus("RE-SUBMITTED");
			    		 namechangeapplrepo.save(application);
			    		 return "success";
			    	}
			    	catch(Exception e) {
			    		
			    		return "failure";
			    	}
				}

		        @CrossOrigin(value ="*")
				@PostMapping("/SavenewGenDeatials")
				public String NewGenDeatials(@RequestBody NameChangeApplNewGenDetailmodel newgendetails,
						@RequestParam (value="applid") Integer applid){
			    	try {
			    		System.out.println(applid);
			    		if (newgendetails.getId()==null) {
			    			
			    		newgendetails.setId(namechangenewgenrepo.getNextSeriesId().toString());
			    		}
			    		newgendetails.setApplId(applid.toString());
			    		namechangenewgenrepo.save(newgendetails);
			    		return "success";
			    		 //return namechangenewgenrepo.findAll();
			    	}
			    	catch(Exception e) {
			    		System.out.println(e);
			    	}
			    	return "failure";
				}
		        @CrossOrigin(value ="*")
				@GetMapping("/getnewGenDeatials")
				public NameChangeApplNewGenDetailmodel NewGenDeatials(@RequestParam (value="applid") Integer applid){
			    	try {
			    		System.out.print("dfdfdfs");
			    		 return namechangenewgenrepo.getbyapplid(applid.toString());
			    	}
			    	catch(Exception e) {
			    		System.out.println(e);
			    	}
					return null;
				}

		     
		     
		     
		    
	}
