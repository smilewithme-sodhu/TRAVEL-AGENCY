import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/client';
import { Network, Users, UserPlus, X, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const fetchNetworkTree = async () => {
  const { data } = await apiClient.get('/api/network/tree');
  return data.data;
};

// Recursive Tree Node Component
const TreeNode = ({ node, level = 0, parentId = null, side = null, onAddMember, onNodeClick }) => {
  if (!node && level >= 4) return null;

  if (!node) {
    return (
      <div 
        onClick={() => parentId && side && onAddMember(parentId, side)}
        className="flex flex-col items-center mx-1 sm:mx-2 cursor-pointer group"
      >
        <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-700 bg-slate-800/50 flex items-center justify-center mb-2 shadow-inner group-hover:border-[#C9A455] group-hover:bg-[#C9A455]/10 transition-all duration-200">
          <UserPlus size={16} className="text-slate-600 group-hover:text-[#C9A455] transition-colors" />
        </div>
        <div className="text-[10px] text-slate-600 font-medium group-hover:text-[#C9A455] transition-colors">Add</div>
      </div>
    );
  }

  const isGreen = node.member?.isGreen === true || node.member?.greenStatus === 'GREEN';
  const currentMemberId = node.member?.memberId || node.member?.referralCode || node.memberId;

  return (
    <div className="flex flex-col items-center relative">
      {/* Node Avatar Card */}
      <div 
        onClick={() => onNodeClick(node)}
        className={`relative group flex flex-col items-center z-10 bg-[#1E293B] rounded-xl p-2 sm:p-3 border-2 shadow-lg transition-all duration-200 hover:scale-110 cursor-pointer w-24 sm:w-32 mx-1 sm:mx-2 ${isGreen ? 'border-[#C9A455]' : 'border-slate-600'}`}
      >
        <div className="absolute -top-2 bg-[#0F172A] px-1.5 sm:px-2 rounded-full border border-slate-700 text-[8px] sm:text-[10px] font-bold text-slate-400 tracking-wider">
          {currentMemberId || 'UNKNOWN'}
        </div>
        
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-800 flex items-center justify-center mb-1 overflow-hidden border border-slate-700">
          <Users size={16} className={isGreen ? 'text-[#C9A455]' : 'text-slate-500'} />
        </div>
        
        <div className="text-[10px] sm:text-xs font-semibold text-white truncate w-full text-center">
          {node.member?.user?.name || 'Member'}
        </div>
      </div>

      {/* Connection Lines & Children */}
      {level < 4 && (
        <div className="w-full relative flex flex-col items-center mt-2">
          {/* Vertical Line Drop */}
          <div className="w-px h-4 sm:h-6 bg-slate-700 -z-10"></div>
          
          {/* Horizontal Connecting Line */}
          <div className="w-full relative flex justify-center -z-10">
             <div className="absolute top-0 w-[50%] h-px bg-slate-700"></div>
             
             {/* Left & Right Child Columns */}
             <div className="flex justify-between w-full">
                <div className="flex flex-1 justify-center relative">
                   <div className="absolute top-0 w-px h-4 sm:h-6 bg-slate-700"></div>
                   <div className="mt-4 sm:mt-6">
                     <TreeNode 
                       node={node.leftChild} 
                       level={level + 1} 
                       parentId={node.memberId} 
                       side="LEFT" 
                       onAddMember={onAddMember} 
                       onNodeClick={onNodeClick}
                     />
                   </div>
                </div>
                <div className="flex flex-1 justify-center relative">
                   <div className="absolute top-0 w-px h-4 sm:h-6 bg-slate-700"></div>
                   <div className="mt-4 sm:mt-6">
                     <TreeNode 
                       node={node.rightChild} 
                       level={level + 1} 
                       parentId={node.memberId} 
                       side="RIGHT" 
                       onAddMember={onAddMember} 
                       onNodeClick={onNodeClick}
                     />
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const BinaryPage = () => {
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState(null);
  
  const { data: tree, isLoading, isError } = useQuery({
    queryKey: ['network-tree'],
    queryFn: fetchNetworkTree,
  });

  const handleAddMember = (sponsorId, leg) => {
    navigate(`/register?sponsor=${sponsorId}&leg=${leg}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#C9A455] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8">
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-red-400">
          Failed to load network tree. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 p-4 sm:p-8 flex flex-col h-[calc(100vh-4rem)]">
      <div className="max-w-6xl w-full mx-auto mb-6 shrink-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Network className="text-[#C9A455]" size={28} />
          Binary Network
        </h1>
        <p className="text-sm text-slate-500 mb-6">Explore your downline. Scroll to zoom, drag to pan.</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
            <h3 className="text-xs sm:text-sm font-medium text-slate-400 mb-1">Left Carry Forward</h3>
            <p className="text-xl sm:text-3xl font-mono font-bold text-[#C9A455]">
              ${Number(tree?.leftCarryForward || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
            <h3 className="text-xs sm:text-sm font-medium text-slate-400 mb-1">Right Carry Forward</h3>
            <p className="text-xl sm:text-3xl font-mono font-bold text-[#C9A455]">
              ${Number(tree?.rightCarryForward || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl w-full mx-auto bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative min-h-[400px]">
        <TransformWrapper
          initialScale={1}
          minScale={0.1}
          maxScale={3}
          centerOnInit={true}
          wheel={{ step: 0.1 }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="absolute top-4 right-4 z-20 flex gap-2">
                <button onClick={() => zoomIn()} className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg shadow border border-slate-700 transition-colors">
                  <ZoomIn size={18} />
                </button>
                <button onClick={() => zoomOut()} className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg shadow border border-slate-700 transition-colors">
                  <ZoomOut size={18} />
                </button>
                <button onClick={() => resetTransform()} className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg shadow border border-slate-700 transition-colors">
                  <Maximize size={18} />
                </button>
              </div>
              <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", paddingTop: "3rem", paddingBottom: "3rem" }}>
                <TreeNode node={tree} level={0} onAddMember={handleAddMember} onNodeClick={setSelectedNode} />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>

      {/* Node Details Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-slideUp">
            <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex justify-between items-center">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <Users size={20} className="text-[#C9A455]" />
                Member Details
              </h3>
              <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-slate-400 text-sm">Name</span>
                <span className="text-white font-medium">{selectedNode.member?.user?.name || 'Unknown'}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-slate-400 text-sm">Member ID</span>
                <span className="text-[#C9A455] font-mono font-bold">{selectedNode.member?.memberId || selectedNode.member?.referralCode || selectedNode.memberId}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-slate-400 text-sm">Status</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${(selectedNode.member?.isGreen === true || selectedNode.member?.greenStatus === 'GREEN') ? 'bg-emerald-900/30 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                  {(selectedNode.member?.isGreen === true || selectedNode.member?.greenStatus === 'GREEN') ? 'ACTIVE' : 'REGISTERED'}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-slate-400 text-sm">Left Volume</span>
                <span className="text-emerald-400 font-mono font-medium">${Number(selectedNode.leftCarryForward || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Right Volume</span>
                <span className="text-emerald-400 font-mono font-medium">${Number(selectedNode.rightCarryForward || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
