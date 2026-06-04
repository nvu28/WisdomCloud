import { useState, useCallback } from 'react';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import Pagination from '../components/Pagination';
import { searchProducts } from '../api/productApi';

export default function SearchPage() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentParams, setCurrentParams] = useState({});

  const handleSearch = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    setCurrentParams(params);
    try {
      const data = await searchProducts(params);
      setResults(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Search failed');
      setResults(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePageChange = (page) => {
    handleSearch({ ...currentParams, page });
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} loading={loading} />

      {error && (
        <div style={{ color: 'red', marginBottom: 16 }}>
          Error: {error}
        </div>
      )}

      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}

      {results && (
        <>
          <p style={{ color: '#666', marginBottom: 8 }}>
            Found {results.totalElements} results (page {results.page + 1}/{results.totalPages})
          </p>
          <SearchResults products={results.content} />
          <Pagination
            page={results.page}
            totalPages={results.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
