terraform {
  backend "s3" {
    bucket = "davidstatefile"
    key    = "eks-microservice.tfstate"
    region = "us-east-1"
    #profile = "terraform-user"

  }
}