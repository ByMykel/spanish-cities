#!/usr/bin/env python3
"""
Scrape Wikimedia Commons for SVG flags and coats of arms of Spanish municipalities.
Match them to cities in cities.json using fuzzy string matching.
"""

import json
import os
import re
import time
import unicodedata
import requests
from rapidfuzz import fuzz, process

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CITIES_PATH = os.path.join(ROOT, "src", "data", "cities.json")
REPORT_PATH = os.path.join(ROOT, "scripts", "image_matching_report.txt")

NO_FLAG = "https://raw.githubusercontent.com/ByMykel/spanish-cities/refs/heads/main/no_flag.svg"
NO_COAT = "https://raw.githubusercontent.com/ByMykel/spanish-cities/refs/heads/main/no_coat.svg"

API_URL = "https://commons.wikimedia.org/w/api.php"
USER_AGENT = "SpanishCitiesBot/1.0 (https://github.com/ByMykel/spanish-cities)"

# Province code -> (flag category, coat of arms category) on Wikimedia Commons
# These map to subcategories of:
#   Category:SVG_flags_of_municipalities_of_Spain_by_province
#   Category:SVG_coats_of_arms_of_municipalities_of_Spain_by_province
PROVINCE_CATEGORIES = {
    "01": {
        "flags": "Category:SVG flags of municipalities of Álava-Araba",
        "coats": "Category:SVG coats of arms of municipalities of Álava-Araba",
    },
    "02": {
        "flags": "Category:SVG flags of municipalities of the province of Albacete",
        "coats": "Category:SVG coats of arms of municipalities of the province of Albacete",
    },
    "03": {
        "flags": "Category:SVG flags of municipalities of the province of Alicante",
        "coats": "Category:SVG coats of arms of municipalities of the province of Alicante",
    },
    "04": {
        "flags": "Category:SVG flags of municipalities of Almería",
        "coats": "Category:SVG coats of arms of municipalities of the province of Almería",
    },
    "05": {
        "flags": "Category:SVG flags of municipalities of the province of Ávila",
        "coats": "Category:SVG coats of arms of municipalities of the province of Ávila",
    },
    "06": {
        "flags": "Category:SVG flags of municipalities of the province of Badajoz",
        "coats": "Category:SVG coats of arms of municipalities of the province of Badajoz",
    },
    "07": {
        "flags": "Category:SVG flags of municipalities of the Balearic Islands",
        "coats": "Category:SVG coats of arms of municipalities of the Balearic Islands",
    },
    "08": {
        "flags": "Category:SVG flags of municipalities of the province of Barcelona",
        "coats": "Category:SVG coats of arms of municipalities of the province of Barcelona",
    },
    "09": {
        "flags": "Category:SVG flags of municipalities of the province of Burgos",
        "coats": "Category:SVG coats of arms of municipalities of the province of Burgos",
    },
    "10": {
        "flags": "Category:SVG flags of municipalities of the province of Cáceres",
        "coats": "Category:SVG coats of arms of municipalities of the province of Cáceres",
    },
    "11": {
        "flags": "Category:SVG flags of municipalities of the province of Cádiz",
        "coats": "Category:SVG coats of arms of municipalities of the province of Cádiz",
    },
    "12": {
        "flags": "Category:SVG flags of municipalities of the province of Castellón",
        "coats": "Category:SVG coats of arms of municipalities of the province of Castellón",
    },
    "13": {
        "flags": "Category:SVG flags of municipalities of the province of Ciudad Real",
        "coats": "Category:SVG coats of arms of municipalities of the province of Ciudad Real",
    },
    "14": {
        "flags": "Category:SVG flags of municipalities of Córdoba, Spain",
        "coats": "Category:SVG coats of arms of municipalities of the province of Córdoba, Spain",
    },
    "15": {
        "flags": "Category:SVG flags of municipalities of the province of A Coruña",
        "coats": "Category:SVG coats of arms of municipalities of the province of A Coruña",
    },
    "16": {
        "flags": "Category:SVG flags of municipalities of the province of Cuenca",
        "coats": "Category:SVG coats of arms of municipalities of the province of Cuenca",
    },
    "17": {
        "flags": "Category:SVG flags of municipalities of the province of Girona",
        "coats": "Category:SVG coats of arms of municipalities of the province of Girona",
    },
    "18": {
        "flags": "Category:SVG flags of municipalities of the province of Granada",
        "coats": "Category:SVG coats of arms of municipalities of the province of Granada",
    },
    "19": {
        "flags": "Category:SVG flags of municipalities of the province of Guadalajara",
        "coats": "Category:SVG coats of arms of municipalities of the province of Guadalajara",
    },
    "20": {
        "flags": "Category:SVG flags of municipalities of Gipuzkoa",
        "coats": "Category:SVG coats of arms of municipalities of Gipuzkoa",
    },
    "21": {
        "flags": "Category:SVG flags of municipalities of the province of Huelva",
        "coats": "Category:SVG coats of arms of municipalities of the province of Huelva",
    },
    "22": {
        "flags": "Category:SVG flags of municipalities of the province of Huesca",
        "coats": "Category:SVG coats of arms of municipalities of the province of Huesca",
    },
    "23": {
        "flags": "Category:SVG flags of municipalities of the province of Jaén",
        "coats": "Category:SVG coats of arms of municipalities of the province of Jaén",
    },
    "24": {
        "flags": "Category:SVG flags of municipalities of the province of León",
        "coats": "Category:SVG coats of arms of municipalities of the province of León",
    },
    "25": {
        "flags": "Category:SVG flags of municipalities of the province of Lleida",
        "coats": "Category:SVG coats of arms of municipalities of the province of Lleida",
    },
    "26": {
        "flags": "Category:SVG flags of municipalities of La Rioja (Spain)",
        "coats": "Category:SVG coats of arms of municipalities of La Rioja (Spain)",
    },
    "27": {
        "flags": "Category:SVG flags of municipalities of the province of Lugo",
        "coats": "Category:SVG coats of arms of municipalities of the province of Lugo",
    },
    "28": {
        "flags": "Category:SVG flags of municipalities of the Community of Madrid",
        "coats": "Category:SVG coats of arms of municipalities of the Community of Madrid",
    },
    "29": {
        "flags": "Category:SVG flags of municipalities of the province of Málaga",
        "coats": "Category:SVG coats of arms of municipalities of the province of Málaga",
    },
    "30": {
        "flags": "Category:SVG flags of municipalities of the Region of Murcia",
        "coats": "Category:SVG coats of arms of municipalities of the Region of Murcia",
    },
    "31": {
        "flags": "Category:SVG flags of municipalities of Navarre",
        "coats": "Category:SVG coats of arms of municipalities of Navarre",
    },
    "32": {
        "flags": "Category:SVG flags of municipalities of the province of Ourense",
        "coats": "Category:SVG coats of arms of municipalities of the province of Ourense",
    },
    "33": {
        "flags": "Category:SVG flags of municipalities of Asturias",
        "coats": "Category:SVG coats of arms of municipalities of Asturias",
    },
    "34": {
        "flags": "Category:SVG flags of municipalities of the province of Palencia",
        "coats": "Category:SVG coats of arms of municipalities of the province of Palencia",
    },
    "35": {
        "flags": "Category:SVG flags of municipalities of the province of Las Palmas",
        "coats": "Category:SVG coats of arms of municipalities of the province of Las Palmas",
    },
    "36": {
        "flags": "Category:SVG flags of municipalities of the province of Pontevedra",
        "coats": "Category:SVG coats of arms of municipalities of the province of Pontevedra",
    },
    "37": {
        "flags": "Category:SVG flags of municipalities of the province of Salamanca",
        "coats": "Category:SVG coats of arms of municipalities of the province of Salamanca",
    },
    "38": {
        "flags": "Category:SVG flags of municipalities of the province of Santa Cruz de Tenerife",
        "coats": "Category:SVG coats of arms of municipalities of the province of Santa Cruz de Tenerife",
    },
    "39": {
        "flags": "Category:SVG flags of municipalities of Cantabria",
        "coats": "Category:SVG coats of arms of municipalities of Cantabria",
    },
    "40": {
        "flags": "Category:SVG flags of municipalities of the province of Segovia",
        "coats": "Category:SVG coats of arms of municipalities of the province of Segovia",
    },
    "41": {
        "flags": "Category:SVG flags of municipalities of Seville",
        "coats": "Category:SVG coats of arms of municipalities of the province of Seville",
    },
    "42": {
        "flags": "Category:SVG flags of municipalities of the province of Soria",
        "coats": "Category:SVG coats of arms of municipalities of the province of Soria",
    },
    "43": {
        "flags": "Category:SVG flags of municipalities of the province of Tarragona",
        "coats": "Category:SVG coats of arms of municipalities of the province of Tarragona",
    },
    "44": {
        "flags": "Category:SVG flags of municipalities of the province of Teruel",
        "coats": "Category:SVG coats of arms of municipalities of the province of Teruel",
    },
    "45": {
        "flags": "Category:SVG flags of municipalities of the province of Toledo",
        "coats": "Category:SVG coats of arms of municipalities of the province of Toledo",
    },
    "46": {
        "flags": "Category:SVG flags of municipalities of the province of Valencia",
        "coats": "Category:SVG coats of arms of municipalities of the province of Valencia",
    },
    "47": {
        "flags": "Category:SVG flags of municipalities of the province of Valladolid",
        "coats": "Category:SVG coats of arms of municipalities of the province of Valladolid",
    },
    "48": {
        "flags": "Category:SVG flags of municipalities of Biscay",
        "coats": "Category:SVG coats of arms of municipalities of Biscay",
    },
    "49": {
        "flags": "Category:SVG flags of municipalities of the province of Zamora",
        "coats": "Category:SVG coats of arms of municipalities of the province of Zamora",
    },
    "50": {
        "flags": "Category:SVG flags of municipalities of the province of Zaragoza",
        "coats": "Category:SVG coats of arms of municipalities of the province of Zaragoza",
    },
    "51": {
        "flags": None,  # Ceuta - autonomous city, no municipal subdivisions
        "coats": None,
    },
    "52": {
        "flags": None,  # Melilla - autonomous city, no municipal subdivisions
        "coats": None,
    },
}


