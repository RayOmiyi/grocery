#!/usr/bin/env node
const path = require('path');
const { createWorker } = require('../../');

const [,, imagePath] = process.argv;
const image = path.resolve(__dirname, (imagePath || '../../tests/assets/images/cosmic.png'));

console.log(`Recognizing ${image}`);
const worker = createWorker({
  logger: m => console.log(m),
});

(async () => {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize(image);
  console.log(text);
  await worker.terminate();
})();
