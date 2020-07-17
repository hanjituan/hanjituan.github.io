import { Routes, RouterModule } from '@angular/router';
import { ReleaseVersionComponent } from './release-version/release-version.component';
import { AddVersionComponent } from './add-version/add-version.component';

const routes: Routes = [
  { path: 'releaseVersion', component: ReleaseVersionComponent  },
  { path: 'addVersion', component: AddVersionComponent}
];

export const OpsRoutes = RouterModule.forChild(routes);
