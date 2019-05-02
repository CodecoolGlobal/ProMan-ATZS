from psycopg2 import sql
import connection


@connection.connection_handler
def _get_data(cursor, table):
    """
    :return: list of ordered dicts
    """
    cursor.execute(
        sql.SQL("SELECT * FROM {table} ").format(table=sql.Identifier(table))
    )
    table_data = cursor.fetchall()
    return table_data


@connection.connection_handler
def _get_id_by_name(cursor, table, name):
    cursor.execute(
        sql.SQL("""SELECT id FROM {table} 
                WHERE name = %(name)s """).format(table=sql.Identifier(table)), {'name': name})

    table_id = cursor.fetchone()
    return table_id

@connection.connection_handler
def add_new_boards(cursor, board_title):
    cursor.execute(
        "INSERT INTO boards (name) VALUES (%(board_title)s)", {'board_title': board_title})
    new_board_id = _get_id_by_name('boards', board_title)['id']

    cursor.execute(
        "INSERT INTO statuses (name, board_id) VALUES ('kolyok1', %(new_board_id)s)", {'new_board_id':new_board_id})
    cursor.execute(
        "INSERT INTO statuses (name, board_id) VALUES ('kolyok2', %(new_board_id)s)", {'new_board_id':new_board_id})
    cursor.execute(
        "INSERT INTO statuses (name, board_id) VALUES ('kolyok3', %(new_board_id)s)", {'new_board_id':new_board_id})

_cache = {}  # We store cached data in this dict to avoid multiple file readings


def clear_cache():
    for k in list(_cache.keys()):
        _cache.pop(k)


def get_statuses():
    return _get_data('statuses')


def get_boards():
    return _get_data('boards')


def get_cards():
    return _get_data('cards')

# def get_cards(force=False):
# return _get_data('cards', CARDS_FILE, force)