def normalize(name):
    """Normalize a name for matching: strip accents, lowercase, normalize whitespace."""
    # NFKD decomposition then strip combining marks
    name = unicodedata.normalize("NFKD", name)
    name = "".join(c for c in name if not unicodedata.combining(c))
    name = name.lower().strip()
    # Normalize whitespace and hyphens
    name = re.sub(r"[\s\-]+", " ", name)
    # Remove common punctuation
    name = re.sub(r"[''`]", "", name)
    return name


def flip_article_suffix(name):
    """Convert INE-style 'City, El' to 'El City'."""
    m = re.match(r"^(.+),\s*(el|la|els|les|los|las|lo|l'|es|sa|ses|as|os|a|o)\s*$", name, re.IGNORECASE)
    if m:
        base, article = m.groups()
        if article.lower() == "l'":
            return f"l'{base}"
        return f"{article} {base}"
    return name


def get_name_variants(name):
    """Generate all matching variants for a city name."""
    variants = set()

    # Original name
    variants.add(normalize(name))

    # Flip article suffix
    flipped = flip_article_suffix(name)
    variants.add(normalize(flipped))

    # If bilingual (contains /), index both parts
    if "/" in name:
        parts = name.split("/")
        for part in parts:
            part = part.strip()
            variants.add(normalize(part))
            variants.add(normalize(flip_article_suffix(part)))

    return variants


