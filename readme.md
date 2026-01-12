# Eurorack Bus Board (zudo-bus)

A bus board for distributing power from USB-PD power supply to Eurorack modular synthesizer modules.

## Documentation

**Main documentation is in the `/doc/` Docusaurus site**

```bash
cd doc
pnpm install
pnpm start
```

Open http://localhost:3333 in your browser to view the documentation.

## Project Overview

### Design Goals

Bus board for distributing power from zudo-pd USB-PD power supply to Eurorack modules.

- **Input**: Screw terminal connection (+12V, -12V, +5V, GND)
- **Output**: Multiple 16-pin IDC headers (Eurorack standard)
- **Capacity**: 8-12 module connections
- **Indicators**: LED status for each power rail

### Features

1. **Screw Terminal Input** - Easy connection from USB-PD power supply
2. **Multiple IDC Headers** - Standard Eurorack 16-pin connectors
3. **Per-Rail Protection** - Reverse polarity and overcurrent protection
4. **Visual Feedback** - LED indicators for power status
5. **JLCPCB Compatible** - All parts available from JLCPCB

## Repository Structure

- `/doc/` - Docusaurus documentation site **<- Main documentation**
- `/__inbox/` - Working directory (gitignored, temporary files)

## Related Projects

- [zudo-pd](https://github.com/Takazudo/zudo-pd) - USB-PD power supply that powers this bus board

## License

This project is open source. Hardware design files are free to use and modify.
