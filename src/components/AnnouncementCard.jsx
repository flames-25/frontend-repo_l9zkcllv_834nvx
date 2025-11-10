import React from 'react';
import { ImageOff, MessageSquare } from 'lucide-react';

const AnnouncementCard = ({ item, onView, onContact }) => {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      {item.cover_image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.cover_image_url}
          alt={item.title}
          className="h-40 w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex h-40 w-full items-center justify-center bg-gray-50 text-gray-400">
          <ImageOff className="h-8 w-8" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-base font-semibold text-gray-900">{item.title}</h3>
          <div className="shrink-0 rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">{item.price}€</div>
        </div>
        <p className="mt-1 text-sm text-gray-500">{item.author}</p>
        <p className="mt-1 text-xs text-gray-400">ISBN: {item.isbn}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <button
            onClick={() => onView(item)}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            Voir détails
          </button>
          <button
            onClick={() => onContact(item)}
            className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            <MessageSquare className="h-4 w-4" /> Contacter
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
