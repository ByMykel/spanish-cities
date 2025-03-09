# List of flags of municipalities:
# https://commons.wikimedia.org/wiki/Category:SVG_flags_of_municipalities_of_Spain_by_province

# List of coats of arms of municipalities:
# https://commons.wikimedia.org/wiki/Category:SVG_coats_of_arms_of_municipalities_of_Spain_by_province

import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def get_province_urls(category_type="flags"):
    """Extract URLs for SVG flags/coats of municipalities by province"""
    base_url = "https://commons.wikimedia.org/wiki/Category:SVG_"
    url = base_url + ("flags" if category_type == "flags" else "coats_of_arms") + "_of_municipalities_of_Spain_by_province"
    
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    province_urls = []
    category_items = soup.find_all('div', class_='CategoryTreeItem')
    
    for item in category_items:
        link = item.find('a')
        if link and link.has_attr('href'):
            full_url = urljoin(url, link['href'])
            province_urls.append(full_url)
    
    return province_urls

def process_province_page(url, output_file):
    """Process a single province page and write results to file"""
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    gallery_boxes = soup.find_all('li', class_='gallerybox')
    
    for gallery_box in gallery_boxes:
        if not gallery_box.find('img'):
            continue
            
        relative_image_url = gallery_box.find('img')['src']
        image_url = urljoin(url, relative_image_url.replace('/thumb/', '/'))
        image_url = os.path.dirname(image_url)

        file_name = gallery_box.find('a', class_='galleryfilename')['title']
        gallery_text = gallery_box.find('div', class_='gallerytext').text.strip()

        output_file.write(f"Image URL: {image_url}\n")
        output_file.write(f"File Name: {file_name}\n")
        output_file.write("\n")

def main():
    # Process flags
    flag_urls = get_province_urls("flags")
    with open("flags.txt", "w", encoding="utf-8") as file:
        for url in flag_urls:
            try:
                process_province_page(url, file)
            except Exception as e:
                print(f"Error processing flag {url}: {e}")

    # Process coats of arms
    coat_urls = get_province_urls("coats")
    with open("coats.txt", "w", encoding="utf-8") as file:
        for url in coat_urls:
            try:
                process_province_page(url, file)
            except Exception as e:
                print(f"Error processing coat {url}: {e}")

if __name__ == "__main__":
    main()