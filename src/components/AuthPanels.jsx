import React, { useState } from 'react';
import { UserPlus, LogIn } from 'lucide-react';

const Panel = ({ title, onSubmit, fields, submitLabel, icon: Icon }) => {
  const [data, setData] = useState(Object.fromEntries(fields.map((f) => [f.name, ''])));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSubmit(data);
    } catch (err) {
      setError(err?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-5 w-5 text-indigo-600" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        {fields.map((f) => (
          <div key={f.name}>
            <label className="block text-sm font-medium text-gray-700">{f.label}</label>
            <input
              type={f.type || 'text'}
              name={f.name}
              value={data[f.name]}
              onChange={(e) => setData((p) => ({ ...p, [f.name]: e.target.value }))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
              placeholder={f.placeholder}
              required={f.required !== false}
            />
          </div>
        ))}
        {error && <div className="rounded-md bg-red-50 p-2 text-sm text-red-700">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Veuillez patienter…' : submitLabel}
        </button>
      </form>
    </div>
  );
};

const AuthPanels = ({ onRegister, onLogin }) => {
  return (
    <div className="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
      <Panel
        title="Inscription"
        icon={UserPlus}
        submitLabel="Créer un compte"
        onSubmit={onRegister}
        fields=[
          { name: 'username', label: 'Nom d\'utilisateur', placeholder: 'jdupont' },
          { name: 'email', label: 'Email', type: 'email', placeholder: 'vous@exemple.com' },
          { name: 'password', label: 'Mot de passe', type: 'password', placeholder: '••••••••' },
        ]
      />
      <Panel
        title="Connexion"
        icon={LogIn}
        submitLabel="Se connecter"
        onSubmit={onLogin}
        fields=[
          { name: 'email', label: 'Email', type: 'email', placeholder: 'vous@exemple.com' },
          { name: 'password', label: 'Mot de passe', type: 'password', placeholder: '••••••••' },
        ]
      />
    </div>
  );
};

export default AuthPanels;
