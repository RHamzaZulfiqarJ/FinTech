VALID_CATEGORIES = ["Capital Expenditure", "Operational", "Misc"]

def ai_categorize(transaction):
    # Simulated AI output (replace later)
    if transaction.amount > 5000:
        return "Capital Expenditure"
    return "Operational"


def validate_ai_output(db, transaction, ai_output):
    if ai_output not in VALID_CATEGORIES:
        from app.models.ai_log import AIValidationLog

        log = AIValidationLog(
            transaction_id=transaction.id,
            ai_output=ai_output,
            corrected_output="Misc",
            error_reason="Invalid category from AI"
        )

        db.add(log)
        db.commit()

        return "Misc"

    return ai_output