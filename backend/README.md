## Локальный запуск backend
Выполнять команды ниже в папке ``/backend``

Убедиться, что установлены все зависимости
``pip install -r pip_requirements.txt``

Из папки backend в консоли прописать 
``uvicorn main:app --reload``

## Работа с миграциями
Выполнять команды ниже в папке ``/backend/db``

Создание миграции:
``alembic revision --autogenerate -m '<text>'``

Применения последней миграции (head можно заменить на определённую ревизию):
``alembic upgrade head``

Откат миграции:
``alembic downgrade <revision_id>``