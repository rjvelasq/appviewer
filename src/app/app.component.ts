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

//import { MyExtension } from './my_extension';

export const DOCUMENT_URN_3D = "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y2FyZG9uaXYvQWNjZWxlcmF0ZV9Qb0NfRGlnVHdpbl8yMDIyMDMwMS5ud2Q="; 
export const DOCUMENT_URN_2D = "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y2FyZG9uaXYvSU5UMTQzLTEwLTIwMC1ERERELTIyLVI2LmR3Zw=="; 



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
  public authToken:any=null;


  constructor(private http : HttpClient) { }

  async ngOnInit() {

    this.viewerOptions2d = {
      initializerOptions: {
        env: "AutodeskProduction",
        getAccessToken: (onGetAccessToken: (token: string, expire: number) => void ) => {

          if( this.authToken==null){
            console.info("entro1");
            fetch('http://3.211.50.52:3000/api/forge/oauth/token')
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
                  this.authToken = json;
   
                  onGetAccessToken(json.access_token, json.expires_in);
              });
          }else{
            onGetAccessToken(this.authToken.access_token, this.authToken.expires_in);
          }
     
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
        args.viewerComponent.DocumentId = DOCUMENT_URN_2D;
      },

    };

    setTimeout(() => {
      this.viewerOptions3d = {
        initializerOptions: {
          env: "AutodeskProduction",
          getAccessToken: (onGetAccessToken: (token: string, expire: number) => void) => {
            // const expireTimeSeconds = 60 * 30;
            // onGetAccessToken(ACCESS_TOKEN, expireTimeSeconds);
           
            if( this.authToken==null){
              console.info("entro2");
              fetch('http://3.211.50.52:3000/api/forge/oauth/token')
              .then((response) => response.json())
              .then((json) => {
                console.log(json);
                    this.authToken = json;
                    // console.log(json.access_token);
                    // console.log(json.expires_in);
                    onGetAccessToken(json.access_token, json.expires_in);
                });
            }else{
              console.info("entro2-1");

              onGetAccessToken(this.authToken.access_token, this.authToken.expires_in);
            }
        
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
          args.viewerComponent.DocumentId = DOCUMENT_URN_3D;
        },
        // showFirstViewable: false,
        // headlessViewer: true,
        // Set specific version number
        //version: "7.41"
      };
    }, 2000);
   

  
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


  /*  public selectionChanged(event: SelectionChangedEventArgs) {
    console.log(event.dbIdArray);
  } */

 

}