import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//const {Storage} = require('@google-cloud/storage');
//const storage = new Storage({keyFilename: "../../Keys/leashed-158.json"});
const  USER_IMAGE_BUCKET_NAME = "dev-growler-images";
@Injectable({
  providedIn: 'root'
})
export class ImagesService {


  constructor(private http: HttpClient) { }

  uploadImage$(file :File, url :string): Observable<any> {

    //var id = file.name;
    //this.uploadFile(id, USER_IMAGE_BUCKET_NAME);
    //return this.getImageUrl(id);
    return this.http.put(url,file, {headers: {'Content-Type': 'image/*'}});

  }

  public async getImageUrl(id :string) {
    var url  = this.generateSignedUrl(id, USER_IMAGE_BUCKET_NAME);

    return url;
  }

  public async createBucket(bucketName: string) {
    // Creates the new bucket
    //await storage.createBucket(bucketName);
    console.log(`Bucket ${bucketName} created.`);
  }

 private async generateSignedUrl( filename: string, bucketName: string) {
    // These options will allow temporary read access to the file
    const options = {
      version: 'v2', // defaults to 'v2' if missing.
      action: 'read',
      expires: Date.now() + 1000 * 60 * 60, // one hour
    };

    var url = "nothing"
    // Get a v2 signed URL for the file
    //const [url] = await storage
     // .bucket(bucketName)
     // .file(filename)
     // .getSignedUrl(options);

   // console.log(`The signed url for ${filename} is ${url}.`);
    return url;
  }

  async  uploadFile( filename: string, bucketName: string) {
    // Uploads a local file to the bucket
    //await storage.bucket(bucketName).upload(filename, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
     // gzip: true,
      // By setting the option `destination`, you can change the name of the
      // object you are uploading to a bucket.
    //  metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
      //  cacheControl: 'public, max-age=31536000',
    //  },
   // });

    console.log(`${filename} uploaded to ${bucketName}.`);
  }

}
