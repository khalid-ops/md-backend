import mongoose from 'mongoose';

const lenderProgramSchema = new mongoose.Schema({
    lenderProgramName: { type: String, required: true },
    creditScore: { type: String, required: true },
    lessThanCreditScorePoint: { type: String, required: true },
    moreThanCreditScorePoint: { type: String, required: true },
    all4RequiredDocs: { type: String, required: true },
    any3Docs: { type: String, required: true },
    any2Docs: { type: String, required: true },
    crDocument: { type: String, required: true },
    auditedFinancialReport: { type: String, required: true },
    bankStatement: { type: String, required: true },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
}, { timestamps: true });
const LenderProgram = mongoose.model('LenderProgram', lenderProgramSchema);
export default LenderProgram;
