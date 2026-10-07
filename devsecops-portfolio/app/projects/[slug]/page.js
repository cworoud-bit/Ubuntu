
import { projects } from "../../../data/projects";
import { notFound } from "next/navigation";

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <main style={{padding:"2rem"}}>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <div style={{display:"flex", gap:"0.5rem", marginTop:"1rem"}}>
        {project.tags.map((t) => (
          <span key={t} style={{fontFamily:"monospace", border:"1px solid #ccc", padding:"0.2rem 0.6rem", borderRadius:"4px"}}>{t}</span>
        ))}
      </div>
    </main>
  );
}
