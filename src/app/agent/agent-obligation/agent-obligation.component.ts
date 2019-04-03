import { Component, OnInit, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { LocalStorageService } from 'src/app/local-storage.service';
import { AuthenticationService } from 'src/app/login/authentication.service';

@Component({
  selector: 'app-agent-obligation',
  templateUrl: './agent-obligation.component.html',
  styleUrls: ['./agent-obligation.component.scss']
})
export class AgentObligationComponent implements OnInit {
  @Input() agent:any;
  @Input()
  public openObligationUpdate: Function; 
  lan:any;
  constructor(
    private trans:TranslateService, 
    private lsService:LocalStorageService,
    public authService:AuthenticationService) {
      this.lan=this.lsService.getStorage('lan');
      this.trans.onLangChange.subscribe((event: LangChangeEvent) => {
        this.lan=event.lang;
      });
      localStorage.setItem('currentComponent','app-agent-obligation');
     }

  ngOnInit() {
  }

}
