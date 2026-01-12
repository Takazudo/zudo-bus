# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a hardware project for designing a Eurorack bus board for modular synthesizers. The bus board distributes power from the USB-PD power supply (zudo-pd) to multiple Eurorack modules via 16-pin/10-pin IDC connectors.

## Deployment

The documentation is automatically deployed to Netlify:

- **Production URL**: https://takazudomodular.com/pj/zudo-bus/
- **Base Path**: `/pj/zudo-bus/`
- **Deployment**: Automatic on every push to `main` branch
- **Technology**: Docusaurus static site deployed via Netlify CLI on GitHub Actions
- **Configuration**: See `.github/workflows/main-deploy.yml` for deployment workflow

## Repository Structure

### Current Documentation (Use These)
- `/doc/docs/` - **Primary documentation** (Docusaurus-based, organized)
  - `overview/` - Project overview and specifications
  - `components/` - Individual component datasheets and specifications
  - `learning/` - Design learning notes
  - `how-to/` - How-to guides
  - `inbox/` - Working documentation and current status
- `/doc/static/` - **Documentation assets** (images, PDFs, SVGs)
- `/__inbox/` - **Temporary files** (gitignored, use for working files)

## Technical Architecture

The bus board provides:

1. **Power Input**: Screw terminal connection from USB-PD power supply
   - +12V rail
   - -12V rail
   - +5V rail
   - GND

2. **Power Distribution**: Multiple 16-pin IDC headers for Eurorack modules
   - Standard Eurorack pinout (keyed)
   - Proper decoupling capacitors per header
   - LED indicators for each rail

3. **Protection**: Per-rail protection components
   - Reverse polarity protection
   - Overcurrent indication

## Key Design Features

- **JLCPCB compatibility**: All parts selected for JLCPCB SMT assembly
- **Screw terminal input**: Easy connection to USB-PD power supply
- **Multiple module support**: 8-12 module connections per board
- **Status LEDs**: Visual confirmation of power status

## Documentation Language

**All documentation must be written in English.** This includes:
- Circuit diagrams and annotations
- Technical specifications
- README files
- Code comments
- Commit messages

Use English for all text to ensure international accessibility and collaboration.

## URL Reference Guidelines

When the user provides URLs starting with `http://localhost:3333/pj/zudo-bus/` or `http://zudobus.localhost:3333/pj/zudo-bus/` in the conversation:

- **DO NOT fetch the URL** - These are local documentation URLs served by Docusaurus
- **Instead, find and read the corresponding markdown file** in the `/doc/` directory
- Map URLs to file paths following Docusaurus routing (note: `/pj/zudo-bus/` is the base path)
- Use the Read tool to access the actual markdown source files

## File Types

- `.md` files contain technical specifications and circuit diagrams in text format
- No code compilation or testing is required - this is a hardware design project
