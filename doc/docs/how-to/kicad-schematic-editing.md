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
5. **Update all connected labels**: Move labels to new pin positions
6. **Verify in KiCad**: Open schematic and run ERC

**IMPORTANT: Labels must move with components**

Global labels connect to pins by **position**, not just by name. When moving a component:

- All labels connected to its pins must also move
- Calculate new pin positions: `new_pin = new_component_center + pin_offset`
- Pin offsets depend on symbol definition and rotation

**Recommendation**: For major layout reorganization, use KiCad's schematic editor directly. Manual drag-and-drop keeps connections intact. Programmatic repositioning is best for:

- Adding new components at specific positions
- Fine-tuning individual component positions
- Generating new schematics from scratch

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

7. **Always use wires between pins and labels** - Never place labels directly on pins

### Wire Between Pin and Label Rule

**IMPORTANT**: Always add a short wire between component pins and labels.

**Wrong** - Label directly on pin:

```
[Pin]←Label    (label at exact pin position)
```

**Correct** - Wire connects pin to label:

```
[Pin]───────[Label]    (wire between pin and label)
```

Benefits:

- **Readable**: Clear visual connection between pin and net
- **Movable**: Components can be repositioned without breaking connections
- **Standard**: Follows conventional schematic design practice

Example wire + label for a capacitor pin:

```lisp
;; Wire from pin to label position (5mm offset)
(wire
    (pts
        (xy 94.92 200) (xy 89.84 200)  ;; 5.08mm wire
    )
    (stroke (width 0) (type default))
    (uuid "w1234567-...")
)
;; Label at end of wire
(global_label "+12V rail"
    (shape input)
    (at 89.84 200 180)  ;; At wire endpoint, pointing left
    ...
)
```

## Example: Connect Capacitor to Power Rail

Given capacitor C1 at position (100, 200) with pins at X ± 5.08mm:

- Pin 1 (left): (94.92, 200)
- Pin 2 (right): (105.08, 200)

```lisp
;; Wire from Pin 1 to label position (5mm left of pin)
(wire
    (pts
        (xy 94.92 200) (xy 89.84 200)
    )
    (stroke (width 0) (type default))
    (uuid "c1-p1-wire")
)

;; Label at end of wire, pointing left (180°)
(global_label "+12V rail"
    (shape input)
    (at 89.84 200 180)
    (effects
        (font
            (size 1.27 1.27)
        )
        (justify right)
    )
    (uuid "c1-p1-label")
    (property "Intersheetrefs" "${INTERSHEET_REFS}"
        (at 89.84 200 180)
        (effects
            (font
                (size 1.27 1.27)
            )
            (hide yes)
        )
    )
)

;; Wire from Pin 2 to label position (5mm right of pin)
(wire
    (pts
        (xy 105.08 200) (xy 110.16 200)
    )
    (stroke (width 0) (type default))
    (uuid "c1-p2-wire")
)

;; Label at end of wire, pointing right (0°)
(global_label "GND rail"
    (shape input)
    (at 110.16 200 0)
    (effects
        (font
            (size 1.27 1.27)
        )
        (justify left)
    )
    (uuid "c1-p2-label")
    (property "Intersheetrefs" "${INTERSHEET_REFS}"
        (at 110.16 200 0)
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

## Wiring Best Practices - Label Direction Rules

### Core Principle: Labels Point OUTWARD

For readable schematics, labels should extend **outward** from components, not overlap with them.

### Label Rotation Values

| Rotation | Direction    | Arrow Points |
| -------- | ------------ | ------------ |
| 0        | Points RIGHT | →            |
| 180      | Points LEFT  | ←            |
| 90       | Points UP    | ↑            |
| 270      | Points DOWN  | ↓            |

### Component Type Wiring Patterns

#### 1. Two-Pin Horizontal Components (LEDs, Resistors, Diodes, PTC Fuses)

Both pins on same Y axis - labels extend outward from both sides:

```
[← Left Label]───[Pin1]═══[Component]═══[Pin2]───[Right Label →]
```

| Pin           | Label Direction | Rotation |
| ------------- | --------------- | -------- |
| Pin 1 (left)  | Points LEFT     | 180      |
| Pin 2 (right) | Points RIGHT    | 0        |

**Example - LED (LED1):**

```
[LED1_R1 ←]───[Pin1]═══[LED1]═══[Pin2]───[→ GND rail]
```

**Example - PTC Fuse (F3):**

```
[+5V in ←]───[Pin1]═══[F3]═══[Pin2]───[→ +5V rail]
```

#### 2. Single-Pin Connectors (FASTON Terminals)

FASTON 1217754-1 is a quick-connect terminal. Label points toward the input side:

```
[← Input Label]───[Pin]═══[FASTON]
```

| Pin   | Label Direction | Rotation |
| ----- | --------------- | -------- |
| Pin 1 | Points LEFT     | 180      |

**Example - FASTON U12 (+12V input):**

```
[+12V in ←]───[Pin1]═══[U12]
```

**Note:** If FASTON has 2 pins (input/output), apply the 2-pin horizontal pattern.

#### 3. Two-Pin Connectors (FASTON with 2 pins)

If the FASTON or similar connector has both input and output pins:

```
[← Input Label]───[Pin1]═══[FASTON]═══[Pin2]───[Output Label →]
```

**Example - 2-pin FASTON for power distribution:**

```
[+12V in ←]───[Pin1]═══[U12]═══[Pin2]───[→ +12V rail]
```

#### 4. Multi-Pin Headers with Pins on One Side (H1, IDC Headers)

Headers with all pins on one side - all labels point away from component body:

```
                    ┌─────────────┐
