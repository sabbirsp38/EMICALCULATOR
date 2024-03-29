import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApplyComponent } from './apply/apply.component';
import { TncComponent } from './tnc/tnc.component';
import { TestComponent } from './test/test.component';


const routes: Routes = [
{
	path:'',component:HomeComponent
},
{
	path:'apply',component:ApplyComponent
},
{
	path:'terms&conditions',component:TncComponent
},
{
	path:'t',component:TestComponent
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }