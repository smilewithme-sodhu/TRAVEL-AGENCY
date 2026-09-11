import React, { useState, useEffect } from 'react';
import { binaryApi } from '../../api';
import { formatINR } from '../../utils/formatters';
import { TreeSkeleton } from '../ui/Skeleton';
import {
  GitFork,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  X
} from 'lucide-react';

export const BinaryPage = () => {
  const [overview, setOverview] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    binaryApi
      .getSummary()
      .then((res) => {
        if (res.success) setOverview(res.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleZoomIn = () => setZoom((z) => Math.min(1.4, z + 0.1));
  const handleZoomOut = () => setZoom((z) => Math.max(0.65, z - 0.1));
  const handleResetZoom = () => setZoom(1);

  if (isLoading) return <TreeSkeleton />;

  const root = overview?.rootNode;

  const renderNode = (node, depth = 0) => {
    if (!node) return null;
    const isSelected = selectedNode?.id === node.id;
    const isActive = node.status === 'ACTIVE';

    return (
      <div className="flex flex-col items-center animate-fadeIn">
        {/* Node Card */}
        <div
          onClick={() => setSelectedNode(node)}
          className={`p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer select-none text-center min-w-[140px] sm:min-w-[180px] ${
            isSelected
              ? 'bg-[#0F172A] text-white border-[#C9A455] shadow-xl ring-2 ring-[#C9A455]/40'
              : isActive
              ? 'bg-white text-slate-900 border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-400'
              : 'bg-slate-50 text-slate-500 border-slate-200 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-1 gap-1">
            <span className="font-mono text-[9px] font-bold text-slate-400">#{node.memberCode}</span>
            <span
              className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                isActive
                  ? isSelected
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-emerald-50 text-emerald-700'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {node.status}
            </span>
          </div>

          <h4 className="font-sans font-bold text-xs sm:text-sm truncate max-w-[130px] mx-auto">
            {node.name}
          </h4>

          <div className="grid grid-cols-2 gap-1 mt-2 pt-2 border-t border-slate-100/30 text-[9px] font-mono">
            <div className="text-left">
              <span className="text-slate-400 block text-[8px]">L. VOL</span>
              <span className="font-bold">{formatINR(node.leftVolume)}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[8px]">R. VOL</span>
              <span className="font-bold">{formatINR(node.rightVolume)}</span>
            </div>
          </div>
        </div>

        {/* Tree Branch Connectors */}
        {(node.leftChild || node.rightChild) && depth < 2 && (
          <div className="flex flex-col items-center w-full">
            <div className="w-0.5 h-5 bg-slate-300" />
            <div className="w-1/2 h-0.5 bg-slate-300 relative" />
            <div className="flex justify-between w-full gap-4 sm:gap-10 pt-2">
              <div className="flex-1 flex justify-center">{node.leftChild && renderNode(node.leftChild, depth + 1)}</div>
              <div className="flex-1 flex justify-center">{node.rightChild && renderNode(node.rightChild, depth + 1)}</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h1 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
            Binary Tree Genealogy
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Interactive visualization of volumes, carry-forward points, and dual-leg node placement.
          </p>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-full border border-slate-200 shadow-2xs self-start sm:self-auto">
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="font-mono text-xs font-bold text-slate-700 px-2">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 cursor-pointer ml-1"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Compact 2x2 Metrics Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white rounded-2xl border border-slate-100/90 shadow-2xs">
          <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Left Leg Volume</span>
          <div className="font-sans font-extrabold text-base sm:text-lg text-blue-600">{formatINR(overview?.leftVolume)}</div>
        </div>
        <div className="p-3.5 bg-white rounded-2xl border border-slate-100/90 shadow-2xs">
          <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Right Leg Volume</span>
          <div className="font-sans font-extrabold text-base sm:text-lg text-[#C9A455]">{formatINR(overview?.rightVolume)}</div>
        </div>
        <div className="p-3.5 bg-[#0F172A] text-white rounded-2xl shadow-2xs">
          <span className="text-[9px] font-bold text-slate-300 uppercase block mb-0.5">Matched Volume</span>
          <div className="font-sans font-extrabold text-base sm:text-lg text-[#C9A455]">{formatINR(overview?.matchedVolume)}</div>
        </div>
        <div className="p-3.5 bg-white rounded-2xl border border-slate-100/90 shadow-2xs">
          <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Carry Forward</span>
          <div className="font-sans font-extrabold text-base sm:text-lg text-slate-900">{formatINR(overview?.leftCarryForward)}</div>
        </div>
      </div>

      {/* Pannable/Zoomable Tree Canvas Viewport (Strictly Contained) */}
      <div className="w-full max-w-full bg-slate-50/80 border border-slate-200/80 rounded-3xl p-4 sm:p-10 overflow-x-auto min-h-[420px] flex items-center justify-center relative shadow-inner">
        <div
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
          className="transition-transform duration-200 flex justify-center py-4 min-w-[340px]"
        >
          {root && renderNode(root)}
        </div>
      </div>

      {/* Node Detail Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0F172A] text-[#C9A455] font-bold text-sm flex items-center justify-center">
                  {selectedNode.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-sans font-bold text-base text-slate-900">{selectedNode.name}</h3>
                  <div className="font-mono text-[10px] text-slate-500">#{selectedNode.memberCode}</div>
                </div>
              </div>
              <button onClick={() => setSelectedNode(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">Left Volume</span>
                <span className="font-bold text-slate-900">{formatINR(selectedNode.leftVolume)}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">Right Volume</span>
                <span className="font-bold text-slate-900">{formatINR(selectedNode.rightVolume)}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">Left Carry</span>
                <span className="font-bold text-slate-900">{formatINR(selectedNode.leftCarry)}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">Right Carry</span>
                <span className="font-bold text-slate-900">{formatINR(selectedNode.rightCarry)}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedNode(null)}
              className="w-full py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
            >
              Close Node View
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