def extract_city_from_filename(filename):
    """Extract city name from a Wikimedia file title."""
    # Remove "File:" prefix and ".svg" suffix
    name = filename
    if name.startswith("File:"):
        name = name[5:]
    if name.lower().endswith(".svg"):
        name = name[:-4]

    # Common patterns for coats of arms
    for prefix in [
        "Escudo de ", "Escudo del ", "Escudo de la ", "Escudo d'",
        "Escut de ", "Escut del ", "Escut de la ", "Escut d'", "Escut de l'",
        "Coat of arms of ",
        "Armarria - ",
        "Armarria de ",
    ]:
        if name.startswith(prefix):
            name = name[len(prefix):]
            break

    # Common patterns for flags
    for prefix in [
        "Bandera de ", "Bandera del ", "Bandera de la ", "Bandera d'",
        "Flag of ",
        "Bandera ", "Ikurrina ",
    ]:
        if name.startswith(prefix):
            name = name[len(prefix):]
            break

    # Remove province/region suffixes in parentheses
    # e.g., "Alcalá de Henares (Madrid)" -> "Alcalá de Henares"
    name = re.sub(r"\s*\([^)]*\)\s*$", "", name)

    # Remove trailing " - " disambiguation
    name = re.sub(r"\s*-\s*[A-Z][\w\s]*$", "", name)

    return name.strip()


