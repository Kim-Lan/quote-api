import fs from 'fs';

const FILEPATH = './server/quotes.txt';


export default defineEventHandler(async (event) => {
  const { quote } = getQuery(event);
  console.log(`Received quote: ${quote}`);
  if (quote) {
    fs.appendFile(FILEPATH, `${quote}\n`, function(err, data) {
      if (err) {
        throw createError({
          statusCode: 500,
          statusMessage: 'Internal Server Error'
        })
      }
    });
    console.log(`Added quote: ${quote}`);
  }
})
