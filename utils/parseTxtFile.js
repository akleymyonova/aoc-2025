export function parseTxtFile(content) {
  const lines = content.split('\n');
  const parsedData = lines.map(line => line.trim()).filter(line => line.length > 0);
  return parsedData;
}