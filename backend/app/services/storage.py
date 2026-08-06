import os
import boto3

AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.getenv("AWS_REGION")
S3_BUCKET = os.getenv("AWS_S3_BUCKET")

s3 = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name=AWS_REGION,
)


def upload_file_to_s3(local_path: str, object_name: str):
    s3.upload_file(local_path, S3_BUCKET, object_name)
    return object_name


def download_file_from_s3(object_name: str, local_path: str):
    s3.download_file(S3_BUCKET, object_name, local_path)


def delete_file_from_s3(object_name: str):
    s3.delete_object(
        Bucket=S3_BUCKET,
        Key=object_name,
    )