import { Extension } from 'ng2-adsk-forge-viewer';


export class MyExtension extends Extension {

     // Extension must have a name
    public static override extensionName: string = 'MyExtension';

    // Toolbar test
    private subToolbar: Autodesk.Viewing.UI.ToolBar;
    private onToolbarCreatedBinded: any;


    activate(): boolean {
        throw new Error('Method not implemented.');
    }
    deactivate(): boolean {
        throw new Error('Method not implemented.');
    }

    load(): boolean | Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    unload(): boolean {
        throw new Error('Method not implemented.');
    }
   
  


  }