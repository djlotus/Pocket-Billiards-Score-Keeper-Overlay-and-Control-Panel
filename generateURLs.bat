
@echo off

:: Set initial variables
::
set current_working_directory=%~dp0
set sb-location=

:: Check if file exists. If so, do we want to delete it?
::
if exist links.txt (
   echo File Check
   echo =========================
   echo A file containing URLS already exists. Would you like to delete this file?
   echo.
   del /p links.txt
   echo.
)
echo.

:: Choose if the scoreboard will display on the top or bottom of the window
::
echo Scoreboard Location
echo =========================
echo The scoreboard can be mounted on the top or bottom of the window.
echo.
choice /c AB /m "Where would you like to mount the scoreboard? [A:Top or B:Bottom]"

:: Set variable
::
set "sb-location="

if errorlevel 1 set "sb-location=top"
if errorlevel 2 set "sb-location=bottom"

:: Update variable
::
set scoreboard-location-path=file:///%current_working_directory%scoreboard-%sb-location%.html

:: Write file paths to link.txt
::
echo ******************** >> links.txt
echo ***Scoreboard URL*** >> links.txt
echo ******************** >> links.txt
echo %scoreboard-location-path% >> links.txt
echo. >> links.txt
echo. >> links.txt
echo ******************** >> links.txt
echo *Control Panel URL** >> links.txt
echo ******************** >> links.txt
echo file:///%current_working_directory%control-panel.html >> links.txt

pause