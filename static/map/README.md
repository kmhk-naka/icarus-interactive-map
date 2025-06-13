# Map Assets Guide

To use this application, you must provide your own map images.

However, map images are not distributed with this repository due to unclear copyright status. If you choose to obtain images from third-party sources, you are solely responsible for ensuring compliance with all relevant laws and terms of service. The author of this repository is not liable for any damages or legal issues resulting from your use of external assets.

The recommended source is [Icarus Intel](https://icarusintel.com), but before downloading or scraping any images, always check the [robots.txt](https://icarusintel.com/robots.txt) file of the source website to confirm that your actions are not prohibited.

As of June 14, 2025, the robots.txt file does not prohibit scraping, but this may change in the future. Always verify before proceeding.

## Example: Downloading from Icarus Intel

Below is an example script used to scrape map images from Icarus Intel. Use this at your own risk and responsibility.

```python
import requests
from bs4 import BeautifulSoup
import time
from pathlib import Path

MAP = "icarus"  # and "styx"

zoom_levels = range(1, 5)

base_url = "https://www.icarusintel.com/maps/{map}/{z}/{x}/{y}.jpg"

headers = {
    "User-Agent": "Replace with your browser's User-Agent"
}

for z in zoom_levels:
    tile_range = 2**z

    combinations = [(x, y) for x in range(tile_range) for y in range(tile_range)]

    for i, (x, y) in enumerate(combinations):
        url = base_url.format(x=x, y=y, z=z, map=MAP)

        dir_path = Path(f"./maps/{z}/{x}")

        dir_path.mkdir(parents=True, exist_ok=True)

        try:
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                print(f"Saving image from {url}...")
                file_path = dir_path / f"{y}.jpg"
                file_path.write_bytes(response.content)
                print(f"Image saved successfully: {file_path}")
            else:
                print(
                    f"Failed to retrieve image from {url}. Status code: {response.status_code}"
                )
        except Exception as e:
            print(f"Error fetching or saving image from {url}: {str(e)}")

        time.sleep(1)

    print(f"All ZOOM_LEVEL = {z} images downloaded and saved.")

print("All images downloaded and saved.")
```
