import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [recibos, setRecibos] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState({ name: '' });
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    full_name: '',
    invoice_value: '',
    invoice_number: '',
    payment_reference: '',
    company: '',
    invoice_pdf: null,
  });
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState('');
  const [showQrMenu, setShowQrMenu] = useState(false);
  const navigate = useNavigate();
  const pageSize = 10;

  // Placeholder de imágenes QR (puedes cambiar las URLs luego)
  const qrImages = {
    Movistar: '/qr/movistar-recaudo-qr.png',
    Edeq: 'https://via.placeholder.com/200x200?text=QR+Edeq',
    Epa: 'https://via.placeholder.com/200x200?text=QR+Epa',
    Efigas: 'https://via.placeholder.com/200x200?text=QR+Efigas',
  };

  const downloadImage = (url, name) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowQrMenu(false);
  };

  useEffect(() => {
    // Obtener usuario autenticado de localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchInvoices();
    // eslint-disable-next-line
  }, [page, search]);

  async function fetchInvoices() {
    let query = supabase.from('invoices').select('*', { count: 'exact' });
    if (search) {
      query = query.ilike('full_name', `%${search}%`);
    }
    const { data, count } = await query.range((page - 1) * pageSize, page * pageSize - 1);
    setRecibos(data || []);
    setTotal(count || 0);
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'invoice_pdf') {
      setForm({ ...form, invoice_pdf: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddInvoice = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validaciones
    if (!form.full_name.trim() || !form.invoice_value || !form.invoice_number.trim() || !form.company) {
      setFormError('Por favor completa todos los campos obligatorios.');
      return;
    }
    if (isNaN(Number(form.invoice_value)) || Number(form.invoice_value) <= 0) {
      setFormError('El valor de la factura debe ser un número positivo.');
      return;
    }
    if (form.invoice_pdf) {
      if (form.invoice_pdf.type !== 'application/pdf') {
        setFormError('El archivo debe ser un PDF.');
        return;
      }
      if (form.invoice_pdf.size > 10 * 1024 * 1024) { // 10MB
        setFormError('El PDF debe pesar menos de 10MB.');
        return;
      }
    }

    setUploading(true);
    let pdfUrl = null;
    if (form.invoice_pdf) {
      const fileExt = form.invoice_pdf.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage.from('invoices').upload(fileName, form.invoice_pdf);
      if (uploadError) {
        setFormError('Error subiendo el PDF: ' + uploadError.message);
        setUploading(false);
        return;
      }
      pdfUrl = supabase.storage.from('invoices').getPublicUrl(fileName).data.publicUrl;
    }
    const { error } = await supabase.from('invoices').insert([
      {
        full_name: form.full_name,
        invoice_value: form.invoice_value,
        invoice_number: form.invoice_number,
        payment_reference: form.payment_reference,
        company: form.company,
        invoice_pdf: pdfUrl,
      },
    ]);
    setUploading(false);
    if (error) {
      setFormError('Error guardando la factura: ' + error.message);
    } else {
      setShowModal(false);
      setForm({ full_name: '', invoice_value: '', invoice_number: '', payment_reference: '', company: '', invoice_pdf: null });
      fetchInvoices();
    }
  };

  return (
    <div className="dashboard-bg">
      <aside className="sidebar">
        <div className="sidebar-title">⚽ FactuBet</div>
        <nav>
          <div className="sidebar-link active">Info Recibos</div>
        </nav>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <span style={{ color: '#888', fontSize: 14 }}>FactuBet / Info Recibos</span>
            <h2 style={{ margin: 0, fontWeight: 600 }}>Info Recibos</h2>
          </div>
          <div className="user-info">
            <span className="user-avatar">{user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : ''}</span>
            <span style={{ marginLeft: 8 }}>{user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>Salir</button>
          </div>
        </header>
        <section className="dashboard-content">
          <div className="dashboard-controls" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button className="new-btn" onClick={() => setShowModal(true)}>+ Nuevo Recibo</button>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <button className="new-btn qr-btn" onClick={() => setShowQrMenu(v => !v)}>Descargar ▼</button>
                {showQrMenu && (
                  <div className="qr-dropdown">
                    <button className="qr-dropdown-item" onClick={() => downloadImage(qrImages.Movistar, 'qr_movistar')}>QR Movistar</button>
                    <button className="qr-dropdown-item" onClick={() => downloadImage(qrImages.Edeq, 'qr_edeq')}>QR Edeq</button>
                    <button className="qr-dropdown-item" onClick={() => downloadImage(qrImages.Epa, 'qr_epa')}>QR Epa</button>
                    <button className="qr-dropdown-item" onClick={() => downloadImage(qrImages.Efigas, 'qr_efigas')}>QR Efigas</button>
                  </div>
                )}
              </div>
            </div>
            <input
              className="search-input"
              placeholder="Buscar..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              style={{ marginLeft: 16 }}
            />
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NOMBRE COMPLETO</th>
                  <th>VALOR</th>
                  <th>NÚMERO FACTURA</th>
                  <th>REFERENCIA</th>
                  <th>EMPRESA</th>
                  <th>FECHA</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {recibos.map(r => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.full_name}</td>
                    <td>{r.invoice_value}</td>
                    <td>{r.invoice_number}</td>
                    <td>{r.payment_reference}</td>
                    <td>{r.company}</td>
                    <td>{r.created_at ? new Date(r.created_at).toLocaleDateString() : '-'}</td>
                    <td>
                      <div className="acciones-menu">
                        <button className="acciones-btn">⋮</button>
                        <div className="acciones-dropdown">
                          {r.invoice_pdf ? (
                            <a href={r.invoice_pdf} target="_blank" rel="noopener noreferrer" className="acciones-link">Ver factura</a>
                          ) : (
                            <span className="acciones-link acciones-disabled">Ver factura</span>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              {Array.from({ length: Math.ceil(total / pageSize) }, (_, i) => (
                <button
                  key={i}
                  className={page === i + 1 ? 'active' : ''}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 13, color: '#888', marginTop: 8 }}>
              Mostrando {recibos.length ? (page - 1) * pageSize + 1 : 0} a {Math.min(page * pageSize, total)} de {total} Entradas
            </div>
          </div>
        </section>
        {showModal && (
          <div className="modal-bg">
            <div className="modal-card">
              <h3 style={{marginBottom: 18, color: '#232b36', fontWeight: 700, fontSize: '1.3rem'}}>Agregar Factura</h3>
              <form onSubmit={handleAddInvoice} className="modal-form">
                <div className="modal-input-group">
                  <span className="modal-input-icon">👤</span>
                  <input name="full_name" placeholder="Nombre completo" value={form.full_name} onChange={handleFormChange} required className="modal-input" />
                </div>
                <div className="modal-input-group">
                  <span className="modal-input-icon">💲</span>
                  <input name="invoice_value" type="number" placeholder="Valor de la factura" value={form.invoice_value} onChange={handleFormChange} required className="modal-input" />
                </div>
                <div className="modal-input-group">
                  <span className="modal-input-icon">🧾</span>
                  <input name="invoice_number" placeholder="Número de factura" value={form.invoice_number} onChange={handleFormChange} required className="modal-input" />
                </div>
                <div className="modal-input-group">
                  <span className="modal-input-icon">🔗</span>
                  <input name="payment_reference" placeholder="Referencia de pago" value={form.payment_reference} onChange={handleFormChange} className="modal-input" />
                </div>
                <div className="modal-input-group">
                  <span className="modal-input-icon">🏢</span>
                  <select name="company" value={form.company} onChange={handleFormChange} required className="modal-input">
                    <option value="">Selecciona empresa</option>
                    <option value="Movistar">Movistar</option>
                    <option value="Edeq">Edeq</option>
                    <option value="Epa">Epa</option>
                    <option value="Efigas">Efigas</option>
                  </select>
                </div>
                <label className="modal-file-label" style={{width: '100%'}}>
                  <div className="modal-input-group">
                    <span className="modal-input-icon">📄</span>
                    <input name="invoice_pdf" type="file" accept="application/pdf" onChange={handleFormChange} className="modal-file-input" />
                  </div>
                </label>
                {formError && <div style={{ color: 'red', marginBottom: 8 }}>{formError}</div>}
                <div style={{ display: 'flex', gap: 12, marginTop: 8, justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setShowModal(false)} className="modal-btn cancel">Cancelar</button>
                  <button type="submit" className="modal-btn save" disabled={uploading}>{uploading ? 'Guardando...' : 'Guardar'}</button>
                </div>
              </form>
            </div>
            <style>{`
              .modal-bg {
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0,0,0,0.25);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
              }
              .modal-card {
                background: #fff;
                border-radius: 16px;
                padding: 36px 28px 28px 28px;
                min-width: 340px;
                max-width: 95vw;
                box-shadow: 0 8px 32px rgba(0,0,0,0.18);
                display: flex;
                flex-direction: column;
                align-items: center;
                border-top: 6px solid #4f8cff;
              }
              .modal-form {
                display: flex;
                flex-direction: column;
                gap: 16px;
                width: 100%;
                margin-top: 8px;
              }
              .modal-input-group {
                display: flex;
                align-items: center;
                background: #f8fafc;
                border-radius: 8px;
                border: 1px solid #e0e0e0;
                padding: 0 0 0 10px;
                margin-bottom: 0;
              }
              .modal-input-group:focus-within {
                border: 1.5px solid #4f8cff;
                background: #fff;
              }
              .modal-input-icon {
                font-size: 1.2rem;
                margin-right: 8px;
                color: #4f8cff;
                min-width: 22px;
                text-align: center;
              }
              .modal-input {
                border: none;
                border-radius: 8px;
                padding: 10px 14px;
                font-size: 1rem;
                outline: none;
                background: transparent;
                flex: 1;
              }
              .modal-file-label {
                display: flex;
                flex-direction: column;
                font-size: 0.98rem;
                color: #232b36;
                margin-bottom: 2px;
                gap: 4px;
              }
              .modal-file-input {
                border: none;
                background: none;
                margin-top: 2px;
                font-size: 0.98rem;
              }
              .modal-btn {
                border: none;
                border-radius: 8px;
                padding: 10px 24px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.2s, color 0.2s;
              }
              .modal-btn.cancel {
                background: #e0e0e0;
                color: #232b36;
              }
              .modal-btn.cancel:hover {
                background: #bdbdbd;
              }
              .modal-btn.save {
                background: #4f8cff;
                color: #fff;
              }
              .modal-btn.save:hover {
                background: #2563eb;
              }
            `}</style>
          </div>
        )}
      </main>
      <style>{`
        .dashboard-bg {
          display: flex;
          min-height: 100vh;
          background: #f5f7fa;
        }
        .sidebar {
          width: 220px;
          background: #232b36;
          color: #fff;
          padding: 32px 0 0 0;
          min-height: 100vh;
        }
        .sidebar-title {
          font-size: 1.3rem;
          font-weight: 700;
          padding: 0 24px 32px 24px;
        }
        .sidebar-link {
          padding: 12px 24px;
          font-size: 1rem;
          cursor: pointer;
          border-left: 4px solid transparent;
        }
        .sidebar-link.active {
          background: #1a2028;
          border-left: 4px solid #4f8cff;
        }
        .dashboard-main {
          flex: 1;
          padding: 32px 32px 0 32px;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .user-info {
          display: flex;
          align-items: center;
        }
        .user-avatar {
          background: #4f8cff;
          color: #fff;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }
        .logout-btn {
          margin-left: 16px;
          background: #e74c3c;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 6px 16px;
          cursor: pointer;
        }
        .dashboard-content {
          background: #fff;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .dashboard-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }
        .new-btn {
          background: #27ae60;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 8px 18px;
          font-size: 1rem;
          cursor: pointer;
        }
        .qr-btn {
          background: #4f8cff;
          margin-left: 0;
        }
        .qr-dropdown {
          position: absolute;
          top: 110%;
          left: 0;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          border-radius: 8px;
          z-index: 20;
          min-width: 170px;
          display: flex;
          flex-direction: column;
          padding: 6px 0;
        }
        .qr-dropdown-item {
          background: none;
          border: none;
          color: #232b36;
          text-align: left;
          padding: 10px 18px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .qr-dropdown-item:hover {
          background: #f0f4ff;
          color: #4f8cff;
        }
        .search-input {
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 7px 12px;
          font-size: 1rem;
        }
        .table-container {
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 8px;
        }
        th, td {
          padding: 10px 8px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        th {
          color: #888;
          font-size: 0.98rem;
        }
        .pagination {
          margin-top: 12px;
        }
        .pagination button {
          background: #fff;
          border: 1px solid #ddd;
          color: #333;
          margin-right: 4px;
          border-radius: 4px;
          padding: 4px 10px;
          cursor: pointer;
        }
        .pagination button.active {
          background: #4f8cff;
          color: #fff;
          border: 1px solid #4f8cff;
        }
        @media (max-width: 900px) {
          .dashboard-main {
            padding: 16px 2vw 0 2vw;
          }
          .dashboard-content {
            padding: 10px;
          }
        }
        @media (max-width: 600px) {
          .sidebar {
            display: none;
          }
          .dashboard-main {
            padding: 8px 2vw 0 2vw;
          }
          .dashboard-content {
            padding: 4px;
          }
        }
        .acciones-menu {
          position: relative;
          display: inline-block;
        }
        .acciones-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0 8px;
          color: #4f8cff;
          border-radius: 4px;
          transition: background 0.2s;
        }
        .acciones-btn:hover {
          background: #f0f4ff;
        }
        .acciones-dropdown {
          display: none;
          position: absolute;
          right: 0;
          top: 28px;
          background: #fff;
          min-width: 120px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          border-radius: 8px;
          z-index: 10;
          flex-direction: column;
          padding: 6px 0;
        }
        .acciones-menu:hover .acciones-dropdown {
          display: flex;
        }
        .acciones-link {
          color: #232b36;
          text-decoration: none;
          padding: 8px 18px;
          font-size: 1rem;
          cursor: pointer;
          border: none;
          background: none;
          text-align: left;
          transition: background 0.2s;
        }
        .acciones-link:hover {
          background: #f0f4ff;
          color: #4f8cff;
        }
        .acciones-disabled {
          color: #bbb;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default Dashboard; 