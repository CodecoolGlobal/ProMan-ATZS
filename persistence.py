from psycopg2 import sql
import connection


@connection.connection_handler
def _get_data(cursor, table):
    """
    :return: list of ordered dicts
    """
    cursor.execute(
        sql.SQL('''SELECT * FROM {table}''').format(table=sql.Identifier(table)))
    table_data = cursor.fetchall()
    return table_data


@connection.connection_handler
def _get_all_data(cursor):
    """
    :return: list of ordered dicts
    """
    cursor.execute(
        sql.SQL('''
                SELECT 
                    boards.id AS board_id,
                    boards.name AS board_name,
                    statuses.id AS status_id,
                    statuses.name AS status_name,
                    cards.id AS card_id,
                    cards.name AS card_name
                FROM boards
                INNER JOIN statuses 
                    ON boards.id = statuses.board_id
                INNER JOIN cards 
                    ON cards.status_id = statuses.id
                '''))
    all_table_data = cursor.fetchall()
    return all_table_data


# import csv
#
# STATUSES_FILE = './data/statuses.csv'
# BOARDS_FILE = './data/boards.csv'
# CARDS_FILE = './data/cards.csv'

_cache = {}  # We store cached data in this dict to avoid multiple file readings


# def _read_csv(file_name):
#     """
#     Reads content of a .csv file
#     :param file_name: relative path to data file
#     :return: OrderedDict
#     """
#     with open(file_name) as boards:
#         rows = csv.DictReader(boards, delimiter=',', quotechar='"')
#         formatted_data = []
#         for row in rows:
#             formatted_data.append(dict(row))
#         return formatted_data


# def _get_data(data_type, file, force):
#     """
#     Reads defined type of data from file or cache
#     :param data_type: key where the data is stored in cache
#     :param file: relative path to data file
#     :param force: if set to True, cache will be ignored
#     :return: OrderedDict
#     """
#     if force or data_type not in _cache:
#         _cache[data_type] = _read_csv(file)
#     return _cache[data_type]


def clear_cache():
    for k in list(_cache.keys()):
        _cache.pop(k)


def get_statuses():
    return _get_data('statuses')


def get_boards():
    return _get_data('boards')


def get_cards():
    return _get_data('cards')


def get_all_data_from_all_boards():
    return _get_all_data()

# def get_cards(force=False):
# return _get_data('cards', CARDS_FILE, force)