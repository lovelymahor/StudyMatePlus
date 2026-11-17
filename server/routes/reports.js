const express = require('express');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const { protect } = require('../middleware/auth');

const router = express.Router();

const MAX_ITEMS = 200;
const MAX_TEXT_LENGTH = 200;

// Helvetica only handles WinAnsi, so anything outside Latin-1 would make pdf-lib throw.
const clean = (value) =>
  String(value ?? '')
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, '?')
    .slice(0, MAX_TEXT_LENGTH);

const asList = (value) => (Array.isArray(value) ? value.slice(0, MAX_ITEMS) : null);

const buildPdf = async (title, lines) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const drawText = (text, x, y, size = 11, fontRef = font, color = rgb(0.12, 0.12, 0.12)) => {
    page.drawText(text, { x, y, size, font: fontRef, color });
  };

  drawText('StudyMate Plus', 40, 795, 18, boldFont, rgb(0.16, 0.29, 0.73));
  drawText(title, 40, 770, 15, boldFont);
  drawText(`Generated on ${new Date().toLocaleString()}`, 40, 752, 9, font, rgb(0.42, 0.42, 0.42));

  let y = 720;
  lines.forEach((line) => {
    const wrapped = line.match(/.{1,84}(\s|$)/g) || [line];
    wrapped.forEach((chunk) => {
      drawText(chunk.trim(), 40, y, 11, font);
      y -= 16;
    });
    y -= 4;
  });

  return Buffer.from(await pdfDoc.save());
};

router.post('/analytics.pdf', protect, async (req, res) => {
  try {
    const { selectedSubject, subjects: rawSubjects = [], pyqCount: rawCounts = [] } = req.body || {};
    const subjects = asList(rawSubjects);
    const pyqCount = asList(rawCounts);
    if (!subjects || !pyqCount) {
      return res.status(400).json({ success: false, message: 'subjects and pyqCount must be arrays.' });
    }
    const lines = [];
    lines.push(`Focus: ${selectedSubject && selectedSubject !== 'all' ? clean(selectedSubject).toUpperCase() : 'All Subjects'}`);
    lines.push('');
    lines.push('PYQs by subject:');
    subjects.forEach((subject, index) => {
      lines.push(`${clean(subject)}: ${Number(pyqCount[index]) || 0} papers`);
    });
    lines.push('');
    lines.push('Key takeaways:');
    lines.push('DSA has the highest share of previous year questions.');
    lines.push('DBMS and Java remain high-value revision targets.');
    lines.push('Use the trend to prioritize mock tests and revision blocks.');

    const pdfBuffer = await buildPdf('PYQ Analytics Report', lines);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="pyq-analytics-report.pdf"');
    return res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error('Analytics PDF error:', error);
    return res.status(500).json({ success: false, message: 'Failed to generate analytics PDF.' });
  }
});

router.post('/pyq.pdf', protect, async (req, res) => {
  try {
    const { selectedUniversity, selectedDepartment, selectedSemester, selectedSubject, papers: rawPapers = [] } = req.body || {};
    const papers = asList(rawPapers);
    if (!papers) {
      return res.status(400).json({ success: false, message: 'papers must be an array.' });
    }
    const lines = [];
    lines.push(`University: ${clean(selectedUniversity) || 'Not selected'}`);
    lines.push(`Department: ${clean(selectedDepartment) || 'Not selected'}`);
    lines.push(`Semester: ${clean(selectedSemester) || 'Not selected'}`);
    lines.push(`Subject: ${clean(selectedSubject) || 'Not selected'}`);
    lines.push('');
    lines.push(`Matching papers: ${papers.length}`);
    lines.push('');

    if (papers.length > 0) {
      papers.forEach((paper, index) => {
        lines.push(`${index + 1}. ${clean(paper?.subject)}`);
        lines.push(`   University: ${clean(paper?.university)}`);
        lines.push(`   Department: ${clean(paper?.department)}`);
        lines.push(`   Semester: ${clean(paper?.semester)}`);
        lines.push(`   Uploader: ${clean(paper?.uploader)}`);
        lines.push(`   Date: ${clean(paper?.date)}`);
        lines.push('');
      });
    } else {
      lines.push('No papers matched the current filter selection.');
    }

    const pdfBuffer = await buildPdf('PYQ Analysis Report', lines);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="pyq-analysis-report.pdf"');
    return res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error('PYQ PDF error:', error);
    return res.status(500).json({ success: false, message: 'Failed to generate PYQ PDF.' });
  }
});

module.exports = router;