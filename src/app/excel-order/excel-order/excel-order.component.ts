import { Component, OnInit, ViewChild } from '@angular/core';
import { AgentService } from '../../agent/agent.service';
import { AgentOrderService } from '../../agent-order/agent-order.service';
import { OrderService } from '../../order/order.service';
import { ProductService } from '../../product/product.service';
import { CompanyService } from '../../company/company.service';
import { ObligationService } from '../../users/obligation.service';
import { SimService } from '../../sim/sim.service';
import { PhoneService } from '../../phone/phone.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from 'ng2-translate';
import { AuthenticationService } from '../../login/authentication.service';
import { LocalStorageService } from '../../local-storage.service';
import { UsersService } from '../../users/users.service';
import { elementAt } from 'rxjs/operator/elementAt';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-excel-order',
  templateUrl: './excel-order.component.html',
  styleUrls: ['./excel-order.component.scss']
})
export class ExcelOrderComponent implements OnInit {
  company1 = new FormControl();
  product1 = new FormControl();
  agent_list:any=null;
  company_list:any=null;
  product_list:any=null;
  number_list:any=[];
  company:number=null;
  product:number=null;
  agent:number=null;
  loading:Boolean=false;
  api:Boolean=true;
  searchAgents:any[];
  sent_msg:Boolean=true;
  start_date:any=new Date();
  displayedColumns = [ 'index','phone','sim','days_to_disconnect','action'];
  @ViewChild('fileInput') fileInput;
  disableButton: boolean = false;
  constructor( private agentService:AgentService,
    private usersService:UsersService,
    private agentOrderService:AgentOrderService,
    private orderService:OrderService,
    private productService:ProductService,
    private companyService:CompanyService,
    private obligationService:ObligationService,
    private simService:SimService,
    private phoneService:PhoneService,
    private router:Router,
    private trans:TranslateService, 
    private lsService:LocalStorageService,
    public authService:AuthenticationService,
    private route: ActivatedRoute) {}
  ngOnInit(){
    this.usersService.getAgents().subscribe(res=>{
      this.agent_list=res;
      this.searchAgents=this.agent_list;
    });
    this.companyService.getCompanys().subscribe(res=>{
      this.company_list=res;
    });
    this.productService.getProducts().subscribe(res=>{
      let list:any=[];
      this.product_list=res;
      this.product_list.forEach(el=>{
        if(el.active=="1"){
          list.push(el);
        }
      });
      this.product_list=list;
    });
  }
  getCompanyProducts(company_id){
    return this.product_list.filter(el=>el.company_id==company_id);
  }
  resetCompany(){
    this.product=null;
    this.company=null;
    this.number_list=[];
  }
  resetProduct(){
    this.product=null;
    this.number_list=[];
  }
  resetAgent(){
    this.agent=null;
    this.number_list=[];
  }
  resetNumber(index){
    this.number_list.splice(index, 1);
  }
  getCompanyName(company){
    return this.company_list.filter(el=>el.id==company)[0].name;
  }
  getProductName(product){
    return this.product_list.filter(el=>el.id==product)[0].name;
  }
  getAgentName(agent){
    return agent.firstname+' '+agent.lastname;
  }
  upload() {
    this.number_list=[];
    this.loading=true;
    const fileBrowser = this.fileInput.nativeElement;
    // console.log(fileBrowser);
    if (fileBrowser.files && fileBrowser.files[0]) {
      this.phoneService.addPhonesAndSimsExcel(fileBrowser.files[0]).subscribe(
        res=>{
          this.loading=false;
          if(res['_body'] ){
            let r=JSON.parse(res['_body']);
            r.data.forEach(element => {
              if( element ){
                this.number_list.push(element)
              }
            });
            this.fileInput.nativeElement.value = '';
          }
      });
    }
  }
  search='';
  agentSearch(event){
    let value=event.target.value;
    if(value==''){
      this.searchAgents=this.agent_list;
    }
    else{
      this.searchAgents=this.agent_list.filter(option => 
        option.firstname.toLowerCase().includes(value)|| 
        option.lastname.toLowerCase().includes(value));
    }
  }
  createOrders(){
    let orders={
      agent:this.agent,
      product:this.product,
      company:this.company,
      numbers:this.number_list,
      api:this.api?'1':'0',
      sent_msg:this.sent_msg?'1':'0',
      start_date:this.start_date
    };
    // console.log("test createOrders");
    this.loading=true;
    this.disableButton=true;
    this.orderService.createOrders(orders).subscribe(res=>{
      this.loading=false;
      this.disableButton=false;
      // this.router.navigate(['/הזמנות']);
    });
  }
}
