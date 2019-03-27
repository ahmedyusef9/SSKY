'use strict';

import { HttpHeaders } from '@angular/common/http';

export const API_ENDPOINT='https://www.skypanel.net/api/';
export const EXPIRES=3600; 

export const httpOptions = {
     headers: new HttpHeaders({
     'Content-Type':  'application/json'
    })
};