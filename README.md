# GO-CAMs Site

This is the angular application serving the [geneontology.org/gocam](http://geneontology.org/gocam) site for [GO-CAMs](https://github.com/geneontology/noctua-models)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Deploy site in production

> ./deploy.sh

Note: this script requires the AWS permissions to upload the build site to S3 and invalidate the associated cloudfront distribution
