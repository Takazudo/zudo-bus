# KiCad Schematic File Editing

Guide for programmatically editing KiCad schematic files (`.kicad_sch`) to add connections, labels, and wires.

## File Format Overview

KiCad schematic files use S-expression format (similar to Lisp). The main structure:

```lisp
(kicad_sch
  (version 20231120)
  (generator "eeschema")
  (uuid "...")
  (paper "A4")

  ;; Symbols (components)
  (symbol ...)
  (symbol ...)

  ;; Wires (electrical connections)
  (wire ...)
  (wire ...)

  ;; Labels (net names)
  (global_label ...)
  (label ...)

  ;; Sheet instances
  (sheet_instances ...)
)
```

## Wires

Wires create electrical connections between two points. Use wires to connect component pins directly.

### Wire Format

```lisp
(wire
    (pts
        (xy 97.79 146.05) (xy 82.55 146.05)
    )
    (stroke
        (width 0)
        (type default)
    )
    (uuid "047906c0-c725-48f6-bfd2-ae993df4b46b")
)
```

### Wire Properties

| Property       | Description                                              |
| -------------- | -------------------------------------------------------- |
| `pts`          | Two `(xy X Y)` coordinates defining start and end points |
| `stroke.width` | Line width (0 = default width)                           |
| `stroke.type`  | Line type (`default`, `dash`, `dot`, etc.)               |
| `uuid`         | Unique identifier for the wire                           |

### Wire Example

Connect two points at (100, 50) and (150, 50):

```lisp
(wire
    (pts
        (xy 100 50) (xy 150 50)
    )
    (stroke
        (width 0)
        (type default)
    )
    (uuid "a1b2c3d4-e5f6-7890-abcd-ef1234567890")
)
```

## Global Labels

Global labels connect nets by name across the entire schematic. Components with the same label name are electrically connected.

### Global Label Format

```lisp
(global_label "GND rail"
    (shape input)
    (at 78.74 219.71 0)
    (effects
        (font
            (size 1.27 1.27)
        )
        (justify left)
    )
    (uuid "g0000001-0001-0001-0001-000000000001")
    (property "Intersheetrefs" "${INTERSHEET_REFS}"
        (at 78.74 219.71 0)
        (effects
            (font
                (size 1.27 1.27)
            )
            (hide yes)
        )
    )
)
```

### Global Label Properties

| Property                    | Description                                                             |
| --------------------------- | ----------------------------------------------------------------------- |
| Name (first string)         | Net name (e.g., "GND rail", "+12V rail")                                |
| `shape`                     | Label shape: `input`, `output`, `bidirectional`, `tri_state`, `passive` |
| `at`                        | Position `(at X Y rotation)` - rotation in degrees                      |
| `effects.font.size`         | Font size (width height)                                                |
| `effects.justify`           | Text justification (`left`, `right`, `center`)                          |
| `uuid`                      | Unique identifier                                                       |
| `property "Intersheetrefs"` | Inter-sheet reference display                                           |

### Shape Selection Guide

| Shape           | Use Case                          |
| --------------- | --------------------------------- |
| `input`         | Power input pins, signal inputs   |
| `output`        | Power output pins, signal outputs |
| `bidirectional` | I/O pins, data buses              |
| `passive`       | Passive components (R, C, L)      |

## Local Labels

Local labels connect nets within the same sheet only.

### Local Label Format

```lisp
(label "FB"
    (at 150 75 0)
    (effects
        (font
            (size 1.27 1.27)
        )
        (justify left)
    )
    (uuid "l1234567-89ab-cdef-0123-456789abcdef")
)
```

## Power Symbols

Power symbols represent power nets (VCC, GND, etc.) and are special global labels.

### Power Symbol Format

```lisp
(symbol
    (lib_id "power:GND")
    (at 100 150 0)
    (unit 1)
    (exclude_from_sim no)
    (in_bom yes)
    (on_board yes)
    (uuid "p1234567-89ab-cdef-0123-456789abcdef")
    (property "Reference" "#PWR01"
        (at 100 156.21 0)
        (effects
            (font
                (size 1.27 1.27)
            )
            (hide yes)
        )
    )
    (property "Value" "GND"
        (at 100 153.67 0)
        (effects
            (font
                (size 1.27 1.27)
            )
        )
    )
    ;; ... more properties
)
```

## Symbol Positioning

Symbols (components) can be repositioned by modifying their `(at X Y rotation)` property.

### Symbol Format

