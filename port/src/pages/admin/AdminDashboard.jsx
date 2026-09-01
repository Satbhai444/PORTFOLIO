import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, MessageSquare, Mail, FileText,
  LogOut, Trash2, Check, X, Eye, EyeOff,
  RefreshCw, ChevronRight, AlertCircle, Save, Plus,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import './AdminDashboard.css';

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'guestbook', label: 'Guestbook', icon: MessageSquare },
  { id: 'contacts', label: 'Contacts', icon: Mail },
  { id: 'content', label: 'Content', icon: FileText },
];

const AdminDashboard = () => {
  const { isAuthenticated, isLoading: authLoading, logout, authFetch } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState(null);
  const [guestbookMessages, setGuestbookMessages] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [contentEntries, setContentEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState('');

  // Content editor state
  const [newContent, setNewContent] = useState({ section: 'hero', key: '', value: '' });
  const [editingContent, setEditingContent] = useState(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Fetch data based on active tab
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'overview') {
        const data = await authFetch('/api/admin/dashboard');
        if (data.success) setDashboardData(data.data);
      } else if (activeTab === 'guestbook') {
        const data = await authFetch('/api/guestbook/all');
        if (data.success) setGuestbookMessages(data.data);
      } else if (activeTab === 'contacts') {
        const data = await authFetch('/api/contact');
        if (data.success) setContactMessages(data.data);
      } else if (activeTab === 'content') {
        const data = await authFetch('/api/content/raw');
        if (data.success) setContentEntries(data.data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [activeTab, authFetch]);

  useEffect(() => {
    if (isAuthenticated) fetchData();
  }, [isAuthenticated, fetchData]);

  // ═══════ ACTION HANDLERS ═══════
  const handleDeleteGuestbook = async (id) => {
    setActionLoading(id);
    try {
      await authFetch(`/api/guestbook/${id}`, { method: 'DELETE' });
      setGuestbookMessages((prev) => prev.filter((m) => m._id !== id));
    } catch (err) { console.error(err); }
    finally { setActionLoading(''); }
  };

  const handleToggleApproval = async (id) => {
    setActionLoading(id);
    try {
      const data = await authFetch(`/api/guestbook/${id}/approve`, { method: 'PATCH' });
      if (data.success) {
        setGuestbookMessages((prev) =>
          prev.map((m) => (m._id === id ? { ...m, isApproved: data.data.isApproved } : m))
        );
      }
    } catch (err) { console.error(err); }
    finally { setActionLoading(''); }
  };

  const handleToggleRead = async (id) => {
    setActionLoading(id);
    try {
      const data = await authFetch(`/api/contact/${id}/read`, { method: 'PATCH' });
      if (data.success) {
        setContactMessages((prev) =>
          prev.map((m) => (m._id === id ? { ...m, isRead: data.data.isRead } : m))
        );
      }
    } catch (err) { console.error(err); }
    finally { setActionLoading(''); }
  };

  const handleDeleteContact = async (id) => {
    setActionLoading(id);
    try {
      await authFetch(`/api/contact/${id}`, { method: 'DELETE' });
      setContactMessages((prev) => prev.filter((m) => m._id !== id));
    } catch (err) { console.error(err); }
    finally { setActionLoading(''); }
  };

  const handleSaveContent = async (section, key, value) => {
    setActionLoading(`${section}-${key}`);
    try {
      const data = await authFetch('/api/content', {
        method: 'PUT',
        body: JSON.stringify({ section, key, value }),
      });
      if (data.success) {
        setContentEntries((prev) => {
          const exists = prev.find((c) => c.section === section && c.key === key);
          if (exists) {
            return prev.map((c) =>
              c.section === section && c.key === key ? { ...c, value } : c
            );
          }
          return [...prev, data.data];
        });
        setEditingContent(null);
        setNewContent({ section: 'hero', key: '', value: '' });
      }
    } catch (err) { console.error(err); }
    finally { setActionLoading(''); }
  };

  const handleDeleteContent = async (id) => {
    setActionLoading(id);
    try {
      await authFetch(`/api/content/${id}`, { method: 'DELETE' });
      setContentEntries((prev) => prev.filter((c) => c._id !== id));
    } catch (err) { console.error(err); }
    finally { setActionLoading(''); }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin', { replace: true });
  };

  const formatDate = (dateStr) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    }).format(new Date(dateStr));
  };

  if (authLoading) {
    return (
      <div className="admin-loading">
        <div className="admin-login-spinner" style={{ width: 32, height: 32 }} />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="admin-dashboard">
      {/* ═══════ SIDEBAR ═══════ */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">D</div>
          <div>
            <h3 className="admin-sidebar-title">Admin</h3>
            <p className="admin-sidebar-sub">Dashboard</p>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`admin-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-nav-item admin-logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <main className="admin-main">
        <header className="admin-main-header">
          <h1 className="admin-page-title">
            {TABS.find((t) => t.id === activeTab)?.label}
          </h1>
          <button className="admin-refresh-btn" onClick={fetchData} disabled={loading}>
            <RefreshCw size={16} className={loading ? 'spinning' : ''} />
            Refresh
          </button>
        </header>

        <div className="admin-content-area">
          <AnimatePresence mode="wait">
            {/* ═══════ OVERVIEW TAB ═══════ */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="admin-overview"
              >
                {dashboardData ? (
                  <>
                    <div className="admin-stats-grid">
                      <StatCard
                        label="Total Guestbook"
                        value={dashboardData.stats.totalGuestbook}
                        color="#6366f1"
                      />
                      <StatCard
                        label="Approved"
                        value={dashboardData.stats.approvedGuestbook}
                        color="#10b981"
                      />
                      <StatCard
                        label="Pending"
                        value={dashboardData.stats.pendingGuestbook}
                        color="#f59e0b"
                      />
                      <StatCard
                        label="Total Contacts"
                        value={dashboardData.stats.totalContacts}
                        color="#8b5cf6"
                      />
                      <StatCard
                        label="Unread Messages"
                        value={dashboardData.stats.unreadContacts}
                        color="#ef4444"
                        highlight
                      />
                    </div>

                    <div className="admin-recent-grid">
                      <div className="admin-recent-section">
                        <h3>Recent Guestbook</h3>
                        {dashboardData.recentGuestbook.length === 0 ? (
                          <p className="admin-empty">No entries yet</p>
                        ) : (
                          dashboardData.recentGuestbook.map((msg) => (
                            <div key={msg._id} className="admin-recent-item">
                              <strong>{msg.name}</strong>
                              <p>{msg.message}</p>
                              <span className="admin-recent-date">{formatDate(msg.timestamp)}</span>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="admin-recent-section">
                        <h3>Recent Contacts</h3>
                        {dashboardData.recentContacts.length === 0 ? (
                          <p className="admin-empty">No messages yet</p>
                        ) : (
                          dashboardData.recentContacts.map((msg) => (
                            <div key={msg._id} className={`admin-recent-item ${!msg.isRead ? 'unread' : ''}`}>
                              <strong>{msg.name}</strong> — <span className="admin-recent-email">{msg.email}</span>
                              <p>{msg.message}</p>
                              <span className="admin-recent-date">{formatDate(msg.timestamp)}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="admin-loading-content">
                    <div className="admin-login-spinner" />
                  </div>
                )}
              </motion.div>
            )}

            {/* ═══════ GUESTBOOK TAB ═══════ */}
            {activeTab === 'guestbook' && (
              <motion.div
                key="guestbook"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {guestbookMessages.length === 0 && !loading ? (
                  <div className="admin-empty-state">
                    <MessageSquare size={48} />
                    <p>No guestbook entries yet</p>
                  </div>
                ) : (
                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Message</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {guestbookMessages.map((msg) => (
                          <tr key={msg._id} className={!msg.isApproved ? 'row-pending' : ''}>
                            <td className="td-name">{msg.name}</td>
                            <td className="td-message">{msg.message}</td>
                            <td className="td-date">{formatDate(msg.timestamp)}</td>
                            <td>
                              <span className={`admin-badge ${msg.isApproved ? 'badge-approved' : 'badge-pending'}`}>
                                {msg.isApproved ? 'Approved' : 'Pending'}
                              </span>
                            </td>
                            <td className="td-actions">
                              <button
                                className="admin-action-btn action-approve"
                                onClick={() => handleToggleApproval(msg._id)}
                                disabled={actionLoading === msg._id}
                                title={msg.isApproved ? 'Reject' : 'Approve'}
                              >
                                {msg.isApproved ? <X size={14} /> : <Check size={14} />}
                              </button>
                              <button
                                className="admin-action-btn action-delete"
                                onClick={() => handleDeleteGuestbook(msg._id)}
                                disabled={actionLoading === msg._id}
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            )}

            {/* ═══════ CONTACTS TAB ═══════ */}
            {activeTab === 'contacts' && (
              <motion.div
                key="contacts"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {contactMessages.length === 0 && !loading ? (
                  <div className="admin-empty-state">
                    <Mail size={48} />
                    <p>No contact messages yet</p>
                  </div>
                ) : (
                  <div className="admin-contacts-list">
                    {contactMessages.map((msg) => (
                      <div key={msg._id} className={`admin-contact-card ${!msg.isRead ? 'unread' : ''}`}>
                        <div className="admin-contact-header">
                          <div className="admin-contact-info">
                            <h4>{msg.name}</h4>
                            <a href={`mailto:${msg.email}`} className="admin-contact-email">{msg.email}</a>
                          </div>
                          <div className="admin-contact-meta">
                            <span className="admin-contact-date">{formatDate(msg.timestamp)}</span>
                            <span className={`admin-badge ${msg.isRead ? 'badge-read' : 'badge-unread'}`}>
                              {msg.isRead ? 'Read' : 'Unread'}
                            </span>
                            {msg.emailSent && (
                              <span className="admin-badge badge-email">Email Sent</span>
                            )}
                          </div>
                        </div>
                        <p className="admin-contact-message">{msg.message}</p>
                        <div className="admin-contact-actions">
                          <button
                            className="admin-action-btn action-read"
                            onClick={() => handleToggleRead(msg._id)}
                            disabled={actionLoading === msg._id}
                          >
                            {msg.isRead ? <EyeOff size={14} /> : <Eye size={14} />}
                            {msg.isRead ? 'Mark Unread' : 'Mark Read'}
                          </button>
                          <button
                            className="admin-action-btn action-delete"
                            onClick={() => handleDeleteContact(msg._id)}
                            disabled={actionLoading === msg._id}
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ═══════ CONTENT TAB ═══════ */}
            {activeTab === 'content' && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {/* Add new content */}
                <div className="admin-content-add">
                  <h3><Plus size={18} /> Add Content Entry</h3>
                  <div className="admin-content-form">
                    <select
                      value={newContent.section}
                      onChange={(e) => setNewContent({ ...newContent, section: e.target.value })}
                    >
                      <option value="hero">Hero</option>
                      <option value="about">About</option>
                      <option value="projects">Projects</option>
                      <option value="contact">Contact</option>
                      <option value="footer">Footer</option>
                      <option value="general">General</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Key (e.g., title, description)"
                      value={newContent.key}
                      onChange={(e) => setNewContent({ ...newContent, key: e.target.value })}
                    />
                    <textarea
                      placeholder="Value"
                      value={newContent.value}
                      onChange={(e) => setNewContent({ ...newContent, value: e.target.value })}
                      rows={2}
                    />
                    <button
                      className="admin-save-btn"
                      onClick={() => handleSaveContent(newContent.section, newContent.key, newContent.value)}
                      disabled={!newContent.key.trim() || actionLoading}
                    >
                      <Save size={14} /> Save
                    </button>
                  </div>
                </div>

                {/* Existing content */}
                {contentEntries.length === 0 && !loading ? (
                  <div className="admin-empty-state">
                    <FileText size={48} />
                    <p>No content entries yet. Add some above!</p>
                  </div>
                ) : (
                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Section</th>
                          <th>Key</th>
                          <th>Value</th>
                          <th>Updated</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contentEntries.map((entry) => (
                          <tr key={entry._id}>
                            <td>
                              <span className="admin-badge badge-section">{entry.section}</span>
                            </td>
                            <td className="td-name">{entry.key}</td>
                            <td className="td-message">
                              {editingContent === entry._id ? (
                                <textarea
                                  defaultValue={entry.value}
                                  className="admin-inline-edit"
                                  onBlur={(e) => {
                                    handleSaveContent(entry.section, entry.key, e.target.value);
                                  }}
                                  autoFocus
                                />
                              ) : (
                                <span
                                  className="admin-editable"
                                  onClick={() => setEditingContent(entry._id)}
                                  title="Click to edit"
                                >
                                  {entry.value || '(empty)'}
                                </span>
                              )}
                            </td>
                            <td className="td-date">{formatDate(entry.updatedAt)}</td>
                            <td className="td-actions">
                              <button
                                className="admin-action-btn action-delete"
                                onClick={() => handleDeleteContent(entry._id)}
                                disabled={actionLoading === entry._id}
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

// ═══════ STAT CARD COMPONENT ═══════
const StatCard = ({ label, value, color, highlight }) => (
  <motion.div
    className={`admin-stat-card ${highlight ? 'stat-highlight' : ''}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    style={{ '--stat-color': color }}
  >
    <div className="stat-color-bar" style={{ background: color }} />
    <p className="stat-value">{value}</p>
    <p className="stat-label">{label}</p>
  </motion.div>
);

export default AdminDashboard;
