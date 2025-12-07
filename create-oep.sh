#!/bin/bash
#
# Create a new OEP from template
#
# Usage: ./create-oep.sh <number> <title>
# Example: ./create-oep.sh 5 "Decentralized Storage Protocol"
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE_FILE="$SCRIPT_DIR/template.md"
OEPS_DIR="$SCRIPT_DIR/oeps"

# Validate arguments
if [ $# -lt 2 ]; then
    echo -e "${RED}Error: Missing arguments${NC}"
    echo ""
    echo "Usage: $0 <number> <title>"
    echo ""
    echo "Arguments:"
    echo "  number    OEP number (e.g., 5 or 0005)"
    echo "  title     OEP title in quotes (e.g., \"Decentralized Storage Protocol\")"
    echo ""
    echo "Example:"
    echo "  $0 5 \"Decentralized Storage Protocol\""
    exit 1
fi

OEP_NUMBER=$1
shift
TITLE="$*"

# Validate number is numeric
if ! [[ "$OEP_NUMBER" =~ ^[0-9]+$ ]]; then
    echo -e "${RED}Error: OEP number must be a positive integer${NC}"
    exit 1
fi

# Format OEP number with leading zeros (4 digits)
OEP_NUMBER_PADDED=$(printf "%04d" "$OEP_NUMBER")
OEP_NUMBER_PLAIN=$((10#$OEP_NUMBER)) # Remove leading zeros for frontmatter

# Generate filename
FILENAME="OEP-${OEP_NUMBER_PADDED}.md"
OUTPUT_FILE="$OEPS_DIR/$FILENAME"

# Check if file already exists
if [ -f "$OUTPUT_FILE" ]; then
    echo -e "${RED}Error: $FILENAME already exists${NC}"
    exit 1
fi

# Check template exists
if [ ! -f "$TEMPLATE_FILE" ]; then
    echo -e "${RED}Error: Template file not found at $TEMPLATE_FILE${NC}"
    exit 1
fi

# Get author from git config
AUTHOR_NAME=$(git config user.name 2>/dev/null || echo "Your Name")
AUTHOR_EMAIL=$(git config user.email 2>/dev/null || echo "your@email.com")
AUTHOR="$AUTHOR_NAME <$AUTHOR_EMAIL>"

# Get current date
DATE=$(date +%Y-%m-%d)

# Create OEP from template
sed -e "s/{{OEP_NUMBER}}/$OEP_NUMBER_PADDED/" \
    -e "s/{{TITLE}}/$TITLE/" \
    -e "s/{{AUTHOR}}/$AUTHOR/" \
    -e "s/{{DATE}}/$DATE/" \
    "$TEMPLATE_FILE" > "$OUTPUT_FILE"

echo -e "${GREEN}Created:${NC} $OUTPUT_FILE"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "  1. Edit $FILENAME to fill in your proposal"
echo "  2. Set the type (technical, process, or informational)"
echo "  3. Add relevant labels (e.g., protocol, storage, api)"
echo "  4. Create a PR to opensciencearchive/oeps"
echo "  5. Update status to 'discussion' when ready for feedback"
