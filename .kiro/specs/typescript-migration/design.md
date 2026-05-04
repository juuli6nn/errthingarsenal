# Design Document: TypeScript Migration

## Overview

This design document outlines the technical approach for migrating an existing React + Vite application from JavaScript to TypeScript. The migration will transform all source files (.jsx → .tsx, .js → .ts), establish comprehensive type definitions, configure the TypeScript compiler, and integrate type checking into the development workflow.

### Goals

1. **Type Safety**: Introduce compile-time type checking to catch errors before runtime
2. **Developer Experience**: Provide IDE autocomplete, inline documentation, and refactoring support
3. **Maintainability**: Make the codebase more self-documenting and easier to understand
4. **Zero Regression**: Preserve all existing functionality and behavior
5. **Build Integration**: Seamlessly integrate TypeScript into the existing Vite build pipeline

### Non-Goals

1. Refactoring component logic or architecture
2. Adding new features or changing existing behavior
3. Migrating to different libraries or frameworks
4. Performance optimization beyond what TypeScript naturally provides

### Research Summary

**TypeScript with React Best Practices:**
- React 18+ uses the new JSX transform (`react-jsx`), eliminating the need to import React in every file
- Vite natively supports TypeScript with zero configuration beyond tsconfig.json
- The `@types/react` and `@types/react-dom` packages provide comprehensive type definitions for React APIs
- TypeScript 5.0+ offers improved type inference for JSX components and hooks

**Module Resolution:**
- Vite uses ESM (ES Modules) natively, requiring `"moduleResolution": "bundler"` in tsconfig.json
- The "bundler" resolution mode is optimized for modern bundlers like Vite and supports package.json "exports" fields
- Import paths in TypeScript can omit file extensions when using bundler resolution

**Strict Mode Considerations:**
- Enabling `strict: true` activates all strict type-checking options
- This includes `strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`, and others
- Strict mode catches more potential bugs but requires explicit null handling

**React Event Types:**
- React provides specific event types: `React.MouseEvent<HTMLElement>`, `React.FormEvent<HTMLFormElement>`, etc.
- Generic type parameters specify the target element type for better type safety
- Event handlers should be typed to match the specific event and element

## Architecture

### Migration Strategy

The migration follows a **file-by-file incremental approach** with the following phases:

1. **Foundation Setup**: Install dependencies and create TypeScript configuration
2. **Configuration Migration**: Convert build configuration files to TypeScript
3. **Component Migration**: Transform React components from JSX to TSX with type annotations
4. **Type Definition**: Add interfaces for props, state, and custom types
5. **Validation**: Run type checking and verify build output

### Component Type Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Application Layer                    │
│  (App.tsx, main.tsx - Entry points with typed imports)  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   Component Layer                        │
│  (MatchCenter.tsx, Newsletter.tsx, etc.)                │
│  - Props interfaces define component contracts          │
│  - Event handlers typed with React event types          │
│  - Hooks typed with explicit generic parameters         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                    Type Layer                            │
│  - Props interfaces (exported for reusability)          │
│  - Custom type definitions for domain models            │
│  - React type imports (MouseEvent, FormEvent, etc.)     │
└─────────────────────────────────────────────────────────┘
```

### Build Pipeline Integration

```
Source Files (.tsx, .ts)
         │
         ▼
TypeScript Compiler (Type Checking)
         │
         ├─── Type Errors → Console Output
         │
         ▼
Vite Build Pipeline (esbuild for transpilation)
         │
         ▼
