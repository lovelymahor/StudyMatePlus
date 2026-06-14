const express = require('express');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const { protect } = require('../middleware/auth');

const router = express.Router();

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
    const { selectedSubject, subjects = [], pyqCount = [] } = req.body || {};
    const lines = [];
    lines.push(`Focus: ${selectedSubject && selectedSubject !== 'all' ? selectedSubject.toUpperCase() : 'All Subjects'}`);
    lines.push('');
    lines.push('PYQs by subject:');
    subjects.forEach((subject, index) => {
      lines.push(`${subject}: ${pyqCount[index] || 0} papers`);
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
    const { selectedUniversity, selectedDepartment, selectedSemester, selectedSubject, papers = [] } = req.body || {};
    const lines = [];
    lines.push(`University: ${selectedUniversity || 'Not selected'}`);
    lines.push(`Department: ${selectedDepartment || 'Not selected'}`);
    lines.push(`Semester: ${selectedSemester || 'Not selected'}`);
    lines.push(`Subject: ${selectedSubject || 'Not selected'}`);
    lines.push('');
    lines.push(`Matching papers: ${papers.length}`);
    lines.push('');

    if (papers.length > 0) {
      papers.forEach((paper, index) => {
        lines.push(`${index + 1}. ${paper.subject}`);
        lines.push(`   University: ${paper.university}`);
        lines.push(`   Department: ${paper.department}`);
        lines.push(`   Semester: ${paper.semester}`);
        lines.push(`   Uploader: ${paper.uploader}`);
        lines.push(`   Date: ${paper.date}`);
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