import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { DefaultError } from './CommonPages/DefaultErrorPage/default_error.component';
import { WebHome } from './Home/HomePage/web_home.component';

const routes : Routes = [
    // route object: JSON objects
    //{path:"", component: HomeComponent}, bad practice also negative effect on SEO
    {path:"", redirectTo:"home", pathMatch : "full"},//blank address bar
    {path:"home", component: WebHome},
    // fallback component mapping
    {path:"**", component:DefaultError}
];

@NgModule({
    //customize
    imports:[RouterModule.forRoot(routes)],
    //need to exxpose the inbuilt routing module to appmodule
    exports:[RouterModule]
})

export class AppRouting{
    constructor(){

    }
}