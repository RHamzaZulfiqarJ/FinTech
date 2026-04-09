from collections import defaultdict
from statistics import mean


def generate_insights(transactions):
    insights = []

    if not transactions:
        return ["No transactions available"]

    # 🔹 1. Total Spending
    total = sum(float(t.amount) for t in transactions)
    insights.append(f"Total spending is ${total:.2f}")

    # 🔹 2. Average transaction
    avg = mean([float(t.amount) for t in transactions])
    insights.append(f"Average transaction value is ${avg:.2f}")

    # 🔹 3. High-value count
    high = [t for t in transactions if float(t.amount) > avg * 2]
    if high:
        insights.append(f"{len(high)} high-value transactions detected")

    # 🔹 4. Frequent payee
    payee_count = defaultdict(int)
    for t in transactions:
        payee_count[t.payee] += 1

    frequent = max(payee_count, key=payee_count.get)
    insights.append(f"Most frequent payee: {frequent}")

    # 🔹 5. Monthly trend
    monthly = defaultdict(float)
    for t in transactions:
        month = t.date.strftime("%Y-%m")
        monthly[month] += float(t.amount)

    if len(monthly) >= 2:
        months = sorted(monthly.keys())
        last = monthly[months[-1]]
        prev = monthly[months[-2]]

        if last > prev:
            insights.append("Spending increased compared to last month")
        else:
            insights.append("Spending decreased compared to last month")

    # 🔹 6. Top spending day (bonus)
    day_totals = defaultdict(float)
    for t in transactions:
        day = t.date.strftime("%Y-%m-%d")
        day_totals[day] += float(t.amount)

    top_day = max(day_totals, key=day_totals.get)
    insights.append(f"Highest spending day: {top_day}")

    return insights