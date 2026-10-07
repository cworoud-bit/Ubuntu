import { skills } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" style={{padding:"2rem"}}>
      <h2>DevSecOps Skills</h2>
      <div style={{display:"flex", flexWrap:"wrap", gap:"0.5rem"}}>
        {skills.map((s) => (
          <span key={s} style={{fontFamily:"monospace", border:"1px solid #ccc", padding:"0.3rem 0.6rem", borderRadius:"4px"}}>{s}</span>
        ))}
      </div>
    </section>
  );
}
