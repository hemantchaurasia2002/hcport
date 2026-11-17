"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="frame" style={{ padding: "9rem 0 6rem" }}>
      <p className="kicker">Error</p>
      <h1 className="display-md">This view did not finish loading.</h1>
      <p className="lede" style={{ margin: "1rem 0 1.5rem" }}>
        The page can be tried again. If it keeps failing, use email from the contact section.
      </p>
      <button className="btn" type="button" onClick={() => reset()}>
        Try again
      </button>
    </section>
  );
}
