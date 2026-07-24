@echo off
setlocal enabledelayedexpansion
REM 控制台切到 UTF-8, 否则中文/符号会输出乱码 (Windows 中文系统默认 cp936)
chcp 65001 >nul
REM 让 Java/javac 以 UTF-8 读取源码并输出 (源文件为 UTF-8)
set "JAVA_TOOL_OPTIONS=-Dfile.encoding=UTF-8 -Dstdout.encoding=UTF-8 -Dstderr.encoding=UTF-8"
REM =====================================================
REM  API Change Assistant CLI Tool - Startup Script (Windows)
REM =====================================================
REM  Usage: api-change-scan_windows.bat --list-versions
REM         api-change-scan_windows.bat --project <工程路径> --start <版本> --end <版本> [--out <目录>] [--no-scan]
REM
REM  版本串须完整匹配 VERSION_LIST, 例如 HarmonyOS_5.1.0(18)_Release / HarmonyOS_6.0.0(20)_Beta3
REM  先 --list-versions 查看合法取值。
REM  DevEco 安装路径含空格已支持; 找不到时用 DEVECO_HOME / DEV_DIR / TOOL_HOME 指定。
REM
REM  DevEco 目录解析: 依次尝试 DEVECO_HOME -> DEV_DIR -> TOOL_HOME -> 常见安装路径,
REM  每个候选都必须同时含 plugins\harmony\lib 与 jbr\bin\java.exe, 否则跳过尝试下一个,
REM  避免某个环境变量指错时被误判为 "DevEco 未安装"。
REM =====================================================

REM 候选探测: 环境变量优先, 失败则回退到常见路径。每个候选都经 :try_deveco 校验。
set "DEVECO="
set "JBR="
if defined DEVECO_HOME call :try_deveco "%DEVECO_HOME%"
if not defined DEVECO if defined DEV_DIR   call :try_deveco "%DEV_DIR%"
if not defined DEVECO if defined TOOL_HOME call :try_deveco "%TOOL_HOME%"
if not defined DEVECO call :try_deveco "D:\DevEco Studio"
if not defined DEVECO call :try_deveco "D:\DevEcoStudio"
if not defined DEVECO call :try_deveco "C:\DevEco Studio"
if not defined DEVECO call :try_deveco "C:\DevEcoStudio"
if not defined DEVECO call :try_deveco "C:\Program Files\Huawei\DevEco Studio"
if not defined DEVECO call :try_deveco "C:\Program Files (x86)\Huawei\DevEco Studio"
if not defined DEVECO call :try_deveco "D:\Program Files\Huawei\DevEco Studio"

if not defined DEVECO (
    echo ERROR: 未能定位可用的 DevEco Studio 安装目录 (需同时含 plugins\harmony\lib 与 jbr\bin\java.exe) >&2
    echo 已尝试: DEVECO_HOME / DEV_DIR / TOOL_HOME 及常见安装路径, 均未通过校验 >&2
    echo 环境变量: DEVECO_HOME=%DEVECO_HOME%  DEV_DIR=%DEV_DIR%  TOOL_HOME=%TOOL_HOME% >&2
    echo 请通过环境变量指定, 例如: set "DEVECO_HOME=D:\DevEco Studio" >&2
    exit /b 1
)
goto :deveco_ok

REM ---- 子程序: 校验候选目录, 合格则设置 DEVECO / JBR ----
:try_deveco
REM %1 = 候选 DevEco 目录。需同时存在 plugins\harmony\lib 与 jbr\bin\java.exe。
if not exist "%~1\plugins\harmony\lib" goto :eof
if not exist "%~1\jbr\bin\java.exe" goto :eof
set "DEVECO=%~1"
set "JBR=%~1\jbr\bin"
goto :eof

:deveco_ok
set "JAVA=%JBR%\java.exe"
set "JAVAC=%JBR%\javac.exe"

REM Script directory (去掉末尾反斜杠)
set "SCRIPTDIR=%~dp0"
if "%SCRIPTDIR:~-1%"=="\" set "SCRIPTDIR=%SCRIPTDIR:~0,-1%"

REM Build classpath: lib/* + all plugins lib/*
set "CP="
for %%F in ("%DEVECO%\lib\*.jar") do set "CP=!CP!%%F;"
for /D %%D in ("%DEVECO%\plugins\*") do (
    for %%F in ("%%D\lib\*.jar") do set "CP=!CP!%%F;"
)

REM Compile if source is newer than class
set "SRC=%SCRIPTDIR%\ApiChangeCli.java"
set "CLS=%SCRIPTDIR%\ApiChangeCli.class"
if not exist "%CLS%" goto :compile
for %%A in ("%SRC%") do set "SRCTIME=%%~tA"
for %%A in ("%CLS%") do set "CLSTIME=%%~tA"
if "!SRCTIME!" neq "!CLSTIME!" goto :compile
goto :run

:compile
echo [setup] 编译 ApiChangeCli.java ...
"%JAVAC%" -proc:none -encoding UTF-8 -cp "!CP!" "%SRC%" -d "%SCRIPTDIR%"
if errorlevel 1 (
    echo ERROR: 编译失败 >&2
    exit /b 1
)

:run
echo [deveco] DEVECO=%DEVECO%  JAVA=%JAVA% >&2
"%JAVA%" -cp "%SCRIPTDIR%;!CP!" ApiChangeCli %*
