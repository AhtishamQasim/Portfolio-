/** One row of a mock dashboard table: avatar, name and detail, amount, status pill. */
export function OrderRow({ initials, tone, name, meta, amount, status, pill }) {
  return (
    <div className="m-row">
      <span className={`av av${tone}`}>{initials}</span>
      <span className="m-who"><b>{name}</b><small>{meta}</small></span>
      <span className="m-amt">{amount}</span>
      <em className={`pill pill-${pill}`}>{status}</em>
    </div>
  );
}

export function WindowBar({ title }) {
  return <div className="mock-bar"><i /><i /><i /><span>{title}</span></div>;
}
