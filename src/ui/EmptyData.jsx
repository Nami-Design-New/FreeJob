function EmptyData({ children, minHeight }) {
  return (
    <div className="empty_section" style={{ minHeight: minHeight }}>
      <h2>{children}</h2>
    </div>
  );
}

export default EmptyData;
