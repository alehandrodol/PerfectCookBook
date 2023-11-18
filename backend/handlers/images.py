import os, hashlib
from typing import Annotated

import aiofiles
from aiofiles import os as aios
from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile
from starlette.responses import FileResponse

router = APIRouter()


@router.post("/images/")
async def create_image(file: UploadFile):
    out_file_path = os.path.join(os.getcwd(), "..", "images")
    out_file_path = os.path.abspath(out_file_path)

    if not os.path.exists(out_file_path):
        await aios.mkdir(out_file_path)

    filename = hashlib.md5(await file.read(8192)).hexdigest() + os.path.splitext(file.filename)[1]
    out_file_path = os.path.join(out_file_path, filename)

    async with aiofiles.open(out_file_path, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)

    return {"path": "/images/" + filename}


@router.get("/images/{file_name}")
async def get_image(file_name: str):
    out_file_path = os.path.join(os.getcwd(), "..", "images", file_name)
    out_file_path = os.path.abspath(out_file_path)
    return FileResponse(out_file_path)
