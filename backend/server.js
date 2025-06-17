javascriptconst express = require('express');
const cors = require('cors');
const multer = require('multer');
const ExcelJS = require('exceljs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple storage (we'll upgrade to real database later)
let checklists = [];
let inspections = [];

const upload = multer({ storage: multer.memoryStorage() });

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    checklists: checklists.length,
    inspections: inspections.length 
  });
});

// Upload Excel checklist
app.post('/api/checklists/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { name, description } = req.body;

    // Parse Excel file
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer);
    
    const worksheet = workbook.getWorksheet(1);
    const items = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header
      
      const category = row.getCell(1).text || 'General';
      const item = row.getCell(2).text;
      const itemDescription = row.getCell(3).text || '';
      const required = row.getCell(4).text.toLowerCase() === 'true' || 
                      row.getCell(4).text.toLowerCase() === 'yes';

      if (item) {
        items.push({
          id: `item_${Date.now()}_${items.length}`,
          category,
          item,
          description: itemDescription,
          required
        });
      }
    });

    const checklist = {
      id: `checklist_${Date.now()}`,
      name,
      description: description || '',
      createdAt: new Date().toISOString(),
      items
    };

    checklists.push(checklist);

    res.json({ 
      success: true, 
      checklist,
      itemsCount: items.length 
    });
  } catch (error) {
    console.error('Error uploading checklist:', error);
    res.status(500).json({ error: 'Failed to process checklist' });
  }
});

// Get all checklists
app.get('/api/checklists', (req, res) => {
  res.json(checklists);
});

// Create inspection
app.post('/api/inspections', (req, res) => {
  const { checklistId, inspectorName, location, notes } = req.body;
  
  const inspection = {
    id: `inspection_${Date.now()}`,
    checklistId,
    inspectorName,
    location,
    notes: notes || '',
    status: 'IN_PROGRESS',
    startedAt: new Date().toISOString()
  };

  inspections.push(inspection);
  res.json(inspection);
});

// Get all inspections
app.get('/api/inspections', (req, res) => {
  res.json(inspections);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
