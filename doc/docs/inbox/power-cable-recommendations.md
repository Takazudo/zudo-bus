---
sidebar_position: 3
---

# Power Cable Recommendations

Guidelines for selecting appropriate cables to connect the zudo-pd PSU to the zudo-bus board.

## Recommended Wire Gauge

**18 AWG (0.82 mm²)** is recommended for all power connections between the PSU and bus board.

### Why 18 AWG?

| Parameter            | 18 AWG Specification                           |
| -------------------- | ---------------------------------------------- |
| **Current Capacity** | 16A (chassis wiring) / 7A (power transmission) |
| **Diameter**         | 1.02 mm (bare conductor)                       |
| **Resistance**       | ~21 mΩ/m                                       |
| **Voltage Drop**     | ~42 mV/m at 2A                                 |

For typical Eurorack loads (1-2A per rail), 18 AWG provides:

- Adequate current handling with safety margin
- Low voltage drop over short distances
- Good flexibility for cable routing
- Wide availability and reasonable cost

### Current Requirements by Rail

| Rail | Typical Load | Max Load | 18 AWG Margin |
| ---- | ------------ | -------- | ------------- |
| +12V | 0.5-1.5A     | 2A       | 8x headroom   |
| -12V | 0.3-1.0A     | 2A       | 8x headroom   |
| +5V  | 0-0.5A       | 1.5A     | 10x headroom  |
| GND  | Sum of above | ~4A      | 4x headroom   |

## Cable Construction

### Recommended Cable Types

1. **Silicone Wire (Preferred)**
   - Highly flexible
   - Temperature resistant (-60°C to +200°C)
   - Easy to route in tight spaces

2. **Stranded Copper Wire**
   - Good flexibility
   - Standard hookup wire is acceptable
   - Avoid solid core wire (poor flexibility)

### Color Coding (Recommended)

Follow standard DC power conventions:

| Rail | Color         | Notes         |
| ---- | ------------- | ------------- |
| +12V | Red or Yellow | Positive rail |
| -12V | Blue          | Negative rail |
| +5V  | Orange        | Optional rail |
| GND  | Black         | Ground/return |

## Connection Types

### FASTON 250 Terminals

For FASTON connections to the bus board:

- Use **female FASTON 250** (6.3mm) crimp terminals
- Ensure proper crimp with appropriate tool
- Insulated terminals recommended

**Crimp Terminal Specifications:**

- Terminal size: 6.3mm width
- Wire range: 16-22 AWG (18 AWG fits well)
- Insulation: Optional but recommended

### Screw Terminals

For screw terminal connections:

- Strip approximately 6-7mm of insulation
- Tin the stripped wire end (optional but recommended)
- Tighten screw firmly but do not over-torque

## Cable Length

### Recommended Maximum Length

| Distance   | Voltage Drop at 2A | Recommendation |
| ---------- | ------------------ | -------------- |
| 0.3m (12") | ~25 mV             | Excellent      |
| 0.5m (20") | ~42 mV             | Good           |
| 1.0m (39") | ~84 mV             | Acceptable     |
| &gt;1.0m   | &gt;84 mV          | Use 16 AWG     |

**Note:** Keep cables as short as practical. Longer cables increase resistance and potential for noise pickup.

### Voltage Drop Calculation

```
V_drop = I × R × L × 2

Where:
- I = Current (A)
- R = Resistance per meter (~21 mΩ/m for 18 AWG)
- L = Cable length (m)
- × 2 = Round trip (supply + return)

Example: 2A through 0.5m of 18 AWG
V_drop = 2A × 0.021 Ω/m × 0.5m × 2 = 42 mV
```

## Summary

| Parameter       | Recommendation                              |
| --------------- | ------------------------------------------- |
| **Wire Gauge**  | 18 AWG (0.82 mm²)                           |
| **Wire Type**   | Stranded copper, silicone preferred         |
| **Max Length**  | 1.0m (use 16 AWG for longer)                |
| **Termination** | FASTON 250 or bare wire for screw terminals |

## Related

- [Technical Overview](/docs/overview/overview) - System architecture
- [Bill of Materials](/docs/overview/bom) - Connector specifications
