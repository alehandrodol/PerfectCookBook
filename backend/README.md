## Локальный запуск backend

Из папки backend в консоли прописать 
``uvicorn main:app --reload``

## Работа с миграциями

Создание миграции:
``alembic revision --autogenerate -m '<text>'``

Применения последней миграции (head можно заменить на определённую ревизию):
``alembic upgrade head``

Откат миграции:
``alembic downgrade <revision_id>``