import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/client';
import { Network, Users, UserPlus } from 'lucide-react';

const fetchNetworkTree = async () => {
  const { data } = await apiClient.get('/api/network/tree');
  return data.data;
};

// Recursive Tree Node Component
const TreeNode = ({ node, level = 0, parentId = null, side = null, onAddMember }) => {
  if (!node && level >= 3) return null;

  if (!node) {
    return (
      <div 
        onClick={() => parentId && side && onAddMember(parentId, side)}
        className="flex flex-col items-center mx-2 sm:mx-4 cursor-pointer group"
      >
        <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-700 bg-slate-800/50 flex items-center justify-center mb-2 shadow-inner group-hover:border-[#C9A455] group-hover:bg-[#C9A455]/10 transition-all duration-200">
          <UserPlus size={20} className="text-slate-600 group-hover:text-[#C9A455] transition-colors" />
        </div>
        <div className="text-xs text-slate-600 font-medium group-hover:text-[#C9A455] transition-colors">Add Member</div>
      </div>
    );
  }

  const isGreen = node.member?.isGreen === true || node.member?.greenStatus === 'ACTIVE';
  const currentMemberId = node.member?.memberId;

  return (
    <div className="flex flex-col items-center relative">
      {/* Node Avatar Card */}
      <div className={`relative group flex flex-col items-center z-10 bg-[#1E293B] rounded-xl p-3 border-2 shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer w-32 sm:w-40 mx-2 sm:mx-4 ${isGreen ? 'border-[#C9A455]' : 'border-slate-600'}`}>
        <div className="absolute -top-3 bg-[#0F172A] px-2 rounded-full border border-slate-700 text-[10px] font-bold text-slate-400 tracking-wider">
          {currentMemberId || 'UNKNOWN'}
        </div>
        
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-800 flex items-center justify-center mb-2 overflow-hidden border border-slate-700">
          <Users size={20} className={isGreen ? 'text-[#C9A455]' : 'text-slate-500'} />
        </div>
        
        <div className="text-xs sm:text-sm font-semibold text-white truncate w-full text-center">
          {node.member?.user?.name || 'Member'}
        </div>
        
        {/* Tooltip on Hover */}
        <div className="absolute hidden group-hover:flex flex-col top-full mt-2 left-1/2 transform -translate-x-1/2 w-48 bg-slate-900 border border-[#C9A455]/30 rounded-lg p-3 shadow-xl text-xs z-50 pointer-events-none">
          <div className="flex justify-between border-b border-slate-800 pb-1 mb-1">
            <span className="text-slate-400">Left Vol:</span>
            <span className="text-emerald-400 font-mono">${Number(node.leftCarryForward || 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between pb-1 mb-1 border-b border-slate-800">
            <span className="text-slate-400">Right Vol:</span>
            <span className="text-emerald-400 font-mono">${Number(node.rightCarryForward || 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Status:</span>
            <span className={isGreen ? 'text-[#C9A455]' : 'text-slate-500'}>{isGreen ? 'Active' : 'Inactive'}</span>
          </div>
        </div>
      </div>

      {/* Connection Lines & Children */}
      {level < 2 && (
        <div className="w-full relative flex flex-col items-center mt-2">
          {/* Vertical Line Drop */}
          <div className="w-px h-6 bg-slate-700 -z-10"></div>
          
          {/* Horizontal Connecting Line */}
          <div className="w-full relative flex justify-center -z-10">
             <div className="absolute top-0 w-[50%] h-px bg-slate-700"></div>
             
             {/* Left & Right Child Columns */}
             <div className="flex justify-between w-full">
                <div className="flex flex-1 justify-center relative">
                   <div className="absolute top-0 w-px h-6 bg-slate-700"></div>
                   <div className="mt-6">
                     <TreeNode 
                       node={node.leftChild} 
                       level={level + 1} 
                       parentId={currentMemberId} 
                       side="LEFT" 
                       onAddMember={onAddMember} 
                     />
                   </div>
                </div>
                <div className="flex flex-1 justify-center relative">
                   <div className="absolute top-0 w-px h-6 bg-slate-700"></div>
                   <div className="mt-6">
                     <TreeNode 
                       node={node.rightChild} 
                       level={level + 1} 
                       parentId={currentMemberId} 
                       side="RIGHT" 
                       onAddMember={onAddMember} 
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
  
  const { data: tree, isLoading, isError } = useQuery({
    queryKey: ['network-tree'],
    queryFn: fetchNetworkTree,
  });

  const handleAddMember = (sponsorId, leg) => {
    // Navigate to register page and pre-fill the sponsor ID and leg
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
    <div className="min-h-screen bg-[#0F172A] text-slate-300 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Network className="text-[#C9A455]" size={32} />
          Binary Network
        </h1>
        <p className="text-slate-500 mb-8">View your downline organization and business volume.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A455]/10 rounded-bl-full -mr-8 -mt-8"></div>
            <h3 className="text-lg font-medium text-slate-400 mb-1">Left Carry Forward</h3>
            <p className="text-4xl font-mono font-bold text-[#C9A455]">
              ${Number(tree?.leftCarryForward || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A455]/10 rounded-bl-full -mr-8 -mt-8"></div>
            <h3 className="text-lg font-medium text-slate-400 mb-1">Right Carry Forward</h3>
            <p className="text-4xl font-mono font-bold text-[#C9A455]">
              ${Number(tree?.rightCarryForward || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto bg-slate-900/50 border border-slate-800 rounded-3xl p-8 overflow-x-auto">
         <div className="min-w-[800px] flex justify-center py-12">
            <TreeNode node={tree} level={0} onAddMember={handleAddMember} />
         </div>
      </div>
    </div>
  );
};
