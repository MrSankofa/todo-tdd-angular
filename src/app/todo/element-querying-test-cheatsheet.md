# Angular Testing: Element Selection Cheatsheet

## Basic Query Methods

### querySelector() - Returns first match or null
```typescript
const compiled = fixture.nativeElement as HTMLElement;

// By ID
const element = compiled.querySelector('#myId') as HTMLElement;

// By Class
const element = compiled.querySelector('.myClass') as HTMLElement;

// By Element Name
const element = compiled.querySelector('span') as HTMLElement;

// By Attribute
const element = compiled.querySelector('[data-testid="my-test"]') as HTMLElement;
const element = compiled.querySelector('[name="username"]') as HTMLElement;

// By Attribute Value
const element = compiled.querySelector('[type="checkbox"]') as HTMLElement;

// Combination (Class + Attribute)
const element = compiled.querySelector('.todo-item[data-id="5"]') as HTMLElement;

// Descendant Selector (nested)
const element = compiled.querySelector('.todo-item span') as HTMLElement;

// Child Selector
const element = compiled.querySelector('.container > .child') as HTMLElement;

// Multiple Selectors (first match)
const element = compiled.querySelector('.btn, button') as HTMLElement;
```

### querySelectorAll() - Returns NodeList of all matches
```typescript
const compiled = fixture.nativeElement as HTMLElement;

// All elements with class
const elements = compiled.querySelectorAll('.todo-item') as NodeListOf<HTMLElement>;

// All inputs
const inputs = compiled.querySelectorAll('input') as NodeListOf<HTMLInputElement>;

// All elements with attribute
const checkboxes = compiled.querySelectorAll('[type="checkbox"]') as NodeListOf<HTMLInputElement>;

// Convert to Array for easier manipulation
const elementsArray = Array.from(elements);
const mapped = Array.from(elements).map(el => el.textContent);
```

---

## Common Testing Patterns

### By ID
```typescript
// HTML: <input id="AddTodoBtn" />
const button = compiled.querySelector('#AddTodoBtn') as HTMLButtonElement;
button.click();
```

### By Class Name
```typescript
// HTML: <span class="completed">Done</span>
const span = compiled.querySelector('.completed') as HTMLElement;
expect(span.classList.contains('completed')).toBe(true);
```

### By Element Type
```typescript
// HTML: <input type="text" />
const input = compiled.querySelector('input[type="text"]') as HTMLInputElement;
input.value = 'Test';
input.dispatchEvent(new Event('input'));
```

### By Attribute (data-testid)
```typescript
// HTML: <div data-testid="todo-item">Item</div>
const item = compiled.querySelector('[data-testid="todo-item"]') as HTMLElement;
expect(item).toBeTruthy();
```

### By Attribute (name)
```typescript
// HTML: <input name="newTodo" />
const input = compiled.querySelector('[name="newTodo"]') as HTMLInputElement;
input.value = 'New Todo';
```

### Dynamic Selectors (using component data)
```typescript
// HTML: <input id="Ckbx1" /> <input id="Ckbx2" />
// Build selector from component state
const checkboxId = '#Ckbx' + component.todos[0].id;
const checkbox = compiled.querySelector(checkboxId) as HTMLInputElement;
```

### Nested/Descendant Selection
```typescript
// HTML: <li class="todo-item"><span class="title">Test</span></li>
const todoItem = compiled.querySelector('.todo-item') as HTMLElement;
const title = todoItem.querySelector('span') as HTMLElement;
// OR in one query:
const title = compiled.querySelector('.todo-item span') as HTMLElement;
```

### Multiple Elements with querySelectorAll()
```typescript
// HTML: <li class="todo-item">...</li> (3 times)
const todoItems = compiled.querySelectorAll('.todo-item') as NodeListOf<HTMLElement>;

// Convert to Array and access by index
const items = Array.from(todoItems);
expect(items[0].textContent).toContain('First Todo');
expect(items[1].textContent).toContain('Second Todo');
```

---

## CSS Class Assertions

