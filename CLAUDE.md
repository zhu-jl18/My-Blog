# Blog Project Context

## Project Overview
This is a Hexo-based blog project with custom music player and PJAX functionality.

## Common Commands
- `npm install` - Install dependencies
- `hexo generate` or `hexo g` - Generate static files
- `hexo server` or `hexo s` - Start local server
- `hexo clean` - Clean generated files
- `hexo deploy` - Deploy to GitHub Pages

## Recent Work
- **PJAX Bug Resolution**: Successfully solved the mysterious PJAX rendering bug
  - Key finding: NexT theme's PJAX only executes scripts with `data-pjax` attribute
  - Solution: Added `data-pjax` attribute to all scripts in `source/_data/body-end.njk`
  - All custom scripts (music player, Dirac Sea effects, console easter eggs) now work correctly after PJAX navigation

- Music player updated to use Vercel CDN
- Added GitHub Actions for auto-deployment

## Current Branch
- Main: main (production, protected)
- Working: develop (daily development)

## Important Files
- Music player: source/js/enhanced-music-player.js, source/js/simple-music-player.js
- PJAX implementation: source/js/dirac-sea-pjax.js
- Script injection: source/_data/body-end.njk (all scripts need data-pjax attribute)
- Theme configuration: _config.yml, _config.next.yml

## PJAX Solution Summary
The PJAX bug was caused by NexT theme's implementation that only executes scripts marked with `data-pjax` attribute after navigation. Previous attempts using event listeners failed because the scripts themselves weren't being executed.

**Solution**: Add `data-pjax` attribute to all script tags that need to run after PJAX navigation.