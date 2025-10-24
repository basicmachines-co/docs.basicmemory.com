import { Sparkles } from "lucide-react";

export const BetaAnnouncementBanner = () => {
  return (
    <div className="bg-black text-white border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 py-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-white" />
            <span className="text-md text-white leading-none">
              <span className="font-semibold">Basic Memory Cloud Beta is Live!</span>
              <span className="hidden sm:inline"> — Lifetime 25% off for joining early. 7-day free trial.</span>
            </span>
          </div>
          <a
            href="https://basicmemory.com/beta"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-white text-black hover:bg-gray-200 h-8 px-4 py-1.5 no-underline shrink-0"
          >
            Join Beta
          </a>
        </div>
      </div>
    </div>
  );
};
