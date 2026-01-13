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

## References

- [KiCad File Formats Documentation](https://dev-docs.kicad.org/en/file-formats/)
- [KiCad S-Expression Specification](https://dev-docs.kicad.org/en/file-formats/sexpr-intro/)
