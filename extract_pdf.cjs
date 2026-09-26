const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function main() {
  const parser = new PDFParse({ verbosity: -1 });
  const loaded = await parser.load('C:/Users/sahil/Downloads/coding-patterns.pdf');
  
  let allText = '';
  let allLinks = [];

  for (let i = 1; i <= loaded.numPages; i++) {
    try {
      const pageText = await parser.getPageText(i);
      allText += `\n--- PAGE ${i} ---\n${pageText}\n`;
      
      const links = await parser.getHyperlinks(i);
      if (links && links.length > 0) {
        allLinks.push({ page: i, links });
      }
    } catch (e) {
      allText += `\n--- PAGE ${i} --- ERROR: ${e.message}\n`;
    }
  }

  fs.writeFileSync('pdf_text.txt', allText, 'utf8');
  fs.writeFileSync('pdf_links.json', JSON.stringify(allLinks, null, 2), 'utf8');
  console.log('Done! Pages:', loaded.numPages);
  console.log('Text length:', allText.length);
  console.log('Link pages found:', allLinks.length);
}

main().catch(e => console.error('FATAL:', e.message, e.stack));
