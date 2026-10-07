export default function Header() {
  return (
    <header style={{borderBottom:"1px solid #ddd", padding:"1rem", display:"flex", justifyContent:"space-between"}}>
      <span style={{fontFamily:"monospace", fontWeight:"bold"}}>wrida@portfolio</span>
      <nav style={{display:"flex", gap:"1rem", fontFamily:"monospace"}}>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
