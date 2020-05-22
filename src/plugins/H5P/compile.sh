#!/bin/bash

rm h5p.zip
cd h5p
zip -r ../h5p.zip . -x ".*" -x "__MACOSX"
cd ..

