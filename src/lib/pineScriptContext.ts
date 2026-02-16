// Auto-generated from api/data/pine_script_context.txt
export const PINE_SCRIPT_CONTEXT = `# Complete Pine Script v6 Rules & Laws for Error-Free Code Generation

## VERSION & DECLARATION RULES

### 1. Version Declaration (MANDATORY)
- **ALWAYS start scripts with**: \`//@version=6\`
- Must be on the first line (or after license comments)
- Version number must be \`6\` (not 5, 4, 3, 2, or 1)
- If omitted, defaults to v1 (causes errors with v6 syntax)

### 2. Declaration Statement (MANDATORY)
**Every script MUST include ONE declaration statement:**
- \`indicator()\` - for indicators
- \`strategy()\` - for strategies  
- \`library()\` - for libraries

**Must come IMMEDIATELY after version declaration**

**Examples:**
\`\`\`pinescript
//@version=6
indicator("My Indicator", overlay=true)
\`\`\`

\`\`\`pinescript
//@version=6
strategy("My Strategy", overlay=true, margin_long=100, margin_short=100)
\`\`\`

---

## TYPE SYSTEM RULES

### 3. Fundamental Types
**Available types:**
- \`int\` - integer values
- \`float\` - floating-point decimals
- \`bool\` - true/false (NEVER na in v6)
- \`string\` - text values
- \`color\` - color values

### 4. Special Types
- \`line\`, \`linefill\`, \`label\`, \`box\`, \`polyline\`, \`table\`, \`chart.point\`
- \`array<type>\` - collections of same type
- \`matrix<type>\` - 2D collections
- \`map<keyType, valueType>\` - key-value pairs
- User-defined types (UDTs)
- \`enum\` types
- \`void\` - functions that return nothing

### 5. Type Casting Rules (CRITICAL - v6 BREAKING CHANGE)
**INT/FLOAT to BOOL - NO LONGER AUTOMATIC:**
- In v6: \`int\` and \`float\` values are NOT automatically cast to \`bool\`
- **MUST use \`bool()\` function explicitly:**

\`\`\`pinescript
// WRONG (v6 will error):
if bar_index
    // error

// CORRECT (v6):
if bool(bar_index)
    // works
\`\`\`

**Cast na to 0 explicitly:**
\`\`\`pinescript
// WRONG:
if someValue  // error if someValue can be na

// CORRECT:
if bool(nz(someValue, 0))
\`\`\`

### 6. Boolean Rules (CRITICAL - v6 CHANGE)
- Boolean values are ONLY \`true\` or \`false\`
- **Booleans can NEVER be \`na\` in v6**
- \`na()\`, \`nz()\`, \`fixnan()\` do NOT accept \`bool\` arguments in v6
- Use explicit comparisons: \`if myBool == true\` or \`if myBool\`

### 7. Type Qualifiers
**Forms (when value is known):**
- \`const\` - compile-time constants
- \`input\` - user inputs (Settings/Inputs tab)
- \`simple\` - known at bar zero
- \`series\` - can change on any bar

**Format:** \`<form> <type> variableName\`
\`\`\`pinescript
simple int x = 5
series float y = close
\`\`\`

---

## VARIABLE DECLARATION RULES

### 8. Declaration Syntax
\`\`\`pinescript
[<declaration_mode>] [<type>] <identifier> = <expression>
\`\`\`

**Components:**
- \`<declaration_mode>\`: optional - \`var\`, \`varip\`, or omit
- \`<type>\`: optional but recommended
- \`<identifier>\`: variable name
- \`=\` for declaration (NOT \`:=\`)

### 9. Declaration Modes (CRITICAL)

**No keyword (series - default):**
- Variable recalculates on EVERY bar
- Values reset each bar
\`\`\`pinescript
x = close  // recalculates every bar
\`\`\`

**var:**
- Initialized ONCE on first bar
- Persists across bars unless reassigned
- Used for counters, accumulators
\`\`\`pinescript
var int counter = 0
counter := counter + 1
\`\`\`

**varip (intrabar persist):**
- Like \`var\` but persists within same bar across realtime ticks
- ONLY for realtime bar tracking
- Critical for tick-based strategies
\`\`\`pinescript
varip float tickPrice = 0.0
tickPrice := close
\`\`\`

### 10. Variable Reassignment
- Use \`:=\` operator (NOT \`=\`)
- Variable must already be declared
\`\`\`pinescript
x = 5      // declaration
x := 10    // reassignment
\`\`\`

### 11. Tuple Declarations
Multiple variables from functions returning multiple values:
\`\`\`pinescript
[ma, upper, lower] = ta.bb(close, 20, 2)
\`\`\`

### 12. Type Specification Requirements
**MUST specify type when:**
- Initial value is \`na\`
- Ambiguous initialization
- For clarity and editor hints

\`\`\`pinescript
// WRONG:
x = na  // compile error

// CORRECT:
float x = na
int x = na
\`\`\`

---

## OPERATOR RULES

### 13. Arithmetic Operators
- \`+\` addition
- \`-\` subtraction
- \`*\` multiplication
- \`/\` division (returns float in v6 for const int division)
- \`%\` modulo

### 14. Comparison Operators
- \`==\` equal
- \`!=\` not equal
- \`>\` greater than
- \`>=\` greater than or equal
- \`<\` less than
- \`<=\` less than or equal

### 15. Logical Operators (v6 CHANGE)
**Short-circuit (lazy) evaluation in v6:**
- \`and\` - stops if first operand is false
- \`or\` - stops if first operand is true
- \`not\` - negation

\`\`\`pinescript
// v6 optimization - second check skipped if array empty:
if array.size(arr) > 0 and array.get(arr, 0) > 10
\`\`\`

### 16. Ternary Operator
\`\`\`pinescript
result = condition ? valueIfTrue : valueIfFalse
\`\`\`

### 17. Assignment Operators
- \`=\` declaration
- \`:=\` reassignment
- **NEVER confuse these two**

### 18. History-Referencing Operator
\`\`\`pinescript
close[1]  // previous bar's close
close[10] // 10 bars ago
\`\`\`

**v6 Restrictions:**
- Cannot reference history of literal values directly
- Cannot reference UDT fields directly with \`[]\`

\`\`\`pinescript
// WRONG:
x = 5[1]

// CORRECT:
myVar = 5
x = myVar[1]
\`\`\`

### 19. Negative Array Indices (NEW in v6)
\`\`\`pinescript
array.get(myArray, -1)   // last element
array.get(myArray, -2)   // second-to-last
\`\`\`

---

## CONTROL STRUCTURE RULES

### 20. if Structure Syntax

**For side effects (no return value):**
\`\`\`pinescript
if condition
    statement1
    statement2
else if condition2
    statement3
else
    statement4
\`\`\`

**For returning values:**
\`\`\`pinescript
result = if condition
    value1
else if condition2
    value2
else
    value3
\`\`\`

### 21. if Structure Rules
- Local blocks MUST be indented by 4 spaces or 1 tab
- Can return values (including tuples)
- Returns \`na\` if no block executes (or \`false\` for bool types)
- Can be nested

### 22. switch Structure (NEW in v5+)
\`\`\`pinescript
result = switch expression
    value1 => result1
    value2 => result2
    => defaultResult
\`\`\`

### 23. LOCAL SCOPE RESTRICTIONS (CRITICAL - PREVENTS COMPILATION)

**COMPLETE LIST - THESE FUNCTIONS CANNOT BE CALLED IN LOCAL SCOPE:**

**Visual/Plotting Functions (CANNOT be in if/for/while/function blocks):**
- \`plot()\` - line plots
- \`plotshape()\` - shape markers
- \`plotchar()\` - character markers
- \`plotarrow()\` - arrows above/below bars
- \`plotcandle()\` - candlestick plots
- \`plotbar()\` - bar plots
- \`hline()\` - horizontal lines
- \`fill()\` - fills between plots/hlines
- \`barcolor()\` - bar coloring
- \`bgcolor()\` - background coloring

**Declaration Functions (MUST be in global scope ONLY):**
- \`indicator()\` - script declaration
- \`strategy()\` - strategy declaration
- \`library()\` - library declaration

**Alert Functions:**
- \`alertcondition()\` - CANNOT be in local scope (but can be used conditionally via its condition parameter)

**Strategy Risk Management Functions (CANNOT be in local scope):**
- Strategy entry/exit functions when used with certain parameters
- Risk management rule functions

---

### 23a. UNDERSTANDING LOCAL vs GLOBAL SCOPE

**GLOBAL SCOPE:**
- All code at indentation level 0 (no indentation)
- Where script starts (after \`//@version=6\` and declaration)
- ALL plotting and visual functions MUST be here

**LOCAL SCOPE:**
- Code inside functions (indented by 4 spaces or 1 tab)
- Code inside \`if\`/\`else\` blocks (indented)
- Code inside \`switch\` blocks (indented)
- Code inside \`for\`/\`while\` loops (indented)
- ANY indented code block

---

### 23b. SOLUTIONS FOR CONDITIONAL PLOTTING

**Solution 1: Conditional Values (MOST COMMON)**
\`\`\`pinescript
// WRONG - ERROR: Cannot use 'plot' in local scope:
if close > open
    plot(close, color=color.green)

// CORRECT - Use ternary operator:
plotColor = close > open ? color.green : color.red
plot(close, color=plotColor)

// CORRECT - Use na to hide plot:
plotValue = close > open ? close : na
plot(plotValue, color=color.green)
\`\`\`

**Solution 2: Conditional Colors for Visual Functions**
\`\`\`pinescript
// WRONG:
if rsi > 70
    plotshape(series=high, style=shape.triangledown, color=color.red)

// CORRECT:
shouldPlot = rsi > 70
plotshape(shouldPlot ? high : na, style=shape.triangledown, color=color.red)
\`\`\`

**Solution 3: For barcolor() and bgcolor()**
\`\`\`pinescript
// WRONG:
if close > open
    barcolor(color.green)
else
    barcolor(color.red)

// CORRECT:
barcolor(close > open ? color.green : color.red)

// CORRECT - use na to hide:
bgcolor(condition ? color.new(color.blue, 90) : na)
\`\`\`

**Solution 4: For alertcondition() - Use condition parameter**
\`\`\`pinescript
// WRONG:
if close > open
    alertcondition(true, "Alert", "Price is up")

// CORRECT - alertcondition cannot be in local scope
// But you can make it conditional via its condition parameter:
bullishCondition = close > open
alertcondition(bullishCondition, "Bullish Alert", "Price closed higher")
\`\`\`

**Solution 5: For hline() - Use plot() instead**
\`\`\`pinescript
// WRONG - hline cannot be conditional at all:
if condition
    hline(50)

// CORRECT - use plot() for conditional horizontal lines:
plot(condition ? 50 : na, color=color.blue, linewidth=2, style=plot.style_line)
\`\`\`

**Solution 6: For fill() - Use conditional color**
\`\`\`pinescript
// WRONG:
if condition
    fill(plot1, plot2, color=color.blue)

// CORRECT:
p1 = plot(high)
p2 = plot(low)
fillColor = condition ? color.new(color.blue, 80) : na
fill(p1, p2, color=fillColor)
\`\`\`

---

### 23c. ERROR MESSAGE REFERENCE

**When you see these errors, the function is in local scope:**

| Error Message | Function | Solution |
|--------------|----------|----------|
| \`Cannot use 'plot' in local scope\` | \`plot()\` | Move to global scope, use conditional values |
| \`Cannot use 'plotshape' in local scope\` | \`plotshape()\` | Move to global scope, use conditional values |
| \`Cannot use 'plotchar' in local scope\` | \`plotchar()\` | Move to global scope, use conditional values |
| \`Cannot use 'plotarrow' in local scope\` | \`plotarrow()\` | Move to global scope, use conditional values |
| \`Cannot use 'plotcandle' in local scope\` | \`plotcandle()\` | Move to global scope, use conditional values |
| \`Cannot use 'plotbar' in local scope\` | \`plotbar()\` | Move to global scope, use conditional values |
| \`Cannot use 'hline' in local scope\` | \`hline()\` | Move to global scope, or use \`plot()\` instead |
| \`Cannot use 'fill' in local scope\` | \`fill()\` | Move to global scope, use conditional color |
| \`Cannot use 'barcolor' in local scope\` | \`barcolor()\` | Move to global scope, use conditional color |
| \`Cannot use 'bgcolor' in local scope\` | \`bgcolor()\` | Move to global scope, use conditional color |
| \`Cannot use 'alertcondition' in local scope\` | \`alertcondition()\` | Move to global scope, make condition parameter conditional |

---

### 23d. CRITICAL RULE SUMMARY
**"CALCULATE ANYWHERE, PLOT IN GLOBAL SCOPE"**

\`\`\`pinescript
//@version=6
indicator("Correct Pattern")

// ✅ CORRECT - Calculations can be in local scope:
var totalBars = 0
bullishCount = 0

if close > open
    totalBars := totalBars + 1  // OK in local scope
    bullishCount := bullishCount + 1  // OK in local scope

// ✅ CORRECT - ALL plotting in global scope:
plot(close, color = close > open ? color.green : color.red)
plotshape(close > open, style=shape.circle, color=color.green)
barcolor(close > open ? color.green : color.red)
bgcolor(close > open ? color.new(color.green, 90) : na)
\`\`\`

---

## LOOP RULES

### 24. for Loop (v6 SYNTAX - BREAKING CHANGE)
**Old syntax (REMOVED in v6):**
\`\`\`pinescript
// WRONG - v4/v5 syntax no longer works:
for i = 0 to 10
for i = 0 until 10
\`\`\`

**Correct v6 syntax:**
\`\`\`pinescript
// Correct v6:
for i in range(0, 11)  // 0 to 10 inclusive
    statement
\`\`\`

**With step:**
\`\`\`pinescript
for i in range(0, 11, 2)  // 0, 2, 4, 6, 8, 10
\`\`\`

### 25. for Loop Dynamic Boundaries (NEW in v6)
- Boundary expressions evaluated BEFORE each iteration
- Allows dynamic loop counts
\`\`\`pinescript
for i in range(0, array.size(arr))
    // array.size() evaluated each iteration
\`\`\`

**Important:** If you need static boundary, store it first:
\`\`\`pinescript
endValue = array.size(arr)
for i in range(0, endValue)
    // endValue fixed
\`\`\`

### 26. for...in Loop (Collection Iteration)
**Array iteration:**
\`\`\`pinescript
// Simple form:
for element in myArray
    // use element

// With index:
for [index, element] in myArray
    // use both index and element
\`\`\`

**Matrix iteration:**
\`\`\`pinescript
for row in myMatrix
    // row is an array
    for element in row
        // process element
\`\`\`

**Map iteration:**
\`\`\`pinescript
for [key, value] in myMap
    // process key-value pair
\`\`\`

### 27. while Loop
\`\`\`pinescript
int i = 0
while i < 10
    // statements
    i := i + 1
\`\`\`

### 28. break and continue
- \`break\` - exit loop immediately
- \`continue\` - skip to next iteration

---

## FUNCTION RULES

### 29. Built-in Functions
- Reference Pine Script v6 Reference Manual for all built-ins
- All functions documented with parameter types and return types
- Namespace prefixes: \`ta.*\`, \`math.*\`, \`str.*\`, \`array.*\`, etc.

### 30. User-Defined Function Syntax
**Single-line:**
\`\`\`pinescript
functionName(param1, param2) => expression
\`\`\`

**Multi-line:**
\`\`\`pinescript
functionName(param1, param2) =>
    statement1
    statement2
    returnValue
\`\`\`

### 31. Function Declaration Rules
- MUST be declared in global scope (no nested functions)
- Can have default parameter values: \`f(x = 10) => x\`
- Return value is last expression/statement
- Can return tuples: \`[value1, value2]\`
- Use \`export\` keyword for library functions

### 32. Function Parameter Rules
- Specify type and form in signature:
\`\`\`pinescript
myFunc(simple int x, series float y) => x + y
\`\`\`
- Parameters with defaults are optional:
\`\`\`pinescript
myFunc(int x = 5) => x * 2
\`\`\`

### 33. Function Call Rules
- Positional arguments: \`myFunc(10, 20)\`
- Keyword arguments: \`myFunc(x=10, y=20)\`
- Can mix, but positional must come first
- Cannot use same parameter twice

---

## METHOD RULES (NEW in v5+)

### 34. Method Syntax
\`\`\`pinescript
method methodName(objectType this, param1, param2) => expression
\`\`\`

### 35. Method Call Syntax (Dot Notation)
\`\`\`pinescript
myArray.methodName(param1, param2)
\`\`\`

### 36. Built-in Methods Available For:
- \`array<type>\`
- \`matrix<type>\`
- \`map<keyType, valueType>\`
- \`line\`, \`linefill\`, \`label\`, \`box\`, \`table\`

---

## ARRAY RULES

### 37. Array Declaration
\`\`\`pinescript
// Create empty array:
myArray = array.new<int>()

// Create with size:
myArray = array.new<float>(10)

// Create with size and initial value:
myArray = array.new<int>(5, 0)

// From values:
myArray = array.from(1, 2, 3, 4, 5)
\`\`\`

**Legacy format (deprecated, avoid):**
\`\`\`pinescript
int[] myArray = array.new_int()  // old style, use array.new<int>()
\`\`\`

### 38. Array Element Access
**CRITICAL - No indexing operator:**

\`\`\`pinescript
// WRONG:
value = myArray[0]  // syntax error

// CORRECT:
value = array.get(myArray, 0)
\`\`\`

**Setting values:**
\`\`\`pinescript
array.set(myArray, 0, newValue)
\`\`\`

**Direct indexing (NEW method syntax):**
\`\`\`pinescript
value = myArray.get(0)
myArray.set(0, newValue)
\`\`\`

### 39. Array Index Rules
- Indices start at 0
- Last valid index: \`array.size(arr) - 1\`
- Negative indices work in v6: \`-1\` = last element
- Out-of-bounds access causes runtime error

### 40. Array Size Limits
- Maximum 100,000 elements total across all arrays
- Use \`array.size(arr)\` to get size
- Size can change dynamically

### 41. Array Operations
**Add/Remove elements:**
\`\`\`pinescript
array.push(arr, value)      // add to end
array.unshift(arr, value)   // add to beginning
array.pop(arr)              // remove from end
array.shift(arr)            // remove from beginning
array.insert(arr, index, value)
array.remove(arr, index)
array.clear(arr)            // remove all
\`\`\`

**Other operations:**
\`\`\`pinescript
array.concat(arr1, arr2)    // merge arrays
array.copy(arr)             // duplicate
array.slice(arr, start, end)
array.reverse(arr)
array.sort(arr)
array.includes(arr, value)
array.indexof(arr, value)
\`\`\`

### 42. Array Mathematical Functions
Special functions for array math:
\`\`\`pinescript
array.sum(arr)
array.avg(arr)
array.min(arr)
array.max(arr)
array.stdev(arr)
array.variance(arr)
array.median(arr)
array.mode(arr)
\`\`\`

**Important:** These return \`na\` only if:
- All elements are \`na\`
- Array is empty
- Special case (e.g., \`array.mode()\` finds no mode)

### 43. Array History Referencing
\`\`\`pinescript
// Reference previous state of array:
previousArray = myArray[1]
\`\`\`

---

## MATRIX RULES

### 44. Matrix Declaration
\`\`\`pinescript
myMatrix = matrix.new<float>(rows, columns, initialValue)
myMatrix = matrix.new<int>()  // empty matrix
\`\`\`

### 45. Matrix Element Access
\`\`\`pinescript
value = matrix.get(m, row, col)
matrix.set(m, row, col, value)
\`\`\`

### 46. Matrix Properties
\`\`\`pinescript
rows = matrix.rows(m)
cols = matrix.columns(m)
\`\`\`

---

## MAP RULES

### 47. Map Declaration
\`\`\`pinescript
myMap = map.new<string, float>()
\`\`\`

### 48. Map Operations
\`\`\`pinescript
map.put(m, key, value)
value = map.get(m, key)
map.remove(m, key)
map.clear(m)
map.contains(m, key)
size = map.size(m)
\`\`\`

### 49. Map Key-Value Rules
- Keys must be of single type (int, float, string)
- Values must be of single type
- Keys must be unique

---

## USER-DEFINED TYPE (UDT) RULES

### 50. UDT Declaration (NEW in v5+)
\`\`\`pinescript
type MyType
    float field1
    int field2
    string field3
\`\`\`

### 51. UDT Instantiation
\`\`\`pinescript
myObject = MyType.new(1.5, 10, "text")

// With named fields:
myObject = MyType.new(field1=1.5, field2=10, field3="text")
\`\`\`

### 52. UDT Field Access
\`\`\`pinescript
value = myObject.field1
myObject.field1 := newValue
\`\`\`

### 53. UDT with Methods
\`\`\`pinescript
type MyType
    float value

method double(MyType this) =>
    this.value * 2

obj = MyType.new(5.0)
result = obj.double()  // returns 10.0
\`\`\`

---

## ENUM RULES (NEW in v5+)

### 54. Enum Declaration
\`\`\`pinescript
enum Direction
    UP
    DOWN
    LEFT
    RIGHT
\`\`\`

### 55. Enum Usage
\`\`\`pinescript
myDirection = Direction.UP

if myDirection == Direction.UP
    // do something
\`\`\`

---

## SCOPE RULES

### 56. Global Scope
- Statements at line position 0
- Contains declarations, variable assignments, function definitions
- No indentation

### 57. Local Scope
- Inside functions, if/switch blocks, loops
- MUST be indented (4 spaces or 1 tab)
- Cannot declare functions inside local scope

### 58. Scope Count Limit
**REMOVED in v6** - No longer limited to 550 scopes

---

## STRING RULES

### 59. String Operations
\`\`\`pinescript
str.length(s)
str.upper(s)
str.lower(s)
str.contains(s, substring)
str.pos(s, substring)
str.substring(s, start, end)
str.replace(s, target, replacement)
str.split(s, separator)
str.tonumber(s)
str.tostring(value)
str.format(formatString, args...)
\`\`\`

### 60. String Concatenation
\`\`\`pinescript
result = str1 + str2
\`\`\`

### 61. String Formatting
\`\`\`pinescript
formatted = str.format("{0} {1}", value1, value2)
formatted = str.format("Price: {0, number, #.##}", close)
\`\`\`

---

## PLOT RULES

### 62. plot() Function
\`\`\`pinescript
plot(series, title, color, linewidth, style, trackprice, histbase, offset, join, editable, show_last, display)
\`\`\`

**Rules:**
- Cannot be called in local blocks
- Use conditional colors: \`color = condition ? color.green : color.red\`
- \`offset\` parameter: only accepts "simple" values in v6 (not "series")

### 63. Plot Styles
\`\`\`pinescript
plot.style_line
plot.style_stepline
plot.style_histogram
plot.style_cross
plot.style_area
plot.style_columns
plot.style_circles
plot.style_linebr
plot.style_steplinebr
\`\`\`

### 64. Other Plot Functions
\`\`\`pinescript
plotshape()
plotchar()
plotarrow()
plotcandle()
plotbar()
hline()
\`\`\`

**All have same restriction:** Cannot be called in local blocks

### 65. fill() Function
\`\`\`pinescript
fill(plot1, plot2, color, title, editable, show_last, fillgaps)
\`\`\`

### 66. bgcolor() Function
\`\`\`pinescript
bgcolor(color, offset, editable, show_last, title, display, overlay)
\`\`\`

### 67. barcolor() Function
\`\`\`pinescript
barcolor(color, offset, editable, show_last, title, display)
\`\`\`

---

## COLOR RULES

### 68. Color Constants
\`\`\`pinescript
color.red, color.green, color.blue, color.yellow
color.orange, color.purple, color.gray, color.white
color.black, color.aqua, color.fuchsia, color.lime
color.maroon, color.navy, color.olive, color.silver, color.teal
\`\`\`

### 69. color.new() Function
\`\`\`pinescript
myColor = color.new(color.red, 50)  // 50% transparency (0-100)
\`\`\`

### 70. color.rgb() Function
\`\`\`pinescript
myColor = color.rgb(255, 0, 0, 50)  // R, G, B, transp
\`\`\`

### 71. Transparency Parameter Removal (v6 CHANGE)
**transp parameter REMOVED from all functions in v6**

\`\`\`pinescript
// WRONG (v5 syntax):
plot(close, color=color.red, transp=50)

// CORRECT (v6):
plot(close, color=color.new(color.red, 50))
\`\`\`

---

## INPUT RULES

### 72. Input Functions
\`\`\`pinescript
input.int(defval, title, minval, maxval, step, tooltip, inline, group)
input.float(...)
input.bool(...)
input.string(...)
input.symbol(...)
input.timeframe(...)
input.session(...)
input.source(...)
input.color(...)
\`\`\`

### 73. Input Rules
- Creates user-adjustable parameters
- Accessible in Settings/Inputs tab
- Values have "input" form
- Cannot be changed during script execution

---

## TIME & DATE RULES

### 74. Time Variables
\`\`\`pinescript
time       // current bar time (milliseconds)
time_close // bar close time
timenow    // current time
bar_index  // bar number (0-based)
\`\`\`

### 75. Time Functions
\`\`\`pinescript
year(time)
month(time)
dayofmonth(time)
dayofweek(time)
hour(time)
minute(time)
second(time)
\`\`\`

### 76. Timestamp Function
\`\`\`pinescript
timestamp(year, month, day, hour, minute, second)
timestamp(timezone, year, month, day, hour, minute, second)
\`\`\`

---

## REQUEST FUNCTIONS (v6 MAJOR CHANGE)

### 77. Dynamic Requests (NEW DEFAULT in v6)
**\`dynamic_requests = true\` by default in v6**

\`\`\`pinescript
// v6 - dynamic requests enabled automatically:
//@version=6
indicator("Dynamic requests")

// Can use series arguments:
sym = input.symbol("AAPL")
data = request.security(sym, "1D", close)
\`\`\`

### 78. request.security() Changes
**Old name removed:**
\`\`\`pinescript
// WRONG (v4/v5):
security(symbol, timeframe, expression)

// CORRECT (v6):
request.security(symbol, timeframe, expression)
\`\`\`

### 79. Request Functions Can Now Be Used In:
- Local scopes (loops, if statements)
- User-defined functions
- With series arguments (when dynamic_requests=true)

\`\`\`pinescript
// v6 allows this:
for i in range(0, 5)
    sym = array.get(symbols, i)
    data = request.security(sym, "1D", close)
\`\`\`

### 80. Disabling Dynamic Requests
\`\`\`pinescript
//@version=6
indicator("No dynamic", dynamic_requests=false)

// Now requires "simple" arguments and global scope
\`\`\`

### 81. Other Request Functions
\`\`\`pinescript
request.security_lower_tf()
request.dividends()
request.splits()
request.earnings()
request.financial()
request.quandl()
request.seed()
\`\`\`

---

## STRATEGY RULES

### 82. strategy() Declaration
\`\`\`pinescript
//@version=6
strategy(title, shorttitle, overlay, format, precision,
         scale, pyramiding, calc_on_order_fills, calc_on_every_tick,
         max_bars_back, backtest_fill_limits_assumption,
         default_qty_type, default_qty_value, initial_capital,
         currency, slippage, commission_type, commission_value,
         process_orders_on_close, close_entries_rule,
         margin_long, margin_short, explicit_plot_zorder,
         max_lines_count, max_labels_count, max_boxes_count,
         risk_free_rate, use_bar_magnifier, fill_orders_on_standard_ohlc)
\`\`\`

### 83. Strategy Margin Defaults (v6 CHANGE)
**Default margin changed to 100% in v6:**
\`\`\`pinescript
// v5 default: margin_long=0, margin_short=0
// v6 default: margin_long=100, margin_short=100
\`\`\`

### 84. Strategy Entry Functions
\`\`\`pinescript
strategy.entry(id, direction, qty, limit, stop, oca_name, oca_type, comment, alert_message)

// Direction constants:
strategy.long
strategy.short
\`\`\`

### 85. Strategy Exit Functions
\`\`\`pinescript
strategy.exit(id, from_entry, qty, qty_percent, profit, limit, loss, stop, trail_price, trail_points, trail_offset, oca_name, comment, alert_message)

strategy.close(id, when, comment, alert_message, immediately)
strategy.close_all(when, comment, alert_message, immediately)
\`\`\`

### 86. Strategy Order Functions
\`\`\`pinescript
strategy.order(id, direction, qty, limit, stop, oca_name, oca_type, comment, alert_message)
strategy.cancel(id)
strategy.cancel_all()
\`\`\`

### 87. Strategy Variables
\`\`\`pinescript
strategy.position_size
strategy.position_avg_price
strategy.openprofit
strategy.closedtrades
strategy.wintrades
strategy.losstrades
strategy.equity
strategy.netprofit
strategy.grossprofit
strategy.grossloss
strategy.max_drawdown
\`\`\`

### 88. Strategy 9000-Trade Limit REMOVED (v6)
No longer halts at 9000 trades

---

## ALERT RULES

### 89. alert() Function
\`\`\`pinescript
alert(message, freq)

// Frequency options:
alert.freq_once_per_bar
alert.freq_once_per_bar_close
alert.freq_all
\`\`\`

### 90. alertcondition() Function
\`\`\`pinescript
alertcondition(condition, title, message)
\`\`\`

**Restrictions:**
- Cannot be called in local blocks
- Can only be called in indicator scripts (not strategies)

---

## LABEL & LINE RULES

### 91. Label Creation
\`\`\`pinescript
label.new(x, y, text, xloc, yloc, color, style, textcolor, size, textalign, tooltip)
\`\`\`

### 92. Label Properties
\`\`\`pinescript
label.set_x(id, x)
label.set_y(id, y)
label.set_text(id, text)
label.set_color(id, color)
label.set_textcolor(id, color)
label.set_size(id, size)
label.delete(id)
\`\`\`

### 93. Label Limits
Default: 50 labels maximum
Can increase with: \`max_labels_count\` parameter

### 94. Line Creation
\`\`\`pinescript
line.new(x1, y1, x2, y2, xloc, extend, color, style, width)
\`\`\`

### 95. Line Properties
\`\`\`pinescript
line.set_x1(id, x)
line.set_y1(id, y)
line.set_x2(id, x)
line.set_y2(id, y)
line.set_color(id, color)
line.set_width(id, width)
line.delete(id)
\`\`\`

### 96. Line Limits
Default: 50 lines maximum
Can increase with: \`max_lines_count\` parameter

---

## BOX & POLYLINE RULES

### 97. Box Creation
\`\`\`pinescript
box.new(left, top, right, bottom, border_color, border_width, border_style, extend, xloc, bgcolor, text, text_size, text_color, text_valign, text_halign, text_wrap, text_font_family)
\`\`\`

### 98. Box Limits
Default: 50 boxes maximum
Can increase with: \`max_boxes_count\` parameter

### 99. Polyline Creation (NEW in v5+)
\`\`\`pinescript
polyline.new(points, closed, xloc, line_color, fill_color, line_style, line_width)
\`\`\`

---

## TABLE RULES

### 100. Table Creation
\`\`\`pinescript
table.new(position, columns, rows, bgcolor, frame_color, frame_width, border_color, border_width)

// Position constants:
position.top_left, position.top_center, position.top_right
position.middle_left, position.middle_center, position.middle_right
position.bottom_left, position.bottom_center, position.bottom_right
\`\`\`

### 101. Table Cell Functions
\`\`\`pinescript
table.cell(table_id, column, row, text, width, height, text_color, text_halign, text_valign, text_size, bgcolor, tooltip, text_font_family)
\`\`\`

---

## LIBRARY RULES

### 102. Library Declaration
\`\`\`pinescript
//@version=6
library("MyLibrary", overlay=true)
\`\`\`

### 103. Export Functions
\`\`\`pinescript
export myFunction(int x) =>
    x * 2
\`\`\`

### 104. Import Libraries
\`\`\`pinescript
import username/libraryName/version as alias

// Use:
alias.functionName()
\`\`\`

---

## COMMENT RULES

### 105. Single-Line Comments
\`\`\`pinescript
// This is a comment
a = close  // inline comment
\`\`\`

### 106. Compiler Annotations
\`\`\`pinescript
//@version=6
//@description Library description
//@function Function description
//@param x Parameter description
//@returns Return value description
//@type Type description
//@field Field description
//@variable Variable description
//@enum Enum description
\`\`\`

---

## CODE STRUCTURE RULES

### 107. Line Wrapping
Long lines can wrap to multiple lines:
\`\`\`pinescript
longVar = value1 +   // indent by non-multiple of 4
          value2 +   // any indent length
          value3     // except multiples of 4
\`\`\`

**Exception:** Inside parentheses, any indentation allowed:
\`\`\`pinescript
result = myFunction(
    param1,
    param2,
    param3)
\`\`\`

### 108. Multiple Statements Per Line
Use comma separator:
\`\`\`pinescript
a = 1, b = 2, c = 3
\`\`\`

### 109. Indentation Rules
- Local blocks: MUST use 4 spaces or 1 tab
- Global scope: MUST start at position 0
- Wrapped lines: avoid multiples of 4 (except in parentheses)

---

## IDENTIFIER RULES

### 110. Valid Identifiers
- Start with letter or underscore
- Can contain letters, digits, underscores
- Case-sensitive
- Cannot use reserved keywords

**Examples:**
\`\`\`pinescript
myVar        // valid
_private     // valid
var123       // valid
123var       // INVALID - starts with digit
my-var       // INVALID - contains hyphen
\`\`\`

### 111. Reserved Keywords
Cannot be used as identifiers:
\`if, else, for, while, switch, import, export, type, method, var, varip, true, false, na\`

---

## ERROR HANDLING RULES

### 112. Compilation Errors
- Displayed in Pine Editor console
- Must fix before running
- Common: syntax errors, type mismatches, undefined variables

### 113. Runtime Errors
- Appear as exclamation mark on chart
- Common: array out of bounds, division by zero, na operations

### 114. runtime.error() Function (NEW in v5+)
\`\`\`pinescript
if invalidCondition
    runtime.error("Custom error message")
\`\`\`

---

## PROFILING RULES (NEW in v6)

### 115. Pine Profiler
- Built-in performance analysis tool
- Shows runtime per code line
- Displays execution counts
- Access via Pine Editor

---

## BUILT-IN VARIABLES

### 116. Critical Built-in Variables
\`\`\`pinescript
open, high, low, close, volume
hl2, hlc3, ohlc4, hlcc4
bar_index, time, time_close, timenow
syminfo.ticker, syminfo.mintick, syminfo.pointvalue
timeframe.period, timeframe.multiplier
chart.is_standard, chart.is_heikinashi, chart.is_kagi
\`\`\`

---

## TECHNICAL ANALYSIS (ta.*) NAMESPACE RULES

### 117. Common TA Functions
\`\`\`pinescript
ta.sma(source, length)           // Simple Moving Average
ta.ema(source, length)           // Exponential Moving Average
ta.wma(source, length)           // Weighted Moving Average
ta.vwma(source, length)          // Volume-Weighted MA
ta.rma(source, length)           // Rolling Moving Average (Wilder's MA)
ta.alma(source, length, offset, sigma)

ta.rsi(source, length)           // Relative Strength Index
ta.macd(source, fast, slow, signal)
ta.stoch(source, high, low, length)
ta.cci(source, length)
ta.mfi(source, length)
ta.atr(length)                   // Average True Range
ta.tr                            // True Range (no parameters)
ta.bb(source, length, mult)      // Bollinger Bands
\`\`\`

### 118. TA Function Return Types
**Some return multiple values (tuples):**
\`\`\`pinescript
[macdLine, signalLine, histogram] = ta.macd(close, 12, 26, 9)
[middle, upper, lower] = ta.bb(close, 20, 2)
[k, d] = ta.stoch(close, high, low, 14)
\`\`\`

### 119. Change Detection Functions
\`\`\`pinescript
ta.change(source, length)         // source - source[length]
ta.cross(source1, source2)        // true when source1 crosses source2
ta.crossover(source1, source2)    // true when source1 crosses over source2
ta.crossunder(source1, source2)   // true when source1 crosses under source2
ta.rising(source, length)         // true if rising for length bars
ta.falling(source, length)        // true if falling for length bars
ta.highest(source, length)        // highest value in length bars
ta.lowest(source, length)         // lowest value in length bars
ta.highestbars(source, length)    // bars since highest
ta.lowestbars(source, length)     // bars since lowest
ta.valuewhen(condition, source, occurrence)
ta.barssince(condition)
\`\`\`

### 120. Pivot Functions
\`\`\`pinescript
ta.pivothigh(source, leftbars, rightbars)
ta.pivotlow(source, leftbars, rightbars)
\`\`\`

### 121. Correlation & Statistics
\`\`\`pinescript
ta.correlation(source1, source2, length)
ta.percentrank(source, length)
ta.percentile_linear_interpolation(source, length, percentage)
ta.percentile_nearest_rank(source, length, percentage)
\`\`\`

---

## MATH NAMESPACE RULES

### 122. Math Constants
\`\`\`pinescript
math.pi        // 3.14159265359
math.e         // 2.71828182846
math.phi       // 1.61803398875 (golden ratio)
math.rphi      // 0.61803398875 (reciprocal phi)
\`\`\`

### 123. Math Functions
\`\`\`pinescript
math.abs(x)
math.ceil(x)
math.floor(x)
math.round(x, precision)
math.sign(x)
math.min(value1, value2, ...)
math.max(value1, value2, ...)
math.avg(value1, value2, ...)
math.sum(value1, value2, ...)

math.pow(base, exponent)
math.sqrt(x)
math.exp(x)
math.log(x)
math.log10(x)

math.sin(x)
math.cos(x)
math.tan(x)
math.asin(x)
math.acos(x)
math.atan(x)
math.sinh(x)
math.cosh(x)
math.tanh(x)

math.todegrees(radians)
math.toradians(degrees)

math.random(min, max, seed)  // returns series float
\`\`\`

---

## NA HANDLING RULES

### 124. na Constant
- Represents "not available" / missing value
- All types except \`bool\` can be \`na\` in v6
- Booleans cannot be \`na\` in v6 (breaking change)

### 125. na Testing
\`\`\`pinescript
na(x)                 // true if x is na
not na(x)             // true if x is not na
\`\`\`

### 126. na() Function Restrictions (v6 CHANGE)
**Cannot test bool for na in v6:**
\`\`\`pinescript
// WRONG (v6):
bool myBool = somecondition
if na(myBool)  // ERROR

// Bools are never na in v6
\`\`\`

### 127. nz() Function
\`\`\`pinescript
nz(source)                    // returns 0 if na, otherwise source
nz(source, replacement)       // returns replacement if na
\`\`\`

**v6 change:** Cannot accept \`bool\` argument

### 128. fixnan() Function
\`\`\`pinescript
fixnan(source)  // replaces na with previous non-na value
\`\`\`

**v6 change:** Cannot accept \`bool\` argument

---

## SPECIAL VALUE HANDLING

### 129. Infinity
\`\`\`pinescript
x = 1.0 / 0.0              // positive infinity
x = -1.0 / 0.0             // negative infinity
\`\`\`

### 130. Infinity Testing
\`\`\`pinescript
if x == math.infinity
if x == -math.infinity
\`\`\`

---

## SECURITY & PERFORMANCE RULES

### 131. Loop Limits
- While loops: maximum 500 iterations (protect against infinite loops)
- For loops: no hard iteration limit but runtime limits apply

### 132. Script Calculation Limits
- Script must complete within time limit
- Memory limits apply
- Too many drawings can slow performance

### 133. Historical Bar Limits
- Can access approximately 20,000 historical bars
- Varies by account type and timeframe
- Use \`max_bars_back\` to limit history usage

### 134. max_bars_back Usage
\`\`\`pinescript
indicator("My Script", max_bars_back=500)

// Or for specific variables:
max_bars_back(close, 100)
\`\`\`

---

## DRAWING OBJECT LIMITS (DEFAULTS)

### 135. Default Limits
- Lines: 50
- Labels: 50
- Boxes: 50
- Polylines: 100
- Tables: 1

### 136. Increasing Limits
\`\`\`pinescript
indicator("My Script", max_lines_count=500, max_labels_count=500, max_boxes_count=500)
\`\`\`

**Absolute maximum: 500 for lines, labels, boxes**

---

## REALTIME VS HISTORICAL BEHAVIOR

### 137. Bar States
\`\`\`pinescript
barstate.isfirst         // true on first bar
barstate.islast          // true on last bar
barstate.ishistory       // true on historical bars
barstate.isrealtime      // true on realtime bars
barstate.isnew           // true on first tick of new bar
barstate.isconfirmed     // true on last tick (close) of realtime bar
barstate.islastconfirmedhistory  // true on last historical bar
\`\`\`

### 138. Realtime Behavior Differences
- Historical bars: script executes once per bar
- Realtime bars: script executes on every tick
- Use \`barstate.*\` variables to differentiate

---

## SESSION & TIME RULES

### 139. Session String Format
\`\`\`pinescript
"HHMM-HHMM:1234567"
// HH = hours (00-23)
// MM = minutes (00-59)
// 1234567 = days (1=Sun, 2=Mon, ..., 7=Sat)

"0930-1600:23456"  // Mon-Fri, 9:30 AM - 4:00 PM
\`\`\`

### 140. time() Function
\`\`\`pinescript
time(timeframe)
time(timeframe, session)
time(timeframe, session, timezone)
\`\`\`

### 141. time_close() Function
\`\`\`pinescript
time_close(timeframe)
time_close(timeframe, session)
time_close(timeframe, session, timezone)
\`\`\`

---

## TIMEFRAME RULES

### 142. Timeframe String Format
\`\`\`pinescript
"1"      // 1 minute
"5"      // 5 minutes
"15"     // 15 minutes
"60"     // 1 hour
"240"    // 4 hours
"D"      // Daily
"W"      // Weekly
"M"      // Monthly
"12M"    // 12 months
\`\`\`

### 143. timeframe.* Variables
\`\`\`pinescript
timeframe.period           // current timeframe as string
timeframe.multiplier       // numeric multiplier
timeframe.isseconds
timeframe.isminutes
timeframe.isintraday
timeframe.isdaily
timeframe.isweekly
timeframe.ismonthly
timeframe.isdwm            // daily, weekly, or monthly
\`\`\`

---

## SYMINFO NAMESPACE RULES

### 144. Symbol Information Variables
\`\`\`pinescript
syminfo.ticker             // ticker without exchange
syminfo.tickerid          // ticker with exchange
syminfo.basecurrency      // base currency (e.g., "BTC" in BTCUSD)
syminfo.currency          // quote currency (e.g., "USD" in BTCUSD)
syminfo.description       // full description
syminfo.prefix            // exchange prefix
syminfo.root              // root symbol for futures
syminfo.timezone          // exchange timezone
syminfo.type              // instrument type (stock, forex, crypto, etc.)
syminfo.session           // session string
syminfo.mintick           // minimum price movement
syminfo.pointvalue        // contract point value
syminfo.volumetype        // volume type (base/quote)
\`\`\`

---

## VERSION MIGRATION RULES

### 145. v5 to v6 Breaking Changes Summary
**MUST address these when migrating:**

1. **transp parameter removed** - use \`color.new()\`
2. **for loop syntax changed** - use \`for i in range()\`
3. **int/float no longer cast to bool** - use \`bool()\` function
4. **bool values cannot be na** - cannot use \`na()\`, \`nz()\`, \`fixnan()\` on bool
5. **strategy margins default to 100%** - was 0% in v5
6. **dynamic_requests enabled by default** - request functions can use series args
7. **negative array indices supported** - arr.get(arr, -1) works
8. **logical operators short-circuit** - and/or use lazy evaluation
9. **offset in plot() requires simple form** - no series values

### 146. Deprecated Functions (Avoid)
\`\`\`pinescript
// OLD (deprecated):
security() -> use request.security()
study() -> use indicator()

// OLD array syntax (still works but deprecated):
int[] arr = array.new_int()

// NEW:
arr = array.new<int>()
\`\`\`

---

## BEST PRACTICES FOR ERROR-FREE CODE

### 147. Always Specify Version
\`\`\`pinescript
//@version=6  // FIRST LINE
\`\`\`

### 148. Always Declare Script Type
\`\`\`pinescript
indicator() or strategy() or library()  // SECOND LINE
\`\`\`

### 149. Use Explicit Type Annotations
\`\`\`pinescript
// GOOD:
float myVar = 0.0
int counter = 0
bool condition = false

// AVOID:
myVar = 0.0  // unclear type
\`\`\`

### 150. Initialize Variables Properly
\`\`\`pinescript
// WRONG:
float x = na  // declare with na...
x = 5         // ERROR - trying to redeclare

// CORRECT:
float x = na
x := 5        // reassign with :=
\`\`\`

### 151. Use Proper Declaration Modes
\`\`\`pinescript
// For values that change every bar:
currentPrice = close

// For values that persist:
var int totalBars = 0
totalBars := totalBars + 1

// For realtime tick tracking:
varip float lastTickPrice = 0.0
lastTickPrice := close
\`\`\`

### 152. Avoid History References on UDT Fields
\`\`\`pinescript
// WRONG:
type MyType
    float value
obj = MyType.new(close)
prevValue = obj.value[1]  // ERROR

// CORRECT - store entire object history:
var array<MyType> objHistory = array.new<MyType>()
array.push(objHistory, obj)
prevObj = array.get(objHistory, array.size(objHistory) - 2)
prevValue = prevObj.value
\`\`\`

### 153. Handle na Values Explicitly
\`\`\`pinescript
// GOOD:
value = nz(someCalculation, 0)
if not na(value)
    plot(value)

// AVOID:
plot(someCalculation)  // may plot na values
\`\`\`

### 154. Use Appropriate Loop Types
\`\`\`pinescript
// For known range:
for i in range(0, 10)
    // ...

// For array iteration:
for element in myArray
    // ...

// For conditional loops:
while condition
    // ...
\`\`\`

### 155. Respect Function Call Restrictions
\`\`\`pinescript
// WRONG - plot in local block:
if condition
    plot(close)

// CORRECT:
plotColor = condition ? color.blue : na
plot(close, color=plotColor)
\`\`\`

### 156. Use Ternary for Simple Conditions
\`\`\`pinescript
// GOOD:
color = close > open ? color.green : color.red

// UNNECESSARY:
if close > open
    color = color.green
else
    color = color.red
\`\`\`

### 157. Properly Manage Drawing Objects
\`\`\`pinescript
// Delete old objects to stay within limits:
if array.size(lineArray) > 50
    line.delete(array.shift(lineArray))

// Or use var to reuse objects:
var line myLine = na
if not na(myLine)
    line.delete(myLine)
myLine := line.new(...)
\`\`\`

### 158. Use Comments for Clarity
\`\`\`pinescript
// Calculate 20-period simple moving average
sma20 = ta.sma(close, 20)

// Check for bullish crossover
bullishCross = ta.crossover(close, sma20)
\`\`\`

### 159. Test with Different Data
- Test on multiple symbols
- Test on different timeframes
- Test historical vs realtime behavior
- Test edge cases (gaps, low volume, etc.)

### 160. Optimize Performance
- Minimize request.security() calls
- Limit array/matrix sizes
- Reduce drawing object count
- Avoid complex calculations in loops
- Use built-in functions when available

---

## COMMON ERROR PATTERNS & FIXES

### 161. "Cannot call 'operator []' on series"
\`\`\`pinescript
// WRONG:
x = 5[1]

// CORRECT:
myVar = 5
x = myVar[1]
\`\`\`

### 162. "Undeclared identifier"
\`\`\`pinescript
// WRONG - using before declaring:
x := 5

// CORRECT:
float x = na
x := 5
\`\`\`

### 163. "Mismatched input expecting 'end of line'"
- Check indentation (must be 4 spaces or 1 tab)
- Check for missing operators
- Check for unclosed parentheses/brackets

### 164. "Cannot use 'plot' in local scope"
\`\`\`pinescript
// WRONG:
if condition
    plot(close)

// CORRECT:
plot(condition ? close : na)
\`\`\`

### 165. "Loop is too long (> 500 ms)"
- Reduce loop iterations
- Optimize calculations inside loop
- Move calculations outside loop if possible

### 166. "Script has too many local scopes"
**OBSOLETE in v6** - no longer an issue

### 167. "Type mismatch int vs float"
\`\`\`pinescript
// WRONG:
int x = 5.5  // float assigned to int

// CORRECT:
int x = 5
// OR
float x = 5.5
\`\`\`

### 168. "'bool' cannot be na"
\`\`\`pinescript
// WRONG (v6):
bool x = na

// CORRECT (v6):
bool x = false
// Bools can only be true or false in v6
\`\`\`

---

## ADVANCED RULES

### 169. Polymorphism with UDTs
\`\`\`pinescript
type Animal
    string name

type Dog extends Animal
    string breed  // ERROR - no inheritance in Pine Script

// Use composition instead:
type Dog
    string name
    string breed
\`\`\`

### 170. Generic Functions
Pine Script doesn't support generic functions. Use separate functions or type-specific logic.

### 171. Recursion
**Recursion is NOT supported** in Pine Script. Use loops instead.

### 172. Global Variable Modification in Functions
Functions can modify global variables using \`:=\`:
\`\`\`pinescript
var int globalCounter = 0

incrementCounter() =>
    globalCounter := globalCounter + 1

incrementCounter()
\`\`\`

### 173. Multiple Return Values from Functions
\`\`\`pinescript
calcStats(src, len) =>
    avg = ta.sma(src, len)
    stdev = ta.stdev(src, len)
    [avg, stdev]  // return tuple

[myAvg, myStdev] = calcStats(close, 20)
\`\`\`

### 174. Optional Parameters with Defaults
\`\`\`pinescript
myFunc(int x = 10, float y = 5.0) =>
    x + y

result1 = myFunc()           // uses defaults
result2 = myFunc(20)         // x=20, y=5.0
result3 = myFunc(20, 10.0)   // both specified
result4 = myFunc(y=10.0)     // named parameter
\`\`\`

---

## PLOTTING ADVANCED RULES

### 175. Plot Display Controls
\`\`\`pinescript
plot(close, display=display.none)           // don't display
plot(close, display=display.all)            // display everywhere
plot(close, display=display.data_window)    // only in data window
plot(close, display=display.pane)           // only in pane
plot(close, display=display.status_line)    // only in status line
\`\`\`

### 176. Plot Tracking
\`\`\`pinescript
plot(close, trackprice=true)  // horizontal line at last value
\`\`\`

### 177. Plot Offset
\`\`\`pinescript
plot(close, offset=1)   // shift plot 1 bar right
plot(close, offset=-1)  // shift plot 1 bar left
\`\`\`

### 178. Conditional Plotting Without na
\`\`\`pinescript
// Plot only on specific conditions without gaps:
plot(condition ? close : na, style=plot.style_linebr)
\`\`\`

---

## SECURITY & VULNERABILITY RULES

### 179. No External API Calls
Pine Script cannot make HTTP requests or call external APIs.

### 180. No File System Access
Cannot read/write files or access file system.

### 181. No Clipboard Access
Cannot access clipboard data.

### 182. Data Privacy
Published scripts don't expose private data unless explicitly coded.

---

## PUBLICATION RULES

### 183. Script Visibility Options
- Private: only you can see
- Invite-only: share with specific users
- Public: visible to all TradingView users

### 184. Required for Publication
- Meaningful title and description
- Proper code formatting
- No copyright violations
- No misleading claims
- Follow House Rules

### 185. Open Source vs Protected
- Open source: code visible to all
- Protected: code hidden (Premium required)

---

## FINAL CRITICAL RULES

### 186. Script Must Have Purpose
At minimum, must:
- Declare version
- Declare script type
- Have at least one meaningful statement

### 187. No Empty Blocks
\`\`\`pinescript
// WRONG:
if condition
    // empty - error

// CORRECT:
if condition
    doSomething = true
\`\`\`

### 188. Consistent Indentation
- Use either spaces or tabs, not both
- 4 spaces = 1 tab
- Be consistent throughout script

### 189. Case Sensitivity
\`\`\`pinescript
myVar != myvar != MyVar  // all different variables
\`\`\`

### 190. Character Encoding
Use UTF-8 encoding for script files.

---

## SUMMARY CHECKLIST FOR ERROR-FREE v6 CODE

✅ **Line 1:** \`//@version=6\`
✅ **Line 2:** \`indicator()\` or \`strategy()\` or \`library()\`
✅ **Type declarations:** Use explicit types when needed
✅ **Variable declarations:** Use \`=\` for declaration, \`:=\` for reassignment
✅ **Booleans:** Never \`na\`, use \`true\`/\`false\` only
✅ **Type casting:** Use \`bool()\` to cast int/float to bool
✅ **For loops:** Use \`for i in range(start, end)\` syntax
✅ **Colors:** Use \`color.new()\` instead of \`transp\` parameter
✅ **Arrays:** Use \`array.get()\` and \`array.set()\`, not \`[]\` operator
✅ **Plots:** Call in global scope only, use conditional colors
✅ **Functions:** Define in global scope, can return tuples
✅ **Comments:** Document complex logic
✅ **Error handling:** Handle \`na\` values explicitly
✅ **Performance:** Minimize loops, limit drawings, optimize calculations
✅ **Testing:** Test on multiple symbols, timeframes, and conditions

---

## REFERENCE RESOURCES

- **Official Documentation:** https://www.tradingview.com/pine-script-docs/
- **v6 Migration Guide:** https://www.tradingview.com/pine-script-docs/migration-guides/to-pine-version-6/
- **Pine Script Reference Manual:** https://www.tradingview.com/pine-script-reference/v6/
- **TradingView Community:** https://www.tradingview.com/scripts/
- **Pine Script Chat:** https://www.tradingview.com/chat/

---

## COMPLETE COMPILATION ERROR PREVENTION GUIDE

### 191. "Cannot use [FUNCTION] in local scope" Errors

**ALL functions that trigger this error:**
1. \`plot()\`
2. \`plotshape()\`
3. \`plotchar()\`
4. \`plotarrow()\`
5. \`plotcandle()\`
6. \`plotbar()\`
7. \`hline()\`
8. \`fill()\`
9. \`barcolor()\`
10. \`bgcolor()\`
11. \`alertcondition()\`
12. \`indicator()\`
13. \`strategy()\`
14. \`library()\`

**Prevention:** Keep ALL these functions in global scope (no indentation)

---

### 192. "Undeclared identifier 'X'" Error

**Causes:**
- Variable used before declaration
- Typo in variable name
- Variable declared in different scope
- Using reserved keyword

**Solutions:**
\`\`\`pinescript
// WRONG:
x := 5  // x not declared

// CORRECT:
float x = na
x := 5

// WRONG - typo:
myVariable = 10
plot(myVaraible)  // typo

// CORRECT:
myVariable = 10
plot(myVariable)

// WRONG - local scope variable:
if condition
    localVar = 5
plot(localVar)  // ERROR - localVar only exists in if block

// CORRECT:
globalVar = na
if condition
    globalVar := 5
plot(globalVar)
\`\`\`

---

### 193. "Cannot call 'operator []' on [TYPE]" Error

**Causes:**
- Using \`[]\` operator on literals
- Using \`[]\` directly on UDT fields
- Using \`[]\` on non-series values

**Solutions:**
\`\`\`pinescript
// WRONG:
x = 5[1]  // cannot reference history of literal

// CORRECT:
myVar = 5
x = myVar[1]

// WRONG:
type MyType
    float value
obj = MyType.new(5.0)
x = obj.value[1]  // cannot use [] on UDT field directly

// CORRECT - store objects in array:
var objArray = array.new<MyType>()
array.push(objArray, obj)
if array.size(objArray) > 1
    prevObj = array.get(objArray, array.size(objArray) - 2)
    x = prevObj.value
\`\`\`

---

### 194. "Mismatched input" Errors

**Common causes:**
- Missing/extra parentheses
- Missing/extra commas
- Incorrect operator usage
- Missing line breaks
- Comment on same line as code continuation

**Solutions:**
\`\`\`pinescript
// WRONG - missing closing parenthesis:
x = ta.sma(close, 20

// CORRECT:
x = ta.sma(close, 20)

// WRONG - extra comma:
plot(close, color=color.red,)

// CORRECT:
plot(close, color=color.red)

// WRONG - comment breaks line continuation:
result = value1 +  // adding value2
         value2

// CORRECT - comment on separate line:
// Adding value2
result = value1 +
         value2
\`\`\`

---

### 195. "Cannot modify global variable 'X' in local scope" Error

**Cause:** Using \`=\` instead of \`:=\` to reassign global variable

**Solution:**
\`\`\`pinescript
// WRONG:
var counter = 0
myFunc() =>
    counter = counter + 1  // ERROR - trying to redeclare

// CORRECT:
var counter = 0
myFunc() =>
    counter := counter + 1  // reassignment
\`\`\`

---

### 196. "Loop is too long (> 500 ms)" Error

**Causes:**
- Too many loop iterations
- Complex calculations inside loop
- Infinite loop condition

**Solutions:**
\`\`\`pinescript
// WRONG - too many iterations:
for i in range(0, 100000)
    sum = sum + i

// CORRECT - reduce iterations:
for i in range(0, 1000)
    sum = sum + i

// WRONG - infinite loop:
while true
    x = x + 1

// CORRECT - add exit condition:
counter = 0
while counter < 100
    x = x + 1
    counter := counter + 1
\`\`\`

---

### 197. "Compilation request is too large" Error

**Causes:**
- Script + libraries exceed 5MB
- Too much code
- Many large libraries imported

**Solutions:**
- Reduce code size
- Remove unused libraries
- Split into multiple scripts
- Refactor repetitive code

---

### 198. "Script has too many local scopes" Error

**Status:** REMOVED in Pine Script v6 (was 550 limit in earlier versions)
- No longer an issue in v6

---

### 199. "Script has too many variables" Error

**Limit:** 1000 variables per scope (global and each local scope)

**Prevention:**
\`\`\`pinescript
// WRONG - creating too many variables:
for i in range(0, 2000)
    newVar = i * 2  // creates many variables

// CORRECT - reuse variables:
result = 0
for i in range(0, 2000)
    result := i * 2  // reassignment, same variable
\`\`\`

---

### 200. "Cannot use 'X' as a variable name" Error

**Cause:** Using reserved keyword

**Reserved keywords in Pine Script v6:**
- \`if\`, \`else\`
- \`for\`, \`while\`
- \`switch\`
- \`import\`, \`export\`
- \`type\`, \`method\`
- \`var\`, \`varip\`
- \`true\`, \`false\`, \`na\`
- \`and\`, \`or\`, \`not\`

**Solution:** Choose different variable name

---

### 201. "Type mismatch" Errors

**Common patterns:**
\`\`\`pinescript
// WRONG - int to float auto-converts, but strict types matter:
int x = 5.5  // ERROR

// CORRECT:
float x = 5.5

// WRONG - cannot assign bool to int in v6:
int x = true  // ERROR in v6

// CORRECT - use bool():
int x = bool(5) ? 1 : 0

// WRONG - array type mismatch:
floatArray = array.new<float>()
array.push(floatArray, 10)  // int pushed to float array - OK
intArray = array.new<int>()
array.push(intArray, 5.5)  // ERROR - float to int array

// CORRECT:
array.push(intArray, int(5.5))
\`\`\`

---

### 202. "Cannot cast 'na' to 'X'" Error

**Cause:** Assigning \`na\` without type specification

**Solution:**
\`\`\`pinescript
// WRONG:
x = na  // compiler doesn't know type

// CORRECT:
float x = na
int x = na
string x = na
\`\`\`

---

### 203. "'bool' type cannot be 'na'" Error (v6 SPECIFIC)

**Cause:** Trying to use \`na\` with boolean in v6

**Solutions:**
\`\`\`pinescript
// WRONG (v6):
bool x = na  // ERROR in v6

// CORRECT:
bool x = false

// WRONG (v6):
if na(myBool)  // ERROR - bools never na in v6

// CORRECT:
// Bools are always true or false in v6, no need to check for na

// WRONG (v6):
nz(myBool, false)  // ERROR - nz doesn't accept bool in v6

// CORRECT:
// Use bool directly, it's never na
if myBool
    // code
\`\`\`

---

### 204. "Cannot use 'transp' parameter" Error (v6 SPECIFIC)

**Cause:** Using deprecated \`transp\` parameter (removed in v6)

**Solution:**
\`\`\`pinescript
// WRONG (v5 syntax, removed in v6):
plot(close, color=color.red, transp=50)

// CORRECT (v6):
plot(close, color=color.new(color.red, 50))

// WRONG:
bgcolor(color.blue, transp=90)

// CORRECT:
bgcolor(color.new(color.blue, 90))
\`\`\`

---

### 205. "Invalid 'for' loop syntax" Error (v6 SPECIFIC)

**Cause:** Using old v4/v5 for loop syntax

**Solution:**
\`\`\`pinescript
// WRONG (v4/v5 syntax, removed in v6):
for i = 0 to 10
    // code

// WRONG:
for i = 0 to 10 by 2
    // code

// CORRECT (v6 syntax):
for i in range(0, 11)  // 0 to 10 inclusive
    // code

// CORRECT with step:
for i in range(0, 11, 2)  // 0, 2, 4, 6, 8, 10
    // code
\`\`\`

---

### 206. "Script requesting too much data" Error

**Causes:**
- Requesting too much historical data
- Using \`max_bars_back\` incorrectly
- Accessing too far back in history

**Solutions:**
\`\`\`pinescript
// Limit historical buffer:
indicator("My Script", max_bars_back=500)

// Or for specific variable:
max_bars_back(close, 100)

// Avoid accessing too far back:
// WRONG:
x = close[10000]  // might exceed available history

// CORRECT - check bar_index:
x = bar_index >= 10000 ? close[10000] : na
\`\`\`

---

### 207. "Reference too many bars back" Error

**Causes:**
- Historical buffer too small
- Dynamic offset that exceeds buffer
- Accessing history before bars exist

**Solutions:**
\`\`\`pinescript
// WRONG:
offset = bar_index  // could be very large
x = close[offset]

// CORRECT:
maxOffset = 500
offset = math.min(bar_index, maxOffset)
x = close[offset]

// CORRECT - increase buffer:
indicator("My Script", max_bars_back=1000)
\`\`\`

---

### 208. "Maximum labels/lines/boxes count exceeded" Error

**Causes:**
- Creating too many drawing objects
- Not deleting old objects

**Solutions:**
\`\`\`pinescript
// Increase limit:
indicator("My Script", 
     max_labels_count=500,
     max_lines_count=500,
     max_boxes_count=500)

// Delete old objects:
var lineArray = array.new<line>()
if array.size(lineArray) >= 50
    line.delete(array.shift(lineArray))

newLine = line.new(bar_index, high, bar_index + 1, high)
array.push(lineArray, newLine)
\`\`\`

---

### 209. "Input function call in local scope has no effect" Warning

**Cause:** Calling \`input.*()\` functions inside local blocks

**Note:** This is a WARNING, not an error. The input still works but behaves as if in global scope.

**Best practice:**
\`\`\`pinescript
// AVOID:
if condition
    len = input.int(14, "Length")  // works but confusing

// CORRECT - declare all inputs in global scope:
len = input.int(14, "Length")
if condition
    sma = ta.sma(close, len)
\`\`\`

---

### 210. "Cannot use mutable variable as a function argument" Error

**Causes:**
- Passing var variable to function expecting series
- Using variable declared with \`varip\` incorrectly

**Solution:**
\`\`\`pinescript
// WRONG:
var cumSum = 0.0
result = ta.sma(cumSum, 14)  // ERROR - cumSum is mutable

// CORRECT - pass series value:
var cumSum = 0.0
cumSum := cumSum + close
result = ta.sma(cumSum, 14)  // Now OK, cumSum changes create series
\`\`\`

---

### 211. "Division by zero" Runtime Error

**Prevention:**
\`\`\`pinescript
// WRONG:
result = numerator / denominator  // might be zero

// CORRECT:
result = denominator != 0 ? numerator / denominator : na

// CORRECT alternative:
result = nz(numerator / denominator, 0)  // returns 0 if division fails
\`\`\`

---

### 212. "Array index out of bounds" Runtime Error

**Prevention:**
\`\`\`pinescript
// WRONG:
value = array.get(myArray, 10)  // might not have 11 elements

// CORRECT:
value = array.size(myArray) > 10 ? array.get(myArray, 10) : na

// CORRECT - use negative index (v6):
value = array.size(myArray) > 0 ? array.get(myArray, -1) : na  // last element
\`\`\`

---

### 213. "Syntax error at input 'end of line without line continuation'" Error

**Causes:**
- Incorrect indentation for line continuation
- Using multiple of 4 spaces for wrapped lines
- Breaking line at wrong position

**Solutions:**
\`\`\`pinescript
// WRONG - multiple of 4 spaces on continuation:
longValue = value1 +
    value2  // ERROR - 4 spaces looks like local block

// CORRECT - use non-multiple of 4:
longValue = value1 +
          value2  // 10 spaces or any non-multiple of 4

// EXCEPTION - inside parentheses, any indentation OK:
result = ta.sma(
    close,  // any indentation
    20)
\`\`\`

---

### 214. "Cannot call 'strategy' function from indicator" Error

**Cause:** Using strategy-specific functions in indicator script

**Solution:**
\`\`\`pinescript
// WRONG:
//@version=6
indicator("My Indicator")
strategy.entry("Long", strategy.long)  // ERROR

// CORRECT - use strategy declaration:
//@version=6
strategy("My Strategy")
strategy.entry("Long", strategy.long)  // OK
\`\`\`

---

### 215. "Cannot use 'request.*' in local scope" Error (v5 and earlier)

**Status:** FIXED in v6 with \`dynamic_requests=true\` (default)

**v6 behavior:**
\`\`\`pinescript
// v6 - this NOW WORKS (dynamic_requests enabled by default):
for i in range(0, 5)
    sym = array.get(symbols, i)
    data = request.security(sym, "1D", close)  // OK in v6

// To use old v5 behavior (restrict to global scope):
//@version=6
indicator("No dynamic", dynamic_requests=false)
// Now request.* must be in global scope with "simple" arguments
\`\`\`

---

## COMPREHENSIVE ERROR PREVENTION CHECKLIST

### ✅ Before Running Script:

1. **Version declared:** \`//@version=6\` on line 1
2. **Script type declared:** \`indicator()\` or \`strategy()\` or \`library()\` on line 2
3. **All plot/visual functions in global scope** (no indentation)
4. **No reserved keywords as variable names**
5. **All variables declared before use**
6. **\`:=\` used for reassignment, \`=\` for declaration**
7. **Bool values are \`true\` or \`false\`, never \`na\` in v6**
8. **No \`transp\` parameter** - use \`color.new()\` instead
9. **For loops use \`for i in range()\` syntax** (v6)
10. **Type casting explicit:** use \`bool()\`, \`int()\`, \`float()\`, etc.
11. **Arrays accessed with \`.get()\` and \`.set()\`, not \`[]\`**
12. **All \`if\`/\`for\`/\`while\` blocks indented by 4 spaces or 1 tab**
13. **Line continuations use non-multiple of 4 spaces** (except in parentheses)
14. **Check for division by zero**
15. **Check array bounds before access**
16. **Limit drawing objects or delete old ones**
17. **Use \`max_bars_back\` if accessing deep history**

---

---

## BEAUTIFUL INDICATOR DESIGN RULES

### 216. force_overlay Parameter (CRITICAL for Professional Indicators)

**Purpose:** Display signals/markers on main chart while keeping indicator in separate pane

**Available in (v5+):**
- All \`plot*()\` functions: \`plot()\`, \`plotshape()\`, \`plotchar()\`, \`plotarrow()\`, \`plotcandle()\`, \`plotbar()\`
- \`bgcolor()\`
- Drawing functions: \`line.new()\`, \`box.new()\`, \`polyline.new()\`, \`label.new()\`, \`table.new()\`

**Syntax:**
\`\`\`pinescript
plotshape(series, force_overlay=true)
plot(series, force_overlay=true)
label.new(x, y, text, force_overlay=true)
\`\`\`

**Example Pattern - RSI with Chart Signals:**
\`\`\`pinescript
//@version=6
indicator("RSI Signals", overlay=false)

// Calculate RSI in separate pane
rsi = ta.rsi(close, 14)
overbought = 70
oversold = 30

// Plot RSI in indicator pane
plot(rsi, "RSI", color=color.new(color.blue, 0), linewidth=2)
hline(overbought, "Overbought", color=color.new(color.red, 50))
hline(oversold, "Oversold", color=color.new(color.green, 50))
hline(50, "Middle", color=color.new(color.gray, 70))

// Buy/Sell signals
buySignal = ta.crossover(rsi, oversold)
sellSignal = ta.crossunder(rsi, overbought)

// Display signals ON CHART using force_overlay
plotshape(buySignal, "Buy", shape.triangleup, location.belowbar, 
     color.new(color.green, 0), text="BUY", size=size.small, 
     force_overlay=true)

plotshape(sellSignal, "Sell", shape.triangledown, location.abovebar, 
     color.new(color.red, 0), text="SELL", size=size.small, 
     force_overlay=true)

// Optional: Draw stop loss/target lines on chart
if buySignal
    stopLine = line.new(bar_index, low * 0.98, bar_index + 10, low * 0.98,
         color=color.new(color.red, 0), width=2, style=line.style_dashed,
         force_overlay=true)
    targetLine = line.new(bar_index, high * 1.02, bar_index + 10, high * 1.02,
         color=color.new(color.green, 0), width=2, style=line.style_dashed,
         force_overlay=true)
\`\`\`

---

### 217. Color Scheme Best Practices

**Use Professional Color Palettes:**
\`\`\`pinescript
// Define color scheme at top of script
color BULLISH = color.new(#26a69a, 0)      // Teal
color BEARISH = color.new(#ef5350, 0)      // Red
color NEUTRAL = color.new(#78909c, 0)      // Gray
color STRONG_BULL = color.new(#00e676, 0)  // Bright Green
color STRONG_BEAR = color.new(#ff1744, 0)  // Bright Red
color BG_BULLISH = color.new(#26a69a, 90)  // Transparent Teal
color BG_BEARISH = color.new(#ef5350, 90)  // Transparent Red

// Use throughout script
barcolor(close > open ? BULLISH : BEARISH)
bgcolor(rsi > 70 ? BG_BEARISH : rsi < 30 ? BG_BULLISH : na)
\`\`\`

**Dark/Light Theme Compatible Colors:**
\`\`\`pinescript
// Colors that work in both themes
color ACCENT_BLUE = #2962ff
color ACCENT_ORANGE = #ff6d00
color ACCENT_PURPLE = #aa00ff
color ACCENT_LIME = #64dd17
\`\`\`

---

### 218. Visual Hierarchy Rules

**Priority 1 - Most Important (Bright, Bold):**
- Buy/Sell signals
- Critical levels being tested
- Main indicator line

**Priority 2 - Supporting Info (Medium Intensity):**
- Secondary indicators
- Zones/bands
- Historical levels

**Priority 3 - Background (Subtle, High Transparency):**
- Background fills
- Reference levels
- Grid lines

**Implementation:**
\`\`\`pinescript
// Priority 1 - Signals (bright, opaque)
plotshape(buySignal, color=color.new(color.lime, 0), size=size.normal)

// Priority 2 - Indicator (medium)
plot(rsi, color=color.new(color.blue, 0), linewidth=2)

// Priority 3 - Background (subtle)
bgcolor(rsi > 70 ? color.new(color.red, 95) : na)
hline(50, color=color.new(color.gray, 80), linestyle=hline.style_dotted)
\`\`\`

---

### 219. Shape and Style Selection

**For Buy Signals (at bottom of bar):**
\`\`\`pinescript
plotshape(buySignal, style=shape.triangleup, location=location.belowbar, 
     color=color.green, size=size.small)
plotshape(buySignal, style=shape.circle, location=location.belowbar, 
     color=color.green, size=size.tiny)
plotchar(buySignal, char="▲", location=location.belowbar, 
     color=color.green, size=size.small)
\`\`\`

**For Sell Signals (at top of bar):**
\`\`\`pinescript
plotshape(sellSignal, style=shape.triangledown, location=location.abovebar, 
     color=color.red, size=size.small)
plotshape(sellSignal, style=shape.xcross, location=location.abovebar, 
     color=color.red, size=size.normal)
plotchar(sellSignal, char="▼", location=location.abovebar, 
     color=color.red, size=size.small)
\`\`\`

**Available Shapes:**
- \`shape.triangleup\` / \`shape.triangledown\` - Classic buy/sell
- \`shape.circle\` - Neutral markers
- \`shape.cross\` / \`shape.xcross\` - Exits/warnings
- \`shape.diamond\` - Special events
- \`shape.square\` - Support/resistance
- \`shape.arrowup\` / \`shape.arrowdown\` - Strong signals
- \`shape.flag\` - Milestones
- \`shape.labelup\` / \`shape.labeldown\` - With text labels

**Available Sizes:**
- \`size.auto\`, \`size.tiny\`, \`size.small\`, \`size.normal\`, \`size.large\`, \`size.huge\`

---

### 220. Line Style Guidelines

**Main Indicator Lines:**
\`\`\`pinescript
plot(mainValue, linewidth=2, style=plot.style_line)
\`\`\`

**Reference/Threshold Lines:**
\`\`\`pinescript
hline(70, linestyle=hline.style_dashed, color=color.new(color.red, 50))
hline(30, linestyle=hline.style_dotted, color=color.new(color.green, 50))
\`\`\`

**Support/Resistance:**
\`\`\`pinescript
plot(resistance, style=plot.style_stepline, linewidth=2, color=color.red)
plot(support, style=plot.style_stepline, linewidth=2, color=color.green)
\`\`\`

**Available Line Styles:**
- \`plot.style_line\` - Solid line (default)
- \`plot.style_stepline\` - Step line (good for levels)
- \`plot.style_histogram\` - Histogram bars
- \`plot.style_cross\` - Crosses
- \`plot.style_area\` - Filled area
- \`plot.style_columns\` - Columns
- \`plot.style_circles\` - Circles
- \`plot.style_linebr\` - Line with breaks (hides na values)
- \`plot.style_steplinebr\` - Step line with breaks

**Line Styles for hline():**
- \`hline.style_solid\`
- \`hline.style_dashed\`
- \`hline.style_dotted\`

---

### 221. Background Fills Best Practices

**Overbought/Oversold Zones:**
\`\`\`pinescript
// Subtle background zones
bgcolor(rsi > 70 ? color.new(color.red, 92) : 
     rsi < 30 ? color.new(color.green, 92) : na)

// Gradient intensity based on extreme
transparencyLevel = math.abs(rsi - 50) * 1.5  // 0-30 range
bgcolor(rsi > 70 ? color.new(color.red, 100 - transparencyLevel) : 
     rsi < 30 ? color.new(color.green, 100 - transparencyLevel) : na)
\`\`\`

**Fill Between Plots:**
\`\`\`pinescript
upperBand = ta.sma(high, 20)
lowerBand = ta.sma(low, 20)
p1 = plot(upperBand, color=color.new(color.red, 50))
p2 = plot(lowerBand, color=color.new(color.green, 50))
fill(p1, p2, color=color.new(color.gray, 85))
\`\`\`

**Conditional Background:**
\`\`\`pinescript
// Highlight trending periods
trending = ta.atr(14) > ta.sma(ta.atr(14), 50)
bgcolor(trending ? color.new(color.orange, 95) : na)
\`\`\`

---

### 222. Label Design for Clarity

**Clean, Readable Labels:**
\`\`\`pinescript
if buySignal
    label.new(bar_index, low, 
         text="BUY\\n" + str.tostring(close, format.mintick),
         style=label.style_label_up,
         color=color.new(color.green, 0),
         textcolor=color.white,
         size=size.small,
         force_overlay=true)

if sellSignal
    label.new(bar_index, high,
         text="SELL\\n" + str.tostring(close, format.mintick),
         style=label.style_label_down,
         color=color.new(color.red, 0),
         textcolor=color.white,
         size=size.small,
         force_overlay=true)
\`\`\`

**Label Styles:**
- \`label.style_label_up\` - Arrow pointing up
- \`label.style_label_down\` - Arrow pointing down
- \`label.style_label_left\` - Arrow pointing left
- \`label.style_label_right\` - Arrow pointing right
- \`label.style_label_center\` - No arrow
- \`label.style_none\` - Transparent background
- \`label.style_triangleup\` / \`label.style_triangledown\`
- \`label.style_flag\`
- \`label.style_circle\`
- \`label.style_xcross\`
- \`label.style_diamond\`
- \`label.style_square\`

**Text Formatting in Labels:**
\`\`\`pinescript
label.new(bar_index, high,
     text="RSI: " + str.tostring(rsi, "#.##") + "\\n" +
          "Price: " + str.tostring(close, format.mintick),
     textalign=text.align_left,
     style=label.style_label_down)
\`\`\`

---

### 223. Dynamic Color Based on Conditions

**Color Gradients:**
\`\`\`pinescript
// RSI color changes with value
rsiColor = rsi > 70 ? color.red :
     rsi > 60 ? color.orange :
     rsi > 40 ? color.yellow :
     rsi > 30 ? color.lime :
     color.green

plot(rsi, color=rsiColor, linewidth=2)
\`\`\`

**Intensity Mapping:**
\`\`\`pinescript
// Stronger color for stronger signal
strength = math.abs(rsi - 50) / 50 * 100  // 0-100
bullIntensity = rsi > 50 ? 100 - strength : 100
bearIntensity = rsi < 50 ? 100 - strength : 100

plotColor = rsi > 50 ? 
     color.new(color.green, bullIntensity) : 
     color.new(color.red, bearIntensity)

plot(rsi, color=plotColor, linewidth=2)
\`\`\`

**Conditional Plot Colors:**
\`\`\`pinescript
// Green when rising, red when falling
trendColor = close > close[1] ? color.green : color.red
plot(close, color=trendColor, linewidth=2, force_overlay=true)
\`\`\`

---

### 224. Multi-Timeframe Visual Consistency

**When showing MTF data:**
\`\`\`pinescript
htfRsi = request.security(syminfo.tickerid, "60", ta.rsi(close, 14))

// Plot current timeframe solid, HTF dashed
plot(ta.rsi(close, 14), "Current TF RSI", color.blue, linewidth=2)
plot(htfRsi, "1H RSI", color.purple, linewidth=2, style=plot.style_line)
\`\`\`

---

### 225. Information Tables for Context

**Professional Info Panel:**
\`\`\`pinescript
// Create info table
var table infoTable = table.new(position.top_right, 2, 5, 
     bgcolor=color.new(color.black, 85),
     frame_color=color.new(color.gray, 50),
     frame_width=1,
     border_color=color.new(color.gray, 70),
     border_width=1)

if barstate.islast
    // Headers
    table.cell(infoTable, 0, 0, "Metric", 
         text_color=color.white, text_size=size.small)
    table.cell(infoTable, 1, 0, "Value",
         text_color=color.white, text_size=size.small)
    
    // Data
    table.cell(infoTable, 0, 1, "RSI",
         text_color=color.gray, text_size=size.small)
    table.cell(infoTable, 1, 1, str.tostring(rsi, "#.##"),
         text_color=rsi > 70 ? color.red : rsi < 30 ? color.green : color.white,
         text_size=size.small)
    
    table.cell(infoTable, 0, 2, "Trend",
         text_color=color.gray, text_size=size.small)
    table.cell(infoTable, 1, 2, close > ta.sma(close, 50) ? "Bullish" : "Bearish",
         text_color=close > ta.sma(close, 50) ? color.green : color.red,
         text_size=size.small)
\`\`\`

---

### 226. Avoid Visual Clutter

**DON'T:**
\`\`\`pinescript
// TOO BUSY - avoid this:
plot(ta.sma(close, 5))
plot(ta.sma(close, 10))
plot(ta.sma(close, 15))
plot(ta.sma(close, 20))
plot(ta.sma(close, 25))
plot(ta.sma(close, 30))  // Too many lines!
\`\`\`

**DO:**
\`\`\`pinescript
// CLEAN - use selectively:
fastMA = ta.sma(close, 9)
slowMA = ta.sma(close, 21)

plot(fastMA, "Fast MA", color.new(color.blue, 30), linewidth=1)
plot(slowMA, "Slow MA", color.new(color.orange, 0), linewidth=2)

// Only show crossover signals
crossUp = ta.crossover(fastMA, slowMA)
crossDown = ta.crossunder(fastMA, slowMA)

plotshape(crossUp, style=shape.triangleup, location=location.belowbar,
     color=color.green, size=size.small, force_overlay=true)
plotshape(crossDown, style=shape.triangledown, location=location.abovebar,
     color=color.red, size=size.small, force_overlay=true)
\`\`\`

---

### 227. Transparency Guidelines

**Recommended Transparency Levels:**
- **Opaque (0-20):** Critical signals, main indicators
- **Semi-transparent (30-60):** Supporting lines, bands
- **Subtle (70-85):** Background zones, fills between bands
- **Very subtle (90-97):** Context areas, large background fills

**Examples:**
\`\`\`pinescript
// Signal markers - fully opaque
plotshape(buySignal, color=color.new(color.green, 0))

// Main indicator - opaque
plot(rsi, color=color.new(color.blue, 0), linewidth=2)

// Reference levels - semi-transparent
hline(70, color=color.new(color.red, 50))
hline(30, color=color.new(color.green, 50))

// Background zones - very transparent
bgcolor(rsi > 70 ? color.new(color.red, 92) : na)

// Wide band fills - extremely transparent
fill(p1, p2, color=color.new(color.gray, 95))
\`\`\`

---

### 228. Text Clarity Rules

**Use Unicode Characters for Better Visuals:**
\`\`\`pinescript
// Buy/Sell with emojis or symbols
plotchar(buySignal, char="🚀", location=location.belowbar, 
     color=color.green, size=size.small, force_overlay=true)

plotchar(sellSignal, char="⚠", location=location.abovebar,
     color=color.red, size=size.small, force_overlay=true)

// Arrows
plotchar(buySignal, char="▲", ...)
plotchar(sellSignal, char="▼", ...)

// Special symbols
plotchar(signal, char="●", ...)  // Bullet
plotchar(signal, char="★", ...)  // Star
plotchar(signal, char="♦", ...)  // Diamond
\`\`\`

**Label Text Formatting:**
\`\`\`pinescript
// Multi-line with line breaks
labelText = "STRONG BUY\\n" +
     "RSI: " + str.tostring(rsi, "#.##") + "\\n" +
     "Price: $" + str.tostring(close, "#.##")

label.new(bar_index, low, labelText,
     style=label.style_label_up,
     color=color.green,
     textcolor=color.white,
     size=size.normal,
     force_overlay=true)
\`\`\`

---

### 229. Complete Beautiful Indicator Template

\`\`\`pinescript
//@version=6
indicator("Professional RSI Signals", overlay=false)

// ============================================
// INPUTS
// ============================================
rsiLength = input.int(14, "RSI Length", minval=1, group="RSI Settings")
overbought = input.int(70, "Overbought Level", minval=50, maxval=100, group="RSI Settings")
oversold = input.int(30, "Oversold Level", minval=0, maxval=50, group="RSI Settings")

showSignals = input.bool(true, "Show Buy/Sell Signals", group="Display")
showLevels = input.bool(true, "Show Support/Resistance", group="Display")
showTable = input.bool(true, "Show Info Table", group="Display")

// ============================================
// COLOR SCHEME
// ============================================
color BULLISH = #26a69a
color BEARISH = #ef5350
color NEUTRAL = #78909c
color BG_BULL = color.new(BULLISH, 92)
color BG_BEAR = color.new(BEARISH, 92)

// ============================================
// CALCULATIONS
// ============================================
rsi = ta.rsi(close, rsiLength)

// Signals
buySignal = ta.crossover(rsi, oversold) and rsi < 40
sellSignal = ta.crossunder(rsi, overbought) and rsi > 60

// Dynamic color
rsiColor = rsi > overbought ? BEARISH :
     rsi < oversold ? BULLISH :
     rsi > 50 ? color.new(BULLISH, 40) :
     color.new(BEARISH, 40)

// ============================================
// INDICATOR PANE PLOTS
// ============================================
// Main RSI line
plot(rsi, "RSI", rsiColor, linewidth=2)

// Reference levels
hline(overbought, "Overbought", color.new(BEARISH, 50), hline.style_dashed)
hline(oversold, "Oversold", color.new(BULLISH, 50), hline.style_dashed)
hline(50, "Middle", color.new(NEUTRAL, 70), hline.style_dotted)

// Background zones
bgcolor(rsi > overbought ? BG_BEAR : rsi < oversold ? BG_BULL : na)

// ============================================
// CHART OVERLAY SIGNALS (force_overlay=true)
// ============================================
if showSignals
    // Buy signals on chart
    plotshape(buySignal, "Buy Signal", shape.triangleup, 
         location.belowbar, color.new(BULLISH, 0), 
         text="BUY", size=size.small, force_overlay=true)
    
    // Sell signals on chart
    plotshape(sellSignal, "Sell Signal", shape.triangledown,
         location.abovebar, color.new(BEARISH, 0),
         text="SELL", size=size.small, force_overlay=true)

// Support/Resistance levels on chart
if showLevels and buySignal
    line.new(bar_index, low * 0.98, bar_index + 10, low * 0.98,
         color=color.new(BEARISH, 0), width=2, 
         style=line.style_dashed, force_overlay=true)
    line.new(bar_index, high * 1.02, bar_index + 10, high * 1.02,
         color=color.new(BULLISH, 0), width=2,
         style=line.style_dashed, force_overlay=true)

// ============================================
// INFO TABLE
// ============================================
if showTable
    var table infoTable = table.new(position.top_right, 2, 4,
         bgcolor=color.new(color.black, 85),
         frame_color=color.new(NEUTRAL, 50),
         frame_width=1,
         border_color=color.new(NEUTRAL, 70),
         border_width=1)
    
    if barstate.islast
        table.cell(infoTable, 0, 0, "RSI Value",
             text_color=color.white, text_size=size.small)
        table.cell(infoTable, 1, 0, str.tostring(rsi, "#.##"),
             text_color=rsiColor, text_size=size.normal)
        
        table.cell(infoTable, 0, 1, "Status",
             text_color=color.gray, text_size=size.small)
        
        status = rsi > overbought ? "Overbought" :
             rsi < oversold ? "Oversold" :
             "Neutral"
        statusColor = rsi > overbought ? BEARISH :
             rsi < oversold ? BULLISH :
             NEUTRAL
        
        table.cell(infoTable, 1, 1, status,
             text_color=statusColor, text_size=size.small)
        
        table.cell(infoTable, 0, 2, "Trend",
             text_color=color.gray, text_size=size.small)
        table.cell(infoTable, 1, 2, 
             close > ta.ema(close, 50) ? "Bullish ▲" : "Bearish ▼",
             text_color=close > ta.ema(close, 50) ? BULLISH : BEARISH,
             text_size=size.small)

// ============================================
// ALERTS
// ============================================
alertcondition(buySignal, "RSI Buy Signal", "RSI crossed above oversold - BUY")
alertcondition(sellSignal, "RSI Sell Signal", "RSI crossed below overbought - SELL")
\`\`\`

---

### 230. Performance Optimization for Beautiful Indicators

**Limit Drawing Objects:**
\`\`\`pinescript
// Delete old lines to stay within limits
var lineArray = array.new<line>()

if buySignal and showLevels
    // Remove oldest line if at limit
    if array.size(lineArray) >= 50
        line.delete(array.shift(lineArray))
    
    // Add new line
    newLine = line.new(bar_index, low, bar_index + 10, low,
         color=color.red, width=2, force_overlay=true)
    array.push(lineArray, newLine)
\`\`\`

**Conditional Plotting to Reduce Load:**
\`\`\`pinescript
// Only plot on significant bars
significantBar = bar_index % 5 == 0 or buySignal or sellSignal

plot(significantBar ? rsi : na, style=plot.style_linebr)
\`\`\`

---

### 231. COMPLETE BEAUTIFUL INDICATOR CHECKLIST

✅ **Structure:**
- [ ] \`overlay=false\` in declaration (for separate pane indicators)
- [ ] Use \`force_overlay=true\` for chart signals
- [ ] Organize code into clear sections with comments

✅ **Color Scheme:**
- [ ] Define color constants at top
- [ ] Use professional color palette
- [ ] Ensure dark/light theme compatibility
- [ ] Use transparency levels appropriately (0-20 for signals, 90-97 for backgrounds)

✅ **Visual Elements:**
- [ ] Main indicator line: 2px width, solid, dynamic color
- [ ] Reference levels: dashed/dotted, 50% transparency
- [ ] Background fills: 92-95% transparency
- [ ] Signals on chart: \`force_overlay=true\`, clear shapes, size.small

✅ **Signals:**
- [ ] Use \`shape.triangleup\` for buy, \`shape.triangledown\` for sell
- [ ] Position below bar for buy, above bar for sell
- [ ] Include text labels ("BUY"/"SELL")
- [ ] Bright, opaque colors (0% transparency)

✅ **Labels & Text:**
- [ ] Use \`label.style_label_up/down\` for directional labels
- [ ] Include relevant data (price, indicator value)
- [ ] Format numbers with \`str.tostring(value, "#.##")\`
- [ ] Use line breaks \`\\n\` for multi-line text

✅ **Tables:**
- [ ] Position: \`position.top_right\` or \`position.bottom_right\`
- [ ] Semi-transparent background (85% transparency)
- [ ] Clear headers and formatted values
- [ ] Update only on \`barstate.islast\`

✅ **Stop Loss / Take Profit Lines (Optional):**
- [ ] Use \`line.new()\` with \`force_overlay=true\`
- [ ] Style: \`line.style_dashed\`
- [ ] Red for stop loss, green for take profit
- [ ] Extend 5-10 bars into future

✅ **Performance:**
- [ ] Delete old drawing objects
- [ ] Use arrays to manage object limits
- [ ] Avoid excessive calculations in loops
- [ ] Test on different timeframes

✅ **User Experience:**
- [ ] Clear input groups
- [ ] Tooltips for complex settings
- [ ] Toggle options for display elements
- [ ] Meaningful default values

---

### 232. Common Beautiful Indicator Patterns

**Pattern 1: Oscillator with Chart Signals**
\`\`\`pinescript
//@version=6
indicator("Oscillator + Signals", overlay=false)

// Calculate in separate pane
oscillator = ta.rsi(close, 14)
plot(oscillator, color=color.blue, linewidth=2)
hline(70, color=color.new(color.red, 50))
hline(30, color=color.new(color.green, 50))

// Signals on chart
buySignal = ta.crossover(oscillator, 30)
sellSignal = ta.crossunder(oscillator, 70)

plotshape(buySignal, style=shape.triangleup, location=location.belowbar,
     color=color.green, size=size.small, force_overlay=true)
plotshape(sellSignal, style=shape.triangledown, location=location.abovebar,
     color=color.red, size=size.small, force_overlay=true)
\`\`\`

**Pattern 2: Trend Indicator with Colored Candles**
\`\`\`pinescript
//@version=6
indicator("Trend + Colored Bars", overlay=false)

// Trend in separate pane
trend = ta.ema(close, 50)
plot(trend, color=color.orange, linewidth=2)

// Color bars on main chart based on trend
bullish = close > trend
barcolor(bullish ? color.green : color.red, force_overlay=true)
bgcolor(bullish ? color.new(color.green, 95) : color.new(color.red, 95),
     force_overlay=true)
\`\`\`

**Pattern 3: Multi-Level Indicator with Zones**
\`\`\`pinescript
//@version=6
indicator("Multi-Zone Indicator", overlay=false)

value = ta.stoch(close, high, low, 14)
plot(value, color=color.purple, linewidth=2)

// Multiple zones with different colors
bgcolor(value > 80 ? color.new(color.maroon, 85) :
     value > 70 ? color.new(color.red, 92) :
     value < 20 ? color.new(color.green, 85) :
     value < 30 ? color.new(color.lime, 92) : na)

// Extreme signals on chart
extremeBuy = value < 20
extremeSell = value > 80

plotshape(extremeBuy, "Extreme Buy", shape.circle,
     location=location.belowbar, color=color.new(color.aqua, 0),
     size=size.tiny, force_overlay=true)
plotshape(extremeSell, "Extreme Sell", shape.circle,
     location=location.abovebar, color=color.new(color.fuchsia, 0),
     size=size.tiny, force_overlay=true)
\`\`\`

**Pattern 4: Volume-Based Indicator with Price Action**
\`\`\`pinescript
//@version=6
indicator("Volume + Price Action", overlay=false)

// Volume analysis in pane
volSMA = ta.sma(volume, 20)
plot(volume, style=plot.style_columns, 
     color=volume > volSMA ? color.new(color.green, 50) : color.new(color.red, 70))
plot(volSMA, color=color.orange, linewidth=2)

// High volume breakouts on chart
highVol = volume > volSMA * 1.5
priceUp = close > open

plotshape(highVol and priceUp, "Volume Breakout", shape.flag,
     location=location.belowbar, color=color.new(color.lime, 0),
     size=size.small, force_overlay=true)
plotshape(highVol and not priceUp, "Volume Breakdown", shape.flag,
     location=location.abovebar, color=color.new(color.red, 0),
     size=size.small, force_overlay=true)
\`\`\`

---

### 233. Accessibility & Readability Rules

**Avoid Color Blindness Issues:**
\`\`\`pinescript
// DON'T use only red/green
// DO use shapes, sizes, and positions too

// Good - uses multiple differentiators:
plotshape(buySignal, 
     style=shape.triangleup,        // Different shape
     location=location.belowbar,     // Different position
     color=color.blue,               // Not just green
     size=size.small,
     text="BUY")                     // Text label

plotshape(sellSignal,
     style=shape.triangledown,       // Different shape
     location=location.abovebar,     // Different position  
     color=color.orange,             // Not just red
     size=size.small,
     text="SELL")                    // Text label
\`\`\`

**High Contrast for Visibility:**
\`\`\`pinescript
// Ensure text is readable
label.new(bar_index, high,
     text="Signal",
     color=color.new(color.navy, 0),      // Dark background
     textcolor=color.white,                // Light text = high contrast
     size=size.normal)
\`\`\`

---

### 234. GOLDEN RULES FOR BEAUTIFUL INDICATORS

1. **ONE indicator pane, SIGNALS on chart** - Use \`overlay=false\` + \`force_overlay=true\`

2. **LESS IS MORE** - Show only essential information, hide the rest

3. **CONSISTENT COLOR SCHEME** - Define colors once, use throughout

4. **APPROPRIATE TRANSPARENCY** - 0% for signals, 90-97% for backgrounds

5. **CLEAR HIERARCHY** - Important elements bold/bright, supporting elements subtle

6. **MEANINGFUL SHAPES** - Triangles for entry, crosses for exit, circles for alerts

7. **TEXT WHEN HELPFUL** - Add labels with context (price, value, reason)

8. **ORGANIZED CODE** - Use comments, group related settings, logical structure

9. **USER CONTROL** - Provide input options to toggle display elements

10. **PERFORMANCE CONSCIOUS** - Delete old objects, limit calculations

---

### 235. Quick Reference - force_overlay Usage

**When to use \`force_overlay=true\`:**
- ✅ Buy/sell signals on main chart
- ✅ Stop loss / take profit lines
- ✅ Support/resistance levels
- ✅ Price targets and zones
- ✅ Breakout markers
- ✅ Pattern completion signals
- ✅ Trend change notifications
- ✅ Bar coloring based on indicator
- ✅ Background highlighting for events

**When to keep in indicator pane:**
- ❌ Oscillator values (RSI, Stochastic, etc.)
- ❌ Volume calculations
- ❌ Histogram displays
- ❌ Reference levels (overbought/oversold)
- ❌ Difference plots (MACD histogram)
- ❌ Percentage calculations
- ❌ Statistical measures

`;
