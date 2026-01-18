# Bill of Materials

Complete list of components for the zudo-bus board.

## Summary

| Category           | Count | Notes                                        |
| ------------------ | ----- | -------------------------------------------- |
| Connectors         | 15    | Input (2) + Chain (4) + IDC (8) + Jumper (1) |
| Active Components  | 1     | +5V LDO regulator                            |
| Passive Components | 25    | Capacitors (22), resistors (3)               |
| Protection         | 14    | Diodes (6), TVS (3), PTC (4), Schottky (2)   |
| Indicators         | 3     | Power rail LEDs                              |
| Test Points        | 6     | TP1-TP6 for debugging                        |
| **Total**          | ~60   | Full protection configuration                |

## PCB Design

- **2-layer PCB** - Cost-effective design with copper pours for thermal management

---

## Power Input Connectors

### Screw Terminals 5.08mm (x2)

| Designator | Value          | Package   | LCSC                                         | Function           |
| ---------- | -------------- | --------- | -------------------------------------------- | ------------------ |
| P1         | WJ500V-5.08-2P | 5.08mm 2P | [C8465](https://jlcpcb.com/partdetail/C8465) | -12V and GND input |
| P2         | WJ500V-5.08-2P | 5.08mm 2P | [C8465](https://jlcpcb.com/partdetail/C8465) | +12V and +5V input |

**Pin Assignments:**

| Terminal | Pin 1  | Pin 2   |
| -------- | ------ | ------- |
| P1       | GND    | -12V in |
| P2       | +5V in | +12V in |

**Notes:** 2-position screw terminals for easy wire connection.

**KiCad:**

- Symbol: `WJ500V-5.08-2P-14-00A`
- Footprint: `CONN-TH_2P-P5.00_WJ500V-5.08-2P.kicad_mod`

**Alternative (higher stock):**

- [C2915639](https://jlcpcb.com/partdetail/C2915639) - DB128V-5.08-2P (19K stock)
- [C71370](https://jlcpcb.com/partdetail/C71370) - WJ2EDGK-5.08-2P (75K stock, pluggable)

---

## Bus Board Chaining Connectors

### FASTON 250 Terminals (x4)

| Designator | Value     | Package | LCSC                                             | Function   |
| ---------- | --------- | ------- | ------------------------------------------------ | ---------- |
| P3         | 1217754-1 | CONN-TH | [C305825](https://jlcpcb.com/partdetail/C305825) | -12V chain |
| P4         | 1217754-1 | CONN-TH | [C305825](https://jlcpcb.com/partdetail/C305825) | GND chain  |
| P5         | 1217754-1 | CONN-TH | [C305825](https://jlcpcb.com/partdetail/C305825) | +12V chain |
| P6         | 1217754-1 | CONN-TH | [C305825](https://jlcpcb.com/partdetail/C305825) | +5V chain  |

**Notes:** FASTON terminals for daisy-chaining multiple bus boards. Through-hole, hand-solderable. 7A rated per terminal. Compatible with standard 6.3mm FASTON receptacles.

**KiCad:**

- Symbol: `1217754-1`
- Footprint: `CONN-TH_1217754-1.kicad_mod`

---

## Power Output Connectors

### 16-Pin IDC Headers (x8)

| Designator | Value        | Package    | LCSC                                               | Function      |
| ---------- | ------------ | ---------- | -------------------------------------------------- | ------------- |
| J101-J108  | 2541WR-2x08P | 2x8 2.54mm | [C5383092](https://jlcpcb.com/partdetail/C5383092) | Module output |

**Notes:** Standard Eurorack 16-pin power connector. Through-hole, right-angle. Numbering scheme: J1XX where XX = unit number (01-08).

**KiCad:**

- Symbol: `2541WR-2X08P`
- Footprint: `HDR-TH_16P-P2.54-H-M-R2-C8-S2.54.kicad_mod`

**Alternative (SMD):**

- [C32713288](https://jlcpcb.com/partdetail/C32713288) - HX PZ2.54-2x8P TP SMD (3.7K stock)

---

## +5V Generation Circuit

### LDO Regulator

| Designator | Value       | Package | LCSC                                         | Function   |
| ---------- | ----------- | ------- | -------------------------------------------- | ---------- |
| U1         | AMS1117-5.0 | SOT-223 | [C6187](https://jlcpcb.com/partdetail/C6187) | +5V 1A LDO |

**Notes:** Generates +5V from +12V input. 1A output current (practical limit ~300mA due to thermal dissipation).

**Specifications:**

- Input: +12V (6.5V-15V range, abs max 18V)
- Output: +5V @ 1A max
- Dropout: ~1.2V (lower than 78xx series)
- Package: SOT-223 (SMD)
- Requires 22µF low-ESR output capacitor for stability

**KiCad:**

- Symbol: `AMS1117-5.0_C6187`
- Footprint: `SOT-223-3_L6.5-W3.4-P2.30-LS7.0-BR.kicad_mod`

### +5V Selection Header

| Designator | Value        | Package | LCSC                                           | Function          |
| ---------- | ------------ | ------- | ---------------------------------------------- | ----------------- |
| JP1        | 3-pin header | 2.54mm  | [C49257](https://jlcpcb.com/partdetail/C49257) | +5V source select |

**Jumper positions:**

- 1-2: Use on-board LDO (+5V from +12V)
- 2-3: Use PSU +5V directly
- None: +5V rail disabled

**KiCad:**

- Symbol: `Header-Male-2.54_1x3`
- Footprint: `HDR-TH_3P-P2.54-V-M-1.kicad_mod`

---

## Passive Components

### Capacitors

| Designator | Value | Package | LCSC                                           | Function                      |
| ---------- | ----- | ------- | ---------------------------------------------- | ----------------------------- |
| C1         | 0.1µF | 0603    | [C14663](https://jlcpcb.com/partdetail/C14663) | U1 input HF decoupling        |
| C2         | 22µF  | 0805    | [C45783](https://jlcpcb.com/partdetail/C45783) | U1 output capacitor           |
| C3         | 10µF  | 0805    | [C15850](https://jlcpcb.com/partdetail/C15850) | U1 input bulk                 |
| C4         | 0.1µF | 0603    | [C14663](https://jlcpcb.com/partdetail/C14663) | U1 output HF decoupling       |
| C5         | 22µF  | 0805    | [C45783](https://jlcpcb.com/partdetail/C45783) | +12V input bulk cap           |
| C6         | 22µF  | 0805    | [C45783](https://jlcpcb.com/partdetail/C45783) | -12V input bulk cap           |
| C23        | 22µF  | 0805    | [C45783](https://jlcpcb.com/partdetail/C45783) | +5V rail bulk cap (after JP1) |
| C101-C108  | 0.1µF | 0603    | [C14663](https://jlcpcb.com/partdetail/C14663) | -12V per-header decoupling x8 |
| C201-C208  | 0.1µF | 0603    | [C14663](https://jlcpcb.com/partdetail/C14663) | +12V per-header decoupling x8 |

**Notes:**

- C2: 22µF low-ESR output capacitor **required for AMS1117 stability** (Samsung CL21A226MAYNNNE, 25V X5R, Basic Part)
- C5, C6: 22µF bulk capacitors (Samsung CL21A226MAYNNNE, 25V X5R) for better transient response during module power-on
- C23: 22µF bulk capacitor for +5V rail, placed after JP1 Pin 2 (provides filtering regardless of LDO or PSU direct mode)
- C101-C108: -12V per-header decoupling capacitors (C1XX matches J1XX header number)
- C201-C208: +12V per-header decoupling capacitors (C2XX matches J1XX header number)

**DC Bias Derating Note:** X5R ceramic capacitors lose capacitance under DC bias. At 12V on a 25V-rated cap, expect ~65% of nominal capacitance (22µF → ~14µF effective). This is acceptable for bulk filtering purposes.

**KiCad:**

- Symbol: `CC0603KRX7R9BB104` (0.1µF), `CL21A106KAYNNNE` (10µF), `CL21A226MAYNNNE` (22µF)
- Footprint: `C0603.kicad_mod`, `C0805.kicad_mod`

### Resistors

| Designator | Value | Package | LCSC                                           | Function                   |
| ---------- | ----- | ------- | ---------------------------------------------- | -------------------------- |
| R1, R2, R3 | 1kΩ   | 0805    | [C25623](https://jlcpcb.com/partdetail/C25623) | LED current limiting (all) |

**Notes:**

- All LEDs use 1kΩ resistors (same as zudo-power-usb-pd for consistency)
- LED current: ~10mA for ±12V LEDs, ~2mA for +5V LED

**KiCad:**

- Symbol: `0805WAF1001T5E` (1kΩ)
- Footprint: `R0805.kicad_mod`

---

## Protection Components

### Reverse Polarity Diodes

| Designator | Value    | Package   | LCSC                                           | Function                  |
| ---------- | -------- | --------- | ---------------------------------------------- | ------------------------- |
| D1         | SM4007PL | SOD-123FL | [C64898](https://jlcpcb.com/partdetail/C64898) | +12V reverse protection   |
| D2         | SM4007PL | SOD-123FL | [C64898](https://jlcpcb.com/partdetail/C64898) | -12V reverse protection   |
| D3         | SM4007PL | SOD-123FL | [C64898](https://jlcpcb.com/partdetail/C64898) | +5V PSU path protection   |
| D4         | SM4007PL | SOD-123FL | [C64898](https://jlcpcb.com/partdetail/C64898) | +5V LDO output protection |

**Notes:** SM4007PL is a 1N4007 equivalent in SOD-123FL package. D3 protects the +5V PSU input path, D4 protects the LDO output path.

**Protection Order (Input to Output):**

```
Input → PTC Fuse → TVS Diode → Reverse Diode → Bulk Caps → Distribution
```

**KiCad:**

- Symbol: `SM4007PL`
- Footprint: `SOD-123F_L2.8-W1.8-LS3.7-RD.kicad_mod`

### +5V OR-ing Schottky Diodes (Backfeed Protection)

| Designator | Value | Package       | LCSC                                         | Function                    |
| ---------- | ----- | ------------- | -------------------------------------------- | --------------------------- |
| D5         | SS14  | SMA(DO-214AC) | [C2480](https://jlcpcb.com/partdetail/C2480) | +5V PSU path OR-ing diode   |
| D6         | SS14  | SMA(DO-214AC) | [C2480](https://jlcpcb.com/partdetail/C2480) | +5V LDO output OR-ing diode |

**Notes:** SS14 Schottky diodes (40V, 1A) create an OR-ing configuration to prevent backfeed between the LDO and PSU +5V sources. This allows safe operation even if both sources are inadvertently connected (e.g., jumper across all three JP1 pins).

**Specifications (SS14):**

- Reverse voltage: 40V
- Forward current: 1A
- Forward voltage drop: 550mV @ 1A
- Peak surge current: 25A
- Package: SMA (DO-214AC), Stock: 1.09M

**Circuit Position:** D5 in series with PSU +5V path (before JP1 Pin 3), D6 in series with LDO output (before JP1 Pin 1).

**KiCad:**

- Symbol: `SS14` (in `zudo-bus-new-protection.kicad_sym`)
- Footprint: `SMA_L4.2-W2.6-LS5.0-RD_1.kicad_mod`

### TVS Diodes (Transient Protection)

| Designator | Value    | Package   | LCSC                                             | Function             |
| ---------- | -------- | --------- | ------------------------------------------------ | -------------------- |
| TVS1       | SMF12CA  | SOD-123FL | [C353317](https://jlcpcb.com/partdetail/C353317) | +12V transient clamp |
| TVS2       | SMF12CA  | SOD-123FL | [C353317](https://jlcpcb.com/partdetail/C353317) | -12V transient clamp |
| TVS3       | SMF5.0CA | SOD-123   | [C908214](https://jlcpcb.com/partdetail/C908214) | +5V transient clamp  |

**Notes:** Bidirectional TVS diodes for ESD and transient spike protection. SMF12CA (Stock: 67K) has 12V standoff for ±12V rails - chosen over SMF15CA for lower clamping voltage that better protects Eurorack module components. SMF5.0CA (Stock: 66K) has 5V standoff for +5V rail.

**Specifications (SMF12CA):**

- Standoff voltage: 12V
- Breakdown voltage: 13.3V - 14.7V
- Clamping voltage: 19.9V @ 10.1A (safe for op-amps rated 15-18V abs max)
- Peak pulse current: 10.1A (8/20µs)
- Package: SOD-123FL (SMD)

**Specifications (SMF5.0CA):**

- Standoff voltage: 5V
- Breakdown voltage: 6.4V
- Clamping voltage: 9.2V @ 11.7A
- Package: SOD-123 (SMD)

**Design Note:** SMF12CA was chosen over SMF15CA because the SMF15CA clamps at 24.4V, which exceeds the absolute maximum ratings of many Eurorack module op-amps (typically 15-18V). The SMF12CA clamps at 19.9V, providing better protection for downstream components while still allowing normal 12V operation.

**KiCad:**

- Symbol: `SMF12CA_C353317` (in `zudo-bus-new-protection.kicad_sym`), `SMF5.0CA_C908214` (in `zudo-bus-protection.kicad_sym`)
- Footprint: `SOD-123FL_L2.8-W1.8-LS3.7-BI.kicad_mod` (SMF12CA), `SOD-123_L2.8-W1.8-LS3.7-BI.kicad_mod` (SMF5.0CA)

### Resettable Fuses (PTC)

| Designator | Value            | Package | LCSC                                             | Function                     |
| ---------- | ---------------- | ------- | ------------------------------------------------ | ---------------------------- |
| F1         | BSMD1812-200-30V | 1812    | [C960026](https://jlcpcb.com/partdetail/C960026) | +12V overcurrent (2A)        |
| F2         | BSMD1812-200-30V | 1812    | [C960026](https://jlcpcb.com/partdetail/C960026) | -12V overcurrent (2A)        |
| F3         | BSMD1812-150-33V | 1812    | [C883154](https://jlcpcb.com/partdetail/C883154) | +5V rail overcurrent (1.5A)  |
| F4         | BSMD1812-110-33V | 1812    | [C883150](https://jlcpcb.com/partdetail/C883150) | LDO input overcurrent (1.1A) |

**Notes:** Self-resetting PTC fuses. Trip on overcurrent, auto-reset when cooled.

- F1/F2 (Stock: 120K): Main ±12V rail protection
- F3 (Stock: 69K): +5V distribution rail protection (after JP1 Pin 2, regardless of source)
- F4 (Stock: 50K): LDO input path protection - provides symmetric protection for the LDO, limiting input current to prevent damage if LDO shorts internally

**Specifications (BSMD1812-200-30V):**

- Hold current: 2.0A
- Trip current: 4.0A
- Max voltage: 30V
- Initial resistance: 50mΩ typ
- Package: 1812 SMD

**Specifications (BSMD1812-150-33V):**

- Hold current: 1.5A
- Trip current: 3.0A
- Max voltage: 33V
- Package: 1812 SMD

**Specifications (BSMD1812-110-33V):**

- Hold current: 1.1A
- Trip current: 2.2A
- Max voltage: 33V
- Package: 1812 SMD

**KiCad:**

- Symbol: `BSMD1812-200-30V`, `BSMD1812-150-33V` (in `zudo-bus-protection.kicad_sym`), `BSMD1812-110-33V` (in `zudo-bus-new-protection.kicad_sym`)
- Footprint: `F1812.kicad_mod`

---

## Indicators

### Power LEDs

| Designator | Value | Package | LCSC                                                 | Function       |
| ---------- | ----- | ------- | ---------------------------------------------------- | -------------- |
| LED1       | Red   | 0603    | [C2286](https://jlcpcb.com/partdetail/C2286)         | -12V indicator |
| LED2       | Green | 0603    | [C19171392](https://jlcpcb.com/partdetail/C19171392) | +12V indicator |
| LED3       | Blue  | 0603    | [C5382145](https://jlcpcb.com/partdetail/C5382145)   | +5V indicator  |

**KiCad:**

- Symbol: `KT-0603R` (Red), `YLED0603YG` (Green), `NCD1608A1` (Blue)
- Footprint: `LED0603-RD.kicad_mod` (Red/Blue), `LED0603-FD.kicad_mod` (Green)

---

## Test Points

| Designator | Location                    | Function         |
| ---------- | --------------------------- | ---------------- |
| TP1        | +12V rail (after PTC F1)    | +12V measurement |
| TP2        | -12V rail (after PTC F2)    | -12V measurement |
| TP3        | +5V rail (after jumper JP1) | +5V measurement  |
| TP4        | Ground reference            | GND reference    |
| TP5        | LDO input (+12V to U1)      | LDO input check  |
| TP6        | LDO output (+5V from U1)    | LDO output check |

**Notes:**

- Test points enable easy debugging and measurement during development
- Use standard through-hole test point pads or SMD test points
- TP4 (GND) provides reference for all voltage measurements

---

## JLCPCB Assembly Notes

### SMT Assembly

- All SMD components can be assembled by JLCPCB
- Select "Economic" or "Standard" PCBA based on component availability

### Through-Hole Components (Manual Assembly)

- FASTON terminals (C305825)
- Screw terminals (C8465)
- 16-pin IDC headers (C5383092)
- 3-pin jumper header

### Recommended Order

1. Order PCB + SMT assembly from JLCPCB
2. Order through-hole connectors separately
3. Hand-solder through-hole components

---

## Reference: Old Design Components

From zudo-bus v1/v2:

| Component | Value       | LCSC   | Notes              |
| --------- | ----------- | ------ | ------------------ |
| U1        | L78L05ABUTR | C42738 | +5V LDO (SOT-89)   |
| D1, D2    | 1N4007      | -      | Reverse protection |
| C1-C3     | 0.1µF       | -      | Decoupling         |
| U3, U4    | 1µF elec    | -      | Bulk caps          |
| R1, R2    | 1kΩ         | -      | LED resistors      |
| R3        | 470Ω        | -      | LED resistor       |
| LED1      | Red         | -      | -12V indicator     |
| LED2      | Blue        | -      | +12V indicator     |
| LED3      | White       | -      | +5V indicator      |

---

## KiCad Library Files

### Symbol Libraries

| Library File                        | Contents                                           |
| ----------------------------------- | -------------------------------------------------- |
| `zudo-bus.kicad_sym`                | Main symbols (LDO, connectors, passives, LEDs)     |
| `zudo-bus-protection.kicad_sym`     | Original protection (SMF5.0CA, PTC 2A/1.5A)        |
| `zudo-bus-new-protection.kicad_sym` | Updated protection (SMF12CA, PTC 1.1A, SS14, 22µF) |
| `samsung-caps.kicad_sym`            | Samsung capacitors (10µF, 22µF)                    |

**zudo-bus-protection.kicad_sym symbols:**

- `SMF15CA_C908211` - TVS diode 15V bidirectional (legacy, replaced by SMF12CA)
- `SMF5.0CA_C908214` - TVS diode 5V bidirectional
- `BSMD1812-200-30V` - PTC fuse 2A
- `BSMD1812-150-33V` - PTC fuse 1.5A
- `TCC0805X5R106K250FT` - 10µF capacitor (alternative)
- `AMS1117-5.0` - LDO regulator

**zudo-bus-new-protection.kicad_sym symbols:**

- `SMF12CA_C353317` - TVS diode 12V bidirectional (replaces SMF15CA for safer clamping)
- `BSMD1812-110-33V` - PTC fuse 1.1A (for LDO input protection)
- `SS14` - Schottky diode 40V 1A (for +5V OR-ing)
- `CL21A226MAQNNNE` - 22µF capacitor (Samsung C45783)

**samsung-caps.kicad_sym symbols:**

- `CL21A106KAYNNNE` - 10µF capacitor (C15850)
- `CL21A226MAQNNNE` - 22µF capacitor (C45783)

### Footprint Library

**Directory:** `footprints/kicad/zudo-bus.pretty/`

| Footprint                                    | Package        | Used By                             |
| -------------------------------------------- | -------------- | ----------------------------------- |
| `C0603.kicad_mod`                            | 0603           | C1, C4, C7-C22 (0.1µF caps)         |
| `C0805.kicad_mod`                            | 0805           | C2, C3, C5, C6, C23 (10µF, 22µF)    |
| `R0603.kicad_mod`                            | 0603           | (available if needed)               |
| `R0805.kicad_mod`                            | 0805           | R1, R2, R3 (1kΩ resistors)          |
| `LED0603-RD.kicad_mod`                       | 0603           | LED1 (Red), LED3 (Blue)             |
| `LED0603-FD.kicad_mod`                       | 0603           | LED2 (Green)                        |
| `SOD-123F_L2.8-W1.8-LS3.7-RD.kicad_mod`      | SOD-123F       | D1, D2, D3, D4 (reverse protection) |
| `SOD-123_L2.8-W1.8-LS3.7-BI.kicad_mod`       | SOD-123        | TVS3 (SMF5.0CA)                     |
| `SOD-123FL_L2.8-W1.8-LS3.7-BI.kicad_mod`     | SOD-123FL      | TVS1, TVS2 (SMF12CA)                |
| `SMA_L4.2-W2.6-LS5.0-RD_1.kicad_mod`         | SMA (DO-214AC) | D5, D6 (SS14 Schottky)              |
| `F1812.kicad_mod`                            | 1812           | F1, F2, F3, F4 (PTC fuses)          |
| `SOT-223_L6.5-W3.5-P2.30-LS7.0-BR.kicad_mod` | SOT-223        | U1 (LDO regulator)                  |
| `HDR-TH_3P-P2.54-V-M-1.kicad_mod`            | 2.54mm         | JP1 (jumper header)                 |
| `HDR-TH_16P-P2.54-H-M-R2-C8-S2.54.kicad_mod` | 2x8 2.54mm     | J101-J108 (IDC headers)             |
| `CONN-TH_1217754-1.kicad_mod`                | FASTON         | P3-P6 (FASTON chain output)         |
| `CONN-TH_2P-P5.00_WJ500V-5.08-2P.kicad_mod`  | 5.08mm         | P1, P2 (screw terminals)            |

**Total footprints:** 16 files
