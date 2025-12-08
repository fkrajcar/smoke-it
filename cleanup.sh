#!/bin/bash

# Cleanup Script for Refactored Project
# This script removes deprecated files after the refactoring

echo "🧹 Cleaning up deprecated files..."

# Remove old JavaScript API files
echo "Removing old JavaScript API files..."
rm -f pages/api/utils/axiosInstance.js
rm -f pages/api/utils/matchService.js

# Remove old TypeScript files that have been moved
echo "Removing old utility files (moved to src/)..."
# Keep the originals for now in case they're still referenced
# rm -f config/misc.ts
# rm -f util/dateTimeHelpers.ts
# rm -f util/useMatchStats.ts

echo "✅ Cleanup complete!"
echo ""
echo "Note: The following files have been kept for backward compatibility:"
echo "  - config/misc.ts (replaced by src/constants/config.ts)"
echo "  - util/dateTimeHelpers.ts (replaced by src/lib/dateHelpers.ts)"
echo "  - util/useMatchStats.ts (replaced by src/hooks/useMatchStats.ts)"
echo ""
echo "You can safely remove them once you've verified everything works."
