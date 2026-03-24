@echo off
title Lanzador Totem MiPapantla
echo ==========================================
echo   Iniciando Kiosko Interactivo MiPapantla
echo ==========================================
echo.

:: Detectar si Python esta instalado para un servidor rapido
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Servidor Python detectado.
    echo [INFO] Abriendo aplicacion en modo Kiosko...
    start "" "http://localhost:8000/index.html?kiosk=true"
    python -m http.server 8000
    goto end
)

:: Alternativa: Intentar usar npx (requiere Node.js)
where npx >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Node.js/npx detectado.
    echo [INFO] Iniciando servidor con serve...
    start "" "http://localhost:3000/index.html?kiosk=true"
    npx serve -p 3000
    goto end
)

echo [ERROR] No se encontro Python ni Node.js.
echo [!] Para una mejor experiencia, instala uno de estos o usa un servidor portatil.
echo [!] Intentando abrir el archivo directamente (puede tener problemas de carga)...
start "" "index.html?kiosk=true"

:end
pause
