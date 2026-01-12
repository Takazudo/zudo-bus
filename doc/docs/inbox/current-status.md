---
sidebar_position: 2
---

# Current Status

Project status and circuit design plan for the bus board.

## Current Phase

**Circuit Design Planning** - Component selection complete, ready for schematic

## Completed

- Repository setup
- Documentation structure
- Component research and selection
- Old design analysis (zudo-bus v1/v2)

## Design Decisions Made

### Input Connectors

- **4x FASTON 250 terminals** - Same as zudo-pd PSU (+12V, -12V, +5V, GND)
- **4x 5.08mm screw terminals** - Alternative connection method
- User can choose preferred connection (chainable, flexible)

### Output Connectors

- **8x 16-pin IDC headers** - Standard Eurorack power
- Same quantity as old design v2

### +5V Generation

- **L78L05 LDO** (100mA) from +12V
- **3-pin jumper** for source selection:
  - Position 1-2: Use on-board LDO
  - Position 2-3: Use PSU +5V directly
  - No jumper: +5V disabled

---

## Circuit Design Plan

### Block Diagram

```
                      zudo-bus Board
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  INPUT SECTION              DISTRIBUTION         OUTPUT SECTION │
│  ┌───────────┐                                  ┌────────────┐  │
│  │ FASTON x4 │──┐                           ┌──►│ IDC J1     │  │
│  │ +12V      │  │                           │   │ 16-pin     │  │
│  │ -12V      │  │     ┌─────────────────┐   │   ├────────────┤  │
│  │ +5V       │  ├────►│   Power Rails   │───┼──►│ IDC J2     │  │
│  │ GND       │  │     │   Distribution  │   │   ├────────────┤  │
│  └───────────┘  │     └─────────────────┘   │   │    ...     │  │
│                 │              │             │   ├────────────┤  │
│  ┌───────────┐  │              │             └──►│ IDC J8     │  │
│  │ Screw x4  │──┘              │                 └────────────┘  │
│  │ 5.08mm    │                 │                                 │
│  │ +12V      │                 ▼                                 │
│  │ -12V      │     ┌──────────────────────┐                     │
│  │ +5V       │     │  +5V LDO SECTION     │                     │
│  │ GND       │     │                      │                     │
│  └───────────┘     │  +12V ──► L78L05 ──┐ │                     │
│                    │                    │ │                     │
│                    │    PSU +5V ────────┼─┼─► 3-pin jumper      │
│                    │                    │ │      │              │
│                    │    LDO +5V ────────┘ │      ▼              │
│                    └──────────────────────┘   +5V rail          │
│                                                                 │
│  INDICATORS        PROTECTION                                   │
│  ┌─────────┐      ┌─────────────────────────────────────────┐  │
│  │ LED +12V│      │ Reverse Polarity: D1(+12V), D2(-12V),   │  │
│  │ LED -12V│      │                   D3(+5V)               │  │
│  │ LED +5V │      │ TVS Clamp: TVS1(+12V), TVS2(-12V),      │  │
│  └─────────┘      │           TVS3(+5V)                     │  │
│                   │ PTC Fuses: F1(+12V 2A), F2(-12V 2A),    │  │
│  FILTERING        │           F3(+5V 1.5A)                  │  │
│  ┌─────────┐      └─────────────────────────────────────────┘  │
│  │C5,C6    │                                                   │
│  │10µF bulk│      DECOUPLING                                   │
│  │at input │      ┌─────────────┐                              │
│  └─────────┘      │ C7-C14 0.1µF│                              │
│                   │ per header  │                              │
│                   └─────────────┘                              │
└─────────────────────────────────────────────────────────────────┘
```

### +5V Selection Circuit Detail

```
                    +12V Rail
                        │
                        ▼
                   ┌─────────┐
                   │         │
                   │ L78L05  │
                   │ 100mA   │
                   │         │
              C1   └────┬────┘   C2
           0.33µF       │      0.1µF
              │         │         │
    GND ──────┴─────────┼─────────┴────── GND
                        │
                        │ LDO +5V Output
                        │
                        ▼
        ┌───────────────────────────────┐
        │         3-Pin Header          │
        │                               │
        │   LDO +5V    Rail    PSU +5V  │
        │      │         │         │    │
        │      ▼         ▼         ▼    │
        │    ┌───┐     ┌───┐     ┌───┐  │
        │    │ 1 │─────│ 2 │─────│ 3 │  │
        │    └───┘     └───┘     └───┘  │
        │         ▲         ▲           │
        │      Jumper    Jumper         │
        │       1-2       2-3           │
        └───────────────────────────────┘
                        │
                        ▼
                   +5V to IDC headers
```

### Component Connections

#### Power Input (FASTON + Screw parallel)

