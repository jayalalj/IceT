@echo off
REM Double-click to publish the IceT site to GitHub (github.com/jayalalj/IceT)
cd /d "%~dp0"
where git >nul 2>nul || (echo Git is not installed. Get it from https://git-scm.com/download/win & pause & exit /b 1)
echo Publishing IceT to GitHub...
git -c safe.directory=* push -u origin main
if errorlevel 1 (echo. & echo Push failed - see the message above.) else (echo. & echo Done! The site updates at https://jayalalj.github.io/IceT/ in a minute or two.)
pause
