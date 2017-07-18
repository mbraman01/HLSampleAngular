import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SampleAssetService } from './SampleAsset.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-SampleAsset',
	templateUrl: './SampleAsset.component.html',
	styleUrls: ['./SampleAsset.component.css'],
  providers: [SampleAssetService]
})
export class SampleAssetComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      assetId = new FormControl("", Validators.required);
  
      owner = new FormControl("", Validators.required);
  
      value = new FormControl("", Validators.required);
  


  constructor(private serviceSampleAsset:SampleAssetService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          assetId:this.assetId,
        
    
        
          owner:this.owner,
        
    
        
          value:this.value
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceSampleAsset.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

  addAsset(form: any): Promise<any> {

    this.asset = {
      $class: "org.acme.sample.SampleAsset",
      
        
          "assetId":this.assetId.value,
        
      
        
          "owner":this.owner.value,
        
      
        
          "value":this.value.value
        
      
    };

    this.myForm.setValue({
      
        
          "assetId":null,
        
      
        
          "owner":null,
        
      
        
          "value":null
        
      
    });

    return this.serviceSampleAsset.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "assetId":null,
        
      
        
          "owner":null,
        
      
        
          "value":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.acme.sample.SampleAsset",
      
        
          
        
    
        
          
            "owner":this.owner.value,
          
        
    
        
          
            "value":this.value.value
          
        
    
    };

    return this.serviceSampleAsset.updateAsset(form.get("assetId").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceSampleAsset.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceSampleAsset.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "assetId":null,
          
        
          
            "owner":null,
          
        
          
            "value":null 
          
        
      };



      
        if(result.assetId){
          formObject.assetId = result.assetId;
        }else{
          formObject.assetId = null;
        }
      
        if(result.owner){
          formObject.owner = result.owner;
        }else{
          formObject.owner = null;
        }
      
        if(result.value){
          formObject.value = result.value;
        }else{
          formObject.value = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "assetId":null,
        
      
        
          "owner":null,
        
      
        
          "value":null 
        
      
      });
  }

}
