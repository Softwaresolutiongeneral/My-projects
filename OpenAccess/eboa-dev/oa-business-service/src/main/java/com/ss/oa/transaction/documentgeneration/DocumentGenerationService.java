package com.ss.oa.transaction.documentgeneration;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;

import javax.xml.transform.stream.StreamSource;


import javax.xml.transform.Result;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.sax.SAXResult;


import org.apache.fop.apps.FOPException;
import org.apache.fop.apps.FOUserAgent;
import org.apache.fop.apps.Fop;
import org.apache.fop.apps.FopFactory;
import org.apache.fop.apps.MimeConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ss.oa.transaction.vo.DocumentGeneration;

@Scope("prototype")
@Component
public class DocumentGenerationService{
	
	@Autowired
	DocxGeneration docxGen;
	
	 public static final String RESOURCES_DIR;
	    public static final String OUTPUT_DIR;

	    static {
	        RESOURCES_DIR = "src//main//resources//";
	        OUTPUT_DIR = "src//main//resources//output//";
	    }

	
	public void write(String callingProcName, DocumentGeneration docGen, String outputFormat, String outputFolder) throws IOException{
		String templateType = docGen.getTemplateType();
		if(templateType != null && templateType != ""){
			switch(templateType){
				case "PDF":
					writePDF(docGen);
					break;
				case "DOC":
					writeDOC(docGen);
					break;
				default:
					break;
			}
		}
	}
	
	private void writePDF(DocumentGeneration params) {
		PDFGeneration pdfGen = new PDFGeneration();
		pdfGen.writeDocument(params);
	}
	
	private void writeDOC(DocumentGeneration params) throws IOException {
		docxGen.writeDocument(params);
	}
	
	public void generatePdf(String xmlFilePath,String templatePath,String pdfPath) throws IOException, FOPException, TransformerException {
        // the XSL FO file
		 
        File xsltFile = new File(templatePath);
        // the XML file which provides the input
        StreamSource xmlSource = new StreamSource(new File(xmlFilePath));
        // create an instance of fop factory
        FopFactory fopFactory = FopFactory.newInstance(new File(".").toURI());
        // a user agent is needed for transformation
        FOUserAgent foUserAgent = fopFactory.newFOUserAgent();
        // Setup output
        OutputStream out;
        out = new java.io.FileOutputStream( pdfPath);

        try {
            // Construct fop with desired output format
            Fop fop = fopFactory.newFop(MimeConstants.MIME_PDF, foUserAgent, out);

            // Setup XSLT
            TransformerFactory factory = TransformerFactory.newInstance();
            Transformer transformer = factory.newTransformer(new StreamSource(xsltFile));

            // Resulting SAX events (the generated FO) must be piped through to
            // FOP
            Result res = new SAXResult(fop.getDefaultHandler());

            // Start XSLT transformation and FOP processing
            // That's where the XML is first transformed to XSL-FO and then
            // PDF is created
            transformer.transform(xmlSource, res);
        } finally {
            out.close();
        }
    }
}