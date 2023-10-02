import psycopg2

conn = psycopg2.connect("""
    host=rc1b-yg488vnhrlssml6z.mdb.yandexcloud.net
    port=6432
    dbname=CookBook
    user=CookBookTeam
    password=bivt-20-2
    target_session_attrs=read-write
""")

q = conn.cursor()
q.execute('SELECT version()')

print(q.fetchone())

conn.close()
