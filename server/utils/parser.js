const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');

async function parsePDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  // pdf-parse returns text with newlines; basic section detection via headings
  return data.text || '';
}

async function parseDOCX(filePath) {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value || '';
}

async function parseTXT(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

async function parseFile(filePath, mimetype) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.pdf' || mimetype === 'application/pdf') {
    return await parsePDF(filePath);
  }
  if (ext === '.docx' || mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return await parseDOCX(filePath);
  }
  if (ext === '.txt' || mimetype === 'text/plain') {
    return await parseTXT(filePath);
  }
  // fallback: try reading as text
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return '';
  }
}

module.exports = { parseFile };