def fetch_category_members(category, session):
    """Fetch all file members of a Wikimedia Commons category."""
    files = []
    params = {
        "action": "query",
        "list": "categorymembers",
        "cmtitle": category,
        "cmtype": "file",
        "cmlimit": 500,
        "format": "json",
    }

    while True:
        time.sleep(1)  # Rate limit
        resp = session.get(API_URL, params=params)
        resp.raise_for_status()
        data = resp.json()

        for member in data.get("query", {}).get("categorymembers", []):
            title = member["title"]
            if title.lower().endswith(".svg"):
                files.append(title)

        if "continue" in data:
            params["cmcontinue"] = data["continue"]["cmcontinue"]
        else:
            break

    return files


def resolve_file_urls(file_titles, session):
    """Resolve file titles to their actual URLs via imageinfo API."""
    url_map = {}
    # Process in batches of 50
    for i in range(0, len(file_titles), 50):
        batch = file_titles[i : i + 50]
        params = {
            "action": "query",
            "titles": "|".join(batch),
            "prop": "imageinfo",
            "iiprop": "url",
            "format": "json",
        }
        time.sleep(1)
        resp = session.get(API_URL, params=params)
        resp.raise_for_status()
        data = resp.json()

        for page in data.get("query", {}).get("pages", {}).values():
            title = page.get("title", "")
            imageinfo = page.get("imageinfo", [])
            if imageinfo:
                url_map[title] = imageinfo[0]["url"]

    return url_map


def match_images_to_cities(cities_by_province, file_url_map, image_type):
    """Match Wikimedia file URLs to cities using fuzzy matching."""
    matches = {}  # city_code -> url
    unmatched_files = []

    for file_title, url in file_url_map.items():
        city_name = extract_city_from_filename(file_title)
        if not city_name:
            unmatched_files.append(file_title)
            continue

        normalized_file = normalize(city_name)

        # Try exact match first across all cities in the province
        matched = False
        for code, city_data in cities_by_province.items():
            variants = city_data["variants"]
            if normalized_file in variants:
                if code not in matches:  # Don't overwrite existing matches
                    matches[code] = url
                    matched = True
                    break

        if not matched:
            # Try fuzzy matching
            best_score = 0
            best_code = None
            for code, city_data in cities_by_province.items():
                for variant in city_data["variants"]:
                    score = fuzz.ratio(normalized_file, variant)
                    if score > best_score:
                        best_score = score
                        best_code = code

            if best_score >= 85 and best_code not in matches:
                matches[best_code] = url
            else:
                unmatched_files.append(file_title)

    return matches, unmatched_files


