// ከላይ ያለውን የ Leaderboard ኮድ ትተህ ይህንን ክፍል ብቻ አስተካክል (ወይም ሙሉውን ተካው)

{/* Profile Info Column - ይህንን ክፍል አዘምን */}
<div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-800/60 flex flex-col items-center justify-center text-center mt-6">
  <div className="w-20 h-20 rounded-full bg-blue-600/20 flex items-center justify-center border-4 border-slate-800 mb-4 relative">
    <User className="w-10 h-10 text-blue-400" />
    <div className="absolute -bottom-1 -right-1 bg-slate-800 p-1 rounded-full border border-slate-700">
      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
    </div>
  </div>
  <h3 className="text-lg font-bold text-white mb-0.5">
    {profile?.fullName || user.email?.split('@')[0]}
  </h3>
  <p className="text-xs text-slate-400 mb-4">{user.email}</p>
  
  <div className="w-full max-w-[200px]">
    <div className="flex justify-between text-[10px] text-slate-500 mb-1">
       <span>ደረጃዎ</span>
       <span>{Math.min(((profile?.xpPoints || 0) / 100) * 100, 100).toFixed(0)}%</span>
    </div>
    <div className="w-full bg-slate-900 rounded-full h-2 mb-2 overflow-hidden border border-slate-700">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{ width: `${Math.min(((profile?.xpPoints || 0) / 100) * 100, 100)}%` }}></div>
    </div>
  </div>
</div>
