@echo off
echo \"copy andyui.js to andyuiBeta1.1!\"

copy /y andyui*.js ..\..\..\AndyUIBeta1.1\js\
copy /y ..\css\parts\andyui.best.css ..\..\..\AndyUIBeta1.1\css\andyui1.1.css
copy /y ..\css\parts\module.css ..\..\..\AndyUIBeta1.1\css\module.css
copy /y ..\css\parts\attribute.css ..\..\..\AndyUIBeta1.1\css\attribute.css
copy /y ..\css\parts\unit.css ..\..\..\AndyUIBeta1.1\css\unit.css
copy /y ..\css\animate.css ..\..\..\AndyUIBeta1.1\css\animate.css
copy /y ..\css\parts\login.css ..\..\..\AndyUIBeta1.1\css\login.css


XCOPY framework\* ..\..\..\AndyUIBeta1.1\js\framework /s /e
XCOPY ..\css\parts\skin\* ..\..\..\AndyUIBeta1.1\css\skin /s /e
XCOPY ..\css\parts\andyfont\* ..\..\..\AndyUIBeta1.1\css\andyfont /s /e
XCOPY ..\plugins\* ..\..\..\AndyUIBeta1.1\plugins /s /e
XCOPY ..\css\parts\htc\* ..\..\..\AndyUIBeta1.1\htc /s /e
XCOPY ..\css\img\* ..\..\..\AndyUIBeta1.1\img /s /e
pause


