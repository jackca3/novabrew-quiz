"use client";

import { useState } from "react";
import { personalities, personalityMap, questions, type PersonalityId } from "./quiz-data";

type Scores = Record<PersonalityId, number>;
type OrderScores = Record<PersonalityId, number>;

const initialScores = (): Scores => ({
  "bold-explorer": 0,
  "smooth-operator": 0,
  "cozy-classic": 0,
  "wild-card": 0,
});

const initialOrderScores = (): OrderScores => ({
  "bold-explorer": -1,
  "smooth-operator": -1,
  "cozy-classic": -1,
  "wild-card": -1,
});

const personalityPreview = [
  { title: "Bold Explorer", meta: "Deep roast energy" },
  { title: "Smooth Operator", meta: "Balanced and polished" },
  { title: "Cozy Classic", meta: "Soft, warm, familiar" },
  { title: "Wild Card", meta: "Unexpected in the best way" },
];

const confettiPieces = [
  { left: "4%", width: 10, height: 26, color: "#d46a43", delay: "0ms", duration: "3400ms", rotate: "-18deg" },
  { left: "10%", width: 12, height: 22, color: "#f0b15d", delay: "120ms", duration: "3600ms", rotate: "12deg" },
  { left: "16%", width: 8, height: 24, color: "#6a3f2d", delay: "240ms", duration: "3300ms", rotate: "20deg" },
  { left: "22%", width: 12, height: 28, color: "#c88652", delay: "60ms", duration: "3900ms", rotate: "-8deg" },
  { left: "29%", width: 10, height: 20, color: "#efc37a", delay: "320ms", duration: "3500ms", rotate: "18deg" },
  { left: "36%", width: 8, height: 24, color: "#9f5537", delay: "180ms", duration: "3700ms", rotate: "-24deg" },
  { left: "42%", width: 12, height: 22, color: "#d46a43", delay: "90ms", duration: "3450ms", rotate: "10deg" },
  { left: "49%", width: 8, height: 26, color: "#533026", delay: "260ms", duration: "4000ms", rotate: "-16deg" },
  { left: "56%", width: 12, height: 24, color: "#f0b15d", delay: "140ms", duration: "3550ms", rotate: "24deg" },
  { left: "63%", width: 10, height: 22, color: "#bb6845", delay: "280ms", duration: "3750ms", rotate: "-10deg" },
  { left: "70%", width: 8, height: 24, color: "#e59b68", delay: "210ms", duration: "3350ms", rotate: "14deg" },
  { left: "77%", width: 12, height: 20, color: "#7d4831", delay: "70ms", duration: "3950ms", rotate: "-20deg" },
  { left: "84%", width: 10, height: 28, color: "#d46a43", delay: "350ms", duration: "3650ms", rotate: "8deg" },
  { left: "91%", width: 8, height: 22, color: "#f0b15d", delay: "160ms", duration: "3450ms", rotate: "-14deg" },
];

