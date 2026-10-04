from __future__ import annotations

import re
import textwrap
from pathlib import Path

from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
HANDOOK = ROOT / "Markdown Handbooks" / "Day03_Delegate_Handbook_React_Fundamentals.md"
OUT_DIR = ROOT / "PDFs" / "Day03_React_Fundamentals"
OUT_DIR.mkdir(parents=True, exist_ok=True)


def clean_text_for_pdf(value: str) -> str:
    value = value.replace("<br>", "\n").replace("<br />", "\n").replace("<br/>", "\n")
    value = re.sub(r"<[^>]+>", "", value)
    value = value.replace("**", "").replace("`", "")
    value = value.replace("_", "")
    value = value.replace("|", " | ")
    return value


def flatten_markdown_to_lines(markdown_text: str) -> list[str]:
    lines: list[str] = []
    in_code = False

    for raw in markdown_text.splitlines():
        if raw.startswith("```"):
            if in_code:
                lines.append("")
            in_code = not in_code
            continue

        if in_code:
            lines.append(raw)
            continue

        stripped = raw.strip()
        if not stripped:
            lines.append("")
            continue

        if stripped.startswith("#"):
            heading_level = len(stripped) - len(stripped.lstrip("#"))
            heading_text = stripped[heading_level + 1 :].strip()
            lines.append(f"{'#' * heading_level} {heading_text}")
            continue

        if stripped.startswith("- [") or stripped.startswith("- [x"):
            lines.append(f"• {stripped[6:].strip()}")
            continue

        if stripped.startswith("- "):
            lines.append(f"• {stripped[2:].strip()}")
            continue

        if stripped.startswith("|") and stripped.endswith("|"):
            lines.append(stripped.strip("|").replace("|", " | "))
            continue

        lines.append(clean_text_for_pdf(stripped))

    return lines


def split_sections(markdown_text: str) -> dict[str, str]:
    sections: dict[str, str] = {}
    current_name = "Day 3: React Fundamentals"
    current_content: list[str] = []
    pattern = re.compile(r"^(### Lab 3\.[123]: .+|## Module 3\.[1234]: .+|## Hands-on labs|## Knowledge check|## Key takeaways)$")

    for line in markdown_text.splitlines():
        if pattern.match(line):
            if current_content:
                sections[current_name] = "\n".join(current_content).strip()
            current_name = line
            current_content = []
            continue
        current_content.append(line)

    if current_content:
        sections[current_name] = "\n".join(current_content).strip()

    return sections


def write_pdf_from_lines(out_path: Path, title: str, lines: list[str]) -> None:
    canvas_obj = canvas.Canvas(str(out_path), pagesize=(612, 792))
    width, height = 612, 792
    x = 50
    y = height - 60
    left_margin = 50
    right_margin = 560

    canvas_obj.setTitle(title)
    canvas_obj.setFont("Helvetica-Bold", 18)
    canvas_obj.drawString(x, y, title)
    y -= 24
    canvas_obj.setFont("Helvetica", 10)

    for raw in lines:
        text = raw.strip()
        if not text:
            y -= 10
            if y < 50:
                canvas_obj.showPage();
                y = height - 60
                canvas_obj.setFont("Helvetica", 10)
            continue

        if text.startswith("#"):
            heading_level = len(text) - len(text.lstrip("#"))
            title_text = text[heading_level + 1 :].strip()
            canvas_obj.setFont("Helvetica-Bold", 14 if heading_level == 1 else 12)
            wrapped = textwrap.wrap(title_text, width=80)
        else:
            canvas_obj.setFont("Helvetica", 10)
            wrapped = textwrap.wrap(text, width=95)

        for line in wrapped:
            if y < 50:
                canvas_obj.showPage()
                y = height - 60
            if line:
                canvas_obj.drawString(left_margin, y, line)
            y -= 14

    canvas_obj.save()


def export_pdf(markdown_text: str, output_path: Path, title: str) -> None:
    lines = flatten_markdown_to_lines(markdown_text)
    write_pdf_from_lines(output_path, title, lines)


def main() -> None:
    markdown_text = HANDOOK.read_text(encoding="utf-8")
    export_pdf(markdown_text, OUT_DIR / "Day03_React_Fundamentals_Complete.pdf", "Day 3: React Fundamentals")

    sections = split_sections(markdown_text)
    lab_names = {
        "### Lab 3.1: Build a Reusable Component Set": "Lab 3.1: Build a Reusable Component Set",
        "### Lab 3.2: Render a Product Catalogue from Static Data": "Lab 3.2: Render a Product Catalogue from Static Data",
        "### Lab 3.3: TaskBoard: Static Task List UI": "Lab 3.3: TaskBoard: Static Task List UI",
    }

    for key, label in lab_names.items():
        section_text = sections.get(key, "")
        if section_text:
            export_pdf(section_text, OUT_DIR / f"{label.replace(':', '').replace(' ', '_')}.pdf", label)

    print(f"PDFs generated in: {OUT_DIR}")
    for pdf in sorted(OUT_DIR.glob("*.pdf")):
        print(f"- {pdf.name}")


if __name__ == "__main__":
    main()