Bundled JavaScript Output
```

**Key Points:**
- TypeScript compiler (`tsc`) performs type checking only (no emit)
- Vite uses esbuild for fast transpilation during development
- Production builds run type checking before bundling
- Hot Module Replacement (HMR) works seamlessly with TypeScript

## Components and Interfaces

### Core Components

#### 1. App Component (`App.tsx`)

**Purpose**: Root application component managing scroll effects and carousel interactions

**Props Interface**: None (root component)

**State Management**:
```typescript
interface AppState {
  scrollY: number;
  cursorState: 'grab' | 'grabbing';
}
```

**Refs**:
```typescript
const carouselRef = useRef<HTMLDivElement>(null);
const isDown = useRef<boolean>(false);
const startX = useRef<number>(0);
const scrollLeftPos = useRef<number>(0);
const exactScrollLeft = useRef<number>(0);
const momentumID = useRef<number | null>(null);
const velocityTimeout = useRef<NodeJS.Timeout | null>(null);
const velX = useRef<number>(0);
const prevX = useRef<number>(0);
```

**Event Handlers**:
- `handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void`
- `handleMouseLeave: () => void`
- `handleMouseUp: () => void`
- `handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void`

#### 2. MatchCenter Component (`MatchCenter.tsx`)

**Purpose**: Displays past and upcoming match information

**Props Interface**: None (self-contained component)

**State Management**: None (static content in current implementation)

#### 3. Newsletter Component (`Newsletter.tsx`)

**Purpose**: Newsletter subscription form

**Props Interface**: None

**Event Handlers**:
- `onSubmit: (e: React.FormEvent<HTMLFormElement>) => void`

#### 4. MatchCard Component (`MatchCard.tsx`)

**Purpose**: Displays individual match details

**Props Interface**:
```typescript
interface Match {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  competition: string;
  date: string;
  venue: string;
  status: 'live' | 'finished' | 'scheduled';
}

interface MatchCardProps {
  match: Match;
}
```

**Event Handlers**:
- `onMouseOver: (e: React.MouseEvent<HTMLDivElement>) => void`
- `onMouseOut: (e: React.MouseEvent<HTMLDivElement>) => void`

#### 5. Header Component (`Header.tsx`)

**Purpose**: Application header (currently minimal implementation)

**Props Interface**: None

### Configuration Files

#### 1. TypeScript Configuration (`tsconfig.json`)

**Purpose**: Configure TypeScript compiler options

**Structure**:
```typescript
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### 2. Node TypeScript Configuration (`tsconfig.node.json`)

**Purpose**: Separate configuration for Node.js build scripts

**Structure**:
```typescript
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

#### 3. Vite Configuration (`vite.config.ts`)

**Purpose**: Build tool configuration with TypeScript types

**Type Imports**:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
```

### Type Definitions

#### React Hook Types

**useState**:
```typescript
const [scrollY, setScrollY] = useState<number>(0);
const [cursorState, setCursorState] = useState<'grab' | 'grabbing'>('grab');
```

**useRef**:
```typescript
const carouselRef = useRef<HTMLDivElement>(null);
const isDown = useRef<boolean>(false);
const momentumID = useRef<number | null>(null);
```

**useEffect**:
```typescript
useEffect(() => {
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []); // Empty dependency array is type-checked
```

#### Event Handler Types

```typescript
// Mouse events
const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
  // Implementation
};

// Form events
const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
  e.preventDefault();
  // Implementation
};

// Keyboard events (if needed)
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
  // Implementation
};
```

## Data Models

### Match Data Model

```typescript
interface Match {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  competition: string;
  date: string; // ISO 8601 format
  venue: string;
  status: 'live' | 'finished' | 'scheduled';
}
```

**Usage**: Passed to MatchCard component for rendering match information

**Validation**: TypeScript ensures all required fields are present and correctly typed

### Component Props Models

```typescript
// MatchCard component
interface MatchCardProps {
  match: Match;
}

// Future extensibility: Props interfaces can be extended
interface ExtendedMatchCardProps extends MatchCardProps {
  onMatchClick?: (matchId: string) => void;
  highlighted?: boolean;
}
```

### Ref Value Models

```typescript
// DOM element refs
type DOMRef = React.RefObject<HTMLDivElement>;

// Mutable value refs
interface MutableRef<T> {
  current: T;
}

// Example usage
const carouselRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
const velocityRef: React.MutableRefObject<number> = useRef<number>(0);
```

