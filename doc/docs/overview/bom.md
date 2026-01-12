# Bill of Materials

Complete list of components for the zudo-bus board.

## Summary

| Category           | Count | Notes                     |
| ------------------ | ----- | ------------------------- |
| Connectors         | 12+   | Input + Output connectors |
| Active Components  | 1     | +5V LDO regulator         |
| Passive Components | ~10   | Capacitors, resistors     |
| Protection         | 2     | Reverse polarity diodes   |
| Indicators         | 3     | Power rail LEDs           |
| **Total**          | ~28+  | Varies by output count    |

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

| Designator | Value | Package | LCSC                                               | Function            |
| ---------- | ----- | ------- | -------------------------------------------------- | ------------------- |
| C1         | 0.1µF | 0603    | [C14663](https://jlcpcb.com/partdetail/C14663)     | U1 input capacitor  |
| C2         | 0.1µF | 0603    | [C14663](https://jlcpcb.com/partdetail/C14663)     | U1 output capacitor |
| C3, C4     | 1µF   | 0603    | [C6119849](https://jlcpcb.com/partdetail/C6119849) | Bulk filtering      |

**KiCad:**

- Symbol: `CC0603KRX7R9BB104` (0.1µF), `CGA0603X5R105K160JT` (1µF)
- Footprint: `C0603.kicad_mod`

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

**Notes:** SM4007PL is a 1N4007 equivalent in SOD-123FL package.

**KiCad:**

- Symbol: `SM4007PL`
- Footprint: `SOD-123F_L2.8-W1.8-LS3.7-RD.kicad_mod`

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
