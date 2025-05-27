import express from 'express';
import multer from 'multer';
import path from 'path';
import MsmeApplication from '../models/MsmeApplication.js';
import LenderProgram from '../models/LenderProgram.js';

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.post('/', upload.any(), async (req, res) => {
  try{
     const created = new MsmeApplication({
        businessName: req.body.businessName,
        creditScore: req.body.creditScore,
        commercialRegistrationCertificate: req.files.find(file => file.fieldname === 'commercialRegistrationCertificate')?.filename || null,
        tradeLicense: req.files.find(file => file.fieldname === 'tradeLicense')?.filename || null,
        taxCard: req.files.find(file => file.fieldname === 'taxCard')?.filename || null,
        establishmentCertificate: req.files.find(file => file.fieldname === 'establishmentCertificate')?.filename || null,
        auditedFinancialStatement: req.files.find(file => file.fieldname === 'auditedFinancialStatement')?.filename || null,
        bankStatement: req.files.find(file => file.fieldname === 'bankStatement')?.filename || null,
        commercialRegistrationCertificateSubmitted: !!req.files.find(file => file.fieldname === 'commercialRegistrationCertificate'),
        tradeLicenseSubmitted: !!req.files.find(file => file.fieldname === 'tradeLicense'),
        taxCardSubmitted: !!req.files.find(file => file.fieldname === 'taxCard'),
        establishmentCertificateSubmitted: !!req.files.find(file => file.fieldname === 'establishmentCertificate'),
        auditedFinancialStatementSubmitted: !!req.files.find(file => file.fieldname === 'auditedFinancialStatement'),
        bankStatementSubmitted: !!req.files.find(file => file.fieldname === 'bankStatement'),
    });
    const saved = await created.save();

    res.json({
        message: 'MSME Application created successfully',
        data: saved,
    });

    }
   catch(error){
    console.error(' Error processing Input:', error);
    return res.status(500).json({ error: 'Error processing Input' });
   }

});

router.get('/', async (req, res) => {
  try {
    const applications = await MsmeApplication.find();
    res.json(applications);
  } catch (error) {
    console.error(' Error fetching applications:', error);
    res.status(500).json({ error: 'Error fetching applications' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const application = await MsmeApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    console.error(' Error fetching application:', error);
    res.status(500).json({ error: 'Error fetching application' });
  }
});

router.get('/lender-offers/:id', async (req, res) => {
  try {
    const lenderPrograms = await LenderProgram.find();
    const application = await MsmeApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    const offers = await calculateLenderOffers(application, lenderPrograms);
    const offer = offers.reduce((acc, obj) =>   obj.offerValue > acc.offerValue ? obj : acc)
    res.json({ data: offer, message: ' Lender offers calculated successfully' });
  } catch (error) {
    console.error(' Error fetching lender programs and application:', error);
    res.status(500).json({ error: 'Error fetching lender programs and application' });
  }
});


const calculateLenderOffers = async (application, programs) => {
  const averageMonthlyTransactionValue = 100000;
  const results = [];
  for (const program of programs) {
    let value = 1;
    if(Number(application.creditScore) < Number(program.creditScore)){
      value *= Number(program.lessThanCreditScorePoint);
    }
    if(Number(application.creditScore) >= Number(program.creditScore)){
      value *= Number(program.moreThanCreditScorePoint);
    }
    const documentsSubmitted = Number(application.commercialRegistrationCertificateSubmitted) +
      Number(application.tradeLicenseSubmitted) +
      Number(application.taxCardSubmitted) +
      Number(application.establishmentCertificateSubmitted);

    if (documentsSubmitted == 4){
      value *= Number(program.all4RequiredDocs);
    } else if(documentsSubmitted == 3){
      value *= Number(program.any3Docs);
    } else if(documentsSubmitted == 2){
      value *= Number(program.any2Docs);
    } else {
      value *= Number(program.crDocument);
    }

    if(application.auditedFinancialStatementSubmitted){
      value *= Number(program.auditedFinancialReport);
    }
    if(application.bankStatementSubmitted){
      value *= Number(program.bankStatement);
    }
    results.push({
      lenderProgramName: program.lenderProgramName,
      offerValue: Math.round(value * averageMonthlyTransactionValue),
      status: program.status
    });

  }
  return results;

}
export default router;
