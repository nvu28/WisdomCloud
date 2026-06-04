import { useState } from 'react';

const CATEGORIES = [
  { slug: '', name: 'All' },
  { slug: 'dien-thoai', name: 'Dien thoai' },
  { slug: 'laptop', name: 'Laptop' },
  { slug: 'phu-kien', name: 'Phu kien' },
  { slug: 'tai-nghe', name: 'Tai nghe' },
  { slug: 'dong-ho-thong-minh', name: 'Dong ho thong minh' },
];

export default function SearchForm({ onSearch, loading }) {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      q: keyword,
      category,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      page: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        placeholder="Keyword..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={styles.input}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.input}>
        {CATEGORIES.map((c) => (
          <option key={c.slug} value={c.slug}>{c.name}</option>
        ))}
      </select>
      <input
        placeholder="Min price"
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        style={{ ...styles.input, width: 120 }}
      />
      <input
        placeholder="Max price"
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        style={{ ...styles.input, width: 120 }}
      />
      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
    marginBottom: 20,
    padding: 16,
    background: '#f5f5f5',
    borderRadius: 8,
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: 4,
    fontSize: 14,
  },
  button: {
    padding: '8px 20px',
    background: '#1a73e8',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 14,
  },
};
