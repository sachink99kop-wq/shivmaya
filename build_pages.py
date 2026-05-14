import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract parts using regex
# Head, body start, floating whatsapp, navbar, mobile menu
header_pattern = re.compile(r'(<!DOCTYPE html>.*?<!-- Hero Section -->)', re.DOTALL)
header_match = header_pattern.search(content)
if not header_match:
    print("Header not found")
header_str = header_match.group(1).replace('<!-- Hero Section -->', '')

# Footer and scripts
footer_pattern = re.compile(r'(<!-- Footer -->.*</html>)', re.DOTALL)
footer_match = footer_pattern.search(content)
if not footer_match:
    print("Footer not found")
footer_str = footer_match.group(1)

# Sections
about_pattern = re.compile(r'(<!-- Why Choose Us -->.*?)<!-- Process Section -->', re.DOTALL)
about_str = about_pattern.search(content).group(1)

services_pattern = re.compile(r'(<!-- Services Section -->.*?)<!-- Why Choose Us -->', re.DOTALL)
services_str = services_pattern.search(content).group(1)

process_pattern = re.compile(r'(<!-- Process Section -->.*?)<!-- Testimonials Section -->', re.DOTALL)
process_str = process_pattern.search(content).group(1)

clients_pattern = re.compile(r'(<!-- Testimonials Section -->.*?)<!-- Contact Section -->', re.DOTALL)
clients_str = clients_pattern.search(content).group(1)

contact_pattern = re.compile(r'(<!-- Contact Section -->.*?)<!-- Footer -->', re.DOTALL)
contact_str = contact_pattern.search(content).group(1)

def make_page_header(title, subtitle, parent=None, parent_url=None):
    breadcrumb = f"""
            <nav class="flex justify-center mb-8 reveal" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.2em]">
                    <li><a href="index.html" class="text-gray-500 hover:text-accent-cyan transition-colors">Home</a></li>
                    {f'<li><span class="text-gray-700 mx-2">/</span></li><li><a href="{parent_url}" class="text-gray-500 hover:text-accent-cyan transition-colors">{parent}</a></li>' if parent else ''}
                    <li><span class="text-gray-700 mx-2">/</span></li>
                    <li class="text-accent-cyan">{title}</li>
                </ol>
            </nav>
    """
    return f"""
    <!-- Page Header -->
    <section class="pt-48 pb-24 relative bg-secondary overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,212,255,0.08)_0%,transparent_70%)] pointer-events-none"></div>
        <div class="container mx-auto px-6 max-w-7xl relative z-10 text-center">
            {breadcrumb}
            <h1 class="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight text-white reveal">{title}</h1>
            <p class="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed reveal">{subtitle}</p>
        </div>
    </section>
    """

# Create about.html - Commented out to preserve custom content
# with open('about.html', 'w', encoding='utf-8') as f:
#     page_header = make_page_header("About Us", "Discover the story, vision, and team behind ShivMaya Tech Solution.")
#     f.write(header_str + page_header + '<div class="py-10">\n' + about_str + '\n</div>\n' + footer_str)

# Create services.html - Commented out to preserve custom content
# with open('services.html', 'w', encoding='utf-8') as f:
#     page_header = make_page_header("Our Services", "Comprehensive digital solutions tailored to elevate your business.")
#     f.write(header_str + page_header + '<div class="py-10">\n' + services_str + process_str + '\n</div>\n' + footer_str)

# Create service sub-pages (templates for internal linking)
service_pages = [
    ("Android App Development", "android-dev.html"),
    ("Website Development", "website-dev.html"),
    ("Custom Software Solutions", "custom-software.html"),
    ("Data Entry and Management", "data-entry.html"),
    ("Digital Marketing", "digital-marketing.html")
]

# Create clients.html
with open('clients.html', 'w', encoding='utf-8') as f:
    page_header = make_page_header("Our Clients", "Hear what our partners have to say about working with us.")
    f.write(header_str + page_header + '<div class="py-10">\n' + clients_str + '\n</div>\n' + footer_str)

# Create contact.html
with open('contact.html', 'w', encoding='utf-8') as f:
    page_header = make_page_header("Contact Us", "Let's connect and build something great together.")
    f.write(header_str + page_header + '<div class="py-10">\n' + contact_str + '\n</div>\n' + footer_str)

# Create blogs.html
blogs_str = """
    <!-- Blogs Placeholder Section -->
    <section class="py-32 relative min-h-[50vh] flex items-center justify-center">
        <div class="container mx-auto px-6 text-center reveal">
            <span class="inline-block px-4 py-1.5 bg-accent-cyan/10 border border-accent-cyan/20 rounded-full text-xs font-bold text-accent-cyan uppercase tracking-widest mb-4">Our Journal</span>
            <h2 class="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">Coming <span class="gradient-text">Soon.</span></h2>
            <p class="text-gray-400 text-lg max-w-2xl mx-auto mb-8">We are crafting insightful articles and case studies. Stay tuned for expert thoughts on App Development, Web Design, and SaaS Trends.</p>
        </div>
    </section>
"""
with open('blogs.html', 'w', encoding='utf-8') as f:
    page_header = make_page_header("Blogs", "Latest insights and news from the digital world.")
    f.write(header_str + page_header + '<div class="py-10">\n' + blogs_str + '\n</div>\n' + footer_str)

print("Pages created successfully with headers!")