### State Models

```typescript
// Cursor state (union type for type safety)
type CursorState = 'grab' | 'grabbing';

// Scroll position (number primitive)
type ScrollPosition = number;

// Complex state (if needed in future)
interface CarouselState {
  scrollPosition: number;
  velocity: number;
  isDragging: boolean;
  cursorState: CursorState;
}
```

### Configuration Models

```typescript
// Vite configuration type (imported from 'vite')
import type { UserConfig } from 'vite';

// TypeScript compiler options (defined in tsconfig.json)
interface CompilerOptions {
  target: string;
  module: string;
  jsx: string;
  strict: boolean;
  // ... other options
}
```

### Type Utilities

```typescript
// Make all properties optional
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Make all properties required
type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Pick specific properties
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Omit specific properties
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```

**Note**: These are built-in TypeScript utility types, included here for reference

## Error Handling

### TypeScript Compilation Errors

**Strategy**: Fail fast during development with clear error messages

**Error Categories**:

1. **Type Mismatch Errors**
   - Example: Passing string to a function expecting number
   - Resolution: Fix the type at the call site or update the function signature
   - Location: Caught at compile time by `tsc`

2. **Null/Undefined Errors**
   - Example: Accessing properties on potentially null refs
   - Resolution: Use optional chaining (`?.`) or null checks
   - Location: Caught by `strictNullChecks` compiler option

3. **Missing Property Errors**
   - Example: Accessing non-existent property on an interface
   - Resolution: Add property to interface or fix property name
   - Location: Caught at compile time by `tsc`

4. **Import Resolution Errors**
   - Example: Importing from non-existent module
   - Resolution: Fix import path or install missing types
   - Location: Caught by module resolution system

### Runtime Error Handling

**Strategy**: Preserve existing runtime error handling, add type guards where beneficial

**Null Safety**:
```typescript
// Before (JavaScript)
carouselRef.current.scrollLeft = value;

// After (TypeScript with null safety)
if (carouselRef.current) {
  carouselRef.current.scrollLeft = value;
}

// Or using optional chaining
carouselRef.current?.scrollTo({ left: value });
```

**Type Guards**:
```typescript
function isMatch(obj: unknown): obj is Match {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'homeTeam' in obj &&
    'awayTeam' in obj &&
    'status' in obj
  );
}

// Usage
if (isMatch(data)) {
  // TypeScript knows data is Match type here
  console.log(data.homeTeam);
}
```

### Build Error Handling

**Development Mode**:
- Type errors displayed in terminal and browser console
- HMR continues to work even with type errors (Vite behavior)
- Developer can fix errors incrementally

**Production Build**:
- Type checking runs before build (`tsc --noEmit`)
- Build fails if type errors exist
- Prevents deploying code with type errors

**Error Reporting**:
```bash
# Type check command
npm run type-check

# Expected output format
src/App.tsx:45:12 - error TS2322: Type 'string' is not assignable to type 'number'.

45   const x: number = "hello";
              ^

Found 1 error.
```

### Migration Error Handling

**Strategy**: Incremental migration with temporary escape hatches

**Escape Hatches** (use sparingly):
```typescript
// @ts-ignore - Suppresses next line error (avoid if possible)
// @ts-ignore
const value = problematicCode();

// any type - Disables type checking (use only during migration)
const temp: any = legacyData;

// unknown type - Safer alternative to any (requires type guards)
const data: unknown = externalData;
if (typeof data === 'string') {
  // TypeScript knows data is string here
}
```

**Best Practice**: Use `unknown` instead of `any` when type is truly unknown, then narrow with type guards

## Testing Strategy

### Overview

This TypeScript migration is primarily a **refactoring operation** that transforms JavaScript code to TypeScript without changing runtime behavior. The testing strategy focuses on **validation** rather than new test creation, as the migration should not alter functionality.

### Testing Approach

