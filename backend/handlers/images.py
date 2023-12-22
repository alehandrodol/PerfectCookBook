import os, hashlib
from typing import Annotated

import aiofiles
from aiofiles import os as aios
from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile
from starlette.responses import FileResponse

router = APIRouter()


@router.post("/images/", tags=["Images"])
async def create_image(file: UploadFile):
    # изображения кладутся в папку images которая (по идее) находится в корне проекта
    # если он запускается из PerfectCookBook/backend, как в инструкции написано
    out_file_path = os.path.join(os.getcwd(), "..", "images")
    out_file_path = os.path.abspath(out_file_path)

    if not os.path.exists(out_file_path):
        await aios.mkdir(out_file_path)

    # название файла - хеш его кусочка и расширение оригинала
    filename = hashlib.md5(await file.read(8192)).hexdigest() + os.path.splitext(file.filename)[1]
    out_file_path = os.path.join(out_file_path, filename)

    async with aiofiles.open(out_file_path, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)

    # возвращаем урл относительно домена по которому можно будет получить изображение
    return {"path": "/images/" + filename}


@router.get("/images/{file_name}", tags=["Images"])
async def get_image(file_name: str):
    out_file_path = os.path.join(os.getcwd(), "..", "images", file_name)
    out_file_path = os.path.abspath(out_file_path)
    return FileResponse(out_file_path)