```lisp
(symbol
    (lib_id "zudo-bus:CC0603KRX7R9BB104")
    (at 100 150 0)          ;; Position: X=100mm, Y=150mm, rotation=0°
    (unit 1)
    (exclude_from_sim no)
    (in_bom yes)
    (on_board yes)
    (dnp no)
    (fields_autoplaced yes) ;; KiCad auto-positions labels
    (uuid "...")
    (property "Reference" "C1"
        (at 100 143.65 0)   ;; Reference label position
        ...
    )
    (property "Value" "..."
        (at 100 146.19 0)   ;; Value label position
        ...
    )
    ;; ... more properties
    (pin "1" (uuid "..."))
    (pin "2" (uuid "..."))
    (instances ...)
)
```

### Symbol Position Properties

| Property            | Description                                             |
| ------------------- | ------------------------------------------------------- |
| `at` (main)         | Symbol center position `(at X Y rotation)`              |
| `rotation`          | 0, 90, 180, or 270 degrees                              |
| `fields_autoplaced` | `yes` = KiCad auto-positions labels relative to symbol  |
| Property `at`       | Each property (Reference, Value, etc.) has own position |

### Rotation Values

| Rotation | Description           | Pin orientation             |
| -------- | --------------------- | --------------------------- |
| 0        | Default orientation   | Horizontal, pins left/right |
| 90       | 90° counter-clockwise | Vertical, pins up/down      |
| 180      | Flipped horizontal    | Horizontal, pins right/left |
| 270      | 90° clockwise         | Vertical, pins down/up      |

### Moving a Symbol

To move a symbol:

1. **Find the symbol** by its Reference or UUID
2. **Update the main `(at X Y rotation)`** line
3. **If `fields_autoplaced` is `yes`**: KiCad will recalculate label positions on load
4. **If `fields_autoplaced` is `no`**: Manually update each property's `(at ...)` position

### Example: Move C1 from (73.66, 219.71) to (100, 150)

Before:

```lisp
(symbol
    (lib_id "zudo-bus:CC0603KRX7R9BB104")
    (at 73.66 219.71 0)
    ...
)
```

After:

```lisp
(symbol
    (lib_id "zudo-bus:CC0603KRX7R9BB104")
    (at 100 150 0)
    ...
)
```

### Batch Repositioning Strategy

For reorganizing an entire schematic:

1. **Extract current positions**: Parse all symbols and their positions
2. **Design new layout**: Create a position map based on circuit blocks
3. **Calculate new positions**: Use grid-aligned coordinates (2.54mm grid recommended)
4. **Update symbols**: Modify `(at X Y rotation)` for each symbol
5. **Reconnect with labels/wires**: Add global labels at new pin positions
6. **Verify in KiCad**: Open schematic and run ERC

### Grid Alignment

KiCad uses 2.54mm (100 mil) grid by default. Recommended positions:

```
Good: (100, 150), (102.54, 152.54), (50.8, 76.2)
Bad:  (100.5, 150.3), (101, 151)
```

Common grid values:

- 2.54mm = 100 mil (standard)
- 1.27mm = 50 mil (fine grid)
- 5.08mm = 200 mil (coarse grid)

## Coordinate System

- Origin (0, 0) is at top-left
- X increases to the right
- Y increases downward
- Units are millimeters (mm)
- ERC reports use mils (1 mil = 0.0254 mm)

### Converting ERC Mils to Schematic mm

```
mm = mils × 0.0254
```

Example: ERC position (3100, 8600) mils = (78.74, 218.44) mm

## Component Pin Positions

To find pin positions from component center:

1. Read the symbol definition from schematic or library
2. Find pin offset from symbol center
3. Calculate: `pin_position = component_center + pin_offset`

### Common Symbol Pin Offsets

**Capacitor (CC0603KRX7R9BB104):**

- Pin 1 (left): center_x - 5.08 mm
- Pin 2 (right): center_x + 5.08 mm

**Resistor (standard 0603/0805):**

- Pin 1 (left): center_x - 3.81 mm
- Pin 2 (right): center_x + 3.81 mm

## UUID Generation

Each element needs a unique UUID. Format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

Generate unique UUIDs for new elements. Common approaches:

- Use standard UUID v4 generation
- Create sequential UUIDs with prefix (e.g., `w0000001-...` for wires)

## Insertion Location

Add new elements before the `(sheet_instances` section at the end of the file:

```lisp
;; ... existing symbols ...

;; Add new wires here
(wire ...)
(wire ...)

;; Add new labels here
(global_label ...)
(global_label ...)

;; Keep this at the end
(sheet_instances
    (path "/" ...)
)
```

