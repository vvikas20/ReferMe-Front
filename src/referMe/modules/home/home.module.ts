import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/referMe/shared/shared.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { PostsComponent } from './components/posts/posts.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ManagePostsComponent } from './components/manage-posts/manage-posts.component';
import { ManageJobsComponent } from './components/manage-jobs/manage-jobs.component';
import { TableModule } from 'primeng/table';
import { JobComponent } from './components/jobs/job/job.component';
import { JobFilterComponent } from './components/jobs/job-filter/job-filter.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { WavesModule, ButtonsModule, InputsModule, ModalModule, CardsFreeModule } from 'angular-bootstrap-md';
import { MyPostComponent } from './components/posts/my-post/my-post.component';
import { MyPostFilterComponent } from './components/posts/my-post-filter/my-post-filter.component';
import { AppUser } from 'src/referMe/core/models/app-user.model';
import { JobpostService } from './services/jobpost.service';

@NgModule({
  declarations: [HomeComponent, HeaderComponent, FooterComponent, SidebarComponent, MyAccountComponent, JobsComponent, PostsComponent, DashboardComponent, ManageUsersComponent, ManagePostsComponent, ManageJobsComponent, JobComponent, JobFilterComponent, MyPostComponent, MyPostFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    VirtualScrollerModule,
    SharedModule,
    CardsFreeModule,
    WavesModule,
    ButtonsModule,
    InputsModule,
    ModalModule,
    ReactiveFormsModule,
    TableModule,
    HomeRoutingModule,
    SharedModule
  ],
  providers: [JobpostService]
})
export class HomeModule {

  constructor(private appUser: AppUser) {
    let jwt = JSON.parse(localStorage.getItem('jwtkey'));
    if (jwt != null) {
      this.appUser.userID = jwt.UserID;
      this.appUser.firstName = jwt.FirstName;
      this.appUser.middleName = jwt.MiddleName;
      this.appUser.lastName = jwt.LastName;
      this.appUser.emailAddress = jwt.EmailAddress;
      this.appUser.mobile = jwt.Mobile;
    }
  }

}
