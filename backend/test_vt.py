from app.services.virustotal import check_file

result = check_file("uploads/test.pdf")

print(result)