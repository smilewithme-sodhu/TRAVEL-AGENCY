import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api/client';
import { useWanderlust } from '../../context/WanderlustContext';
import { Package, Plus, X, Pencil, Trash2, Loader2, CheckCircle2 } from 'lucide-react';

interface PackageItem {
  id: string;
  name: string;
  slug: string;
  packageType: 'DOMESTIC' | 'INTERNATIONAL';
  durationNights: number;
  maxTravellers: number;
  status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
  destination: { name: string };
  prices: { sellingPrice: string; directRewardBudget: string; teamRewardBudget: string; binaryVolumeBudget: string }[];
}

const EMPTY_FORM = {
  name: '',
  slug: '',
  packageType: 'DOMESTIC',
  durationNights: '1',
  maxTravellers: '20',
  sellingPrice: '',
  directRewardBudget: '0',
  teamRewardBudget: '0',
  binaryVolumeBudget: '0',
  cancellationPolicy: 'Standard cancellation policy applies.',
  highlights: '',
  inclusions: '',
  exclusions: '',
  status: 'ACTIVE',
};

const DESTINATION_ID = '987c85c3-0f03-4f7b-8b98-b0543341ec19'; // "Manual Injection Destination"

export const AdminPackagesPage: React.FC = () => {
  const { showToast } = useWanderlust();
  const qc = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });

  const { data: packages = [], isLoading } = useQuery<PackageItem[]>({
    queryKey: ['admin-packages'],
    queryFn: async () => {
      const { data } = await apiClient.get('/api/admin/packages');
      return data.data || [];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await apiClient.post('/api/admin/packages', payload);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-packages'] });
      showToast('Package created successfully!', 'success');
      closeModal();
    },
    onError: (e: any) => showToast(e?.response?.data?.error || 'Failed to create package', 'error'),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      const { data } = await apiClient.put(`/api/admin/packages/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-packages'] });
      showToast('Package updated!', 'success');
      closeModal();
    },
    onError: (e: any) => showToast(e?.response?.data?.error || 'Failed to update package', 'error'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await apiClient.delete(`/api/admin/packages/${id}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-packages'] });
      showToast('Package deleted.', 'success');
    },
    onError: (e: any) => showToast(e?.response?.data?.error || 'Failed to delete package', 'error'),
  });

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
  };

  const openCreate = () => {
    setForm({ ...EMPTY_FORM });
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (pkg: PackageItem) => {
    const price = pkg.prices?.[0];
    setForm({
      name: pkg.name,
      slug: pkg.slug,
      packageType: pkg.packageType,
      durationNights: String(pkg.durationNights),
      maxTravellers: String(pkg.maxTravellers),
      sellingPrice: price ? String(Number(price.sellingPrice)) : '',
      directRewardBudget: price ? String(Number(price.directRewardBudget)) : '0',
      teamRewardBudget: price ? String(Number(price.teamRewardBudget)) : '0',
      binaryVolumeBudget: price ? String(Number(price.binaryVolumeBudget)) : '0',
      cancellationPolicy: pkg.cancellationPolicy || 'Standard cancellation policy applies.',
      highlights: (pkg.highlights || []).join(', '),
      inclusions: (pkg.inclusions || []).join(', '),
      exclusions: (pkg.exclusions || []).join(', '),
      status: pkg.status,
    } as any);
    setEditingId(pkg.id);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      destinationId: DESTINATION_ID,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now(),
      name: form.name,
      packageType: form.packageType,
      durationNights: Number(form.durationNights),
      maxTravellers: Number(form.maxTravellers),
      sellingPrice: Number(form.sellingPrice),
      directRewardBudget: Number(form.directRewardBudget),
      teamRewardBudget: Number(form.teamRewardBudget),
      binaryVolumeBudget: Number(form.binaryVolumeBudget),
      cancellationPolicy: form.cancellationPolicy,
      highlights: form.highlights ? form.highlights.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
      inclusions: form.inclusions ? form.inclusions.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
      exclusions: form.exclusions ? form.exclusions.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
      status: form.status,
    };
    if (editingId) {
      updateMutation.mutate({ id: editingId, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const isBusy = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Admin</span>
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            Manage Packages
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Create and manage travel packages that members can book.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Package
        </button>
      </div>

      {/* Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
          </div>
        ) : packages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-500">
            <Package className="w-12 h-12 opacity-30" />
            <p className="font-semibold">No packages yet. Add one above!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-4 px-5">Package</th>
                  <th className="py-4 px-5">Type</th>
                  <th className="py-4 px-5">Nights</th>
                  <th className="py-4 px-5">Selling Price (TP)</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-medium">
                {packages.map((pkg) => {
                  const price = pkg.prices?.[0];
                  return (
                    <tr key={pkg.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="py-4 px-5">
                        <p className="font-bold text-white text-sm">{pkg.name}</p>
                        <span className="text-[11px] text-slate-400">{pkg.destination?.name}</span>
                      </td>
                      <td className="py-4 px-5 text-slate-400">{pkg.packageType}</td>
                      <td className="py-4 px-5 text-slate-400">{pkg.durationNights}N</td>
                      <td className="py-4 px-5 font-bold text-white">
                        {price ? `TP ${Number(price.sellingPrice).toLocaleString()}` : '—'}
                      </td>
                      <td className="py-4 px-5">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          pkg.status === 'ACTIVE' ? 'bg-emerald-900/50 text-emerald-400' :
                          pkg.status === 'DRAFT' ? 'bg-amber-900/50 text-amber-400' :
                          'bg-slate-800 text-slate-500'
                        }`}>
                          {pkg.status}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEdit(pkg)}
                            className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete "${pkg.name}"?`)) deleteMutation.mutate(pkg.id);
                            }}
                            className="p-1.5 rounded-lg hover:bg-red-900/50 text-slate-400 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl w-full max-w-2xl border border-slate-700 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
              <h3 className="font-display font-bold text-xl text-white">
                {editingId ? 'Edit Package' : 'Add New Package'}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Package Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Goa 3-Night Beach Escape"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Package Type</label>
                  <select
                    value={form.packageType}
                    onChange={e => setForm(f => ({ ...f, packageType: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="DOMESTIC">Domestic</option>
                    <option value="INTERNATIONAL">International</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="ACTIVE">Active (visible to members)</option>
                    <option value="DRAFT">Draft (hidden)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Duration (Nights)</label>
                  <input
                    type="number" min="1"
                    value={form.durationNights}
                    onChange={e => setForm(f => ({ ...f, durationNights: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Max Travellers</label>
                  <input
                    type="number" min="1"
                    value={form.maxTravellers}
                    onChange={e => setForm(f => ({ ...f, maxTravellers: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="sm:col-span-2 border-t border-slate-800 pt-4">
                  <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3">Pricing (TP = Travel Points)</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Selling Price (TP) *</label>
                  <input
                    required type="number" min="0"
                    value={form.sellingPrice}
                    onChange={e => setForm(f => ({ ...f, sellingPrice: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. 25000"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Direct Bonus Budget (TP)</label>
                  <input
                    type="number" min="0"
                    value={form.directRewardBudget}
                    onChange={e => setForm(f => ({ ...f, directRewardBudget: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Team Bonus Budget (TP)</label>
                  <input
                    type="number" min="0"
                    value={form.teamRewardBudget}
                    onChange={e => setForm(f => ({ ...f, teamRewardBudget: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Binary Volume Budget (TP)</label>
                  <input
                    type="number" min="0"
                    value={form.binaryVolumeBudget}
                    onChange={e => setForm(f => ({ ...f, binaryVolumeBudget: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="sm:col-span-2 border-t border-slate-800 pt-4">
                  <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3">Details (comma-separated)</p>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Highlights</label>
                  <input
                    value={form.highlights}
                    onChange={e => setForm(f => ({ ...f, highlights: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Beach resort, Sunset cruise, Breakfast included"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Inclusions</label>
                  <input
                    value={form.inclusions}
                    onChange={e => setForm(f => ({ ...f, inclusions: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Hotel, Meals, Transfers"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Exclusions</label>
                  <input
                    value={form.exclusions}
                    onChange={e => setForm(f => ({ ...f, exclusions: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Airfare, Personal expenses"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Cancellation Policy</label>
                  <textarea
                    rows={2}
                    value={form.cancellationPolicy}
                    onChange={e => setForm(f => ({ ...f, cancellationPolicy: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isBusy}
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {isBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  {editingId ? 'Save Changes' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
