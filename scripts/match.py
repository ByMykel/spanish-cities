import json
import re
import unicodedata
import difflib

def simple_normalize(name):
    """
    Normalize the name by removing accents, punctuation,
    and converting to lowercase.
    """
    normalized = unicodedata.normalize('NFKD', name)\
                              .encode('ascii', 'ignore')\
                              .decode('utf-8')\
                              .lower()
    normalized = re.sub(r'[^\w\s]', '', normalized)
    return normalized.strip()

def parse_image_file(file_path):
    """
    Parse the image file to extract city names and URLs.
    We keep the original file name (which might include prefixes like "Escudo de"),
    but later we use fuzzy matching on a normalized version.
    """
    image_dict = {}
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read().split('\n\n')
        for entry in content:
            entry = entry.strip()
            if not entry:
                continue
            lines = entry.split('\n')
            if len(lines) < 2:
                continue
            try:
                url_line = lines[0].strip()
                name_line = lines[1].strip()
                image_url = url_line.split(': ', 1)[1]
                file_name = name_line.split(': ', 1)[1]
            except IndexError:
                continue
            image_dict[file_name] = image_url
    return image_dict

def best_fuzzy_match(city_name, image_dict, threshold=0.6):
    """
    Given a city name from JSON, find the image file name key in image_dict
    that is the closest match using fuzzy matching.

    - Uses simple_normalize on both strings.
    - If the normalized city name is a substring of the normalized image key,
      returns that immediately.
    - Otherwise, uses difflib.SequenceMatcher to compute a similarity ratio.
    - Returns the best matching key if the ratio meets the threshold.
    """
    norm_city = simple_normalize(city_name)
    best_ratio = 0.0
    best_key = None
    for key in image_dict:
        norm_key = simple_normalize(key)
        if norm_city in norm_key:
            return key  # Immediate strong match if city name is contained
        ratio = difflib.SequenceMatcher(None, norm_city, norm_key).ratio()
        if ratio > best_ratio:
            best_ratio = ratio
            best_key = key
    return best_key if best_ratio >= threshold else None

# Load image files for flags and coats of arms
flags_dict = parse_image_file('scripts/flags.txt')   # Adjust path if needed
coats_dict = parse_image_file('scripts/coats.txt')     # Adjust path if needed

# Load JSON data with cities
with open('./src/data/cities.json', 'r', encoding='utf-8') as f:
    cities = json.load(f)

# Update each city with flag and coat of arms URLs using fuzzy matching
for city in cities:
    city_name = city['name']
    flag_key = best_fuzzy_match(city_name, flags_dict)
    coat_key = best_fuzzy_match(city_name, coats_dict)
    city['flag'] = flags_dict.get(flag_key) if flag_key else None
    city['coat_of_arms'] = coats_dict.get(coat_key) if coat_key else None

# Set default images for cities that didn't match any key
default_flag = 'https://raw.githubusercontent.com/ByMykel/spanish-cities/refs/heads/main/no_flag.svg'
default_coat = 'https://raw.githubusercontent.com/ByMykel/spanish-cities/refs/heads/main/no_coat.svg'
for city in cities:
    if city['flag'] is None:
        city['flag'] = default_flag
    if city['coat_of_arms'] is None:
        city['coat_of_arms'] = default_coat

# Save the updated JSON data
with open('./src/data/cities.json', 'w', encoding='utf-8') as f:
    json.dump(cities, f, ensure_ascii=False, indent=2)
