#!/usr/bin/env python3
"""
SEO auditor basico para Lantonium.
Valida metadatos clave en paginas HTML indexables y consistencia con sitemap.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITEMAP = ROOT / "sitemap.xml"

NOINDEX_ALLOWED = {"404.html", "lntcnfg.html"}

REQUIRED_COMMON = [
    r"<title>.*?</title>",
    r'<meta[^>]+name="description"[^>]*>',
    r'<meta[^>]+name="robots"[^>]*>',
    r'<link[^>]+rel="canonical"[^>]*>',
]

REQUIRED_OG = [
    r'<meta[^>]+property="og:type"[^>]*>',
    r'<meta[^>]+property="og:title"[^>]*>',
    r'<meta[^>]+property="og:description"[^>]*>',
    r'<meta[^>]+property="og:url"[^>]*>',
    r'<meta[^>]+property="og:image"[^>]*>',
]

REQUIRED_TWITTER = [
    r'<meta[^>]+name="twitter:card"[^>]*>',
    r'<meta[^>]+name="twitter:title"[^>]*>',
    r'<meta[^>]+name="twitter:description"[^>]*>',
    r'<meta[^>]+name="twitter:image"[^>]*>',
]


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="ignore")


def is_match(text: str, pattern: str) -> bool:
    return re.search(pattern, text, re.IGNORECASE | re.DOTALL) is not None


def has_noindex(text: str) -> bool:
    m = re.search(r'<meta[^>]+name="robots"[^>]+content="([^"]+)"', text, re.IGNORECASE)
    if not m:
        return False
    return "noindex" in m.group(1).lower()


def canonical_url(text: str) -> str | None:
    m = re.search(r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"', text, re.IGNORECASE)
    return m.group(1) if m else None


def sitemap_paths() -> set[str]:
    if not SITEMAP.exists():
        return set()
    xml = read_text(SITEMAP)
    urls = re.findall(r"<loc>(.*?)</loc>", xml, re.IGNORECASE)
    paths: set[str] = set()
    for url in urls:
        if "lantonium.web.app/" in url:
            path = url.split("lantonium.web.app/", 1)[1]
            paths.add(path if path else "")
    return paths


def main() -> int:
    html_files = sorted([p for p in ROOT.glob("*.html") if p.is_file()])
    sitemap_set = sitemap_paths()
    errors = 0
    warnings = 0

    print("SEO Audit Report\n")

    for file_path in html_files:
        name = file_path.name
        text = read_text(file_path)
        print(f"- {name}")

        file_errors = []
        file_warnings = []

        if name in NOINDEX_ALLOWED:
            # Paginas tecnicas (noindex): validacion ligera.
            if not is_match(text, r"<title>.*?</title>"):
                file_errors.append("Falta <title> en pagina tecnica.")
            if not is_match(text, r'<meta[^>]+name="robots"[^>]*>'):
                file_errors.append("Falta robots en pagina tecnica.")
        else:
            for pattern in REQUIRED_COMMON + REQUIRED_OG + REQUIRED_TWITTER:
                if not is_match(text, pattern):
                    file_errors.append(f"Falta etiqueta requerida: {pattern}")

        if name not in NOINDEX_ALLOWED and not is_match(text, r'<script[^>]+type="application/ld\+json"[^>]*>'):
            file_warnings.append("No se detecta JSON-LD.")

        noindex = has_noindex(text)
        if name in NOINDEX_ALLOWED:
            if not noindex:
                file_warnings.append("Recomendado: pagina tecnica sin noindex.")
        else:
            if noindex:
                file_errors.append("Pagina indexable marcada como noindex.")

        canonical = canonical_url(text)
        if canonical and "https://lantonium.web.app/" not in canonical:
            file_errors.append("Canonical no usa dominio oficial esperado.")

        # Verifica presencia en sitemap para paginas indexables.
        if name not in NOINDEX_ALLOWED:
            sitemap_key = "" if name == "index.html" else name
            if sitemap_key not in sitemap_set:
                file_warnings.append("No aparece en sitemap.xml.")

        if file_errors:
            errors += len(file_errors)
            for e in file_errors:
                print(f"  ERROR: {e}")
        if file_warnings:
            warnings += len(file_warnings)
            for w in file_warnings:
                print(f"  WARN: {w}")
        if not file_errors and not file_warnings:
            print("  OK")

    print("\nResumen")
    print(f"- Errores: {errors}")
    print(f"- Advertencias: {warnings}")

    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
