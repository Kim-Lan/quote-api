import fs from 'fs';

const FILEPATH = './server/quotes.txt';

export default defineEventHandler(async (event) => {
  const { index } = getQuery(event);
  console.log(`Deleting quote index ${index}`);
  if (index !== undefined) {
    fs.readFile(FILEPATH, 'utf8', function(err, data) {
      if (err) {
        throw createError({
          statusCode: 500,
          statusMessage: 'Internal Server Error'
        })
      }
      const linesArray = data.split('\n');
      const deletedQuote = linesArray.splice(index, 1);
      const linesExceptIndex = linesArray.join('\n');
      fs.writeFile(FILEPATH, linesExceptIndex, function(err, data) {
        if (err) {
          throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error'
          })
        }
      });
      console.log(`Deleted quote ${deletedQuote}`);
    });
  }
})
