const fs = require('fs');
let code = fs.readFileSync('src/components/auth/RegisterPage.jsx', 'utf8');

code = code.replace(
  "Referral Code (Optional)",
  "Referral Code"
);

code = code.replace(
  "className=\"w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white\"",
  "readOnly={isLocked}\n                  className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-xs font-semibold focus:outline-none transition-all ${isLocked ? 'bg-amber-50 border-amber-500 text-amber-900 ring-2 ring-amber-500/50' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-slate-900 focus:bg-white'}`}"
);

const termsCheckboxHtml = `<div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"`;

const placementLegUI = `
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
              Placement Leg
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className={\`relative flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold cursor-pointer transition-all \${placementSide === 'LEFT' ? 'bg-[#0F172A] border-[#0F172A] text-white' : 'bg-slate-50 border-slate-200 text-slate-600'} \${isLocked ? 'pointer-events-none' : ''} \${isLocked && placementSide === 'LEFT' ? 'ring-2 ring-amber-500 bg-amber-50 border-amber-500 text-amber-900' : ''}\`}>
                <input type="radio" name="leg" value="LEFT" checked={placementSide === 'LEFT'} onChange={() => setPlacementSide('LEFT')} className="sr-only" disabled={isLocked} />
                Left Team
              </label>
              <label className={\`relative flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold cursor-pointer transition-all \${placementSide === 'RIGHT' ? 'bg-[#0F172A] border-[#0F172A] text-white' : 'bg-slate-50 border-slate-200 text-slate-600'} \${isLocked ? 'pointer-events-none' : ''} \${isLocked && placementSide === 'RIGHT' ? 'ring-2 ring-amber-500 bg-amber-50 border-amber-500 text-amber-900' : ''}\`}>
                <input type="radio" name="leg" value="RIGHT" checked={placementSide === 'RIGHT'} onChange={() => setPlacementSide('RIGHT')} className="sr-only" disabled={isLocked} />
                Right Team
              </label>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"`;

code = code.replace(termsCheckboxHtml, placementLegUI);

fs.writeFileSync('src/components/auth/RegisterPage.jsx', code);