## Best Practices

1. **Back up before editing** - Save a copy of the schematic before programmatic edits

2. **Verify in KiCad** - Open the edited schematic in KiCad to verify changes

3. **Run ERC** - Run Electrical Rules Check after edits to verify connections

4. **Use consistent formatting** - Match indentation style of existing file

5. **Generate unique UUIDs** - Duplicate UUIDs cause KiCad errors

6. **Test incrementally** - Make small changes and verify before large batch edits

## Example: Connect Capacitor to Power Rail

Given capacitor C1 at position (100, 200):

```lisp
;; Connect Pin 1 to +12V rail
(global_label "+12V rail"
    (shape input)
    (at 94.92 200 0)
    (effects
        (font
            (size 1.27 1.27)
        )
        (justify left)
    )
    (uuid "c1-p1-label")
    (property "Intersheetrefs" "${INTERSHEET_REFS}"
        (at 94.92 200 0)
        (effects
            (font
                (size 1.27 1.27)
            )
            (hide yes)
        )
    )
)

;; Connect Pin 2 to GND rail
(global_label "GND rail"
    (shape input)
    (at 105.08 200 0)
    (effects
        (font
            (size 1.27 1.27)
        )
        (justify left)
    )
    (uuid "c1-p2-label")
    (property "Intersheetrefs" "${INTERSHEET_REFS}"
        (at 105.08 200 0)
        (effects
            (font
                (size 1.27 1.27)
            )
            (hide yes)
        )
    )
)
```

## Schematic Layout Organization

Organize schematic components into logical blocks for readability.

### Recommended Layout Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SCHEMATIC LAYOUT                             │
│                                                                     │
│  TOP AREA (Y: 0-100mm)                                              │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ PROTECTION CIRCUITS                                         │   │
│  │ - PTC Fuses (F1-F4)                                         │   │
│  │ - TVS Diodes (D1-D3)                                        │   │
│  │ - Reverse Diodes (D6-D9)                                    │   │
│  │ - Input Bulk Caps (C5, C6)                                  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  MIDDLE AREA (Y: 100-200mm)                                         │
│  ┌──────────────────────┐  ┌──────────────────────┐                │
│  │ LDO SECTION          │  │ INPUT CONNECTORS     │                │
│  │ - LDO U1             │  │ - FASTON U12-U15     │                │
│  │ - Caps C1-C4         │  │ - Screw P1, P2       │                │
│  │ - Schottky D4, D5    │  │                      │                │
│  │ - Jumper H1          │  │                      │                │
│  └──────────────────────┘  └──────────────────────┘                │
│                                                                     │
│  BOTTOM AREA (Y: 200-400mm)                                         │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ IDC HEADERS (J1-J8) with decoupling capacitors (C7-C22)     │   │
│  │                                                             │   │
│  │  [J1+C7+C15] [J2+C8+C16] [J3+C9+C17] [J4+C10+C18]          │   │
│  │  [J5+C11+C19] [J6+C12+C20] [J7+C13+C21] [J8+C14+C22]       │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  INDICATORS & TEST POINTS (Right side)                              │
│  ┌────────────────┐                                                │
│  │ LEDs + R1-R3   │                                                │
│  │ Test Points    │                                                │
│  └────────────────┘                                                │
└─────────────────────────────────────────────────────────────────────┘
```

### Signal Flow Direction

Arrange components following signal/power flow:

```
LEFT → RIGHT: Input → Protection → Distribution → Output

TOP → BOTTOM: Power sources → Regulation → Headers
```

### Spacing Guidelines

| Component Type   | Horizontal Spacing | Vertical Spacing |
| ---------------- | ------------------ | ---------------- |
| Small (0603 cap) | 15-20mm            | 10-15mm          |
| Medium (SOT-223) | 25-30mm            | 20-25mm          |
| Large (IDC 16p)  | 40-50mm            | 30-40mm          |
| Block separation | 30-50mm            | 30-50mm          |

### Position Calculation Example

For 8 IDC headers in 2 rows:

```
Base position: (50, 250)
Horizontal spacing: 45mm
Vertical spacing: 35mm

J1: (50, 250)     J2: (95, 250)    J3: (140, 250)   J4: (185, 250)
J5: (50, 285)     J6: (95, 285)    J7: (140, 285)   J8: (185, 285)
```

## References

- [KiCad File Formats Documentation](https://dev-docs.kicad.org/en/file-formats/)
- [KiCad S-Expression Specification](https://dev-docs.kicad.org/en/file-formats/sexpr-intro/)