def main():
    # Load cities
    with open(CITIES_PATH, "r", encoding="utf-8") as f:
        cities = json.load(f)

    # Group cities by province
    province_cities = {}
    for city in cities:
        prov = city["code_province"]
        if prov not in province_cities:
            province_cities[prov] = {}
        province_cities[prov][city["code"]] = {
            "name": city["name"],
            "variants": get_name_variants(city["name"]),
        }

    session = requests.Session()
    session.headers.update({"User-Agent": USER_AGENT})

    report_lines = []
    report_lines.append("Wikimedia Image Matching Report")
    report_lines.append("=" * 50)
    report_lines.append("")

    total_flag_matches = 0
    total_coat_matches = 0
    total_cities_count = len(cities)

    # Build code -> city index for easy update
    city_index = {c["code"]: c for c in cities}

    for prov_code in sorted(PROVINCE_CATEGORIES.keys()):
        cats = PROVINCE_CATEGORIES[prov_code]
        prov_cities = province_cities.get(prov_code, {})
        num_cities = len(prov_cities)

        if not prov_cities:
            continue

        report_lines.append(f"Province {prov_code} ({num_cities} cities)")
        report_lines.append("-" * 40)

        for image_type, cat_key, placeholder in [
            ("flags", "flags", NO_FLAG),
            ("coats", "coats", NO_COAT),
        ]:
            category = cats.get(cat_key)
            if not category:
                report_lines.append(f"  {image_type}: no category defined, skipping")
                continue

            print(f"Fetching {image_type} for province {prov_code}...")
            try:
                file_titles = fetch_category_members(category, session)
            except Exception as e:
                report_lines.append(f"  {image_type}: ERROR fetching category: {e}")
                continue

            if not file_titles:
                report_lines.append(f"  {image_type}: no SVG files found in category")
                continue

            print(f"  Found {len(file_titles)} SVG files, resolving URLs...")
            try:
                file_url_map = resolve_file_urls(file_titles, session)
            except Exception as e:
                report_lines.append(f"  {image_type}: ERROR resolving URLs: {e}")
                continue

            matches, unmatched = match_images_to_cities(prov_cities, file_url_map, image_type)

            # Apply matches to cities
            field = "flag" if image_type == "flags" else "coat_of_arms"
            for code, url in matches.items():
                city_index[code][field] = url

            if image_type == "flags":
                total_flag_matches += len(matches)
            else:
                total_coat_matches += len(matches)

            report_lines.append(
                f"  {image_type}: {len(file_titles)} files, "
                f"{len(matches)}/{num_cities} matched, "
                f"{len(unmatched)} unmatched files"
            )

            if unmatched:
                for uf in unmatched[:5]:
                    report_lines.append(f"    unmatched: {uf}")
                if len(unmatched) > 5:
                    report_lines.append(f"    ... and {len(unmatched) - 5} more")

        report_lines.append("")

    # Summary
    report_lines.append("=" * 50)
    report_lines.append("SUMMARY")
    report_lines.append(f"  Total cities: {total_cities_count}")
    report_lines.append(f"  Flag matches: {total_flag_matches}")
    report_lines.append(f"  Coat of arms matches: {total_coat_matches}")

    # Count cities still with placeholders
    no_flag_count = sum(1 for c in cities if c["flag"] == NO_FLAG)
    no_coat_count = sum(1 for c in cities if c["coat_of_arms"] == NO_COAT)
    report_lines.append(f"  Cities without flag: {no_flag_count}")
    report_lines.append(f"  Cities without coat of arms: {no_coat_count}")

    # Write updated cities.json (maintaining sort order)
    cities_sorted = sorted(cities, key=lambda c: c["code"])
    with open(CITIES_PATH, "w", encoding="utf-8") as f:
        json.dump(cities_sorted, f, ensure_ascii=False, indent=2)

    # Write report
    report_text = "\n".join(report_lines)
    with open(REPORT_PATH, "w", encoding="utf-8") as f:
        f.write(report_text)

    print("\n" + report_text)
    print(f"\nReport saved to: {REPORT_PATH}")
    print(f"Cities saved to: {CITIES_PATH}")


if __name__ == "__main__":
    main()
