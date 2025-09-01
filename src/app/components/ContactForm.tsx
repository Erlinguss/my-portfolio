"use client";

import { useState } from "react";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setState("sending");

    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.ok === false)
        throw new Error(json.error || "Failed to send message.");
      setState("sent");
      form.reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong.");
      } else {
        setError("Something went wrong.");
      }
      setState("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 bg-slate-900 text-white p-6 rounded-xl shadow-lg"
    >
      <div>
        <label className="block text-sm font-semibold mb-1">Name</label>
        <input
          name="name"
          required
          minLength={2}
          maxLength={80}
          className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Email</label>
        <input
          name="email"
          type="email"
          required
          className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Message</label>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows={6}
          className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          placeholder="Tell me about your role/project and how I can help…"
        />
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {state === "sent" && (
        <div className="rounded-lg bg-green-600/20 border border-green-500 text-green-300 px-4 py-2 text-sm">
          ✅ Thanks! Your message has been sent.
        </div>
      )}
      {state === "error" && (
        <div className="rounded-lg bg-red-600/20 border border-red-500 text-red-300 px-4 py-2 text-sm">
          ❌ {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={state === "sending"}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {state === "sending" ? "Sending…" : "Send Message"}
        </button>
      </div>
    </form>
  );
}
