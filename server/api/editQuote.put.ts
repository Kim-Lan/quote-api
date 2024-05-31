import fs from 'fs';

const FILEPATH = './server/quotes.txt';

export default defineEventHandler(async (event) => {
  const { index, quote } = getQuery(event);
  console.log(`Editing quote index ${index}`);
  if (index !== undefined && quote) {
    fs.readFile(FILEPATH, 'utf8', function(err, data) {
      if (err) {
        throw createError({
          statusCode: 500,
          statusMessage: 'Internal Server Error'
        })
      }
      const linesArray = data.split('\n');
      linesArray[index] = quote;
      fs.writeFile(FILEPATH, linesArray.join('\n'), function(err, data) {
        if (err) {
          throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error'
          })
        }
      });
      console.log(`Edited quote ${index} => ${quote}`);
    });
  }
})
