export default function SearchResults({ products }) {
  if (!products || products.length === 0) {
    return <p style={{ textAlign: 'center', color: '#888' }}>No products found.</p>;
  }

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Image</th>
          <th style={styles.th}>Name</th>
          <th style={styles.th}>Category</th>
          <th style={styles.th}>Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td style={styles.td}>
              {p.imageUrl ? (
                <img src={p.imageUrl} alt={p.name} style={styles.img} />
              ) : (
                <span style={{ color: '#ccc' }}>No img</span>
              )}
            </td>
            <td style={styles.td}>{p.name}</td>
            <td style={styles.td}>{p.categoryName || '-'}</td>
            <td style={styles.td}>{p.price?.toLocaleString()} VND</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '10px 12px',
    background: '#f0f0f0',
    borderBottom: '2px solid #ddd',
  },
  td: {
    padding: '10px 12px',
    borderBottom: '1px solid #eee',
  },
  img: {
    width: 60,
    height: 60,
    objectFit: 'cover',
    borderRadius: 4,
  },
};
