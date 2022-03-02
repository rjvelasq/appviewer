import { Component } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';



  import {
    ViewerOptions,
    ViewerInitializedEvent,
    DocumentChangedEvent,
    SelectionChangedEventArgs,
    ThumbnailOptions,
    Extension,
 } from 'ng2-adsk-forge-viewer';  

//import { MyExtension } from './my-extension';

//export const ACCESS_TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6IlU3c0dGRldUTzlBekNhSzBqZURRM2dQZXBURVdWN2VhIn0.eyJzY29wZSI6WyJ2aWV3YWJsZXM6cmVhZCJdLCJjbGllbnRfaWQiOiIyREp3NEo2THNSbjBCZWk4U3psMUJrYWw0M1F4TE1ZTyIsImF1ZCI6Imh0dHBzOi8vYXV0b2Rlc2suY29tL2F1ZC9hand0ZXhwNjAiLCJqdGkiOiJtbXJlOEE3QW1OWWt1WGxzVFZ5TVlVNWdEaUxJTkJLRFVoMHRaQWMzdDlSbTRlemJrTDZxZGc3cUJtUEZIMENJIiwiZXhwIjoxNjQ2MDkzNzcxfQ.VRnl0JmNMEQIP0puKGV9Nle9SKkC_-3jHYgUuo0pU5MKBuGtdqhlNiCWwaLP1DB_aGlF8sSUOt8X9kqo9tBRzYdVzscD9gYLU0gxm6OjH15Yh966YMMomXsTsBu2OO28yypnj2isdjAnsHL4lS9fdXxenF5YNdGWksZRaz9R8LCWD_atCuJ0khLhDJY_QayUBx-MXMOvGs_aJSzbXtm_UUV_Ybxw8XByiwgKXD0jwE69EHGJ5WzzI2uIKNg1sJfgfM549x10L4XkgjUt42b8RYvNyt1DPXpoW1lvuuLKXVeCqG83HBjJwAld2XGMiTPBicWlD-HVezYvUZaq62hT2w";
export const DOCUMENT_URN = "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y2FyZG9uaXYvMjEtMDktMTQtODUzNGh1YjIubndk"; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app viewer';


  public viewerOptions3d: ViewerOptions;
  public viewerOptions2d: ViewerOptions;
  public thumbnailOptions: ThumbnailOptions;
  public documentId: string;
  public view: number = 1;
  public viewer:any;
  public autorizacion:any;
  //public ACCESS_TOKEN: string;


  constructor(private http : HttpClient) { }

  async ngOnInit() {

    const ACCESS_TOKEN = this.getToken();


    console.log(ACCESS_TOKEN);

    
    
    this.viewerOptions3d = {
      initializerOptions: {
        env: "AutodeskProduction",
        getAccessToken: (
          onGetAccessToken: (token: string, expire: number) => void
        ) => {
          const expireTimeSeconds = 60 * 30;
          onGetAccessToken(ACCESS_TOKEN, expireTimeSeconds);
        },
        api: "derivativeV2",
        enableMemoryManagement: true
      },
      viewerConfig: {
        //extensions: ["Autodesk.DocumentBrowser", MyExtension.extensionName],
        theme: "bim-theme"
      },
      onViewerScriptsLoaded: () => {
        // Register a custom extension
        // Extension.registerExtension(MyExtension.extensionName, MyExtension);
      },
      onViewerInitialized: (args: ViewerInitializedEvent) => {
        args.viewerComponent.DocumentId = DOCUMENT_URN;
      },
      // showFirstViewable: false,
      // headlessViewer: true,
      // Set specific version number
      //version: "7.41"
    };

  
}

    /* public scriptsLoaded() {
      Extension.registerExtension(MyExtension.extensionName, MyExtension);
    } */
  
   /*  public loadDocument(args: ViewerInitializedEvent) {
      args.viewerComponent.DocumentId = DOCUMENT_URN;
    } */

    public documentChanged(event: DocumentChangedEvent) {
      const { document } = event;
   
      if (!document.getRoot()) return;
   
      const viewables = document.getRoot().search({ type: 'geometry', role: '2d' });
      if (viewables && viewables.length > 0) {
        event.viewerComponent.loadDocumentNode(document, viewables[0]);
      }
    }
   
    public selectionChanged(event: SelectionChangedEventArgs) {
      console.log(event);
   } 

  public getToken():any {

    this.http.get("http://localhost:3000/api/forge/oauth/token").subscribe((data)=>{
        this.autorizacion = data;

       // console.log(this.autorizacion.access_token);

        return this.autorizacion.access_token;

        
    });


   }

}

