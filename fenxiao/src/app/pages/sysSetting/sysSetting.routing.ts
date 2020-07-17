import { Routes, RouterModule } from '@angular/router';
import { EmployeeInformationComponent } from './employee-information/employee-information.component';
import { RoleAuthComponent } from './role-auth/role-auth.component';
import { OrganizInfomationComponent } from './organiz-infomation/organiz-infomation.component';

const routes: Routes = [
    { path: 'role', component: RoleAuthComponent },
    { path: 'userInfo', component: EmployeeInformationComponent },
    { path: 'orgInfo', component: OrganizInfomationComponent },
];

export const SysRoutes = RouterModule.forChild(routes);
