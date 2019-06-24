'use strict';

import { HttpHeaders } from '@angular/common/http';

export const API_ENDPOINT='https://www.skypanel.net/api-test/';
// export const API_ENDPOINT='api-test/';
export const EXPIRES=3600; 
import  *  as excel  from './../../node_modules/excellentexport';
export const httpOptions = {
     headers: new HttpHeaders({
     'Content-Type':  'application/json'
    })
};

export const Routes={
    home:{path:'',icon:'home'},
    agent:{path:'סוכן'},
    edit_user:{path:'עריכת-משתמש',icon:'account_circle'},
    phone:{path:'מספר'},
    order:{path:'הזמנה'},
    login:{path:'התחברות',icon:'power_settings_new'},
    new_charge:{path:'טעינה-חדשה',icon:'add_shopping_cart'},
    new_order:{path:'טעינה-חדשה',icon:'add_shopping_cart'},
    sims:{path:'מספרי-סים',icon:'sim_card'},
    redirect_to:{path:'**'},
    settings:{path:'הגדרות',icon:'settings'},
    permissions:{path:'הרשאות',icon:'lock'},
    users:{path:'משתמשים',icon:'supervisor_account',
            add:{path:'הוספת-משתמש' },
            edit:{path: 'עריכת-משתמש/:id' }
          },
    companies:{path:'חברות',icon:'domain'},
    consumers:{path:'לקוחות',icon:'assignment_ind'},
    addConsumer:{path:'לקוח-חדש'},
    editConsumer:{path: 'עריכת-לקוח/:id'},
    viewAgent:{path: 'סוכן/:id'},
    viewPhoneInfo:{ path: 'מספר/:id'},
    viewOrderInfo:{ path: 'הזמנה/:id'},
    viewConsumer:{path: 'לקוח/:id'},
    products:{path:'חבילות',icon:'work'},
    price_list:{path:'מחירון',icon:'attach_money'},
    discounts:{path:'הנחות',icon:'money_off'},
    block_packages:{path:'חסימת-חבילות',icon:'block'},
    phones:{path:'מספרי-טלפון',icon:'phone'},
    members:{path:'מינויים',icon:'picture_in_picture_alt'},
    payments:{path:'תשלומים',icon:'payment'},
    orders:{path:'הזמנות',icon:'library_books'},
    mobility_numbers:{path:'ניוד-מספרים',icon:'sync'},
    agents_report:{path:'דוח-סוכנים',icon:'assessment'},
    comparisons:{path:'השוואות',icon:'compare'},
    excel_order:{path:'הזמנת-אקסל',icon:'work'},
    excel_charge:{path:'טעינות-אקסל',icon:'work'},
    status_hotmobile:{path:'סטאטוס-הוט-מובייל',icon:'signal_cellular_alt'},
    status_cellcom:{path:'סטאטוס-סלקום',icon:'signal_cellular_alt'},
    general_report:{path:'דוח-כללי-חדש',icon:'assignment'},
    agents_acounts:{path:'חשבונות-סוכנים',icon:'assignment'},
    automatic_update:{path:'חידוש-אוטומאטי',icon:'update'},

    
};