**Property-Based Testing: NOT APPLICABLE**

This migration does not require property-based testing because:
- **Infrastructure transformation**: Converting file extensions and adding type annotations is a structural change, not algorithmic logic
- **No new behavior**: The migration preserves existing functionality without introducing new features
- **Deterministic output**: TypeScript compilation is deterministic - the same input always produces the same output
- **Type checking is the test**: The TypeScript compiler itself validates correctness through type checking

**Alternative Testing Strategy**: Use **snapshot testing** and **type checking** instead:

1. **TypeScript Compiler Validation**
   - Run `tsc --noEmit` to verify all files type-check successfully
   - Ensure zero type errors before considering migration complete
   - This is the primary validation mechanism

2. **Build Output Validation**
   - Compare JavaScript output before and after migration
   - Verify bundle size remains similar (within 5%)
   - Ensure no runtime errors in browser console

3. **Manual Smoke Testing**
   - Test all interactive features in the browser
   - Verify scroll effects, carousel dragging, form submission
   - Check that all components render correctly

4. **Existing Test Suite**
   - If unit tests exist, run them against migrated code
   - All existing tests should pass without modification
   - If tests fail, the migration introduced a regression

### Validation Checklist

**Compilation Validation**:
- [ ] `tsc --noEmit` completes with zero errors
- [ ] `npm run build` completes successfully
- [ ] No TypeScript errors in IDE

**Runtime Validation**:
- [ ] Development server starts without errors
- [ ] All pages render correctly
- [ ] No console errors in browser
- [ ] Hot Module Replacement works

**Functional Validation**:
- [ ] Scroll effects work (hero scaling, parallax)
- [ ] Carousel drag-to-scroll functions correctly
- [ ] Carousel arrow buttons work
- [ ] Newsletter form submission works
- [ ] All links and buttons are clickable

**Build Validation**:
- [ ] Production build completes
- [ ] Bundle size is comparable to JavaScript version
- [ ] Built application runs correctly when served

### Type Checking Integration

**Development Workflow**:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "type-check": "tsc --noEmit",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

**Pre-commit Hook** (optional):
```bash
#!/bin/sh
npm run type-check
```

**CI/CD Integration**:
```yaml
# Example GitHub Actions workflow
- name: Type Check
  run: npm run type-check

- name: Build
  run: npm run build
```

### Migration Testing Process

**Phase 1: Setup Validation**
1. Install TypeScript dependencies
2. Create tsconfig.json
3. Run `tsc --noEmit` (expect errors from .jsx files)

**Phase 2: Incremental Migration**
1. Migrate one component file
2. Add type annotations
3. Run `tsc --noEmit` on that file
4. Fix type errors
5. Repeat for next file

**Phase 3: Final Validation**
1. Run full type check: `tsc --noEmit`
2. Run build: `npm run build`
3. Test in browser: `npm run preview`
4. Verify all functionality works

### Regression Prevention

**Type Safety as Tests**:
- Type annotations serve as inline contracts
- Compiler enforces these contracts automatically
- Refactoring is safer with type checking

**Example**:
```typescript
// This interface acts as a test specification
interface MatchCardProps {
  match: Match;
}

// Compiler ensures this component receives correct props
const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  // If we try to access match.invalidProperty, compiler errors
  return <div>{match.homeTeam}</div>;
};
```

**Benefits**:
- Catches errors at compile time instead of runtime
- Prevents prop drilling mistakes
- Ensures event handlers receive correct event types
- Validates ref types match DOM elements

### Success Criteria

The migration is successful when:
1. ✅ All files compile without TypeScript errors
2. ✅ Application builds successfully
3. ✅ All existing functionality works identically
4. ✅ IDE provides autocomplete and type hints
5. ✅ No new runtime errors introduced
6. ✅ Development workflow (HMR, etc.) unchanged

**Note**: No new unit tests or property-based tests are required for this migration. The TypeScript compiler provides the validation needed to ensure correctness.
