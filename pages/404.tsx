import Link from "next/link";

export default function Custom404() {
  return (
    <main>
      <h1>404-That page dose not seem to exists...</h1>
      <iframe
        src="https//giphy.com/embed/12JehQ2GitHGdVG9y"
        width="480"
        height="362"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <Link href="/">
        <button className="btn-blue">Go Home</button>
      </Link>
    </main>
  );
}
