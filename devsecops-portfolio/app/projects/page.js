import { projects } from "../../data/projects";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <main style={{padding:"2rem"}}>
      <h1>Tous les projets</h1>
      <ul>
        {projects.map((p) => (
          <li key={p.slug} style={{margin:"0.5rem 0"}}>
            <Link href={`/projects/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
