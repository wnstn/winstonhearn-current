Personal site for blogging and keeping track of all reading.

## Get Started

### Prerequisites
- Hugo Extended (v0.152.2+)
- Node.js (v22+) and npm

### Setup

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

# Start the development server
export PATH="$PWD/dart-sass:$PATH"
hugo server
```

The site will be available at `http://localhost:1313/` or an available port.

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