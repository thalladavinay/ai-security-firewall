def send_email(
    recipient: str,
    subject: str,
    message: str
):

    print(
        f"Email sent to {recipient}"
    )

    return {
        "status": "sent",
        "recipient": recipient,
        "subject": subject
    }