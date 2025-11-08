# Get Started Guide: Setting Up the Hugo Site Locally

This guide walks you through setting up the Winston Hearn Hugo site from a fresh clone to a running local development server.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Git** - For cloning the repository
- **Hugo Extended** (v0.152.2 or compatible) - The static site generator (must be the "Extended" version)
- **Node.js** (v22 or compatible) - For managing JavaScript dependencies
- **npm** - Comes with Node.js, used to install JavaScript packages

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/wnstn/winstonhearn-current
cd winstonhearn-current
```

### 2. Check for Git Submodules or Hugo Modules

The site may use themes or modules that need to be initialized. Check and initialize if needed:

```bash
# Check for Git submodules
git submodule status

# If submodules exist, initialize them:
git submodule update --init --recursive

# Check for Hugo Modules (look for go.mod or hugo.toml)
# If found, fetch modules:
hugo mod get
```

**Note:** In this case, the theme (`bloggin`) is already included in the repository, so no submodule initialization is needed.

### 3. Install JavaScript Dependencies

The site uses several JavaScript packages for functionality like bot detection and performance monitoring. Install them using npm:

```bash
npm install
```

This command reads the `package.json` file and downloads all required JavaScript packages into a `node_modules` folder. This step is essential because Hugo needs these packages to build the JavaScript files used by the site.

**Expected output:** You should see packages being downloaded and a `node_modules` folder created in the project root.

### 4. Install Dart Sass

The site's theme uses Dart Sass to compile SCSS (Sass) files into CSS. Hugo Extended doesn't include Dart Sass by default, so it must be installed separately.

#### Download Dart Sass

```bash
# Download Dart Sass version 1.87.0 (as specified in netlify.toml)
curl -LJO https://github.com/sass/dart-sass/releases/download/1.87.0/dart-sass-1.87.0-linux-x64.tar.gz
```

#### Extract and Set Up

```bash
# Extract the archive
tar -xf dart-sass-1.87.0-linux-x64.tar.gz

