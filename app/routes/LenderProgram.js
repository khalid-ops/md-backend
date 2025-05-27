import express from 'express';
import LenderProgram from '../models/LenderProgram.js';


const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { lenderProgramName, creditScore, lessThanCreditScorePoint, moreThanCreditScorePoint, all4RequiredDocs, any3Docs, any2Docs, crDocument, auditedFinancialReport, bankStatement } = req.body;
    
        const newProgram = new LenderProgram({
        lenderProgramName,
        creditScore,
        lessThanCreditScorePoint,
        moreThanCreditScorePoint,
        all4RequiredDocs,
        any3Docs,
        any2Docs,
        crDocument,
        auditedFinancialReport,
        bankStatement
        });
    
        const savedProgram = await newProgram.save();
        res.status(201).json({ message: 'Lender Program created successfully', data: savedProgram });
    } catch (error) {
        console.error('Error creating Lender Program:', error);
        res.status(500).json({ error: 'Error creating Lender Program' });
    }
})

router.get('/', async (req, res) => {
    try {
        const programs = await LenderProgram.find();
        res.status(200).json(programs);
    } catch (error) {
        console.error('Error fetching Lender Programs:', error);
        res.status(500).json({ error: 'Error fetching Lender Programs' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const program = await LenderProgram.findById(req.params.id);
        if (!program) {
            return res.status(404).json({ error: 'Lender Program not found' });
        }
        res.status(200).json(program);
    } catch (error) {
        console.error('Error fetching Lender Program:', error);
        res.status(500).json({ error: 'Error fetching Lender Program' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const program = await LenderProgram.findByIdAndDelete(req.params.id);
        if (!program) {
            return res.status(404).json({ error: 'Lender Program not found' });
        }
        res.status(200).json({ message: 'Lender Program deleted successfully' });
    } catch (error) {
        console.error('Error deleting Lender Program:', error);
        res.status(500).json({ error: 'Error deleting Lender Program' });
    }
});

export default router;
