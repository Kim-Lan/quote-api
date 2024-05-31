import fs from 'fs';

const FILEPATH = './server/quotes.txt';

export default defineEventHandler((event) => {
  const { index } = getQuery(event);

  let quote = '';
  const data = fs.readFileSync(FILEPATH, 'utf8');
  const linesArray = data.split('\n');
  if (index < linesArray.length) {
    quote = linesArray[index];
    console.log(quote);
  }
  return { quote };
})
