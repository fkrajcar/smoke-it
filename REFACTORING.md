# Refactoring Documentation

## Overview

This project has been refactored to follow TypeScript and React best practices, improving code organization, type safety, and maintainability.

## Major Changes

### 1. **Folder Structure**

Created a new `src/` directory with organized subdirectories:

```
src/
├── constants/     # Application constants and configuration
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and helpers
├── services/      # API service layer
└── types/         # TypeScript type definitions
```

### 2. **TypeScript Improvements**

- ✅ Converted all JavaScript files to TypeScript
- ✅ Created comprehensive type definitions in `src/types/match.types.ts`
- ✅ Removed all `any` types
- ✅ Added proper type annotations throughout

### 3. **Path Aliases**

Added path aliases in `tsconfig.json` for cleaner imports:

```typescript
"@/components/*": ["components/*"]
"@/src/*": ["src/*"]
"@/styles/*": ["styles/*"]
"@/pages/*": ["pages/*"]
"@/util/*": ["util/*"]
```

### 4. **API Layer Refactoring**

- **Before**: `pages/api/utils/axiosInstance.js` and `matchService.js`
- **After**:
  - `src/lib/apiClient.ts` - Robust API client with error handling
  - `src/services/matchService.ts` - Typed service methods with JSDoc

**Benefits**:

- Better error handling and logging
- Type-safe API calls
- Reusable API client pattern
- Proper interceptor setup

### 5. **Constants Extraction**

Created `src/constants/config.ts` with:

- `API_CONFIG` - API base URLs
- `PLAYER_IDS` - Player configuration
- `CACHE_CONFIG` - Caching timeouts
- `PERFORMANCE_THRESHOLDS` - Performance metrics
- `IMAGE_DIMENSIONS` - Image sizing constants

**Benefits**:

- No magic numbers/strings in code
- Single source of truth
- Easy configuration management

### 6. **Custom Hooks**

Separated hooks into dedicated files:

- `src/hooks/useMatchStats.ts` - Fetch match statistics (SWR)
- `src/hooks/usePlayers.ts` - Fetch player data (React Query)

**Benefits**:

- Reusable logic
- Consistent data fetching patterns
- Better separation of concerns

### 7. **Helper Functions**

Created utility modules:

- `src/lib/dateHelpers.ts` - Date formatting utilities
- `src/lib/matchHelpers.ts` - Match data processing logic

**Benefits**:

- Testable pure functions
- Reusable business logic
- Better code organization

### 8. **Component Improvements**

#### EventsList.tsx

- ✅ Removed inline API calls
- ✅ Added proper error handling with ErrorState
- ✅ Used custom `usePlayers` hook
- ✅ Better prop typing

#### PastMatch.tsx

- ✅ Removed console.log statements
- ✅ Extracted business logic to helper functions
- ✅ Used constants for magic numbers
- ✅ Improved type safety
- ✅ Better null handling

#### PlayerStats.tsx

- ✅ Used constants for thresholds and dimensions
- ✅ Added proper TypeScript interfaces
- ✅ Improved prop documentation

#### pages/index.tsx

- ✅ Proper Next.js typing with `GetServerSideProps`
- ✅ Better error handling in SSR
- ✅ Used helper functions for data processing
- ✅ Removed `any` types

### 9. **App Configuration**

Updated `pages/_app.tsx`:

- ✅ QueryClient initialized once with `useState`
- ✅ Added default query options
- ✅ Better performance with proper memoization
- ✅ Used path aliases for imports

## Code Quality Improvements

### Before vs After Examples

#### API Calls

**Before**:

```javascript
const client = axios.create({
  baseURL: config.FACEIT_API_URL_BASE,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_FACEIT_API_CLIENT_TOKEN}`,
  },
})
```

**After**:

```typescript
class ApiClient {
  private client: AxiosInstance
  constructor(config: ApiClientConfig) {
    this.client = axios.create({
      baseURL: config.baseURL,
      headers: config.token && { Authorization: `Bearer ${config.token}` },
    })
    this.setupInterceptors()
  }
}
```

#### Data Processing

**Before**:

```javascript
const playersStats = we
  ?.map((player) => ({
    avatar: getAvatar(player.player_id),
    kills: player.player_stats.Kills,
    // ... repetitive logic
  }))
  .sort((a, b) => b.kills - a.kills || b.kd - a.kd)
```

**After**:

```typescript
const ourPlayers = getOurPlayers(ourTeam)
const stats = processPlayerStats(ourPlayers, getAvatar)
const win = didTeamWin(ourTeam)
```

## Benefits Summary

1. **Type Safety**: Full TypeScript coverage with no `any` types
2. **Maintainability**: Clear separation of concerns
3. **Reusability**: Extracted utility functions and hooks
4. **Performance**: Proper React Query configuration
5. **Code Quality**: Consistent patterns and best practices
6. **Scalability**: Easy to extend with new features
7. **Developer Experience**: Path aliases and better organization

## Migration Guide

### Importing Modules

Update imports to use new paths:

```typescript
// Old
import { config } from '../config/misc'
import MatchService from '../pages/api/utils/matchService'

// New
import { PLAYER_IDS, API_CONFIG } from '@/src/constants/config'
import { MatchService } from '@/src/services/matchService'
```

### Using Types

Import types from centralized location:

```typescript
import { Player, IEvent, MatchStats } from '@/src/types/match.types'
```

### Using Hooks

```typescript
import { usePlayers } from '@/src/hooks/usePlayers'
import { useMatchStats } from '@/src/hooks/useMatchStats'
```

## Next Steps

Consider these future improvements:

1. Add unit tests for helper functions
2. Add React Testing Library tests for components
3. Implement error boundaries
4. Add loading skeletons instead of spinners
5. Add Storybook for component documentation
6. Implement proper logging service
7. Add ESLint rules for import ordering
8. Consider adding Prettier pre-commit hooks

## Files Changed

### Created

- `src/types/match.types.ts`
- `src/constants/config.ts`
- `src/lib/apiClient.ts`
- `src/lib/dateHelpers.ts`
- `src/lib/matchHelpers.ts`
- `src/services/matchService.ts`
- `src/hooks/useMatchStats.ts`
- `src/hooks/usePlayers.ts`

### Modified

- `components/EventsList.tsx`
- `components/PastMatch.tsx`
- `components/PlayerStats.tsx`
- `pages/index.tsx`
- `pages/_app.tsx`
- `tsconfig.json`

### Deprecated (can be removed)

- `pages/api/utils/axiosInstance.js`
- `pages/api/utils/matchService.js`
- `config/misc.ts` (replaced by `src/constants/config.ts`)
- `util/dateTimeHelpers.ts` (replaced by `src/lib/dateHelpers.ts`)
- `util/useMatchStats.ts` (replaced by `src/hooks/useMatchStats.ts`)
