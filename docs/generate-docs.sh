#!/bin/bash

# Generate HTML documentation pages from markdown files
# This script creates HTML pages for all components using the template

cd "$(dirname "$0")/components"

# Function to generate HTML from template
generate_html() {
    local component=$1
    local icon=$2
    local description=$3
    local markdown_file="${component,,}.md"
    local html_file="${component,,}.html"
    
    sed "s/COMPONENT_NAME/$component/g; s/COMPONENT_ICON/$icon/g; s/COMPONENT_DESCRIPTION/$description/g; s/MARKDOWN_FILE/$markdown_file/g" _template.html > "$html_file"
    
    echo "✅ Generated $html_file"
}

# Generate HTML for each component
generate_html "Button" "🔘" "Versatile button with variants, sizes, and loading states"
generate_html "Input" "✏️" "Text input with validation, icons, and helper text"
generate_html "Card" "🗂️" "Container with header, body, and footer sections"
generate_html "Avatar" "👤" "User profile image with fallback initials"
generate_html "Badge" "🏷️" "Status indicator for notifications and counts"
generate_html "Chip" "🎯" "Compact element for tags and categories"
generate_html "Switch" "🎚️" "Toggle switch for on/off states"

echo ""
echo "🎉 All component pages generated successfully!"

