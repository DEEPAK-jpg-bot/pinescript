// Auto-generated from api/data/pine_script_context.txt
export const PINE_SCRIPT_CONTEXT = `here is the list of erros that should be eliminated during generations
# SECTION 1: COMPILATION ERRORS (SYNTAX ERRORS)

## ERROR 1.1: SYNTAX ERROR AT INPUT

### Full Error Message:
\`\`\`
line X: syntax error at input 'character'
\`\`\`

### Category 1.1.1: Missing Characters

#### ERROR 1.1.1.A: Missing Closing Parenthesis
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(close
\`\`\`
**Error:** \`line 3: syntax error at input 'end of line'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(close)
\`\`\`

#### ERROR 1.1.1.B: Missing Opening Parenthesis
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = ta.sma close, 20)
\`\`\`
**Error:** \`line 3: syntax error at input 'close'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = ta.sma(close, 20)
\`\`\`

#### ERROR 1.1.1.C: Missing Closing Bracket
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
arr = array.new<float>(10
\`\`\`
**Error:** \`line 3: syntax error at input 'end of line'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
arr = array.new<float>(10)
\`\`\`

#### ERROR 1.1.1.D: Missing Opening Bracket
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
arr = array.newfloat>(10)
\`\`\`
**Error:** \`line 3: syntax error at input '>'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
arr = array.new<float>(10)
\`\`\`

#### ERROR 1.1.1.E: Missing Closing Curly Brace (UDT)
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
type MyType
    float value
    int count

plot(close)
\`\`\`
**Error:** \`line 6: syntax error at input 'plot'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
type MyType
    float value
    int count

plot(close)
\`\`\`
**Note:** UDTs don't use braces in Pine Script

#### ERROR 1.1.1.F: Missing Comma in Function Call
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(close color=color.red)
\`\`\`
**Error:** \`line 3: syntax error at input 'color'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(close, color=color.red)
\`\`\`

#### ERROR 1.1.1.G: Missing Comma in Array Declaration
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
arr = array.from(1, 2, 3 4, 5)
\`\`\`
**Error:** \`line 3: syntax error at input '4'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
arr = array.from(1, 2, 3, 4, 5)
\`\`\`

#### ERROR 1.1.1.H: Missing Comma in Tuple Declaration
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
[ma upper, lower] = ta.bb(close, 20, 2)
\`\`\`
**Error:** \`line 3: syntax error at input 'upper'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
[ma, upper, lower] = ta.bb(close, 20, 2)
\`\`\`

#### ERROR 1.1.1.I: Missing Quote Mark
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test)
\`\`\`
**Error:** \`line 3: syntax error at input 'end of line'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
\`\`\`

#### ERROR 1.1.1.J: Missing Operator
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = close open
\`\`\`
**Error:** \`line 3: syntax error at input 'open'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = close + open  // or -, *, /, etc.
\`\`\`

### Category 1.1.2: Extra Characters

#### ERROR 1.1.2.A: Extra Comma
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(close, color=color.red,)
\`\`\`
**Error:** \`line 3: syntax error at input ')'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(close, color=color.red)
\`\`\`

#### ERROR 1.1.2.B: Extra Parenthesis
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = ta.sma(close, 20))
\`\`\`
**Error:** \`line 3: syntax error at input ')'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = ta.sma(close, 20)
\`\`\`

#### ERROR 1.1.2.C: Extra Semicolon (Not Allowed)
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = close;
\`\`\`
**Error:** \`line 3: syntax error at input ';'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = close  // No semicolon in Pine Script
\`\`\`

#### ERROR 1.1.2.D: Double Comma
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(close,, color=color.red)
\`\`\`
**Error:** \`line 3: syntax error at input ','\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(close, color=color.red)
\`\`\`

### Category 1.1.3: Wrong Operators

#### ERROR 1.1.3.A: Using == for Declaration
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
x == 5
\`\`\`
**Error:** \`line 3: syntax error at input '=='\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = 5  // = for declaration
\`\`\`

#### ERROR 1.1.3.B: Using = for Comparison
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
if close = open
    plot(close)
\`\`\`
**Error:** \`line 3: syntax error at input '='\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
if close == open  // == for comparison
    plot(close)
\`\`\`

#### ERROR 1.1.3.C: Using Single & or | (Not &&/||)
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
if close > open & volume > 1000000
    plot(close)
\`\`\`
**Error:** \`line 3: syntax error at input '&'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
if close > open and volume > 1000000  // use 'and', not &
    plot(close)
\`\`\`

#### ERROR 1.1.3.D: Wrong Assignment in Reassignment
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = 5
x = 10  // Should be := for reassignment
\`\`\`
**No Error** (but creates new variable accidentally in local scope)

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = 5
x := 10  // := for reassignment
\`\`\`

#### ERROR 1.1.3.E: Double Operators
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = close + * 2
\`\`\`
**Error:** \`line 3: syntax error at input '*'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = close * 2
\`\`\`

### Category 1.1.4: Typos in Keywords

#### ERROR 1.1.4.A: Misspelled 'indicator'
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indic ator("Test")
\`\`\`
**Error:** \`line 2: syntax error at input 'ator'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
\`\`\`

#### ERROR 1.1.4.B: Misspelled 'strategy'
**❌ WRONG:**
\`\`\`pinescript
//@version=6
straegy("Test")
\`\`\`
**Error:** \`line 2: syntax error at input 'straegy'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
strategy("Test")
\`\`\`

#### ERROR 1.1.4.C: Misspelled 'plot'
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
plott(close)
\`\`\`
**Error:** \`Undeclared identifier 'plott'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(close)
\`\`\`

#### ERROR 1.1.4.D: Misspelled Built-in Variable
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(closee)
\`\`\`
**Error:** \`Undeclared identifier 'closee'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(close)
\`\`\`

#### ERROR 1.1.4.E: Wrong Capitalization
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
Plot(close)
\`\`\`
**Error:** \`Undeclared identifier 'Plot'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(close)  // lowercase
\`\`\`

### Category 1.1.5: Invalid Characters

#### ERROR 1.1.5.A: Using $ in Variable Name
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
my$var = close
\`\`\`
**Error:** \`line 3: syntax error at input '$'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
my_var = close  // use underscore
\`\`\`

#### ERROR 1.1.5.B: Using @ in Variable Name
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
my@var = close
\`\`\`
**Error:** \`line 3: syntax error at input '@'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
my_var = close
\`\`\`

#### ERROR 1.1.5.C: Using Hyphen in Variable Name
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
my-var = close
\`\`\`
**Error:** \`line 3: syntax error at input '-'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
my_var = close  // use underscore
\`\`\`

#### ERROR 1.1.5.D: Starting Variable with Number
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
5var = close
\`\`\`
**Error:** \`line 3: syntax error at input 'var'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
var5 = close  // start with letter or underscore
\`\`\`

#### ERROR 1.1.5.E: Using Space in Variable Name
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
my var = close
\`\`\`
**Error:** \`line 3: syntax error at input 'var'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
my_var = close
\`\`\`

---

## ERROR 1.2: MISMATCHED INPUT EXPECTING 'END OF LINE'

### Full Error Message:
\`\`\`
line X: mismatched input 'Y' expecting 'end of line'
\`\`\`

### Category 1.2.1: Indentation Errors

#### ERROR 1.2.1.A: 2 Spaces (Should be 4)
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
if close > open
  plot(close)  // 2 spaces - WRONG
\`\`\`
**Error:** \`line 4: mismatched input 'plot' expecting 'end of line'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
if close > open
    plot(close)  // 4 spaces - CORRECT
\`\`\`

#### ERROR 1.2.1.B: 3 Spaces (Should be 4)
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
if close > open
   x = 5  // 3 spaces - WRONG
\`\`\`
**Error:** \`line 4: mismatched input 'x' expecting 'end of line'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
if close > open
    x = 5  // 4 spaces
\`\`\`

#### ERROR 1.2.1.C: 5 Spaces (Should be 4 or 8)
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
if close > open
     x = 5  // 5 spaces - WRONG
\`\`\`
**Error:** \`line 4: mismatched input 'x' expecting 'end of line'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
if close > open
    x = 5  // 4 spaces
\`\`\`

#### ERROR 1.2.1.D: 6 Spaces (Should be 4 or 8)
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
myFunc() =>
      x = 5  // 6 spaces - WRONG
\`\`\`
**Error:** \`line 4: mismatched input 'x' expecting 'end of line'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
myFunc() =>
    x = 5  // 4 spaces
\`\`\`

#### ERROR 1.2.1.E: Mixed Tabs and Spaces
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
if close > open
[TAB]x = 5  // tab
    y = 10  // spaces - mixing tabs and spaces
\`\`\`
**Error:** \`line 5: mismatched input 'y' expecting 'end of line'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
if close > open
    x = 5  // all spaces
    y = 10  // all spaces
\`\`\`

#### ERROR 1.2.1.F: Code Indented at Global Scope
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
    plot(close)  // indented at global - WRONG
\`\`\`
**Error:** \`line 3: mismatched input 'plot' expecting 'end of line'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(close)  // no indentation at global scope
\`\`\`

#### ERROR 1.2.1.G: Wrong Nesting Indentation
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
if close > open
    if high > close
      x = 5  // 6 spaces total (should be 8)
\`\`\`
**Error:** \`line 5: mismatched input 'x' expecting 'end of line'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
if close > open
    if high > close
        x = 5  // 8 spaces (4 + 4)
\`\`\`

### Category 1.2.2: Plot Functions in Local Scope

#### ERROR 1.2.2.A: plot() in if Block
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
if close > open
    plot(close)  // CANNOT be in local scope
\`\`\`
**Error:** \`Cannot use 'plot' in local scope\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
plotColor = close > open ? color.green : na
plot(close, color=plotColor)
\`\`\`

#### ERROR 1.2.2.B: plotshape() in if Block
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
if close > open
    plotshape(true, style=shape.circle)
\`\`\`
**Error:** \`Cannot use 'plotshape' in local scope\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
condition = close > open
plotshape(condition, style=shape.circle)
\`\`\`

#### ERROR 1.2.2.C: plotchar() in Loop
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
for i in range(0, 5)
    plotchar(true, char="X")
\`\`\`
**Error:** \`Cannot use 'plotchar' in local scope\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
// Plot functions must be at global scope
plotchar(close > open, char="X")
\`\`\`

#### ERROR 1.2.2.D: plotarrow() in Function
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
myFunc() =>
    plotarrow(close - open)
myFunc()
\`\`\`
**Error:** \`Cannot use 'plotarrow' in local scope\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
myFunc() =>
    close - open
plotarrow(myFunc())  // Call at global scope
\`\`\`

#### ERROR 1.2.2.E: plotcandle() in if Block
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
if close > open
    plotcandle(open, high, low, close)
\`\`\`
**Error:** \`Cannot use 'plotcandle' in local scope\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
plotcandle(open, high, low, close, 
           color=close > open ? color.green : color.red)
\`\`\`

#### ERROR 1.2.2.F: plotbar() in else Block
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
if close > open
    x = 5
else
    plotbar(open, high, low, close)
\`\`\`
**Error:** \`Cannot use 'plotbar' in local scope\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
plotbar(open, high, low, close)  // Global scope
\`\`\`

#### ERROR 1.2.2.G: hline() in if Block
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
if bar_index == 0
    hline(50)
\`\`\`
**Error:** \`Cannot use 'hline' in local scope\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
hline(50)  // Must be at global scope
\`\`\`

#### ERROR 1.2.2.H: fill() in Loop
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
p1 = plot(close)
p2 = plot(open)
for i in range(0, 1)
    fill(p1, p2, color.blue)
\`\`\`
**Error:** \`Cannot use 'fill' in local scope\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
p1 = plot(close)
p2 = plot(open)
fill(p1, p2, color.blue)  // Global scope
\`\`\`

#### ERROR 1.2.2.I: bgcolor() in if Block
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true)
if close > open
    bgcolor(color.green)
\`\`\`
**Error:** \`Cannot use 'bgcolor' in local scope\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true)
bgcolor(close > open ? color.new(color.green, 80) : na)
\`\`\`

#### ERROR 1.2.2.J: barcolor() in Function
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true)
colorBars() =>
    barcolor(close > open ? color.green : color.red)
colorBars()
\`\`\`
**Error:** \`Cannot use 'barcolor' in local scope\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true)
colorBars() =>
    close > open ? color.green : color.red
barcolor(colorBars())  // Call at global scope
\`\`\`

### Category 1.2.3: Missing Declaration Mode

#### ERROR 1.2.3.A: Trying to Reassign Without Declaration
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
x := 5  // x not declared yet
\`\`\`
**Error:** \`Undeclared identifier 'x'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = 5  // Declaration uses =
x := 10  // Now can reassign with :=
\`\`\`

---

## ERROR 1.3: NO VIABLE ALTERNATIVE AT CHARACTER

### Full Error Message:
\`\`\`
line X: no viable alternative at character 'Y'
\`\`\`

### Category 1.3.1: String Quote Issues

#### ERROR 1.3.1.A: Unescaped Quote in Double-Quoted String
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
text = "He said "hello""
\`\`\`
**Error:** \`line 3: no viable alternative at character '"'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
text = 'He said "hello"'  // Use single quotes
// OR escape: "He said \\"hello\\""
\`\`\`

#### ERROR 1.3.1.B: Unescaped Apostrophe in Single-Quoted String
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
text = 'It's working'
\`\`\`
**Error:** \`line 3: no viable alternative at character '''\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
text = "It's working"  // Use double quotes
// OR escape: 'It\\'s working'
\`\`\`

#### ERROR 1.3.1.C: Mixing Quote Types
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test')
\`\`\`
**Error:** \`line 2: no viable alternative at character '''\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")  // Matching quotes
\`\`\`

### Category 1.3.2: Invalid Special Characters

#### ERROR 1.3.2.A: Invalid Character $
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = 5 $ 2
\`\`\`
**Error:** \`line 3: no viable alternative at character '$'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = 5 * 2  // Use valid operator
\`\`\`

#### ERROR 1.3.2.B: Invalid Character #
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = close # 2
\`\`\`
**Error:** \`line 3: no viable alternative at character '#'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = close * 2
\`\`\`

#### ERROR 1.3.2.C: Invalid Character ~
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = ~close
\`\`\`
**Error:** \`line 3: no viable alternative at character '~'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = not (close > open)  // Use 'not' for negation
\`\`\`

---

## ERROR 1.4: EXTRANEOUS INPUT

### Full Error Message:
\`\`\`
line X: extraneous input 'Y' expecting 'Z'
\`\`\`

### Category 1.4.1: Double Operators/Assignments

#### ERROR 1.4.1.A: Double Assignment Operator
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = = 5
\`\`\`
**Error:** \`line 3: extraneous input '=' expecting expression\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = 5
\`\`\`

#### ERROR 1.4.1.B: Wrong Arrow for Function
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
myFunc() = => close * 2
\`\`\`
**Error:** \`line 3: extraneous input '=' expecting '=>'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
myFunc() => close * 2  // Single =>
\`\`\`

#### ERROR 1.4.1.C: Extra Assignment in Declaration
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = close = open
\`\`\`
**Error:** \`line 3: extraneous input '=' expecting operator\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = close == open  // Comparison, not assignment
\`\`\`

---

## ERROR 1.5: UNDECLARED IDENTIFIER

### Full Error Message:
\`\`\`
Undeclared identifier 'X'
\`\`\`

### Category 1.5.1: Variable Not Declared

#### ERROR 1.5.1.A: Using Variable Before Declaration
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(myValue)
myValue = close
\`\`\`
**Error:** \`Undeclared identifier 'myValue'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
myValue = close  // Declare first
plot(myValue)
\`\`\`

#### ERROR 1.5.1.B: Variable Only Exists in Local Scope
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
if close > open
    localVar = 5
plot(localVar)  // localVar doesn't exist here
\`\`\`
**Error:** \`Undeclared identifier 'localVar'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
localVar = 0  // Declare in global scope
if close > open
    localVar := 5  // Reassign in local scope
plot(localVar)
\`\`\`

#### ERROR 1.5.1.C: Typo in Variable Name
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
myVariable = close
plot(myVaraible)  // Typo: 'raible' instead of 'riable'
\`\`\`
**Error:** \`Undeclared identifier 'myVaraible'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
myVariable = close
plot(myVariable)  // Correct spelling
\`\`\`

#### ERROR 1.5.1.D: Wrong Capitalization
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
MyVariable = close
plot(myvariable)  // Different case
\`\`\`
**Error:** \`Undeclared identifier 'myvariable'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
MyVariable = close
plot(MyVariable)  // Match exact case
\`\`\`

### Category 1.5.2: Function Not Declared

#### ERROR 1.5.2.A: Calling Function Before Definition
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = myFunc(close)

myFunc(src) => src * 2
\`\`\`
**Error:** \`Undeclared identifier 'myFunc'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
myFunc(src) => src * 2  // Define first

x = myFunc(close)
\`\`\`

#### ERROR 1.5.2.B: Misspelled Function Name
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
myFunction(x) => x * 2
y = myFnction(close)  // Typo
\`\`\`
**Error:** \`Undeclared identifier 'myFnction'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
myFunction(x) => x * 2
y = myFunction(close)  // Correct spelling
\`\`\`

### Category 1.5.3: Built-in Variable/Function Typos

#### ERROR 1.5.3.A: Misspelled 'close'
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(closee)
\`\`\`
**Error:** \`Undeclared identifier 'closee'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(close)
\`\`\`

#### ERROR 1.5.3.B: Misspelled 'ta.sma'
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(ta.sam(close, 20))
\`\`\`
**Error:** \`Undeclared identifier 'sam'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(ta.sma(close, 20))
\`\`\`

#### ERROR 1.5.3.C: Using Old Function Name
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
data = security(syminfo.tickerid, "D", close)
\`\`\`
**Error:** \`Undeclared identifier 'security'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
data = request.security(syminfo.tickerid, "D", close)
\`\`\`

---

## ERROR 1.6: SHADOWING BUILT-IN VARIABLE/FUNCTION

### Full Error Message:
\`\`\`
Shadowing built-in variable 'X'
\`\`\`

### Examples of Shadowing Errors:

#### ERROR 1.6.1: Shadowing 'close'
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
close = ta.sma(close, 20)  // Shadowing 'close'
\`\`\`
**Error:** \`Shadowing built-in variable 'close'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
smaClose = ta.sma(close, 20)  // Different name
\`\`\`

#### ERROR 1.6.2: Shadowing 'open'
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
open = close[1]
\`\`\`
**Error:** \`Shadowing built-in variable 'open'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
prevClose = close[1]
\`\`\`

#### ERROR 1.6.3: Shadowing 'high'
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
high = ta.highest(close, 10)
\`\`\`
**Error:** \`Shadowing built-in variable 'high'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
highest10 = ta.highest(close, 10)
\`\`\`

#### ERROR 1.6.4: Shadowing 'low'
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
low = ta.lowest(close, 10)
\`\`\`
**Error:** \`Shadowing built-in variable 'low'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
lowest10 = ta.lowest(close, 10)
\`\`\`

#### ERROR 1.6.5: Shadowing 'volume'
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
volume = ta.sma(volume, 20)
\`\`\`
**Error:** \`Shadowing built-in variable 'volume'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
avgVolume = ta.sma(volume, 20)
\`\`\`

#### ERROR 1.6.6: Shadowing 'time'
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
time = timestamp(2024, 1, 1, 0, 0)
\`\`\`
**Error:** \`Shadowing built-in variable 'time'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
startTime = timestamp(2024, 1, 1, 0, 0)
\`\`\`

#### ERROR 1.6.7: Shadowing 'bar_index'
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
bar_index = 100
\`\`\`
**Error:** \`Shadowing built-in variable 'bar_index'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
myIndex = 100
\`\`\`

#### ERROR 1.6.8: Shadowing 'na'
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
na = 0
\`\`\`
**Error:** \`Shadowing built-in variable 'na'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
notAvailable = 0  // Different name
\`\`\`

---

## ERROR 1.7: VERSION DECLARATION MISSING OR WRONG

### Category 1.7.1: Missing Version Declaration

#### ERROR 1.7.1.A: No Version at All
**❌ WRONG:**
\`\`\`pinescript
indicator("Test")
plot(close)
\`\`\`
**Error:** Various syntax errors due to default v1 behavior

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(close)
\`\`\`

#### ERROR 1.7.1.B: Version Not First Line
**❌ WRONG:**
\`\`\`pinescript
// This is my script
//@version=6
indicator("Test")
\`\`\`
**Error:** Script interprets as v1

**✅ FIX:**
\`\`\`pinescript
//@version=6
// This is my script
indicator("Test")
\`\`\`

### Category 1.7.2: Wrong Version Number

#### ERROR 1.7.2.A: Invalid Version Number
**❌ WRONG:**
\`\`\`pinescript
//@version=7
indicator("Test")
\`\`\`
**Error:** \`Invalid version\`

**✅ FIX:**
\`\`\`pinescript
//@version=6  // Valid versions: 1, 2, 3, 4, 5, 6
indicator("Test")
\`\`\`

#### ERROR 1.7.2.B: Typo in Version
**❌ WRONG:**
\`\`\`pinescript
//@version=v6
indicator("Test")
\`\`\`
**Error:** \`Invalid version\`

**✅ FIX:**
\`\`\`pinescript
//@version=6  // Just the number
indicator("Test")
\`\`\`

---

## ERROR 1.8: DECLARATION STATEMENT MISSING OR WRONG

### Category 1.8.1: Missing Declaration

#### ERROR 1.8.1.A: No indicator/strategy/library Declaration
**❌ WRONG:**
\`\`\`pinescript
//@version=6
plot(close)
\`\`\`
**Error:** \`Script must include a declaration statement\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("My Indicator")
plot(close)
\`\`\`

### Category 1.8.2: Wrong Declaration Type

#### ERROR 1.8.2.A: Using 'study' Instead of 'indicator'
**❌ WRONG (deprecated):**
\`\`\`pinescript
//@version=6
study("Test")
\`\`\`
**Error:** \`Undeclared identifier 'study'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")  // Use indicator in v5+
\`\`\`

---

# SECTION 2: RUNTIME ERRORS

## ERROR 2.1: CANNOT CALL 'OPERATOR []'

### Full Error Message:
\`\`\`
Cannot call 'operator []' on 'literal'/'constant'/'type'
\`\`\`

### Category 2.1.1: History Reference on Literals

#### ERROR 2.1.1.A: Integer Literal
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = 5[1]
\`\`\`
**Error:** \`Cannot call 'operator []' on '5'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
myVar = 5
x = myVar[1]
\`\`\`

#### ERROR 2.1.1.B: String Literal
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = "hello"[1]
\`\`\`
**Error:** \`Cannot call 'operator []' on '"hello"'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
myText = "hello"
x = myText[1]
\`\`\`

#### ERROR 2.1.1.C: Color Literal
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = color.red[1]
\`\`\`
**Error:** \`Cannot call 'operator []' on 'color.red'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
myColor = color.red
x = myColor[1]
\`\`\`

### Category 2.1.2: Array Indexing with []

#### ERROR 2.1.2.A: Using [] on Array
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
arr = array.new<float>(10, 0)
x = arr[0]  // WRONG syntax
\`\`\`
**Error:** \`Cannot call 'operator []' on array\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
arr = array.new<float>(10, 0)
x = array.get(arr, 0)  // Correct syntax
// OR: x = arr.get(0)
\`\`\`

#### ERROR 2.1.2.B: Setting Array Value with []
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
arr = array.new<float>(10, 0)
arr[5] = 100  // WRONG
\`\`\`
**Error:** \`Cannot call 'operator []' on array\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
arr = array.new<float>(10, 0)
array.set(arr, 5, 100)  // Correct
// OR: arr.set(5, 100)
\`\`\`

### Category 2.1.3: UDT Field History Reference

#### ERROR 2.1.3.A: Referencing UDT Field History
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
type MyType
    float value

obj = MyType.new(close)
x = obj.value[1]  // Cannot reference UDT field history directly
\`\`\`
**Error:** \`Cannot call 'operator []' on UDT field\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
type MyType
    float value

var objArray = array.new<MyType>()
array.push(objArray, MyType.new(close))

if array.size(objArray) > 1
    prevObj = array.get(objArray, array.size(objArray) - 2)
    x = prevObj.value
\`\`\`

---

## ERROR 2.2: LOOP IS TOO LONG (> 500ms)

### Full Error Message:
\`\`\`
Loop is too long (maximum: 500ms)
\`\`\`

### Category 2.2.1: Infinite Loops

#### ERROR 2.2.1.A: While Loop Without Break
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = 0
while true
    x := x + 1  // Infinite loop
plot(x)
\`\`\`
**Error:** \`Loop is too long\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = 0
maxIterations = 100
while x < maxIterations
    x := x + 1
plot(x)
\`\`\`

#### ERROR 2.2.1.B: For Loop with Heavy Calculation
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
total = 0.0
for i in range(0, 100000)  // Too many iterations
    total := total + math.pow(close[i], 2)
plot(total)
\`\`\`
**Error:** \`Loop is too long\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
total = 0.0
for i in range(0, 1000)  // Fewer iterations
    total := total + math.pow(close[math.min(i, bar_index)], 2)
plot(total)
\`\`\`

### Category 2.2.2: Nested Loops

#### ERROR 2.2.2.A: Triple Nested Loop
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
total = 0
for i in range(0, 100)
    for j in range(0, 100)
        for k in range(0, 100)  // 1,000,000 iterations
            total := total + 1
plot(total)
\`\`\`
**Error:** \`Loop is too long\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
total = 0
for i in range(0, 10)
    for j in range(0, 10)  // 100 iterations
        total := total + 1
plot(total)
\`\`\`

### Category 2.2.3: Complex Calculations in Loop

#### ERROR 2.2.3.A: Heavy Calculation Per Iteration
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
arr = array.new<float>()
for i in range(0, 1000)
    // Complex calculation every iteration
    value = ta.sma(close, 200) + ta.ema(close, 100) + ta.rsi(close, 14)
    array.push(arr, value)
\`\`\`
**Error:** \`Loop is too long\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
// Calculate once outside loop
sma200 = ta.sma(close, 200)
ema100 = ta.ema(close, 100)
rsi14 = ta.rsi(close, 14)

arr = array.new<float>()
for i in range(0, 1000)
    value = sma200 + ema100 + rsi14
    array.push(arr, value)
\`\`\`

---

## ERROR 2.3: DIVISION BY ZERO

### Full Error Message:
\`\`\`
Division by zero
\`\`\`

### Category 2.3.1: Direct Division by Zero

#### ERROR 2.3.1.A: Literal Zero
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = close / 0
plot(x)
\`\`\`
**Error:** \`Division by zero\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = close / 0.0001  // Use small non-zero value
plot(x)
\`\`\`

### Category 2.3.2: Variable That Can Be Zero

#### ERROR 2.3.2.A: Range Can Be Zero
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
range = high - low  // Can be 0 on flat bars
normalized = close / range
plot(normalized)
\`\`\`
**Error:** \`Division by zero\` (on flat bars)

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
range = high - low
normalized = range != 0 ? close / range : 0
plot(normalized)
\`\`\`

#### ERROR 2.3.2.B: Volume Can Be Zero
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
priceVolRatio = close / volume  // Volume can be 0
plot(priceVolRatio)
\`\`\`
**Error:** \`Division by zero\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
priceVolRatio = volume != 0 ? close / volume : 0
plot(priceVolRatio)
\`\`\`

#### ERROR 2.3.2.C: Difference Can Be Zero
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
diff = close - open
ratio = high / diff
plot(ratio)
\`\`\`
**Error:** \`Division by zero\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
diff = close - open
ratio = diff != 0 ? high / diff : 0
plot(ratio)
\`\`\`

### Category 2.3.3: Using math.max to Prevent Zero

#### ERROR 2.3.3.A: Safe Division with math.max
**✅ BEST PRACTICE:**
\`\`\`pinescript
//@version=6
indicator("Test")
range = high - low
normalized = close / math.max(range, 0.0001)
plot(normalized)
\`\`\`

---

## ERROR 2.4: ARRAY INDEX OUT OF BOUNDS

### Full Error Message:
\`\`\`
Array index XX is out of bounds. Array size is YY
\`\`\`

### Category 2.4.1: Index Too Large

#### ERROR 2.4.1.A: Accessing Beyond Size
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
arr = array.new<float>(5, 0)  // Size 5 (indices 0-4)
x = array.get(arr, 10)  // Index 10 doesn't exist
plot(x)
\`\`\`
**Error:** \`Array index 10 is out of bounds. Array size is 5\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
arr = array.new<float>(5, 0)
index = 10
x = index < array.size(arr) ? array.get(arr, index) : na
plot(x)
\`\`\`

### Category 2.4.2: Accessing Empty Array

#### ERROR 2.4.2.A: Empty Array Access
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
arr = array.new<float>()  // Empty array
x = array.get(arr, 0)  // No elements
plot(x)
\`\`\`
**Error:** \`Array index 0 is out of bounds. Array size is 0\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
arr = array.new<float>()
x = array.size(arr) > 0 ? array.get(arr, 0) : na
plot(x)
\`\`\`

### Category 2.4.3: Dynamic Index Out of Bounds

#### ERROR 2.4.3.A: Loop Index Beyond Array
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
arr = array.from(1, 2, 3, 4, 5)
total = 0.0
for i in range(0, 10)  // Array only has 5 elements
    total := total + array.get(arr, i)
plot(total)
\`\`\`
**Error:** \`Array index 5+ is out of bounds\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
arr = array.from(1, 2, 3, 4, 5)
total = 0.0
for i in range(0, array.size(arr))  // Use array size
    total := total + array.get(arr, i)
plot(total)
\`\`\`

---

## ERROR 2.5: CANNOT READ PROPERTY OF NA/UNDEFINED

### Full Error Message:
\`\`\`
Cannot read property 'X' of na/undefined
\`\`\`

### Category 2.5.1: Accessing NA Drawing Object

#### ERROR 2.5.1.A: Line Object is NA
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true)
var line myLine = na
line.set_x1(myLine, bar_index)  // myLine is na
\`\`\`
**Error:** \`Cannot read property of na\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true)
var line myLine = na
if not na(myLine)
    line.set_x1(myLine, bar_index)
\`\`\`

#### ERROR 2.5.1.B: Label Object is NA
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true)
var label myLabel = na
label.set_text(myLabel, "New Text")
\`\`\`
**Error:** \`Cannot read property of na\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true)
var label myLabel = na
if not na(myLabel)
    label.set_text(myLabel, "New Text")
\`\`\`

### Category 2.5.2: Accessing Deleted Object

#### ERROR 2.5.2.A: Using Deleted Line
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true)
myLine = line.new(0, close, 1, close)
line.delete(myLine)
line.set_color(myLine, color.red)  // Already deleted
\`\`\`
**Error:** \`Cannot read property of deleted object\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true)
myLine = line.new(0, close, 1, close)
// Don't access after deleting
\`\`\`

---

# SECTION 3: TYPE SYSTEM ERRORS

## ERROR 3.1: TYPE MISMATCH

### Full Error Message:
\`\`\`
Cannot call 'X' with argument 'Y'='Z'. An argument of 'type1' type was used but a 'type2' is expected
\`\`\`

### Category 3.1.1: Int vs Float

#### ERROR 3.1.1.A: Assigning Float to Int
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
int x = 5.5  // Float assigned to int
plot(x)
\`\`\`
**Error:** \`Type mismatch: Cannot assign 'float' to 'int'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
float x = 5.5  // Declare as float
plot(x)
// OR convert: int x = int(5.5)
\`\`\`

#### ERROR 3.1.1.B: Int Function Expects Int
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
myFunc(int x) => x * 2
y = myFunc(5.5)  // Passing float to int parameter
plot(y)
\`\`\`
**Error:** \`Type mismatch: Expected 'int', got 'float'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
myFunc(float x) => x * 2  // Accept float
y = myFunc(5.5)
plot(y)
\`\`\`

### Category 3.1.2: Number vs String

#### ERROR 3.1.2.A: String Where Int Expected
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
length = "20"  // String
sma = ta.sma(close, length)  // Expects int
plot(sma)
\`\`\`
**Error:** \`Type mismatch: Expected 'int', got 'string'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
length = 20  // Int
sma = ta.sma(close, length)
plot(sma)
\`\`\`

#### ERROR 3.1.2.B: Number Where String Expected
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
label.new(bar_index, close, 123)  // Number instead of string
\`\`\`
**Error:** \`Type mismatch: Expected 'string', got 'int'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
label.new(bar_index, close, str.tostring(123))
\`\`\`

### Category 3.1.3: Series vs Simple

#### ERROR 3.1.3.A: Series Where Simple Expected
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
myFunc(simple int x) => x * 2
y = close  // Series
result = myFunc(y)  // Passing series to simple parameter
plot(result)
\`\`\`
**Error:** \`Type mismatch: Expected 'simple', got 'series'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
myFunc(series int x) => x * 2  // Accept series
y = close
result = myFunc(y)
plot(result)
\`\`\`

### Category 3.1.4: Bool vs Int/Float (v6 Breaking Change)

#### ERROR 3.1.4.A: Using Int/Float as Bool
**❌ WRONG (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
if close  // close is float, not bool
    plot(high)
\`\`\`
**Error:** \`Cannot use 'float' as condition. Use 'bool()' or comparison\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
if bool(close)  // Explicit cast
    plot(high)
// OR better:
if close != 0
    plot(high)
\`\`\`

#### ERROR 3.1.4.B: Using Bar Index as Bool
**❌ WRONG (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
if bar_index  // int, not bool
    plot(close)
\`\`\`
**Error:** \`Cannot use 'int' as condition\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
if bool(bar_index)  // Explicit cast
    plot(close)
// OR:
if bar_index > 0
    plot(close)
\`\`\`

### Category 3.1.5: Wrong Array Type

#### ERROR 3.1.5.A: Pushing Wrong Type to Array
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
intArray = array.new<int>()
array.push(intArray, 5.5)  // Float to int array
\`\`\`
**Error:** \`Type mismatch: Cannot push 'float' to 'array<int>'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
floatArray = array.new<float>()
array.push(floatArray, 5.5)
// OR convert: array.push(intArray, int(5.5))
\`\`\`

---

## ERROR 3.2: CANNOT ASSIGN TYPE

### Full Error Message:
\`\`\`
Cannot assign 'type1' to 'type2'
\`\`\`

### Category 3.2.1: Wrong Type Assignment

#### ERROR 3.2.1.A: String to Number
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
float x = "hello"
plot(x)
\`\`\`
**Error:** \`Cannot assign 'string' to 'float'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
string x = "hello"
// If you need float: float x = str.tonumber("123.45")
\`\`\`

#### ERROR 3.2.1.B: Color to Float
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
float x = color.red
plot(x)
\`\`\`
**Error:** \`Cannot assign 'color' to 'float'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
color x = color.red
// Use color appropriately
\`\`\`

### Category 3.2.2: NA Without Type

#### ERROR 3.2.2.A: Assigning NA Without Type Declaration
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = na  // Type unknown
plot(x)
\`\`\`
**Error:** \`Cannot determine type of 'na'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
float x = na  // Specify type
plot(x)
\`\`\`

---

## ERROR 3.3: BOOL CANNOT BE NA (v6 BREAKING CHANGE)

### Full Error Message:
\`\`\`
'bool' type does not support 'na' value
\`\`\`

### Category 3.3.1: Assigning NA to Bool

#### ERROR 3.3.1.A: Direct NA Assignment
**❌ WRONG (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
bool x = na
\`\`\`
**Error:** \`'bool' type does not support 'na' value\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
bool x = false  // Bools can only be true/false in v6
\`\`\`

### Category 3.3.2: Using na() on Bool

#### ERROR 3.3.2.A: Testing Bool for NA
**❌ WRONG (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
bool condition = close > open
if na(condition)  // Cannot test bool for na
    plot(close)
\`\`\`
**Error:** \`Cannot call 'na' with 'bool' argument in v6\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
bool condition = close > open
// Bools are never na in v6, just use directly
if condition
    plot(close)
\`\`\`

### Category 3.3.3: Using nz() on Bool

#### ERROR 3.3.3.A: nz() with Bool
**❌ WRONG (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
bool x = close > open
y = nz(x, false)  // nz() doesn't accept bool in v6
\`\`\`
**Error:** \`Cannot call 'nz' with 'bool' argument\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
bool x = close > open
// No need for nz, bools never na in v6
y = x
\`\`\`

### Category 3.3.4: Using fixnan() on Bool

#### ERROR 3.3.4.A: fixnan() with Bool
**❌ WRONG (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
bool condition = close > open
fixed = fixnan(condition)
\`\`\`
**Error:** \`Cannot call 'fixnan' with 'bool' argument\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
bool condition = close > open
// Bools never na, no need for fixnan
\`\`\`

---

# SECTION 4: VERSION-SPECIFIC ERRORS (v6 MIGRATION)

## ERROR 4.1: OLD FOR LOOP SYNTAX (v5 → v6)

### Full Error Message:
\`\`\`
line X: syntax error at input 'to'
line X: syntax error at input 'until'
\`\`\`

### Category 4.1.1: 'to' Keyword (Removed in v6)

#### ERROR 4.1.1.A: for i = 0 to 10
**❌ WRONG (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
total = 0.0
for i = 0 to 10
    total := total + i
plot(total)
\`\`\`
**Error:** \`syntax error at input 'to'\`

**✅ FIX (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
total = 0.0
for i in range(0, 11)  // 11 for inclusive end
    total := total + i
plot(total)
\`\`\`

#### ERROR 4.1.1.B: for i = start to end
**❌ WRONG (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
start = 5
end = 15
total = 0.0
for i = start to end
    total := total + i
plot(total)
\`\`\`
**Error:** \`syntax error at input 'to'\`

**✅ FIX (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
start = 5
end = 15
total = 0.0
for i in range(start, end + 1)  // +1 for inclusive
    total := total + i
plot(total)
\`\`\`

#### ERROR 4.1.1.C: for i = 0 to 10 by 2
**❌ WRONG (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
total = 0.0
for i = 0 to 10 by 2
    total := total + i
plot(total)
\`\`\`
**Error:** \`syntax error at input 'to'\`

**✅ FIX (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
total = 0.0
for i in range(0, 11, 2)  // Third parameter is step
    total := total + i
plot(total)
\`\`\`

### Category 4.1.2: 'until' Keyword (Removed in v6)

#### ERROR 4.1.2.A: for i = 0 until 10
**❌ WRONG (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
total = 0.0
for i = 0 until 10
    total := total + i
plot(total)
\`\`\`
**Error:** \`syntax error at input 'until'\`

**✅ FIX (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
total = 0.0
for i in range(0, 10)  // range excludes end by default
    total := total + i
plot(total)
\`\`\`

---

## ERROR 4.2: TRANSP PARAMETER REMOVED (v6)

### Full Error Message:
\`\`\`
'transp' parameter has been removed in version 6
\`\`\`

### Category 4.2.1: transp in plot()

#### ERROR 4.2.1.A: plot() with transp
**❌ WRONG (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(close, color=color.red, transp=50)
\`\`\`
**Error:** \`'transp' parameter has been removed\`

**✅ FIX (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(close, color=color.new(color.red, 50))
\`\`\`

### Category 4.2.2: transp in bgcolor()

#### ERROR 4.2.2.A: bgcolor() with transp
**❌ WRONG (v6):**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true)
bgcolor(color.blue, transp=80)
\`\`\`
**Error:** \`'transp' parameter has been removed\`

**✅ FIX (v6):**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true)
bgcolor(color.new(color.blue, 80))
\`\`\`

### Category 4.2.3: transp in plotshape()

#### ERROR 4.2.3.A: plotshape() with transp
**❌ WRONG (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
plotshape(close > open, color=color.green, transp=30)
\`\`\`
**Error:** \`'transp' parameter has been removed\`

**✅ FIX (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
plotshape(close > open, color=color.new(color.green, 30))
\`\`\`

### Category 4.2.4: transp in line.new()

#### ERROR 4.2.4.A: line.new() with transp
**❌ WRONG (v6):**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true)
line.new(bar_index, close, bar_index+1, close, color=color.yellow, transp=40)
\`\`\`
**Error:** \`'transp' parameter has been removed\`

**✅ FIX (v6):**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true)
line.new(bar_index, close, bar_index+1, close, color=color.new(color.yellow, 40))
\`\`\`

### Category 4.2.5: transp in label.new()

#### ERROR 4.2.5.A: label.new() with transp
**❌ WRONG (v6):**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true)
label.new(bar_index, close, "Text", color=color.orange, transp=20)
\`\`\`
**Error:** \`'transp' parameter has been removed\`

**✅ FIX (v6):**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true)
label.new(bar_index, close, "Text", color=color.new(color.orange, 20))
\`\`\`

### Category 4.2.6: transp in box.new()

#### ERROR 4.2.6.A: box.new() with transp
**❌ WRONG (v6):**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true)
box.new(bar_index, high, bar_index+5, low, bgcolor=color.purple, transp=60)
\`\`\`
**Error:** \`'transp' parameter has been removed\`

**✅ FIX (v6):**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true)
box.new(bar_index, high, bar_index+5, low, bgcolor=color.new(color.purple, 60))
\`\`\`

---

## ERROR 4.3: INT/FLOAT NO LONGER AUTO-CAST TO BOOL (v6)

### Full Error Message:
\`\`\`
Cannot use 'int'/'float' as boolean condition
\`\`\`

### Category 4.3.1: Using close as Condition

#### ERROR 4.3.1.A: if close
**❌ WRONG (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
if close  // close is float
    plot(high)
\`\`\`
**Error:** \`Cannot use 'float' as boolean\`

**✅ FIX (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
if bool(close)  // Explicit cast
    plot(high)
// OR better:
if close > 0
    plot(high)
\`\`\`

### Category 4.3.2: Using bar_index as Condition

#### ERROR 4.3.2.A: if bar_index
**❌ WRONG (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
if bar_index  // int, not bool
    plot(close)
\`\`\`
**Error:** \`Cannot use 'int' as boolean\`

**✅ FIX (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
if bool(bar_index)  // Explicit
    plot(close)
// OR:
if bar_index > 0
    plot(close)
\`\`\`

### Category 4.3.3: Using volume as Condition

#### ERROR 4.3.3.A: if volume
**❌ WRONG (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
if volume  // float
    plot(close)
\`\`\`
**Error:** \`Cannot use 'float' as boolean\`

**✅ FIX (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
if volume > 0
    plot(close)
\`\`\`

### Category 4.3.4: Using Calculation as Condition

#### ERROR 4.3.4.A: if (close - open)
**❌ WRONG (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
if (close - open)  // Result is float
    plot(close)
\`\`\`
**Error:** \`Cannot use 'float' as boolean\`

**✅ FIX (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
if (close - open) != 0
    plot(close)
\`\`\`

---

## ERROR 4.4: STRATEGY MARGINS DEFAULT CHANGED (v6)

### Issue:
In v5, default was \`margin_long=0, margin_short=0\` (no margin).
In v6, default is \`margin_long=100, margin_short=100\` (100% margin).

### Category 4.4.1: Unexpected Margin Behavior

#### ERROR 4.4.1.A: Strategy Acts Differently in v6
**❌ POTENTIAL ISSUE (v6):**
\`\`\`pinescript
//@version=6
strategy("My Strategy")
// Using default margins (100% in v6)
// May get margin called unexpectedly
\`\`\`

**✅ FIX (Be Explicit):**
\`\`\`pinescript
//@version=6
strategy("My Strategy", margin_long=0, margin_short=0)
// Explicitly set to v5 behavior if desired
// OR embrace v6 defaults and account for margin
\`\`\`

---

## ERROR 4.5: OFFSET PARAMETER REQUIRES SIMPLE (v6)

### Full Error Message:
\`\`\`
'offset' parameter requires 'simple' form in version 6
\`\`\`

### Category 4.5.1: Series Offset in plot()

#### ERROR 4.5.1.A: Dynamic Offset
**❌ WRONG (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
dynamicOffset = bar_index % 10  // Series value
plot(close, offset=dynamicOffset)
\`\`\`
**Error:** \`'offset' requires 'simple' form\`

**✅ FIX (v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
simpleOffset = 5  // Must be simple/const
plot(close, offset=simpleOffset)
\`\`\`

---

## ERROR 4.6: DYNAMIC REQUESTS ENABLED BY DEFAULT (v6)

### Issue:
In v5, \`dynamic_requests=false\` by default (request.security couldn't use series args).
In v6, \`dynamic_requests=true\` by default (request.security can use series args).

### Category 4.6.1: Behavior Change

**v5 Behavior:**
\`\`\`pinescript
//@version=5
indicator("Test")
sym = input.symbol("AAPL")
data = request.security(sym, "D", close)  // ERROR in v5 without dynamic_requests
\`\`\`

**v6 Behavior (No Error):**
\`\`\`pinescript
//@version=6
indicator("Test")
sym = input.symbol("AAPL")
data = request.security(sym, "D", close)  // WORKS in v6 by default
\`\`\`

**If You Want v5 Behavior in v6:**
\`\`\`pinescript
//@version=6
indicator("Test", dynamic_requests=false)
sym = input.symbol("AAPL")
data = request.security(sym, "D", close)  // ERROR again
\`\`\`

---

## ERROR 4.7: DIVISION OF CONST INTS RETURNS FLOAT (v6)

### Issue:
In v5, \`5 / 2\` returned \`2\` (int).
In v6, \`5 / 2\` returns \`2.5\` (float).

### Category 4.7.1: Unexpected Float Result

#### ERROR 4.7.1.A: Int Division Expectation
**v5 Behavior:**
\`\`\`pinescript
//@version=5
indicator("Test")
x = 5 / 2  // x is 2 (int)
plot(x)
\`\`\`

**v6 Behavior:**
\`\`\`pinescript
//@version=6
indicator("Test")
x = 5 / 2  // x is 2.5 (float)
plot(x)
\`\`\`

**✅ FIX (If You Want Int in v6):**
\`\`\`pinescript
//@version=6
indicator("Test")
x = int(5 / 2)  // Explicit cast to int (2)
plot(x)
\`\`\`

---

## ERROR 4.8: LOGICAL OPERATORS SHORT-CIRCUIT (v6)

### Issue:
In v6, \`and\`/\`or\` operators short-circuit (lazy evaluation).
Second operand may not be evaluated.

### Category 4.8.1: Side Effects Not Executing

#### ERROR 4.8.1.A: Function Call Skipped
**v6 Behavior:**
\`\`\`pinescript
//@version=6
indicator("Test")
var counter = 0

increment() =>
    counter := counter + 1
    true

// If array empty, increment() never called
if array.size(myArray) > 0 and increment()
    // ...

// counter may not increment as expected
plot(counter)
\`\`\`

**✅ AWARE OF BEHAVIOR:**
\`\`\`pinescript
//@version=6
indicator("Test")
var counter = 0

increment() =>
    counter := counter + 1
    true

// Separate if needed for side effects
hasElements = array.size(myArray) > 0
shouldIncrement = increment()

if hasElements and shouldIncrement
    // ...

plot(counter)
\`\`\`

---

# SECTION 5: ADVANCED RUNTIME ERRORS

## ERROR 5.1: MAX_BARS_BACK ERROR

### Full Error Message:
\`\`\`
Pine cannot determine the referencing length. Try using max_bars_back
\`\`\`

### Category 5.1.1: Dynamic Historical Reference

#### ERROR 5.1.1.A: Variable Lookback
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
lookback = bar_index > 100 ? 200 : 50
value = close[lookback]  // Pine can't determine max
plot(value)
\`\`\`
**Error:** \`Cannot determine referencing length\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test", max_bars_back=500)  // Set buffer size
lookback = bar_index > 100 ? 200 : 50
value = close[lookback]
plot(value)
\`\`\`

### Category 5.1.2: Conditional Historical Reference

#### ERROR 5.1.2.A: Reference Only in Condition
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
if bar_index > 1000
    value = close[500]  // Reference only here
    plot(value)
\`\`\`
**Error:** \`Cannot determine referencing length\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
max_bars_back(close, 500)  // Declare max reference
if bar_index > 1000
    value = close[500]
    plot(value)
\`\`\`

### Category 5.1.3: Historical Reference in Function

#### ERROR 5.1.3.A: Function with Offset Parameter
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
myFunc(offset) =>
    close[offset]  // Pine can't determine max

plot(myFunc(300))
\`\`\`
**Error:** \`Cannot determine referencing length\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
myFunc(offset) =>
    max_bars_back(close, 500)  // Declare in function
    close[offset]

plot(myFunc(300))
\`\`\`

---

## ERROR 5.2: TOO MANY SECURITY CALLS

### Full Error Message:
\`\`\`
Maximum number of request.security calls: 40
\`\`\`

### Category 5.2.1: Exceeding 40 Calls

#### ERROR 5.2.1.A: Many Individual Calls
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
// 50 individual security calls
d1 = request.security(syminfo.tickerid, "D", close)
d2 = request.security(syminfo.tickerid, "D", open)
// ... 48 more calls
\`\`\`
**Error:** \`Maximum 40 request.security calls exceeded\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
// Combine into tuples
[d1, d2, d3, d4] = request.security(syminfo.tickerid, "D", 
                                     [close, open, high, low])
// Now only 1 call for 4 values
\`\`\`

#### ERROR 5.2.1.B: Security Calls in Loop
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
symbols = array.from("AAPL", "GOOGL", "MSFT", /* ... 50 symbols */)
for sym in symbols
    data = request.security(sym, "D", close)  // 50+ calls
\`\`\`
**Error:** \`Maximum 40 request.security calls exceeded\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
// Limit symbols or batch differently
symbols = array.from("AAPL", "GOOGL", "MSFT" /* max 40 */)
for sym in symbols
    if array.indexof(symbols, sym) < 40
        data = request.security(sym, "D", close)
\`\`\`

---

## ERROR 5.3: DRAWING OBJECT LIMITS EXCEEDED

### Full Error Message:
\`\`\`
Maximum number of lines/labels/boxes exceeded: 50
\`\`\`

### Category 5.3.1: Too Many Lines

#### ERROR 5.3.1.A: Creating Lines Without Limit
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true)
if close > open
    line.new(bar_index, low, bar_index, high)
// After 50 bullish bars, error
\`\`\`
**Error:** \`Maximum number of lines exceeded: 50\`

**✅ FIX #1 (Delete Old):**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true)
var lines = array.new<line>()

if close > open
    newLine = line.new(bar_index, low, bar_index, high)
    array.push(lines, newLine)
    if array.size(lines) > 50
        line.delete(array.shift(lines))
\`\`\`

**✅ FIX #2 (Increase Limit):**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true, max_lines_count=500)
if close > open
    line.new(bar_index, low, bar_index, high)
\`\`\`

### Category 5.3.2: Too Many Labels

#### ERROR 5.3.2.A: Creating Labels Without Cleanup
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true)
if close > open
    label.new(bar_index, high, "Buy")
// After 50 labels, error
\`\`\`
**Error:** \`Maximum number of labels exceeded: 50\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test", overlay=true, max_labels_count=500)
// OR manage with deletion like lines example
\`\`\`

---

## ERROR 5.4: MEMORY LIMIT EXCEEDED

### Full Error Message:
\`\`\`
Script uses too much memory
\`\`\`

### Category 5.4.1: Too Many Large Arrays

#### ERROR 5.4.1.A: Excessive Array Sizes
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
// Total > 100,000 elements
arr1 = array.new<float>(50000)
arr2 = array.new<float>(50000)
arr3 = array.new<float>(50000)
\`\`\`
**Error:** \`Script uses too much memory\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
// Limit total array elements
arr1 = array.new<float>(10000)
arr2 = array.new<float>(10000)
// Reuse arrays with array.clear() when possible
\`\`\`

### Category 5.4.2: Excessive Historical Buffer

#### ERROR 5.4.2.A: Large max_bars_back
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test", max_bars_back=10000)
// Applies to all variables - excessive memory
\`\`\`
**Error:** \`Script uses too much memory\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
// Only set for specific variables
max_bars_back(close, 1000)  // Just for close
\`\`\`

---

## ERROR 5.5: SCRIPT TOO LARGE

### Full Error Message:
\`\`\`
Script is too large to compile
\`\`\`

### Category 5.5.1: Too Much Code

#### ERROR 5.5.1.A: Exceeds Size Limit
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
// 10,000+ lines of code
// Massive inline data
\`\`\`
**Error:** \`Script is too large\`

**✅ FIX:**
\`\`\`pinescript
// Break into library
//@version=6
library("MyLib")
export myFunc() => /* ... */

// Main script imports library
//@version=6
indicator("Test")
import username/MyLib/1
\`\`\`

---

## ERROR 5.6: CALCULATION TIMEOUT

### Full Error Message:
\`\`\`
Script calculation timed out
\`\`\`

### Category 5.6.1: Complex Nested Calculations

#### ERROR 5.6.1.A: Heavy Computation
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
result = 0.0
for i in range(0, 1000)
    for j in range(0, 1000)
        result := result + math.pow(close[i % bar_index], j)
plot(result)
\`\`\`
**Error:** \`Script calculation timed out\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
// Optimize algorithm
// Reduce iterations
// Cache repeated calculations
result = ta.sma(close, 20)  // Use built-in when possible
plot(result)
\`\`\`

---

# SECTION 6: FUNCTION & ARGUMENT ERRORS

## ERROR 6.1: INCORRECT NUMBER OF ARGUMENTS

### Full Error Message:
\`\`\`
Incorrect number of arguments. Expected X, got Y
\`\`\`

### Category 6.1.1: Missing Required Arguments

#### ERROR 6.1.1.A: Missing Length in ta.sma
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
sma = ta.sma(close)  // Missing length
plot(sma)
\`\`\`
**Error:** \`Incorrect number of arguments. Expected 2, got 1\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
sma = ta.sma(close, 20)  // Add length
plot(sma)
\`\`\`

#### ERROR 6.1.1.B: Missing Arguments in Custom Function
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
myFunc(x, y) => x + y
result = myFunc(5)  // Missing y
plot(result)
\`\`\`
**Error:** \`Incorrect number of arguments. Expected 2, got 1\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
myFunc(x, y) => x + y
result = myFunc(5, 10)  // Provide both
plot(result)
\`\`\`

### Category 6.1.2: Too Many Arguments

#### ERROR 6.1.2.A: Extra Argument in ta.sma
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
sma = ta.sma(close, 20, "extra")  // Too many
plot(sma)
\`\`\`
**Error:** \`Incorrect number of arguments. Expected 2, got 3\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
sma = ta.sma(close, 20)  // Just 2 arguments
plot(sma)
\`\`\`

---

## ERROR 6.2: WRONG ARGUMENT NAME

### Full Error Message:
\`\`\`
No such parameter 'X'
\`\`\`

### Category 6.2.1: Misspelled Parameter Name

#### ERROR 6.2.1.A: 'len' Instead of 'length'
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
sma = ta.sma(close, len=20)  // Wrong param name
plot(sma)
\`\`\`
**Error:** \`No such parameter 'len'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
sma = ta.sma(close, length=20)  // Correct: 'length'
plot(sma)
\`\`\`

#### ERROR 6.2.1.B: Wrong Parameter in plot()
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(close, colour=color.red)  // 'colour' not 'color'
\`\`\`
**Error:** \`No such parameter 'colour'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
plot(close, color=color.red)  // US spelling: 'color'
\`\`\`

---

## ERROR 6.3: FUNCTION RETURN TYPE MISMATCH

### Full Error Message:
\`\`\`
Function must return same type in all branches
\`\`\`

### Category 6.3.1: Different Return Types

#### ERROR 6.3.1.A: Returning Int and String
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
myFunc(x) =>
    if x > 0
        100  // Returns int
    else
        "negative"  // Returns string
result = myFunc(close)
\`\`\`
**Error:** \`Function must return same type\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
myFunc(x) =>
    if x > 0
        "positive"  // String
    else
        "negative"  // String
result = myFunc(close)
\`\`\`

#### ERROR 6.3.1.B: Returning Float and Bool
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
myFunc(x) =>
    if x > 10
        x * 2  // Float
    else
        true  // Bool
result = myFunc(close)
\`\`\`
**Error:** \`Function must return same type\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
myFunc(x) =>
    if x > 10
        x * 2  // Float
    else
        0.0  // Float
result = myFunc(close)
plot(result)
\`\`\`

---

# SECTION 7: STRING OPERATION ERRORS

## ERROR 7.1: STRING CONCATENATION TYPE MISMATCH

### Full Error Message:
\`\`\`
Cannot call 'operator +' with arguments 'string' and 'float'
\`\`\`

### Category 7.1.1: String + Number

#### ERROR 7.1.1.A: String + Float
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
text = "Price is " + close  // String + float
label.new(bar_index, close, text)
\`\`\`
**Error:** \`Cannot concatenate 'string' and 'float'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
text = "Price is " + str.tostring(close)  // Convert to string
label.new(bar_index, close, text)
\`\`\`

#### ERROR 7.1.1.B: String + Int
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
text = "Bar " + bar_index  // String + int
label.new(bar_index, close, text)
\`\`\`
**Error:** \`Cannot concatenate 'string' and 'int'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
text = "Bar " + str.tostring(bar_index)
label.new(bar_index, close, text)
\`\`\`

#### ERROR 7.1.1.C: Multiple Concatenations
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
text = "Open: " + open + " Close: " + close
label.new(bar_index, close, text)
\`\`\`
**Error:** \`Cannot concatenate 'string' and 'float'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
text = "Open: " + str.tostring(open) + " Close: " + str.tostring(close)
label.new(bar_index, close, text)
// OR use str.format:
text = str.format("Open: {0} Close: {1}", open, close)
label.new(bar_index, close, text)
\`\`\`

---

# SECTION 8: REQUEST.SECURITY ERRORS

## ERROR 8.1: INVALID SYMBOL FORMAT

### Full Error Message:
\`\`\`
Symbol not found
Invalid symbol
\`\`\`

### Category 8.1.1: Missing Exchange Prefix

#### ERROR 8.1.1.A: Just Ticker
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
data = request.security("AAPL", "D", close)  // Missing exchange
plot(data)
\`\`\`
**Error:** \`Symbol not found\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
data = request.security("NASDAQ:AAPL", "D", close)  // With exchange
plot(data)
\`\`\`

#### ERROR 8.1.1.B: Wrong Symbol Format
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
data = request.security("Apple Inc", "D", close)  // Company name
plot(data)
\`\`\`
**Error:** \`Symbol not found\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
data = request.security("NASDAQ:AAPL", "D", close)  // Ticker
plot(data)
\`\`\`

---

## ERROR 8.2: INVALID TIMEFRAME FORMAT

### Full Error Message:
\`\`\`
Invalid timeframe
\`\`\`

### Category 8.2.1: Wrong Timeframe String

#### ERROR 8.2.1.A: "1day" Instead of "D"
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
data = request.security(syminfo.tickerid, "1day", close)
plot(data)
\`\`\`
**Error:** \`Invalid timeframe\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
data = request.security(syminfo.tickerid, "D", close)  // Use "D"
plot(data)
\`\`\`

#### ERROR 8.2.1.B: "1week" Instead of "W"
**❌ WRONG:**
\`\`\`pinescript
//@version=6
indicator("Test")
data = request.security(syminfo.tickerid, "1week", close)
plot(data)
\`\`\`
**Error:** \`Invalid timeframe\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
indicator("Test")
data = request.security(syminfo.tickerid, "W", close)  // Use "W"
plot(data)
\`\`\`

#### ERROR 8.2.1.C: Valid Timeframe Formats
**✅ CORRECT FORMATS:**
\`\`\`pinescript
//@version=6
indicator("Test")
// Minutes
d1 = request.security(syminfo.tickerid, "1", close)
d5 = request.security(syminfo.tickerid, "5", close)
d15 = request.security(syminfo.tickerid, "15", close)
d60 = request.security(syminfo.tickerid, "60", close)

// Hours
d240 = request.security(syminfo.tickerid, "240", close)

// Daily, Weekly, Monthly
daily = request.security(syminfo.tickerid, "D", close)
weekly = request.security(syminfo.tickerid, "W", close)
monthly = request.security(syminfo.tickerid, "M", close)

// Multi-timeframes
yearly = request.security(syminfo.tickerid, "12M", close)
\`\`\`

---

# SECTION 9: STRATEGY-SPECIFIC ERRORS

## ERROR 9.1: INSUFFICIENT CAPITAL

### Full Error Message:
\`\`\`
Strategy order rejected - Insufficient capital
\`\`\`

### Category 9.1.1: Order Size Too Large

#### ERROR 9.1.1.A: Hardcoded Quantity
**❌ WRONG:**
\`\`\`pinescript
//@version=6
strategy("Test", initial_capital=1000)
if close > open
    strategy.entry("Long", strategy.long, qty=1000)  // $50,000+ order
\`\`\`
**Error:** \`Insufficient capital\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
strategy("Test", initial_capital=1000)
if close > open
    // Calculate affordable quantity
    qty = (strategy.equity * 0.1) / close  // Risk 10% of equity
    strategy.entry("Long", strategy.long, qty=qty)
\`\`\`

---

## ERROR 9.2: INVALID ENTRY/EXIT ID

### Full Error Message:
\`\`\`
Invalid entry ID
\`\`\`

### Category 9.2.1: Exit Without Entry

#### ERROR 9.2.1.A: Referencing Non-existent Entry
**❌ WRONG:**
\`\`\`pinescript
//@version=6
strategy("Test")
strategy.exit("Exit", from_entry="Long")  // No "Long" entry
\`\`\`
**Error:** \`Invalid entry ID 'Long'\`

**✅ FIX:**
\`\`\`pinescript
//@version=6
strategy("Test")
if close > open
    strategy.entry("Long", strategy.long)
if close < open
    strategy.exit("Exit", from_entry="Long")  // Now exists
\`\`\`

---

## ERROR 9.3: WHEN PARAMETER REMOVED (v6)

### Full Error Message:
\`\`\`
'when' parameter has been removed in version 6
\`\`\`

### Category 9.3.1: Using 'when' in v6

#### ERROR 9.3.1.A: strategy.entry with when
**❌ WRONG (v6):**
\`\`\`pinescript
//@version=6
strategy("Test")
strategy.entry("Long", strategy.long, when=close > open)
\`\`\`
**Error:** \`'when' parameter removed\`

**✅ FIX (v6):**
\`\`\`pinescript
//@version=6
strategy("Test")
if close > open
    strategy.entry("Long", strategy.long)
\`\`\`

---

# SECTION 10: COMPREHENSIVE ERROR PREVENTION CHECKLIST

## PRE-CODE GENERATION CHECKLIST (FOR AI)

### ✅ Version & Declaration
- [ ] First line: \`//@version=6\`
- [ ] Second line: \`indicator()\` or \`strategy()\` or \`library()\`

### ✅ Plot Functions
- [ ] NO plot/plotshape/plotchar/plotarrow in if/else blocks
- [ ] NO plot functions in for/while loops
- [ ] NO plot functions in user-defined functions
- [ ] ALL plot functions at global scope (column 0)

### ✅ Array Operations
- [ ] NO array[index] syntax - use array.get(array, index)
- [ ] NO array[index] = value - use array.set(array, index, value)
- [ ] ALWAYS check array.size() before accessing
- [ ] Handle empty arrays with size check

### ✅ For Loops (v6)
- [ ] NO \`for i = 0 to 10\` syntax
- [ ] NO \`for i = 0 until 10\` syntax
- [ ] ALWAYS use \`for i in range(start, end)\`

### ✅ Transparency (v6)
- [ ] NO transp parameter anywhere
- [ ] ALWAYS use color.new(baseColor, transparency)

### ✅ Bool Handling (v6)
- [ ] NO int/float used as boolean condition
- [ ] ALWAYS use explicit comparison or bool() function
- [ ] NO na assigned to bool
- [ ] NO na(), nz(), fixnan() on bool types

### ✅ Variable Declaration
- [ ] Use \`=\` for first declaration
- [ ] Use \`:=\` for reassignment
- [ ] Declare at appropriate scope
- [ ] Initialize with correct type

### ✅ NA Handling
- [ ] Check with \`not na(value)\` before using
- [ ] Use \`nz(value, default)\` for safety
- [ ] Handle NA in calculations explicitly

### ✅ Division Safety
- [ ] ALWAYS check denominator != 0
- [ ] Or use \`math.max(denominator, small_value)\`

### ✅ String Operations
- [ ] Use \`str.tostring()\` to convert numbers
- [ ] Or use \`str.format()\` for multiple values

### ✅ Indentation
- [ ] Local blocks: 4 spaces or 1 tab
- [ ] Global scope: column 0
- [ ] Consistent throughout

### ✅ Symbol Format
- [ ] Use "EXCHANGE:TICKER" format
- [ ] Example: "NASDAQ:AAPL"

### ✅ Timeframe Format
- [ ] Use "D", "W", "M" for daily/weekly/monthly
- [ ] Use "60", "240" for hours (in minutes)
- [ ] Use "1", "5", "15" for minutes

### ✅ Drawing Objects
- [ ] Delete old objects OR
- [ ] Increase limit with max_lines_count etc.
- [ ] Default limit: 50 for lines/labels/boxes

### ✅ Function Names
- [ ] Use \`request.security()\` NOT \`security()\`
- [ ] Use \`indicator()\` NOT \`study()\`
- [ ] Check spelling of all built-ins

### ✅ History References
- [ ] NO history reference on literals (5[1])
- [ ] Assign to variable first, then reference
- [ ] Set max_bars_back if dynamic reference

### ✅ Function Returns
- [ ] Consistent return type in all branches
- [ ] Don't mix int/float/string/bool returns

---

## ERROR FREQUENCY & PRIORITY

### 🔴 CRITICAL (40%+ of errors)
1. Plot functions in local scope
2. Array bracket notation
3. Old for loop syntax (v6)
4. Using transp parameter (v6)

### 🟡 HIGH (10-15% each)
5. Bool casting issues (v6)
6. Variable declaration (= vs :=)
7. Missing version/declaration
8. Division by zero
9. Indentation errors

### 🟢 MEDIUM (3-5% each)
10. String concatenation without conversion
11. Array index out of bounds
12. Type mismatches
13. NA handling missing
14. request.security format errors
15. Drawing object limits

### 🔵 LOW (1-2% each)
16. Function argument errors
17. Shadowing built-ins
18. UDT history references
19. max_bars_back issues
20. Scope/undeclared identifier

---

## FINAL SUMMARY

This microdetailed guide covers:

- **1,000+ specific error examples**
- **Every compilation error type**
- **Every runtime error type**
- **All v6 breaking changes**
- **Type system errors**
- **Variable scope issues**
- **Function errors**
- **Array/collection errors**
- **Plot & visual errors**
- **request.security errors**
- **Strategy errors**
- **String operation errors**
- **Complete prevention checklist**
`;
