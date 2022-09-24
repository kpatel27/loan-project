import PDFParser from 'pdf2json';

export default async function handler(req, res) {
  const pdfParser = new PDFParser();
  const { fileName } = req.body;

  pdfParser.loadPDF(`./public/uploads/${fileName}`);

  const jsonData = await new Promise(async (resolve, reject) => {
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      //const raw = pdfParser.getRawTextContent().replace(/\r\n/g, " ");
      resolve(pdfData);
    })
  })
  res.status(200).json(jsonData);
}