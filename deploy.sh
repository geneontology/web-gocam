ng build --build-optimizer --prod
aws s3 rm s3://www.geneontology.cloud --recursive
aws s3 cp --recursive dist/ s3://www.geneontology.cloud/
aws cloudfront create-invalidation --distribution-id E26GY8VZLRQLMG --paths '/*'