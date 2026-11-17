import Link from "next/link";

export default function NotFound() {
  return (
    <section className="frame" style={{ padding: "9rem 0 6rem" }}>
      <p className="kicker">404</p>
      <h1 className="display">This page is not part of the story.</h1>
      <p className="lede" style={{ margin: "1rem 0 1.5rem" }}>
        The address does not match a section or a case study.
      </p>
      <Link className="btn btn-primary" href="/">
        Back home
      </Link>
    </section>
  );
}
