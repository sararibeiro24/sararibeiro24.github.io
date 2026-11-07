import { useEffect, useState } from "react";
import { GITHUB_USERNAME } from "../constants";

export default function GithubCommitCount() {
  const [result, setResult] = useState({ status: "loading", count: null });

  useEffect(() => {
    const controller = new AbortController();

    async function loadCommits() {
      try {
        const response = await fetch("/github-contributions.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Contribution data returned ${response.status}`);
        }

        const data = await response.json();
        if (!Number.isInteger(data.count) || data.count < 0) {
          throw new Error("Contribution data contains an invalid count");
        }

        setResult({ status: "success", count: data.count });
      } catch (error) {
        if (error.name !== "AbortError") {
          setResult({ status: "error", count: null });
        }
      }
    }

    loadCommits();
    return () => controller.abort();
  }, []);

  return (
    <div className="edu-card w-full p-4 text-left">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-100">This week</p>
          <p className="mt-1 text-[10px] uppercase tracking-widest text-slate-400 font-mono">
            Last 7 days on GitHub
          </p>
        </div>
        <span className="font-mono text-xs font-semibold text-cyan-400" aria-hidden="true">
          GH
        </span>
      </div>
      <div className="mt-4 flex items-baseline gap-2" aria-live="polite">
        <span className="text-3xl font-semibold text-cyan-300">
          {result.status === "success" ? result.count : result.status === "loading" ? "—" : "!"}
        </span>
        <span className="text-xs text-slate-300">
          {result.status === "error" ? "Could not load commits" : "commits, incl. private"}
        </span>
      </div>
      <a
        className="mt-3 inline-block text-xs text-slate-400 transition-colors hover:text-cyan-300"
        href={`https://github.com/${GITHUB_USERNAME}`}
        target="_blank"
        rel="noreferrer"
      >
        View GitHub profile
      </a>
    </div>
  );
}
