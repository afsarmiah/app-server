// console.log('Hello from node! The backend!');
// console.log(__dirname);
// console.log(__filename);

console.log('I love backend');

try {
  const res = await fetch('http://localhost:4444/api/nandos/users');
  console.log('res', res);

  if (!res.ok) {
    throw new Error('Failed to fetch');
  }

  const data = await res.json();
  console.log('data', data);
} catch (err) {
  console.log(err);
}
