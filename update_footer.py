import os

files = [
    'index.html', 'about.html', 'services.html', 'android-dev.html', 
    'website-dev.html', 'custom-software.html', 'data-entry.html', 
    'digital-marketing.html', 'blogs.html', 'contact.html', 'clients.html'
]

for filename in files:
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace 2024 with 2026 in the copyright line
        new_content = content.replace('© 2024', '© 2026')
        
        # Replace ShivMaya Tech Solution with ShivMaya Tech Solutions
        # Be careful not to create "Solutionss"
        # We replace the singular version where it appears.
        # title tags, meta descriptions, and footer copyright lines often have the singular version.
        
        # First, ensure we don't double pluralize if "Solutions" already exists.
        # We can use regex or just replace specifically.
        import re
        new_content = re.sub(r'ShivMaya Tech Solution(?!s)', 'ShivMaya Tech Solutions', new_content)
        
        if new_content != content:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
        else:
            print(f"No changes in {filename}")
    else:
        print(f"File {filename} not found")
