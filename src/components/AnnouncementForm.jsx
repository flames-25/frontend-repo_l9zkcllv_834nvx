import React, { useState } from 'react';

const AnnouncementForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    price: '',
    condition: 'Très bon',
    description: '',
    cover_image_url: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) || 0 };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Créer / Modifier une annonce</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Titre</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            placeholder="Titre du livre"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Auteur</label>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            placeholder="Nom de l'auteur"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">ISBN</label>
          <input
            name="isbn"
            value={form.isbn}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            placeholder="978..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Prix (€)</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            placeholder="10.00"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">État</label>
          <select
            name="condition"
            value={form.condition}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
          >
            <option>Neuf</option>
            <option>Très bon</option>
            <option>Bon</option>
            <option>Acceptable</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">URL de la couverture</label>
          <input
            name="cover_image_url"
            value={form.cover_image_url}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            placeholder="https://..."
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
          placeholder="Détails sur l'état, édition, etc."
        />
      </div>
      <div className="flex justify-end gap-3">
        <button type="button" onClick={() => setForm({ title: '', author: '', isbn: '', price: '', condition: 'Très bon', description: '', cover_image_url: '' })} className="rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Réinitialiser</button>
        <button type="submit" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Enregistrer</button>
      </div>
    </form>
  );
};

export default AnnouncementForm;
