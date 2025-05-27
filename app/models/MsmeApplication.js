import mongoose from 'mongoose';

const msmeApplicationSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  creditScore: { type: String, required: true },
  commercialRegistrationCertificate: { type: String, required: false },
  tradeLicense: { type: String, required: false },
  taxCard: { type: String, required: false },
  establishmentCertificate: { type: String, required: false },
  auditedFinancialStatement: { type: String, required: true },
  bankStatement: { type: String, required: true },
  commercialRegistrationCertificateSubmitted: { type: Boolean, default: false },
  tradeLicenseSubmitted: { type: Boolean, default: false },
  taxCardSubmitted: { type: Boolean, default: false },
  establishmentCertificateSubmitted: { type: Boolean, default: false },
  auditedFinancialStatementSubmitted: { type: Boolean, default: false },
  bankStatementSubmitted: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
}, { timestamps: true });

const MsmeApplication = mongoose.model('MsmeApplication', msmeApplicationSchema);

export default MsmeApplication;