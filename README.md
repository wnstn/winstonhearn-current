Personal site for blogging and keeping track of all reading.

## Quick Start

To run the development server:

```bash
./scripts/hugo-server.sh
```

## Get Started

### Prerequisites
- Hugo Extended (v0.152.2+)
- Node.js (v22+) and npm

### Setup

This is for going from the [forked repo](https://github.com/wnstn/winstonhearn-current) to locally-hosted site.

[see internal docs for explainers](/internal-docs/get-started.md)

```bash
# Clone the repository
git clone https://github.com/wnstn/winstonhearn-current
cd winstonhearn-current

# Install JavaScript dependencies
npm install

# Download and extract Dart Sass
curl -LJO https://github.com/sass/dart-sass/releases/download/1.87.0/dart-sass-1.87.0-linux-x64.tar.gz
tar -xf dart-sass-1.87.0-linux-x64.tar.gz
rm dart-sass-1.87.0-linux-x64.tar.gz

# Start the development server (automatically updates copyright year)
./scripts/hugo-server.sh
# OR use npm script:
# npm run serve
```

The site will be available at `http://localhost:1313/` or an available port.

**Note:** Use `./scripts/hugo-server.sh` or `npm run serve` instead of `hugo server` directly to ensure the copyright year is automatically updated.

## Features

### Mermaid Diagrams

The site supports Mermaid diagrams for creating flowcharts, sequence diagrams, and other visualizations. You can use Mermaid in two ways:

1. **Code blocks** (recommended):
   ````markdown
   ```mermaid
   graph TD
       A[Start] --> B[End]
   ```
   ````

2. **Shortcode**:
   ```markdown
   {{< mermaid >}}
   graph TD
       A[Start] --> B[End]
   {{< /mermaid >}}
   ```

Mermaid.js is automatically loaded and will render diagrams on page load.

---

Helpful ZSH commands for autocreating posts

```bash
function share() {
  if [ "$1" != "" ]
  then
    hugo new shared/$(date +%Y)/$1
  else 
    echo "You have to pass in an argument, nerd."
  fi
}

function book() {
  if [ "$1" != "" ]
  then
    hugo new --kind read read/$(date +%Y)/$1
  else 
    echo "You have to pass in an argument, nerd."
  fi
}

function post() {
  if ["$1" != ""]
  then
    hugo new wrote/$(date +%Y)/$1
  else
    echo "You have to pass in an argument, nerd."
  fi
}
```

## Attribution

Attribution is to [wnstn/winstonhearn-current](https://github.com/wnstn/winstonhearn-current) 2025/08/01 various changes, tinkers, and adaptations, have been made since forking.

Per the original intent of the license (Creative commons 3), this repo's tooling, including themes and other modifications is licensed under [Creative Commons 4.0](https://creativecommons.org/licenses/by/4.0/deed.en).

The content held within the /content folder, however, is the intellectual property (IP) of either the author or the author's clients. Content is owned by the author or client, is not licensed for use, copying, or distribution, and any use requires explicit permission.