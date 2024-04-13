export default function string2element(html: string): ChildNode {
  const d = document.createElement("div");
  d.innerHTML = html.trim();
  return d.firstChild!;
}