```typescript
const element = compiled.querySelector('.myElement') as HTMLElement;

// Check if class exists
expect(element.classList.contains('completed')).toBe(true);

// Check multiple classes
expect(element.classList.contains('todo-item')).toBe(true);
expect(element.classList.contains('active')).toBe(true);

// Check all classes
expect(element.className).toContain('completed');
```

---

## Style Assertions

```typescript
const element = compiled.querySelector('span') as HTMLElement;

// Check computed CSS styles (from stylesheet)
const computedStyle = window.getComputedStyle(element);
expect(computedStyle.textDecoration).toContain('line-through');
expect(computedStyle.color).toBe('rgb(128, 128, 128)');
expect(computedStyle.fontSize).toBe('16px');

// Check inline styles
expect(element.style.color).toBe('red');
expect(element.style.display).toBe('none');
```

---

## Text Content & Values

```typescript
// Get text content
const span = compiled.querySelector('span') as HTMLElement;
expect(span.textContent).toContain('My Todo');

// Get input value
const input = compiled.querySelector('input') as HTMLInputElement;
expect(input.value).toBe('Test');

// Get HTML content
const div = compiled.querySelector('div') as HTMLElement;
expect(div.innerHTML).toContain('<span>');
```

---

## Input Elements (Special Cases)

```typescript
// Text input
const input = compiled.querySelector('input[type="text"]') as HTMLInputElement;
input.value = 'New Value';
input.dispatchEvent(new Event('input'));
fixture.detectChanges();

// Checkbox
const checkbox = compiled.querySelector('input[type="checkbox"]') as HTMLInputElement;
checkbox.click();
fixture.detectChanges();
expect(checkbox.checked).toBe(true);

// Select dropdown
const select = compiled.querySelector('select') as HTMLSelectElement;
select.value = 'option2';
select.dispatchEvent(new Event('change'));
```

---

## Advanced Selector Patterns

```typescript
// By Multiple Classes (all must match)
const element = compiled.querySelector('.btn.primary') as HTMLElement;

// Attribute contains text
const element = compiled.querySelector('[aria-label*="delete"]') as HTMLElement;

// Attribute starts with
const element = compiled.querySelector('[id^="Ckbx"]') as HTMLElement;

// Attribute ends with
const element = compiled.querySelector('[class$="-active"]') as HTMLElement;

// Not selector (CSS4)
const element = compiled.querySelector('input:not([disabled])') as HTMLElement;

// First child
const element = compiled.querySelector('.container > :first-child') as HTMLElement;

// Nth child
const element = compiled.querySelector('.todo-item:nth-child(2)') as HTMLElement;
```

---

## Common Mistakes

```typescript
// ❌ WRONG: Forgetting 'as' cast
const element = compiled.querySelector('.myClass');
element.click(); // TypeScript error

// ✅ CORRECT: Cast to proper type
const element = compiled.querySelector('.myClass') as HTMLElement;
element.click();

// ❌ WRONG: Using dot notation for attributes with dashes
const element = compiled.getAttribute.data-testid; // Error

// ✅ CORRECT: Use bracket notation
const element = compiled.querySelector('[data-testid="value"]');

// ❌ WRONG: Not handling null from querySelector
const element = compiled.querySelector('.missing')!.click(); // Might crash

// ✅ CORRECT: Check existence
const element = compiled.querySelector('.missing') as HTMLElement;
expect(element).toBeTruthy();

// ✅ CORRECT: Use optional chaining
const element = compiled.querySelector('.missing') as HTMLElement;
element?.click();
```

---

## Type Casting Helpers

```typescript
// Generic HTML Element
const el = compiled.querySelector('div') as HTMLElement;

// Input Element
const input = compiled.querySelector('input') as HTMLInputElement;

// Button Element
const btn = compiled.querySelector('button') as HTMLButtonElement;

// Select Element
const select = compiled.querySelector('select') as HTMLSelectElement;

// TextArea Element
const textarea = compiled.querySelector('textarea') as HTMLTextAreaElement;

// NodeList of elements
const items = compiled.querySelectorAll('.item') as NodeListOf<HTMLElement>;
```
