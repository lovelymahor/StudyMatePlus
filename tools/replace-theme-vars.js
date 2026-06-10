const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'client', 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.css') && !file.endsWith('index.css')) results.push(file);
    }
  });
  return results;
}

const files = walk(root);
const replacements = [
  { from: /background:\s*#fff;/gi, to: 'background: var(--card);' },
  { from: /background:\s*#ffffff;/gi, to: 'background: var(--card);' },
  { from: /background:\s*white;/gi, to: 'background: var(--card);' },
  { from: /background-color:\s*#f8fafc;/gi, to: 'background-color: var(--card);' },
  { from: /background:\s*#f8fafc;/gi, to: 'background: var(--card);' },
  { from: /background:\s*#f3f4f6;/gi, to: 'background: var(--card);' },
  { from: /background:\s*#f5f7fb;/gi, to: 'background: var(--bg);' },

  { from: /color:\s*#333;/gi, to: 'color: var(--text);' },
  { from: /color:\s*#0f172a;/gi, to: 'color: var(--text);' },
  { from: /color:\s*#666;/gi, to: 'color: var(--muted);' },
  { from: /color:\s*#6b7280;/gi, to: 'color: var(--muted);' },
  { from: /color:\s*#374151;/gi, to: 'color: var(--muted);' },

  { from: /#e2e8f0/gi, to: 'var(--border)' },
  { from: /#d1d5db/gi, to: 'var(--border)' },
  { from: /#e5e7eb/gi, to: 'var(--border)' },

  { from: /color:\s*#667eea;/gi, to: 'color: var(--brand);' },
  { from: /background:\s*#667eea;/gi, to: 'background: var(--brand);' },
  { from: /background:\s*linear-gradient\([^;]*#667eea[^;]*;/gi, to: 'background: linear-gradient(45deg, var(--brand), #764ba2);' }
];

let changedFiles = [];
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  const lines = content.split(/\r?\n/);
  const newLines = lines.map(line => {
    if (line.includes('--')) return line; // skip CSS variable definitions
    let l = line;
    replacements.forEach(r => {
      l = l.replace(r.from, r.to);
    });
    return l;
  });
  const out = newLines.join('\n');
  if (out !== original) {
    fs.writeFileSync(file, out, 'utf8');
    changedFiles.push(file);
  }
});

console.log('Processed files:', files.length);
console.log('Modified files:', changedFiles.length);
changedFiles.forEach(f => console.log(' -', f));
