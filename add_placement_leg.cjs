const fs = require('fs');
const file = 'src/components/auth/RegisterPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const replacement = \
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                Placement Leg
              </label>
              <div className="relative flex items-center">
                <select
                  value={placementSide}
                  onChange={(e) => setPlacementSide(e.target.value)}
                  className="w-full pl-4 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white appearance-none"
                  disabled={isLocked}
                >
                  <option value="" disabled>Select placement leg</option>
                  <option value="LEFT">Left Team</option>
                  <option value="RIGHT">Right Team</option>
                </select>
                <div className="absolute right-3.5 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
\;

content = content.replace(
  /<div className="space-y-1">\s*<label className="text-\[11px\] font-bold uppercase tracking-wider text-slate-700 block">\s*Password\s*<\/label>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<label className="flex items-start gap-2.5 mt-4 group cursor-pointer">/,
  replacement + '\n\n            <label className="flex items-start gap-2.5 mt-4 group cursor-pointer">'
);

fs.writeFileSync(file, content, 'utf8');
