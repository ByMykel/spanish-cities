#!/usr/bin/env python3
"""
Shared codec for the compact JSON data files in src/data/.

Since v2.2.1 the data files are stored as arrays of arrays rather than arrays
of objects, and image URLs are stored as Wikimedia Commons path suffixes
(or null) rather than full URLs. That cuts the published package size, but it
means the scraping scripts cannot read or write the files directly.

Row layouts:

    autonomies.json  [code, name, flag, coat_of_arms]
    provinces.json   [code, name, code_autonomy, flag, coat_of_arms]
    cities.json      [code, name, code_autonomy, flag, coat_of_arms]

`flag` and `coat_of_arms` hold the path after WIKIMEDIA_PREFIX, or null when
no image is known. A city's `code_province` is the first two characters of its
code and is not stored.

The loaders return dicts with full image URLs (or None) so the scripts can work
with a convenient shape; the writers convert back to the compact form.
"""

import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(ROOT, "src", "data")

AUTONOMIES_PATH = os.path.join(DATA_DIR, "autonomies.json")
PROVINCES_PATH = os.path.join(DATA_DIR, "provinces.json")
CITIES_PATH = os.path.join(DATA_DIR, "cities.json")

WIKIMEDIA_PREFIX = "https://upload.wikimedia.org/wikipedia/commons/"


def _to_url(suffix):
    """Compact image value -> full URL, or None when there is no image."""
    return WIKIMEDIA_PREFIX + suffix if suffix else None


def _to_suffix(url, context):
    """Full URL -> compact image value. Rejects anything not on Wikimedia."""
    if not url:
        return None
    if not url.startswith(WIKIMEDIA_PREFIX):
        raise ValueError(
            f"{context}: image URL must start with {WIKIMEDIA_PREFIX}, got {url!r}"
        )
    return url[len(WIKIMEDIA_PREFIX):]


def _read(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def _write(path, rows):
    """Write rows in the compact format: no indentation, no separator padding."""
    with open(path, "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False, separators=(",", ":"))


def load_autonomies(path=AUTONOMIES_PATH):
    return [
        {
            "code": code,
            "name": name,
            "flag": _to_url(flag),
            "coat_of_arms": _to_url(coat_of_arms),
        }
        for code, name, flag, coat_of_arms in _read(path)
    ]


def load_provinces(path=PROVINCES_PATH):
    return [
        {
            "code": code,
            "name": name,
            "code_autonomy": code_autonomy,
            "flag": _to_url(flag),
            "coat_of_arms": _to_url(coat_of_arms),
        }
        for code, name, code_autonomy, flag, coat_of_arms in _read(path)
    ]


def load_cities(path=CITIES_PATH):
    return [
        {
            "code": code,
            "name": name,
            "code_autonomy": code_autonomy,
            "code_province": code[:2],
            "flag": _to_url(flag),
            "coat_of_arms": _to_url(coat_of_arms),
        }
        for code, name, code_autonomy, flag, coat_of_arms in _read(path)
    ]


def save_cities(cities, path=CITIES_PATH):
    """Write cities back in compact form, sorted by code."""
    rows = []
    for city in sorted(cities, key=lambda c: c["code"]):
        code = city["code"]

        if len(code) != 6:
            raise ValueError(f"city {code!r}: code must be 6 characters")
        if city["code_province"] != code[:2]:
            raise ValueError(
                f"city {code!r}: code_province {city['code_province']!r} does not "
                f"match the first two characters of the code"
            )

        rows.append([
            code,
            city["name"],
            city["code_autonomy"],
            _to_suffix(city["flag"], f"city {code}"),
            _to_suffix(city["coat_of_arms"], f"city {code}"),
        ])

    _write(path, rows)
