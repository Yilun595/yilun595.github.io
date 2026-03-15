import os
import urllib.request
import json
import time

# 1. Get the API key
api_key = os.environ.get('ELSEVIER_API_KEY')

# 2. Define your papers here. 
# Create a unique short ID for each paper (e.g., "paper1") and map it to the DOI.
papers = {
    "BAE2023": "10.1016/j.buildenv.2023.110225",
    "BAE2025": "10.1016/j.buildenv.2025.112594",
    "LANDUP2023": "10.1016/j.landurbplan.2023.104842",
    "UECO2021": "10.1007/s11252-020-01073-4",
    "UECO2023": "10.1007/s11252-023-01405-0",
    "UFUG2021": "10.1016/j.ufug.2021.127375"
}

output = {}

# 3. Loop through each paper
for paper_id, doi in papers.items():
    url = f"https://api.elsevier.com/content/search/scopus?query=doi({doi})&apiKey={api_key}"
    
    try:
        req = urllib.request.Request(url, headers={'Accept': 'application/json'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            
            entries = data.get('search-results', {}).get('entry', [])
            if entries:
                cite_count = entries[0].get('citedby-count', '0')
                scopus_link = next((link['@href'] for link in entries[0].get('link', []) if link['@ref'] == 'scopus'), '#')
            else:
                cite_count = '0'
                scopus_link = '#'
                
        # Save the result for this specific paper
        output[paper_id] = {"count": cite_count, "url": scopus_link}
        print(f"Success for {paper_id}: {cite_count} citations")
        
        # Pause for 1 second to respect Elsevier's API limits
        time.sleep(1)

    except Exception as e:
        print(f"Error fetching {paper_id}: {e}")
        output[paper_id] = {"count": "N/A", "url": "#"}

# 4. Save all results into the single JSON file
os.makedirs('_data', exist_ok=True)
with open('_data/citations.json', 'w') as f:
    json.dump(output, f)