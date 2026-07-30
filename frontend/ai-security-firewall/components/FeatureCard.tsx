/*{import { CheckCircle2 } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-200 shadow-lg shadow-black/10 ring-1 ring-white/5">
      <div className="mb-4 inline-flex rounded-2xl bg-cyan-500/10 p-3 text-cyan-300">
        <CheckCircle2 className="h-5 w-5" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
      <p className="text-sm leading-6 text-slate-300">{description}</p>
    </div>
  );
}*/

import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-cyan-900 bg-gray-900 p-6 hover:border-cyan-400 transition duration-300">
      <div className="text-cyan-400 mb-4">{icon}</div>

      <h3 className="text-xl font-semibold mb-2">
        {title}
      </h3>

      <p className="text-gray-400">
        {description}
      </p>
    </div>
  );
}