export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    if (i === 0 || i === totalPages - 1 || Math.abs(i - page) <= 2) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== -1) {
      pages.push(-1);
    }
  }

  return (
    <div style={styles.container}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        style={styles.button}
      >
        Previous
      </button>
      {pages.map((p, idx) =>
        p === -1 ? (
          <span key={`dot-${idx}`} style={styles.dots}>...</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            style={{
              ...styles.button,
              ...(p === page ? styles.active : {}),
            }}
          >
            {p + 1}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages - 1}
        style={styles.button}
      >
        Next
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 20,
  },
  button: {
    padding: '6px 14px',
    border: '1px solid #ccc',
    borderRadius: 4,
    background: '#fff',
    cursor: 'pointer',
    fontSize: 14,
  },
  active: {
    background: '#1a73e8',
    color: '#fff',
    borderColor: '#1a73e8',
  },
  dots: {
    padding: '0 4px',
    color: '#888',
  },
};
