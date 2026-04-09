def detect_conflict(incoming_ts, db_ts):
    return incoming_ts < db_ts