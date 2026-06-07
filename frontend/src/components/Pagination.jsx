import React from 'react';

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const start = Math.max(0, page - 2);
  const end = Math.min(totalPages - 1, page + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div style={styles.container}>
      <button
        style={styles.button}
        disabled={page === 0}
        onClick={() => onPageChange(0)}
      >
        &laquo;
      </button>
      <button
        style={styles.button}
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
      >
        &lsaquo;
      </button>
      {start > 0 && <span style={styles.ellipsis}>...</span>}
      {pages.map(p => (
        <button
          key={p}
          style={{
            ...styles.button,
            ...(p === page ? styles.activeButton : {}),
          }}
          onClick={() => onPageChange(p)}
        >
          {p + 1}
        </button>
      ))}
      {end < totalPages - 1 && <span style={styles.ellipsis}>...</span>}
      <button
        style={styles.button}
        disabled={page >= totalPages - 1}
        onClick={() => onPageChange(page + 1)}
      >
        &rsaquo;
      </button>
      <button
        style={styles.button}
        disabled={page >= totalPages - 1}
        onClick={() => onPageChange(totalPages - 1)}
      >
        &raquo;
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    marginTop: 24,
  },
  button: {
    padding: '8px 14px',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    background: '#fff',
    color: '#475569',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
  },
  activeButton: {
    background: '#2563eb',
    color: '#fff',
    borderColor: '#2563eb',
  },
  ellipsis: {
    padding: '0 4',
    color: '#94a3b8',
  },
};