function getResult(scores: Scores, orderScores: OrderScores) {
  const ranked = personalities
    .map((personality) => ({
      id: personality.id,
      score: scores[personality.id],
      order: orderScores[personality.id],
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.order - a.order;
    });

  return {
    primary: personalityMap[ranked[0].id],
    secondary: personalityMap[ranked[1].id],
  };
}

function scoreShare(scores: Scores, id: PersonalityId) {
  const total = Object.values(scores).reduce((sum, value) => sum + value, 0);
  if (!total) return 0;
  return Math.round((scores[id] / total) * 100);
}

function buildShareMessage(result: ReturnType<typeof getResult>) {
  return `I got ${result.primary.name} on the NovaBrew Coffee Taste Profile Quiz. My coffee match is ${result.primary.coffee}, with ${result.secondary.name} as my backup vibe.`;
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Scores>(() => initialScores());
  const [orderScores, setOrderScores] = useState<OrderScores>(() => initialOrderScores());
  const [selectionCount, setSelectionCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentQuestion = questions[questionIndex];
  const complete = questionIndex >= questions.length;
  const result = complete ? getResult(scores, orderScores) : null;
  const progress = started ? Math.min(questionIndex, questions.length) / questions.length : 0;
  const shareMessage = result ? buildShareMessage(result) : "";

  const handleChoice = (personalityId: PersonalityId) => {
    setScores((current) => ({
      ...current,
      [personalityId]: current[personalityId] + 1,
    }));
    setOrderScores((current) => ({
      ...current,
      [personalityId]: selectionCount,
    }));
    setSelectionCount((current) => current + 1);
    setQuestionIndex((current) => current + 1);
  };

  const handleRetake = () => {
    setStarted(false);
    setQuestionIndex(0);
    setScores(initialScores());
    setOrderScores(initialOrderScores());
    setSelectionCount(0);
    setCopied(false);
  };

  const handleShare = async () => {
    if (!result) return;

    const shareUrl = window.location.href;
    const sharePayload = {
      title: "NovaBrew Coffee Taste Profile",
      text: shareMessage,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(sharePayload);
      } else {
        await navigator.clipboard.writeText(`${shareMessage} ${shareUrl}`);
      }

      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      try {
        await navigator.clipboard.writeText(`${shareMessage} ${shareUrl}`);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      } catch {
        window.alert(`${shareMessage} ${shareUrl}`);
      }
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(216,122,77,0.24),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(95,58,42,0.18),_transparent_24%),linear-gradient(180deg,_#fcf4eb_0%,_#f1ddca_42%,_#e0c2a8_100%)] text-[#241714]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob absolute -left-20 top-12 h-72 w-72 rounded-full bg-[#efad7f]/28 blur-3xl" />
        <div className="blob blob-two absolute right-[-50px] top-8 h-80 w-80 rounded-full bg-[#8a533d]/16 blur-3xl" />
        <div className="blob blob-three absolute bottom-[-90px] left-1/3 h-96 w-96 rounded-full bg-[#f0bf7f]/16 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between py-2 text-xs uppercase tracking-[0.32em] text-[#755849]">
          <span>NovaBrew Coffee Taste Profile</span>
          <span className="hidden rounded-full border border-[#c59a7d]/40 bg-white/65 px-4 py-2 text-[11px] tracking-[0.26em] text-[#855b48] shadow-[0_10px_30px_rgba(90,57,41,0.08)] sm:inline-flex">
            Warm premium refresh
          </span>
        </header>

        <section className="flex flex-1 items-center justify-center py-6">
          {!started && !complete ? (
            <div className="fade-up relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/65 bg-[linear-gradient(180deg,rgba(255,252,248,0.9),rgba(255,245,236,0.78))] p-6 shadow-[0_28px_80px_rgba(92,59,43,0.16)] backdrop-blur-xl sm:p-10">
              <div className="absolute right-6 top-6 rounded-full border border-[#efcfb9] bg-[#fff2e6] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#985f46]">
                6-question quiz
              </div>
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <p className="mb-4 inline-flex items-center rounded-full border border-[#ddb395]/40 bg-[#fff5ec] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#97573d]">
                    Coffee personality quiz
                  </p>
                  <h1 className="max-w-[11ch] font-[family-name:var(--font-display)] text-5xl leading-[0.94] tracking-[-0.04em] text-[#261813] sm:text-6xl">
                    Find your NovaBrew coffee personality.
                  </h1>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-[#654c40]">
                    Answer six quick prompts and we will match you with the roast,
                    routine, and backup vibe that fit you best.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setStarted(true)}
                      className="rounded-full bg-[#2b1a14] px-6 py-4 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(43,26,20,0.24)] transition hover:-translate-y-0.5 hover:bg-[#452820]"
                    >
                      Start tasting profile
                    </button>
                    <div className="rounded-full border border-[#d7b193]/45 bg-white/85 px-5 py-4 text-sm text-[#71564a]">
                      Made to share. Built to feel good on your phone.
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-[#e7d2c3] bg-[linear-gradient(160deg,#fff6ef_0%,#f9ebdf_55%,#f0d9c5_100%)] p-5 shadow-[0_18px_50px_rgba(110,73,52,0.12)]">
                  <div className="rounded-[1.4rem] bg-[linear-gradient(180deg,#3c241c_0%,#241611_100%)] p-5 text-white">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#f3c88d]">
                      Result preview
                    </p>
                    <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-tight">
                      Bold Explorer, with a little Wild Card energy.
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-white/78">
                      Deep roast confidence, plus enough curiosity to keep mornings interesting.
                    </p>
                  </div>

                  <div className="mt-4 grid gap-3">
                    {personalityPreview.map((item) => (
                      <div
                        key={item.title}
                        className="flex items-center justify-between rounded-2xl border border-[#eadbcf] bg-white/90 px-4 py-3 text-sm"
                      >
                        <span className="font-medium text-[#3e2a20]">{item.title}</span>
                        <span className="text-[#7d665a]">{item.meta}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : started && !complete ? (
            <div className="fade-up w-full max-w-4xl rounded-[2rem] border border-white/65 bg-[linear-gradient(180deg,rgba(255,252,248,0.9),rgba(255,244,234,0.82))] p-5 shadow-[0_28px_80px_rgba(95,61,44,0.16)] backdrop-blur-xl sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#8b6656]">
                    Question {questionIndex + 1} of {questions.length}
                  </p>
                  <h2 className="mt-2 max-w-3xl font-[family-name:var(--font-display)] text-3xl leading-tight tracking-[-0.03em] text-[#291913] sm:text-4xl">
                    {currentQuestion.prompt}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6f5548]">
                    {currentQuestion.helper}
                  </p>
                </div>
                <div className="min-w-44">
                  <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-[#9a7460]">
                    <span>Progress</span>
                    <span>{Math.round(progress * 100)}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#ecd8c5]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#d16e45] via-[#a76040] to-[#f0b15d] transition-all duration-500"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div key={currentQuestion.id} className="fade-up mt-8 grid gap-4 md:grid-cols-2">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => handleChoice(option.personalityId)}
                    className="group relative overflow-hidden rounded-[1.6rem] border border-[#ead5c4] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,244,235,0.94))] p-5 text-left shadow-[0_14px_30px_rgba(117,84,61,0.08)] transition duration-200 hover:-translate-y-0.5 hover:border-[#cb8a62] hover:shadow-[0_20px_35px_rgba(117,84,61,0.14)]"
                  >
                    <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#f0b15d] via-[#d16e45] to-[#8e5239] opacity-0 transition group-hover:opacity-100" />
                    <span className="absolute right-4 top-4 text-2xl transition group-hover:scale-110">
                      {option.emoji}
                    </span>
                    <span className="block max-w-[16ch] font-[family-name:var(--font-display)] text-xl leading-tight tracking-[-0.02em] text-[#261711]">
                      {option.label}
                    </span>
                    <span className="mt-8 inline-flex rounded-full bg-[#f7e6d7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8b5c45]">
                      Choose this vibe
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="fade-up relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/65 bg-[linear-gradient(180deg,rgba(255,252,248,0.92),rgba(255,243,232,0.84))] shadow-[0_28px_80px_rgba(99,63,46,0.18)] backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-56 overflow-hidden">
                {confettiPieces.map((piece, index) => (
                  <span
                    key={`${piece.left}-${index}`}
                    className="confetti-piece"
                    style={{
                      left: piece.left,
                      width: `${piece.width}px`,
                      height: `${piece.height}px`,
                      backgroundColor: piece.color,
                      animationDelay: piece.delay,
                      animationDuration: piece.duration,
                      transform: `rotate(${piece.rotate})`,
                    }}
                  />
                ))}
              </div>

              <div
                className="relative overflow-hidden px-5 py-6 sm:px-8 sm:py-8"
                style={{
                  background: `linear-gradient(135deg, ${result?.primary.accent}24, #fffaf5 50%, ${result?.secondary.accent}18)`,
                }}
              >
                <div className="absolute inset-0 opacity-75">
                  <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-white/70 blur-3xl" />
                  <div className="absolute right-6 top-0 h-52 w-52 rounded-full bg-[#efb36a]/18 blur-3xl" />
                </div>

                <div className="relative grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[#86604e]">
                      Your coffee match
                    </p>
                    <h2 className="mt-3 max-w-[11ch] font-[family-name:var(--font-display)] text-5xl leading-[0.95] tracking-[-0.05em] text-[#231613] sm:text-6xl">
                      {result?.primary.emoji} {result?.primary.name}
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg leading-8 text-[#644d40]">
                      {result?.primary.tagline}
                    </p>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6c564a]">
                      {result?.primary.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={handleShare}
                        className="rounded-full bg-[#231613] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#3d271f]"
                      >
                        {copied ? "Ready to post" : "Share result card"}
                      </button>
                      <button
                        type="button"
                        onClick={handleRetake}
                        className="rounded-full border border-[#d7aa87]/50 bg-white/90 px-5 py-3 text-sm font-semibold text-[#6f4d3a] transition hover:-translate-y-0.5 hover:border-[#c37d4d] hover:text-[#4d2d22]"
                      >
                        Retake quiz
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[1.6rem] border border-[#ead8c8] bg-white/92 p-5 shadow-[0_18px_40px_rgba(114,81,57,0.1)]">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.22em] text-[#94725f]">
                            Matched coffee
                          </p>
                          <h3 className="mt-2 font-[family-name:var(--font-display)] text-3xl leading-tight text-[#241712]">
                            {result?.primary.coffee}
                          </h3>
                        </div>
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
                          style={{
                            backgroundColor: `${result?.primary.accent}22`,
                            color: result?.primary.accent,
                          }}
                        >
                          {result?.primary.emoji}
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-[#6e5649]">
                        {result?.primary.coffeeDescription}
                      </p>

                      <div className="mt-5 rounded-2xl bg-[#fff5ec] p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-[#9b725d]">
                          Backup vibe
                        </p>
                        <p className="mt-2 text-lg font-semibold text-[#2c1a14]">
                          {result?.secondary.emoji} {result?.secondary.name}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-[#705748]">
                          {result?.secondary.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-[1.6rem] border border-[#e3c5af] bg-[linear-gradient(160deg,#432820_0%,#2a1914_100%)] p-5 text-white shadow-[0_18px_40px_rgba(51,30,24,0.26)]">
                      <p className="text-xs uppercase tracking-[0.22em] text-[#f4c784]">
                        Share-ready caption
                      </p>
                      <p className="mt-3 text-lg leading-8 text-[#fff5ea]">
                        {shareMessage}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-white/72">
                        Use the share button to send it to Messages, Notes, or copy it for social posts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 border-t border-[#ecdccd] p-5 sm:p-8 lg:grid-cols-2">
                <div className="rounded-[1.4rem] bg-[#fff8f2] p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#966b54]">
                    Personality breakdown
                  </p>
                  <div className="mt-4 space-y-3">
                    {personalities.map((personality) => {
                      const share = scoreShare(scores, personality.id);
                      return (
                        <div key={personality.id}>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span className="font-medium text-[#3c271d]">{personality.name}</span>
                            <span className="text-[#7e665a]">{share}%</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-[#eddccd]">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${share}%`,
                                backgroundColor: personality.accent,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-[1.4rem] bg-[linear-gradient(180deg,#2b1a13_0%,#3a231b_100%)] p-5 text-white shadow-[0_18px_40px_rgba(45,26,20,0.22)]">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#f4c784]">
                    What this tells NovaBrew
                  </p>
                  <p className="mt-4 text-2xl font-semibold leading-tight text-[#fff4e7]">
                    Personalization feels stronger when the roast matches the routine.
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/76">
                    This result gives the team a cleaner starting point for product matching,
                    retention messaging, and a subscriber experience that feels intentional.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
