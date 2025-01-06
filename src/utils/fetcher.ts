export async function fetcher(url: RequestInfo) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Fetching Data Error');
  }

  return res.json();
}