[← LDO out]─────────┤ Pin 1       │
[← +5V rail]────────┤ Pin 2   H1  │
[← +5V in]──────────┤ Pin 3       │
                    └─────────────┘
```

| Pin Side | Label Direction | Rotation |
| -------- | --------------- | -------- |
| Left     | Points LEFT     | 180      |
| Right    | Points RIGHT    | 0        |

#### 5. Two-Pin Screw Terminals (P1, P2 - Vertical Wiring Pattern)

For 2-pin screw terminals with vertical wire routing, use this pattern:

```
           [Terminal]
             ┌────┐
             │1  2│
             └─┬──┘
               │
               │ ← Vertical wires go DOWN
               │
[← Left Label]─┴─[Right Label →]
```

| Pin           | Label Direction | Rotation |
| ------------- | --------------- | -------- |
| Pin 1 (left)  | Points LEFT     | 180      |
| Pin 2 (right) | Points RIGHT    | 0        |

**Example - P2 (-12V and GND screw terminal):**

```
             P2
           ┌────┐
           │1  2│
           └─┬──┘
             │
[← -12V in]──┴──[GND in →]
```

**Example - P1 (+12V and GND screw terminal):**

```
             P1
           ┌────┐
           │1  2│
           └─┬──┘
             │
[← +12V in]──┴──[GND in →]
```

**Key Points:**

- Both labels at the SAME Y level (below the terminal)
- Vertical wires from pins meet a horizontal bus
- Left label extends LEFT with rotation 180
- Right label extends RIGHT with rotation 0

#### 6. IDC Headers (16-pin Eurorack)

IDC headers have pins on both left and right sides:

```
                ┌─────────────────┐
[← -12V rail]───┤ Pin 1    Pin 9  ├───[→ -12V rail]
[← GND rail]────┤ Pin 2    Pin 10 ├───[→ GND rail]
[← GND rail]────┤ Pin 3    Pin 11 ├───[→ GND rail]
[← GND rail]────┤ Pin 4    Pin 12 ├───[→ GND rail]
[← +12V rail]───┤ Pin 5    Pin 13 ├───[→ +12V rail]
[← +5V rail]────┤ Pin 6    Pin 14 ├───[→ +5V rail]
[← CV rail]─────┤ Pin 7    Pin 15 ├───[→ CV rail]
[← GATE rail]───┤ Pin 8    Pin 16 ├───[→ GATE rail]
                └─────────────────┘
```

### Wire Length Standard

Use consistent wire length for visual clarity:

| Wire Type         | Length      | Purpose             |
| ----------------- | ----------- | ------------------- |
| Pin to Label      | 5.08mm      | Standard connection |
| Component spacing | 2.54mm grid | Alignment           |

### Label Position Calculation

For a component at position (X, Y):

**Left pin label (pointing left):**

```
pin_x = component_x - 5.08    (pin offset from center)
label_x = pin_x - 5.08        (5.08mm wire length)
wire: (pin_x, Y) → (label_x, Y)
label: (label_x, Y) rotation=180
```

**Right pin label (pointing right):**

```
pin_x = component_x + 5.08    (pin offset from center)
label_x = pin_x + 5.08        (5.08mm wire length)
wire: (pin_x, Y) → (label_x, Y)
label: (label_x, Y) rotation=0
```

### Common Mistakes to Avoid

#### 1. Labels Overlapping Components

**Wrong:**

```
[Label]═══[Component]═══[Label]
   ↑ Label at component position
