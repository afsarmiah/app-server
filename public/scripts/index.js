// console.log('Hello from node! The backend!');
// console.log(__dirname);
// console.log(__filename);

console.log('I love backend');

try {
  const res = await fetch('https://app-server-production-a70b.up.railway.app/');
  console.log('res', res);

  if (!res.ok) {
    throw new Error('Failed to fetch');
  }

  const data = await res.json();
  console.log('data', data);
} catch (err) {
  console.log(err);
}
