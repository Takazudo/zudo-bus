# Bill of Materials

Complete list of components for the zudo-bus board.

## Summary

| Category           | Count | Notes                          |
| ------------------ | ----- | ------------------------------ |
| Connectors         | 13    | Input + Output + Jumper        |
| Active Components  | 1     | +5V LDO regulator              |
| Passive Components | 17    | Capacitors (14), resistors (3) |
| Protection         | 9     | Diodes (3), TVS (3), PTC (3)   |
| Indicators         | 3     | Power rail LEDs                |
| **Total**          | ~43   | Full protection configuration  |

---

## Power Input Connectors

### FASTON 250 Terminals (x4)

| Designator | Value     | Package | LCSC                                             | Function   |
| ---------- | --------- | ------- | ------------------------------------------------ | ---------- |
| J_F1       | 1217754-1 | CONN-TH | [C305825](https://jlcpcb.com/partdetail/C305825) | +12V input |
| J_F2       | 1217754-1 | CONN-TH | [C305825](https://jlcpcb.com/partdetail/C305825) | -12V input |
| J_F3       | 1217754-1 | CONN-TH | [C305825](https://jlcpcb.com/partdetail/C305825) | +5V input  |
| J_F4       | 1217754-1 | CONN-TH | [C305825](https://jlcpcb.com/partdetail/C305825) | GND        |

**Notes:** Same FASTON terminals as zudo-pd PSU output. Through-hole, hand-solderable.

**KiCad:**

- Symbol: `1217754-1`
- Footprint: `CONN-TH_1217754-1.kicad_mod`

### Screw Terminals 5.08mm (x4)

| Designator | Value          | Package   | LCSC                                         | Function   |
| ---------- | -------------- | --------- | -------------------------------------------- | ---------- |
| J_S1       | WJ500V-5.08-2P | 5.08mm 2P | [C8465](https://jlcpcb.com/partdetail/C8465) | +12V input |
| J_S2       | WJ500V-5.08-2P | 5.08mm 2P | [C8465](https://jlcpcb.com/partdetail/C8465) | -12V input |
| J_S3       | WJ500V-5.08-2P | 5.08mm 2P | [C8465](https://jlcpcb.com/partdetail/C8465) | +5V input  |
| J_S4       | WJ500V-5.08-2P | 5.08mm 2P | [C8465](https://jlcpcb.com/partdetail/C8465) | GND        |

**Notes:** 2-position screw terminals for easy wire connection. Alternative to FASTON.

**KiCad:**

- Symbol: `WJ500V-5.08-2P-14-00A`
- Footprint: `CONN-TH_2P-P5.00_WJ500V-5.08-2P.kicad_mod`

**Alternative (higher stock):**

- [C2915639](https://jlcpcb.com/partdetail/C2915639) - DB128V-5.08-2P (19K stock)
- [C71370](https://jlcpcb.com/partdetail/C71370) - WJ2EDGK-5.08-2P (75K stock, pluggable)

---

## Power Output Connectors

### 16-Pin IDC Headers (x8)

| Designator | Value        | Package    | LCSC                                               | Function      |
| ---------- | ------------ | ---------- | -------------------------------------------------- | ------------- |
| J1-J8      | 2541WR-2x08P | 2x8 2.54mm | [C5383092](https://jlcpcb.com/partdetail/C5383092) | Module output |

**Notes:** Standard Eurorack 16-pin power connector. Through-hole, right-angle.

**KiCad:**

- Symbol: `2541WR-2X08P`
- Footprint: `HDR-TH_16P-P2.54-H-M-R2-C8-S2.54.kicad_mod`

**Alternative (SMD):**

- [C32713288](https://jlcpcb.com/partdetail/C32713288) - HX PZ2.54-2x8P TP SMD (3.7K stock)

---

## +5V Generation Circuit

### LDO Regulator

| Designator | Value | Package  | LCSC                                                 | Function      |
| ---------- | ----- | -------- | ---------------------------------------------------- | ------------- |
| U1         | 78L05 | SOT-89-3 | [C20628877](https://jlcpcb.com/partdetail/C20628877) | +5V 100mA LDO |

**Notes:** Generates +5V from +12V input. 100mA output current.

**Specifications:**

- Input: +12V (7V-35V range)
- Output: +5V @ 100mA max
- Dropout: ~2V
- Package: SOT-89-3 (SMD)

**KiCad:**

- Symbol: `78L05_C20628877`
- Footprint: `SOT-89-3_L4.5-W2.5-P1.50-LS4.1-BR-1.kicad_mod`

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

| Designator | Value | Package | LCSC                                               | Function                 |
| ---------- | ----- | ------- | -------------------------------------------------- | ------------------------ |
| C1         | 0.1µF | 0603    | [C14663](https://jlcpcb.com/partdetail/C14663)     | U1 input capacitor       |
| C2         | 0.1µF | 0603    | [C14663](https://jlcpcb.com/partdetail/C14663)     | U1 output capacitor      |
| C3, C4     | 1µF   | 0603    | [C6119849](https://jlcpcb.com/partdetail/C6119849) | Bulk filtering           |
| C5, C6     | 10µF  | 0805    | [C5448891](https://jlcpcb.com/partdetail/C5448891) | +12V/-12V input bulk cap |
| C7-C14     | 0.1µF | 0603    | [C14663](https://jlcpcb.com/partdetail/C14663)     | Per-header decoupling x8 |

**Notes:**

- C5, C6: Input bulk capacitors (TCC0805X5R106K250FT, 25V 10µF X5R ±10%, Stock: 188K) absorb inrush current and reduce voltage transients at power input.
- C7-C14: Per-header decoupling capacitors near each IDC output for high-frequency transient filtering.

**KiCad:**

- Symbol: `CC0603KRX7R9BB104` (0.1µF), `CGA0603X5R105K160JT` (1µF), `TCC0805X5R106K250FT` (10µF in `zudo-bus-protection.kicad_sym`)
- Footprint: `C0603.kicad_mod`, `C0805.kicad_mod`

### Resistors

| Designator | Value | Package | LCSC                                           | Function             |
| ---------- | ----- | ------- | ---------------------------------------------- | -------------------- |
| R1, R2, R3 | 1kΩ   | 0603    | [C21190](https://jlcpcb.com/partdetail/C21190) | LED current limiting |

**KiCad:**

- Symbol: `0603WAF1001T5E`
- Footprint: `R0603.kicad_mod`

---

## Protection Components

### Reverse Polarity Diodes

| Designator | Value    | Package   | LCSC                                           | Function                |
| ---------- | -------- | --------- | ---------------------------------------------- | ----------------------- |
| D1         | SM4007PL | SOD-123FL | [C64898](https://jlcpcb.com/partdetail/C64898) | +12V reverse protection |
| D2         | SM4007PL | SOD-123FL | [C64898](https://jlcpcb.com/partdetail/C64898) | -12V reverse protection |
| D3         | SM4007PL | SOD-123FL | [C64898](https://jlcpcb.com/partdetail/C64898) | +5V reverse protection  |

**Notes:** SM4007PL is a 1N4007 equivalent in SOD-123FL package. D3 protects the +5V input path from PSU.

**KiCad:**

- Symbol: `SM4007PL`
- Footprint: `SOD-123F_L2.8-W1.8-LS3.7-RD.kicad_mod`

### TVS Diodes (Transient Protection)

| Designator | Value    | Package | LCSC                                             | Function             |
| ---------- | -------- | ------- | ------------------------------------------------ | -------------------- |
| TVS1       | SMF15CA  | SOD-123 | [C908211](https://jlcpcb.com/partdetail/C908211) | +12V transient clamp |
| TVS2       | SMF15CA  | SOD-123 | [C908211](https://jlcpcb.com/partdetail/C908211) | -12V transient clamp |
| TVS3       | SMF5.0CA | SOD-123 | [C908214](https://jlcpcb.com/partdetail/C908214) | +5V transient clamp  |

**Notes:** Bidirectional TVS diodes for ESD and transient spike protection. SMF15CA (Stock: 54K) has 15V standoff for ±12V rails. SMF5.0CA (Stock: 66K) has 5V standoff for +5V rail.

**Specifications (SMF15CA):**

- Standoff voltage: 15V
- Breakdown voltage: 16.7V
- Clamping voltage: 24.4V @ 8.2A
- Peak pulse current: 8.2A (8/20µs)
- Package: SOD-123 (SMD)

**Specifications (SMF5.0CA):**

- Standoff voltage: 5V
- Breakdown voltage: 6.4V
- Clamping voltage: 9.2V @ 11.7A
- Package: SOD-123 (SMD)

**KiCad:**

- Symbol: `SMF15CA_C908211`, `SMF5.0CA_C908214` (in `zudo-bus-protection.kicad_sym`)
- Footprint: `SOD-123_L2.8-W1.8-LS3.7-BI.kicad_mod`

### Resettable Fuses (PTC)

| Designator | Value            | Package | LCSC                                             | Function               |
| ---------- | ---------------- | ------- | ------------------------------------------------ | ---------------------- |
| F1         | BSMD1812-200-30V | 1812    | [C960026](https://jlcpcb.com/partdetail/C960026) | +12V overcurrent (2A)  |
| F2         | BSMD1812-200-30V | 1812    | [C960026](https://jlcpcb.com/partdetail/C960026) | -12V overcurrent (2A)  |
| F3         | BSMD1812-150-33V | 1812    | [C883154](https://jlcpcb.com/partdetail/C883154) | +5V overcurrent (1.5A) |

**Notes:** Self-resetting PTC fuses (Stock: F1/F2 120K, F3 69K). Trip on overcurrent, auto-reset when cooled. F3 rated 1.5A for +5V rail protection (covers both LDO mode and PSU direct mode).

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

**KiCad:**

- Symbol: `BSMD1812-200-30V`, `BSMD1812-150-33V` (in `zudo-bus-protection.kicad_sym`)
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

| Library File                    | Contents                                       |
| ------------------------------- | ---------------------------------------------- |
| `zudo-bus.kicad_sym`            | Main symbols (LDO, connectors, passives, LEDs) |
| `zudo-bus-protection.kicad_sym` | Protection components (TVS, PTC fuses, caps)   |

**Protection library symbols:**

- `SMF15CA_C908211` - TVS diode 15V bidirectional
- `SMF5.0CA_C908214` - TVS diode 5V bidirectional
- `BSMD1812-200-30V` - PTC fuse 2A
- `BSMD1812-150-33V` - PTC fuse 1.5A
- `TCC0805X5R106K250FT` - 10µF bulk capacitor

### Footprint Library

**Directory:** `footprints/kicad/zudo-bus.pretty/`

| Footprint                                       | Package    | Used By                         |
| ----------------------------------------------- | ---------- | ------------------------------- |
| `C0603.kicad_mod`                               | 0603       | C1, C2, C3, C4, C7-C14 (caps)   |
| `C0805.kicad_mod`                               | 0805       | C5, C6 (bulk caps)              |
| `R0603.kicad_mod`                               | 0603       | R1, R2, R3 (resistors)          |
| `LED0603-RD.kicad_mod`                          | 0603       | LED1 (Red), LED3 (Blue)         |
| `LED0603-FD.kicad_mod`                          | 0603       | LED2 (Green)                    |
| `SOD-123F_L2.8-W1.8-LS3.7-RD.kicad_mod`         | SOD-123F   | D1, D2, D3 (reverse protection) |
| `SOD-123_L2.8-W1.8-LS3.7-BI.kicad_mod`          | SOD-123    | TVS1, TVS2, TVS3 (TVS diodes)   |
| `F1812.kicad_mod`                               | 1812       | F1, F2, F3 (PTC fuses)          |
| `SOT-89-3_L4.5-W2.5-P1.50-LS4.1-BR-1.kicad_mod` | SOT-89     | U1 (LDO regulator)              |
| `HDR-TH_3P-P2.54-V-M-1.kicad_mod`               | 2.54mm     | JP1 (jumper header)             |
| `HDR-TH_16P-P2.54-H-M-R2-C8-S2.54.kicad_mod`    | 2x8 2.54mm | J1-J8 (IDC headers)             |
| `CONN-TH_1217754-1.kicad_mod`                   | FASTON     | J_F1-J_F4 (FASTON terminals)    |
| `CONN-TH_2P-P5.00_WJ500V-5.08-2P.kicad_mod`     | 5.08mm     | J_S1-J_S4 (screw terminals)     |

**Total footprints:** 13 files