```

**Correct:**

```
[Label]───[Pin]═══[Component]═══[Pin]───[Label]
             ↑ Wire separates label from component
```

#### 2. Adjacent Labels Same Direction

When multiple components are close together horizontally:

**Wrong:**

```
[A→]═[Comp1]═[B→]═[Comp2]═[C→]
       Labels B and C overlap!
```

**Correct:**

```
[←A]═[Comp1]═[B→]  [←C]═[Comp2]═[D→]
       Adequate spacing between components
```

#### 3. Duplicate Labels

Don't create duplicate labels when fixing orientation:

- **Replace** the existing label, don't add a new one
- Check label count before and after edits

### Fixing Overlapping Labels Checklist

1. **Identify the component type** (2-pin horizontal, FASTON, header, etc.)
2. **Determine correct label directions** based on pin positions
3. **Check for duplicates** - should only have ONE label per connection point
4. **Verify wire connections** - each label needs a wire to its pin
5. **Test in KiCad** - run ERC to verify electrical connections

### Quick Reference Table

| Component            | Left Pin | Right Pin | Notes              |
| -------------------- | -------- | --------- | ------------------ |
| LED, Resistor, Diode | ← (180)  | → (0)     | 2-pin horizontal   |
| PTC Fuse             | ← (180)  | → (0)     | 2-pin horizontal   |
| TVS Diode            | ← (180)  | → (0)     | 2-pin horizontal   |
| FASTON (1-pin)       | ← (180)  | N/A       | Single connection  |
| FASTON (2-pin)       | ← (180)  | → (0)     | Input/output       |
| Header (pins left)   | ← (180)  | N/A       | All pins same side |
| Header (pins right)  | N/A      | → (0)     | All pins same side |
| IDC Header           | ← (180)  | → (0)     | Pins both sides    |

## Flipping Label Direction (File Format)

When you need to change a label's pointing direction without moving its position, you must change THREE properties together:

### Label Direction Formula

| Visual Direction | rotation | justify | Intersheetrefs Position   |
| ---------------- | -------- | ------- | ------------------------- |
| Points LEFT ←    | 0        | left    | +5.08 (to RIGHT of label) |
| Points RIGHT →   | 180      | right   | -5.08 (to LEFT of label)  |

### Example: Flip Label from LEFT to RIGHT

**Before (pointing LEFT):**

```lisp
(global_label "+12V in"
    (shape input)
    (at 71.12 57.15 0)           ;; rotation 0
    (effects
        (font (size 1.27 1.27))
        (justify left)            ;; justify left
    )
    (uuid "...")
    (property "Intersheetrefs" "${INTERSHEET_REFS}"
        (at 76.2 57.15 0)         ;; 71.12 + 5.08 = to the RIGHT
        ...
    )
)
```

**After (pointing RIGHT):**

```lisp
(global_label "+12V in"
    (shape input)
    (at 71.12 57.15 180)         ;; rotation 180
    (effects
        (font (size 1.27 1.27))
        (justify right)           ;; justify right
    )
    (uuid "...")
    (property "Intersheetrefs" "${INTERSHEET_REFS}"
        (at 66.04 57.15 0)        ;; 71.12 - 5.08 = to the LEFT
        ...
    )
)
```

### Key Points

1. **All three changes are required** - changing only rotation or justify alone won't work correctly
2. **Intersheetrefs offset is always ±5.08mm** from the label position
3. **The label position (at X Y) stays the same** - only the direction flips
4. **Note the Intersheetrefs rotation stays 0** - only its position changes

### Quick Reference for Flipping

To flip **LEFT → RIGHT**:

- rotation: `0` → `180`
- justify: `left` → `right`
- Intersheetrefs X: `label_x + 5.08` → `label_x - 5.08`

To flip **RIGHT → LEFT**:

- rotation: `180` → `0`
- justify: `right` → `left`
- Intersheetrefs X: `label_x - 5.08` → `label_x + 5.08`

## References

- [KiCad File Formats Documentation](https://dev-docs.kicad.org/en/file-formats/)
- [KiCad S-Expression Specification](https://dev-docs.kicad.org/en/file-formats/sexpr-intro/)