```
+12V:  FASTON J_F1 ──┬── Screw J_S1 ──► +12V Rail
-12V:  FASTON J_F2 ──┬── Screw J_S2 ──► -12V Rail
+5V:   FASTON J_F3 ──┬── Screw J_S3 ──► JP1 Pin 3
GND:   FASTON J_F4 ──┬── Screw J_S4 ──► GND Rail
```

#### +5V LDO Section

```
U1 (L78L05):
  - Pin 1 (VIN)  ← +12V Rail
  - Pin 2 (GND)  ← GND
  - Pin 3 (VOUT) → JP1 Pin 1 (LDO output)

C1 (0.33µF): VIN to GND (input stabilization)
C2 (0.1µF):  VOUT to GND (output stabilization)
```

#### 3-Pin Jumper (JP1)

```
Pin 1: LDO +5V output (from U1)
Pin 2: +5V Rail (to all IDC headers)
Pin 3: PSU +5V input (from J_F3/J_S3)

Jumper 1-2: Use LDO (generate +5V from +12V)
Jumper 2-3: Use PSU (direct +5V from power supply)
```

#### LED Indicators

```
LED1 (Red):    -12V Rail → R1 (1kΩ) → LED1 → GND
LED2 (Green):  +12V Rail → R2 (1kΩ) → LED2 → GND
LED3 (Blue):   +5V Rail  → R3 (470Ω) → LED3 → GND
```

#### Reverse Polarity Protection

```
D1 (SM4007PL): Cathode → +12V Rail, Anode → GND
D2 (SM4007PL): Cathode → GND, Anode → -12V Rail
D3 (SM4007PL): Cathode → +5V Input, Anode → GND (PSU +5V path)
```

#### TVS Transient Protection

```
TVS1 (SMF15CA): Bidirectional, across +12V rail to GND
TVS2 (SMF15CA): Bidirectional, across -12V rail to GND
TVS3 (SMF5.0CA): Bidirectional, across +5V rail to GND
```

#### Overcurrent Protection (PTC Fuses)

```
F1 (BSMD1812-200): In series with +12V rail, 2A hold current
F2 (BSMD1812-200): In series with -12V rail, 2A hold current
F3 (BSMD1812-150): In series with +5V rail, 1.5A hold current
```

#### Input Bulk Capacitors

```
C5 (10µF): Across +12V input to GND (transient filtering)
C6 (10µF): Across -12V input to GND (transient filtering)
```

#### Per-Header Decoupling

```
C7-C14 (0.1µF x8): Near each IDC header output for HF filtering
```

---

## Selected Components

| Component        | Part Number      | LCSC      | Stock | Notes             |
| ---------------- | ---------------- | --------- | ----- | ----------------- |
| FASTON Terminal  | 1217754-1        | C305825   | -     | x4, 7A rated      |
| Screw Terminal   | WJ500V-5.08-2P   | C8465     | 123K  | x4                |
| 16-pin Header    | 2541WR-2x08P     | C5383092  | 6.8K  | x8                |
| +5V LDO          | 78L05            | C20628877 | 57K   | SOT-89            |
| Reverse Diode    | SM4007PL         | C64898    | -     | x3, SOD-123FL     |
| TVS Diode 15V    | SMF15CA          | C908211   | 54K   | x2, bidirectional |
| TVS Diode 5V     | SMF5.0CA         | C908214   | 66K   | x1, bidirectional |
| PTC Fuse 2A      | BSMD1812-200-30V | C960026   | 120K  | x2, 1812          |
| PTC Fuse 1.5A    | BSMD1812-150-33V | C883154   | 69K   | x1, 1812          |
| Bulk Cap 10µF    | TCC0805X5R106K   | C5448891  | 188K  | x2, 0805 25V      |
| Decoupling 0.1µF | CC0603           | C14663    | -     | x10, 0603         |

---

## Next Steps

1. **Create KiCad Schematic**
   - Set up hierarchical sheets
   - Import symbols from easyeda2kicad
   - Wire up circuits per design above

2. **PCB Layout Planning**
   - Define board dimensions
   - Plan connector placement
   - Consider mounting holes

3. **Design Review**
   - Verify current ratings
   - Check thermal dissipation for LDO
   - Confirm JLCPCB compatibility

4. **Prototype Order**
   - Generate gerbers
   - Create BOM for JLCPCB
   - Order test batch

---

## Questions to Resolve

- [ ] Exact LED values and colors to match zudo-pd
- [x] Need bulk capacitors on power rails? → Yes, added C5/C6 (10µF) at input
- [ ] PCB size constraints (case compatibility)
- [ ] Shrouded vs unshrouded IDC headers?

---

## Related Projects

- [zudo-pd](https://takazudomodular.com/pj/zudo-pd/) - USB-PD power supply that powers this bus board
- Old design: `/Users/takazudo/Dropbox/modularCAD/zudo-bus/`
