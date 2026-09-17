const fs = require('fs');

let content = fs.readFileSync('src/components/auth/RegisterPage.jsx', 'utf8');

content = content.replace(
  "const [placementSide, setPlacementSide] = useState('');",
  "const [placementSide, setPlacementSide] = useState('');\n  const [isLocked, setIsLocked] = useState(false);"
);

content = content.replace(
  "    if (params.has('leg')) {\n      const leg = params.get('leg')?.toUpperCase();\n      if (leg === 'LEFT' || leg === 'RIGHT') setPlacementSide(leg);\n    }",
  "    if (params.has('leg')) {\n      const leg = params.get('leg')?.toUpperCase();\n      if (leg === 'LEFT' || leg === 'RIGHT') setPlacementSide(leg);\n    }\n    if (params.has('ref') && params.has('leg')) setIsLocked(true);"
);

content = content.replace(
  "if (!fullName || !mobile || !email || !password) {",
  "if (!fullName || !mobile || !email || !password || !referralCode || !placementSide) {\n      showToast('Please fill in all mandatory fields, including Referral Code and Placement Leg.', 'error');\n      return;\n    }\n    if (!fullName || !mobile || !email || !password) {"
);

content = content.replace(
  "placementSide: placementSide || 'AUTO'",
  "placementLeg: placementSide"
);

content = content.replace(
  "Referral Code (Optional)",
  "Referral Code"
);

content = content.replace(
  "<input\n                  type=\"text\"\n                  name=\"sponsor-referral-code-field\"\n                  autoComplete=\"off\"\n                  value={referralCode}\n                  onChange={(e) => setReferralCode(e.target.value)}\n                  placeholder=\"TRV1092\"\n                  className=\"w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white\"\n                />",
  "<input\n                  type=\"text\"\n                  name=\"sponsor-referral-code-field\"\n                  autoComplete=\"off\"\n                  value={referralCode}\n                  onChange={(e) => setReferralCode(e.target.value)}\n                  placeholder=\"TRV1092\"\n                  readOnly={isLocked}\n                  className={w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white }\n                />"
);

const placementLegUI = 
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
              Placement Leg
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className={\elative flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold cursor-pointer transition-all \ \ \\}>
                <input type="radio" name="leg" value="LEFT" checked={placementSide === 'LEFT'} onChange={() => setPlacementSide('LEFT')} className="sr-only" disabled={isLocked} />
                Left Team
              </label>
              <label className={\elative flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold cursor-pointer transition-all \ \ \\}>
                <input type="radio" name="leg" value="RIGHT" checked={placementSide === 'RIGHT'} onChange={() => setPlacementSide('RIGHT')} className="sr-only" disabled={isLocked} />
                Right Team
              </label>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1">
;

content = content.replace(
  "<div className=\"flex items-start gap-2 pt-1\">\n            <input\n              type=\"checkbox\"",
  placementLegUI +             <input\n              type="checkbox"
);

fs.writeFileSync('src/components/auth/RegisterPage.jsx', content);
console.log("Updated RegisterPage.jsx");
