---
sidebar_position: 2
slug: project-overview
---

# Technical Overview

Technical specifications and design rationale for the zudo-bus board.

## System Architecture

```
                    ┌──────────────────────────────────────────────────┐
                    │              zudo-bus Board                      │
                    │                                                  │
From PSU ──────────►│  Input Section          Output Section          │
(FASTON or Screw)   │  ┌─────────┐           ┌─────────────┐          │
                    │  │ +12V IN │──────────►│ 16-pin IDC  │──► Module
                    │  │ -12V IN │──────────►│ Headers x8  │
                    │  │ GND  IN │──────────►│             │          │
                    │  │ +5V  IN │──┬───────►│             │          │
                    │  └─────────┘  │        └─────────────┘          │
                    │               │                                  │
                    │               │  ┌──────────────────┐           │
                    │               │  │ +5V LDO Section  │           │
                    │               │  │                  │           │
                    │  +12V ────────┼─►│ AMS1117 ─► +5V  │           │
                    │               │  │                  │           │
                    │               │  └────────┬─────────┘           │
                    │               │           │                      │
                    │               └───────────┤                      │
                    │                    3-pin  │                      │
                    │                   jumper  ▼                      │
                    │                  ┌───────────┐                   │
                    │                  │ SELECT    │                   │
                    │                  │ PSU / LDO │                   │
                    │                  └───────────┘                   │
                    └──────────────────────────────────────────────────┘
```

## +5V Selection Mechanism

The 3-pin header allows users to select the +5V source:

```
3-Pin Header Positions:
┌─────────────────────────────────────┐
│  Position 1-2: Use LDO output       │
│  (Generate +5V from +12V)           │
│                                     │
│  Position 2-3: Use PSU +5V          │
│  (Direct from power supply)         │
│                                     │
│  No jumper: +5V rail disabled       │
└─────────────────────────────────────┘

     +5V from LDO    +5V to modules    +5V from PSU
          │               │                │
          ▼               ▼                ▼
        ┌───┐           ┌───┐           ┌───┐
        │ 1 │───────────│ 2 │───────────│ 3 │
        └───┘           └───┘           └───┘
              ▲                   ▲
           Jumper              Jumper
           1-2                 2-3
```

## Design Rationale

### Dual Input Connectors

**FASTON terminals:**

- Same connector as zudo-pd PSU output
- Quick connect/disconnect
- Industrial reliability
- Requires one-side FASTON cables

**Screw terminals:**

- Easy to use with bare wire
- No special cables needed
- User-friendly for DIY builders
- Good for permanent installations

### +5V Generation

Most Eurorack modules only need ±12V. The +5V rail is optional and mainly used by:

- Digital modules with 5V logic
- Some older module designs
- Specific manufacturer requirements

By generating +5V on the bus board:

- Reduces load on PSU +5V rail
- Simpler cable requirements (only 3 wires from PSU)
- Can be disabled if not needed

### Component Selection

All components selected for:

- JLCPCB SMT assembly availability
- Adequate current ratings
- Thermal performance
- Cost effectiveness