# Remove the archive file (optional cleanup)
rm dart-sass-1.87.0-linux-x64.tar.gz
```

This creates a `dart-sass` folder in your project directory containing the Sass compiler executable.

### 5. Start the Hugo Development Server

To run the site locally, you need to start Hugo with Dart Sass available in your PATH:

```bash
export PATH="$PWD/dart-sass:$PATH"
hugo server
```

**Alternative:** If you want to make Dart Sass available permanently (for this terminal session), you can add it to your shell's PATH:

```bash
export PATH="$PWD/dart-sass:$PATH"
```

Then run:
```bash
hugo server
```

### 6. Access the Site

Once the server starts successfully, you should see output like:

```
Built in 5933 ms
Environment: "development"
Serving pages from disk
Web Server is available at http://localhost:1313/
```

Open your browser and navigate to **http://localhost:1313/** to view the site.

## Troubleshooting

### Issue: "Could not resolve" errors for npm packages

**Solution:** Run `npm install` to ensure all JavaScript dependencies are installed. If a specific package is missing, check `package.json` and add it if needed.

### Issue: "You need to install Dart Sass" error

**Solution:** 
1. Ensure Dart Sass is downloaded and extracted in the project directory
2. Make sure the PATH includes the `dart-sass` directory when running `hugo server`
3. Verify the `sass` executable exists: `ls dart-sass/src/dart`

### Issue: Port 1313 already in use

**Solution:** Hugo will automatically try the next available port (1314, 1315, etc.). Check the terminal output to see which port is being used.

### Issue: Theme not found

**Solution:** 
- Verify the `themes/bloggin` directory exists
- If it's a Git submodule, run `git submodule update --init --recursive`
- If it's a Hugo module, run `hugo mod get`

## What Gets Built

When Hugo builds the site, it processes:
- **659 pages** - All content pages from the `content/` directory
- **497 non-page files** - Assets, images, and other resources
- **3,819 processed images** - Optimized images for web delivery
- **13 static files** - Files served directly without processing

The built site is served from memory in development mode, with automatic reloading when you make changes to content or configuration files.

---

## External Dependencies Explained

This section explains each external data source or dependency used by the site, written for a junior technical writer.

### npm (Node Package Manager) and the npm Registry

**What it is:** npm is a package manager for JavaScript. Think of it like an app store, but for code libraries that developers can use in their projects.

**Where it comes from:** The npm Registry is a public online database hosted at `registry.npmjs.org` that stores millions of JavaScript packages.

**What we use it for:** We use npm to download and manage JavaScript libraries that the site needs. When you run `npm install`, it reads the `package.json` file (which acts like a shopping list) and downloads all the required packages from the npm registry into a local `node_modules` folder.

**Why it's needed:** The site's theme includes JavaScript code that depends on external libraries for features like bot detection and performance monitoring. Without these packages, the JavaScript code won't work.

**Packages we use:**
- `@fingerprintjs/botd` - Detects if a visitor is a bot or a real user
- `@honeycombio/opentelemetry-web` - Sends performance and error data to Honeycomb (a monitoring service)
- `@opentelemetry/api` - Provides tools for tracking how the website performs
- `@opentelemetry/auto-instrumentations-web` - Automatically collects performance data from web interactions

### Dart Sass

**What it is:** Dart Sass is a compiler that converts SCSS (Sass) files into regular CSS that browsers can understand. SCSS is a more powerful version of CSS that allows for variables, nesting, and other advanced features.

**Where it comes from:** Dart Sass is an open-source project maintained by the Sass team. We download it from GitHub Releases at `github.com/sass/dart-sass/releases`.

**What we use it for:** The site's theme uses SCSS files (located in `themes/bloggin/assets/scss/`) to define all the styling. Hugo needs Dart Sass to convert these SCSS files into CSS before the site can be displayed.

**Why it's needed:** Hugo Extended includes a built-in Sass compiler, but this particular theme requires Dart Sass specifically because it uses modern SCSS features (like the `@use` directive) that the built-in compiler doesn't support.

**How we get it:** We download a pre-compiled binary (executable file) for Linux from GitHub. This is a standalone program that doesn't require installation—we just extract it and add it to our PATH so Hugo can find and use it.

### Hugo (Static Site Generator)

**What it is:** Hugo is a program that takes your content (markdown files, images, etc.) and configuration files, and generates a complete website made of HTML, CSS, and JavaScript files.

**Where it comes from:** Hugo is an open-source project. You install it separately on your computer (not part of this repository). The "Extended" version includes additional features for processing SCSS and other assets.

**What we use it for:** Hugo reads all the content files, applies the theme's templates, processes the SCSS into CSS, bundles the JavaScript, and creates a ready-to-serve website in the `public/` directory (or serves it directly in development mode).

**Why it's needed:** Without Hugo, you'd have to manually create hundreds of HTML pages. Hugo automates this process, making it easy to maintain a blog or content site.

### GitHub (for the Repository)

**What it is:** GitHub is a web-based platform for storing and sharing code repositories (collections of files and their history).

**Where it comes from:** GitHub is a service provided by GitHub, Inc. (now part of Microsoft).

**What we use it for:** The site's source code, content, theme, and configuration files are stored in a Git repository hosted on GitHub. When you clone the repository, you're downloading a complete copy of all these files to your local computer.

**Why it's needed:** This is how the project is distributed and version-controlled. It allows multiple people to work on the site, track changes over time, and deploy updates.

---

## Summary

To get the site running locally, you need to:

1. ✅ Clone the repository
2. ✅ Install JavaScript dependencies (`npm install`)
3. ✅ Download and extract Dart Sass
4. ✅ Start Hugo server with Dart Sass in PATH

The site will be available at `http://localhost:1313/` and will automatically reload when you make changes to content or configuration files.

