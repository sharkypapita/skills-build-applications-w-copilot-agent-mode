import React, { useEffect, useState } from 'react';

function DetailModal({ show, onClose, item }) {
  if (!show) return null;
  return (
    <>
      <div className="modal-backdrop-custom" onClick={onClose} />
      <div className="modal-custom d-block">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">User Detail</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <pre>{JSON.stringify(item, null, 2)}</pre>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const base = window.BASE_API_URL || (process.env.REACT_APP_CODESPACE_NAME ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/` : 'http://localhost:8000/api/');
  const endpoint = `${base}users/`;

  useEffect(() => {
    console.log('Fetching Users from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Users raw data:', data);
        const list = data && data.results ? data.results : data;
        setItems(Array.isArray(list) ? list : []);
      })
      .catch((err) => console.error('Users fetch error', err))
      .finally(() => setLoading(false));
  }, [endpoint]);

  const openDetail = (it) => { setSelected(it); setShowModal(true); };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Users</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th className="table-json">Details</th>
                    <th className="actions-col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, idx) => (
                    <tr key={it.id || idx}>
                      <td>{it.id || idx + 1}</td>
                      <td>{it.username || it.email || '-'}</td>
                      <td className="table-json">{JSON.stringify(it).slice(0, 200)}</td>
                      <td className="actions-col"><button className="btn btn-sm btn-primary" onClick={() => openDetail(it)}>View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <DetailModal show={showModal} onClose={() => setShowModal(false)} item={selected} />
    </div>
  );
}
