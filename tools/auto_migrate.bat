@echo off
echo ========================================
echo 🚀 开始自动化迁移到 Cloudflare R2
echo ========================================
echo.

echo 📦 步骤 1/3: 检查依赖...
python -c "import boto3" 2>nul
if errorlevel 1 (
    echo ❌ boto3 未安装，正在安装...
    pip install boto3
    if errorlevel 1 (
        echo ❌ 安装失败，请手动安装: pip install boto3
        pause
        exit /b 1
    )
    echo ✅ boto3 安装成功
) else (
    echo ✅ boto3 已安装
)

echo.
echo 📤 步骤 2/3: 上传图片到 R2...
python scripts/migrate_local_to_r2.py
if errorlevel 1 (
    echo ❌ 图片上传失败
    pause
    exit /b 1
)

echo.
echo 🔄 步骤 3/3: 替换文章链接...
node scripts/batch_replace_actual.js
if errorlevel 1 (
    echo ❌ 链接替换失败
    pause
    exit /b 1
)

echo.
echo ========================================
echo 🎉 迁移完成！
echo ========================================
echo 📋 查看详细日志:
echo   - migration_local.log
echo   - replacement_report.json
echo   - url_mapping_local.txt
echo.
echo 🌐 新图片域名: https://media.makomako.dpdns.org
echo.
pause