import React from 'react';
import { ArrowUpRight, Award, FileCode2, Users, Database } from 'lucide-react';

interface MetricsBarProps {
  onExploreArchive?: () => void;
  onExploreResearch?: () => void;
}

export const MetricsBar: React.FC<MetricsBarProps> = ({
  onExploreArchive,
  onExploreResearch,
}) => {
  const metrics = [
    {
      id: 'articles',
      value: '2,480+',
      label: 'Published Articles & Analyses',
      detail: 'Peer-reviewed hardware & systems archives',
      actionText: 'Live Archive',
      onClick: onExploreArchive,
      icon: Database
    },
    {
      id: 'research',
      value: '412',
      label: 'Original Benchmarks',
      detail: 'Direct lab silicon & kernel measurements',
      actionText: 'Reproducible Data',
      onClick: onExploreResearch,
      icon: Award
    },
    {
      id: 'readership',
      value: '185,000+',
      label: 'Monthly Systems Readers',
      detail: 'Principal architects, kernel hackers & fellows',
      actionText: 'Global Readership',
      icon: Users
    },
    {
      id: 'reproducibility',
      value: '99.98%',
      label: 'Artifact Verification',
      detail: 'Deterministic code testbeds validated',
      actionText: 'Bench Protocol',
      icon: FileCode2
    }
  ];

  return (
    <section className="relative z-10 border-y border-emerald-900/50 bg-[#09221c]/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-xl border border-emerald-900/50 bg-[#0c2e26]/70 p-4.5 transition-all duration-300 ease-out hover:border-yellow-400 hover:bg-[#11392e] hover:shadow-[0_0_24px_rgba(250,204,21,0.22)] cursor-pointer"
                onClick={item.onClick}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-yellow-400/90 mb-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                      <Icon className="h-3.5 w-3.5 text-yellow-400" />
                      {item.label}
                    </span>
                    <span className="flex items-center gap-0.5 text-[11px] font-mono text-yellow-400 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform font-bold">
                      {item.actionText}
                      <ArrowUpRight className="h-3.5 w-3.5 text-yellow-400" />
                    </span>
                  </div>

                  <div className="text-2xl lg:text-3xl font-bold tracking-tight text-white group-hover:text-yellow-300 font-mono tabular-nums transition-colors">
                    {item.value}
                  </div>
                </div>

                <div className="mt-2 text-xs text-slate-300 line-clamp-1 group-hover:text-slate-100 transition-colors">
                  {item.detail}
                </div>

                {/* Animated yellow bottom hairline */}
                <div className="absolute inset-x-4 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-yellow-400 transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
