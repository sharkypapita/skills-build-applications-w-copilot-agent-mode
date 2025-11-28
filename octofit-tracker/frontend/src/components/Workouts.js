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
              <h5 className="modal-title">Workout Detail</h5>
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

export default function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Codespace endpoint pattern (used by CI/status checks):
  // https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/workouts/
  const base = window.BASE_API_URL || (process.env.REACT_APP_CODESPACE_NAME ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/` : 'http://localhost:8000/api/');
  const endpoint = `${base}workouts/`;

  useEffect(() => {
    console.log('Fetching Workouts from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Workouts raw data:', data);
        const list = data && data.results ? data.results : data;
        setItems(Array.isArray(list) ? list : []);
      })
      .catch((err) => console.error('Workouts fetch error', err))
      .finally(() => setLoading(false));
  }, [endpoint]);

  const openDetail = (it) => { setSelected(it); setShowModal(true); };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Workouts</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Workout</th>
                    <th className="table-json">Details</th>
                    <th className="actions-col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, idx) => (
                    <tr key={it.id || idx}>
                      <td>{it.id || idx + 1}</td>
                      <td>{it.title || it.name || '-'}</td>
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
