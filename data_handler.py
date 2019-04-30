import persistence


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    statuses = persistence.get_all_data_from_all_boards()
    return next((status['status_name'] for status in statuses if status['status_id'] == int(status_id)), 'Unknown')


def get_boards():
    """
    Gather all boards
    :return:
    """
    return persistence.get_all_data_from_all_boards()


def get_statuses():
    """
    Gather all boards
    :return:
    """
    return persistence.get_statuses()


def get_cards_for_board(status_id):
    persistence.clear_cache()
    all_cards = persistence.get_all_data_from_all_boards()
    matching_cards = []
    for card in all_cards:
        if card['status_id'] == int(status_id):
            card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
            matching_cards.append(card)
    return matching_cards


def get_statuses_for_board(board_id):
    persistence.clear_cache()
    all_statuses = persistence.get_statuses()
    matching_statuses = []
    for status in all_statuses:
        if status['board_id'] == int(board_id):
            matching_statuses.append(status)
    return matching_statuses
