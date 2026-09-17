import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { packageApi } from '../../api/adminApi';
import { toast } from 'react-toastify';
import { FiX } from 'react-icons/fi';

export function PackageFormModal({ isOpen, onClose, initialData }) {
  const queryClient = useQueryClient();
  const isEditing = !!initialData;

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    destinationId: '',
    packageType: 'STANDARD',
    status: 'DRAFT',
    durationNights: 3,
    maxTravellers: 2,
    highlights: '',
    sellingPrice: 0,
    directRewardBudget: 0,
    teamRewardBudget: 0,
    binaryVolumeBudget: 0
  });

  useEffect(() => {
    if (initialData) {
      const activePrice = initialData.prices?.[0] || {};
      setFormData({
        name: initialData.name || '',
        slug: initialData.slug || '',
        destinationId: initialData.destinationId || '',
        packageType: initialData.packageType || 'STANDARD',
        status: initialData.status || 'DRAFT',
        durationNights: initialData.durationNights || 3,
        maxTravellers: initialData.maxTravellers || 2,
        highlights: initialData.highlights ? initialData.highlights.join('\n') : '',
        sellingPrice: Number(activePrice.sellingPrice || 0),
        directRewardBudget: Number(activePrice.directRewardBudget || 0),
        teamRewardBudget: Number(activePrice.teamRewardBudget || 0),
        binaryVolumeBudget: Number(activePrice.binaryVolumeBudget || 0)
      });
    }
  }, [initialData]);

  const mutation = useMutation({
    mutationFn: (data) => isEditing 
      ? packageApi.updatePackage({ id: initialData.id, ...data }) 
      : packageApi.createPackage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-packages'] });
      toast.success(isEditing ? 'Package updated' : 'Package created');
      onClose();
    },
    onError: (err) => {
      toast.error('Operation failed: ' + (err.response?.data?.error || err.message));
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      highlights: formData.highlights.split('\n').filter(h => h.trim()),
    };
    mutation.mutate(payload);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-neutral-900 border border-neutral-700 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-neutral-900 border-b border-neutral-700 p-6 flex justify-between items-center z-10">
          <h2 className="text-2xl font-light text-amber-500">
            {isEditing ? 'Edit Package' : 'Create New Package'}
          </h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-white">
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8 text-neutral-300">
          
          {/* General Information */}
          <section>
            <h3 className="text-lg font-medium text-white mb-4 border-b border-neutral-800 pb-2">General Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-neutral-400">Package Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 focus:border-amber-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-neutral-400">Slug (URL)</label>
                <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 focus:border-amber-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-neutral-400">Destination UUID</label>
                <input required type="text" name="destinationId" value={formData.destinationId} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 focus:border-amber-500 focus:outline-none text-xs font-mono" placeholder="123e4567-e89b-12d3-a456-426614174000" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-neutral-400">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 focus:border-amber-500 focus:outline-none">
                  <option value="DRAFT">DRAFT</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>
            </div>
          </section>

          {/* Financials */}
          <section>
            <h3 className="text-lg font-medium text-amber-500 mb-4 border-b border-neutral-800 pb-2">Financial Architecture</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1 text-neutral-400">Selling Price (₹)</label>
                <input required type="number" min="0" step="0.01" name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white font-mono focus:border-amber-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-neutral-400">Direct Reward Budget (₹)</label>
                <input required type="number" min="0" step="0.01" name="directRewardBudget" value={formData.directRewardBudget} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white font-mono focus:border-amber-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-neutral-400">Team Reward Budget (₹)</label>
                <input required type="number" min="0" step="0.01" name="teamRewardBudget" value={formData.teamRewardBudget} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white font-mono focus:border-amber-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-neutral-400">Binary Volume Budget (PV / ₹)</label>
                <input required type="number" min="0" step="0.01" name="binaryVolumeBudget" value={formData.binaryVolumeBudget} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white font-mono focus:border-amber-500 focus:outline-none" />
              </div>
            </div>
            <p className="text-xs text-neutral-500 mt-3 flex gap-2">
              <span className="text-amber-500">⚠</span> Ensure these match the Master Rule Version economics.
            </p>
          </section>

          {/* Details */}
          <section>
            <h3 className="text-lg font-medium text-white mb-4 border-b border-neutral-800 pb-2">Package Details</h3>
            <div className="mb-4">
              <label className="block text-sm mb-1 text-neutral-400">Highlights (One per line)</label>
              <textarea rows={4} name="highlights" value={formData.highlights} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 focus:border-amber-500 focus:outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-neutral-400">Duration (Nights)</label>
                <input required type="number" min="1" name="durationNights" value={formData.durationNights} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 focus:border-amber-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-neutral-400">Max Travellers</label>
                <input required type="number" min="1" name="maxTravellers" value={formData.maxTravellers} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 focus:border-amber-500 focus:outline-none" />
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t border-neutral-700">
            <button type="button" onClick={onClose} disabled={mutation.isPending} className="px-6 py-2 rounded text-neutral-400 hover:text-white transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={mutation.isPending} className="px-6 py-2 rounded bg-amber-500 hover:bg-amber-600 text-neutral-900 font-medium disabled:opacity-50 transition-colors">
              {mutation.isPending ? 'Saving...' : 'Save Package'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
