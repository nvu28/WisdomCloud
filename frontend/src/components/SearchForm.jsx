import React, { useState, useEffect } from 'react';
import { getCategories, getProviders } from '../api/cloudApi';

export default function SearchForm({ onSearch, loading }) {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [provider, setProvider] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
    getProviders().then(setProviders).catch(() => {});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (q) params.q = q;
    if (category) params.category = category;
    if (provider) params.provider = provider;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    onSearch(params);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.row}>
        <input
          style={styles.input}
          placeholder="Tìm kiếm dịch vụ cloud..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <select style={styles.select} value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">Tất cả danh mục</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select style={styles.select} value={provider} onChange={e => setProvider(e.target.value)}>
          <option value="">Tất cả nhà cung cấp</option>
          {providers.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div style={styles.row}>
        <input
          style={{ ...styles.input, width: 150 }}
          placeholder="Giá từ (VNĐ)"
          type="number"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
        />
        <span style={styles.separator}>-</span>
        <input
          style={{ ...styles.input, width: 150 }}
          placeholder="Giá đến (VNĐ)"
          type="number"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? 'Đang tìm...' : 'Tìm kiếm'}
        </button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    background: '#fff',
    padding: 24,
    borderRadius: 12,
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    marginBottom: 24,
  },
  row: {
    display: 'flex',
    gap: 12,
    marginBottom: 12,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: '10px 16px',
    border: '1px solid #ddd',
    borderRadius: 8,
    fontSize: 14,
    minWidth: 200,
  },
  select: {
    padding: '10px 16px',
    border: '1px solid #ddd',
    borderRadius: 8,
    fontSize: 14,
    background: '#fff',
    minWidth: 180,
  },
  separator: {
    padding: '0 4',
    color: '#999',
  },
  button: {
    padding: '10px 32px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
};
