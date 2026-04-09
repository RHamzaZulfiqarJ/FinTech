from statistics import mean


def detect_anomalies(transactions):
    anomalies = []

    if len(transactions) < 3:
        return anomalies

    amounts = [float(t.amount) for t in transactions]
    avg = mean(amounts)

    for t in transactions:
        # 🔴 Rule 1: Very large transaction
        if float(t.amount) > avg * 3:
            anomalies.append({
                "type": "high_value",
                "message": f"Transaction ${t.amount} is unusually high",
                "transaction_id": str(t.id)
            })

    # 🔴 Rule 2: Sudden spike (last transaction vs previous avg)
    last = float(transactions[-1].amount)
    prev_avg = mean(amounts[:-1])

    if last > prev_avg * 2:
        anomalies.append({
            "type": "spike",
            "message": "Sudden spike in spending detected",
            "transaction_id": str(transactions[-1].id)
        })

    return anomalies