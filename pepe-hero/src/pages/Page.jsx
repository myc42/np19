import "./pages.css";

export default function Page({ title, children }) {
  return (
    <div className="pg">
      <main className="pg-main">
        <h1>{title}</h1>
        {children}
      </main>
    </div>
  );
}
