import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JobpostService } from '../../services/jobpost.service';
import { UserPostDetail, PostFilter } from '../../models/user-post.model';
import { AlertService } from 'src/referMe/core/helper/alert.service';
import { LocationService } from '../../services/location.service';
import { CompanyService } from '../../services/company.service';
import { SearchParameter } from '../../models/search-parameter.model';

@Component({
  selector: 'referMe-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  totallFilteredJobCount: number;
  userPostDetails: Array<UserPostDetail>;

  companies: Array<string>;
  companyMaster: Array<{ companyId: number, companyName: string }>;

  locations: Array<string>;
  locationMaster: Array<{ locationID: number, city: string, state: string }>

  experienceOptions: { label: string; value: number }[];

  jobFilter: PostFilter;


  constructor(private alertService: AlertService,
    private jobpostService: JobpostService,
    private companyService: CompanyService,
    private locationService: LocationService) {

  }


  ngOnInit() {
    this.jobFilter = new PostFilter();
    this.totallFilteredJobCount = 0;
    this.userPostDetails = [];
    this.fetchJobPosts(new SearchParameter());

    this.prepareOptions();
    this.fetchCompanies();
    this.fetchLocations();
  }

  prepareOptions() {
    this.experienceOptions = [];
    let i: number = 0;
    while (i < 21) {
      this.experienceOptions.push({ label: i.toString(), value: i });
      i++;
    }

    this.jobFilter.minExp = 0;
    this.jobFilter.maxExp = 0;
  }

  fetchLocations() {
    this.locations = [];
    this.locationMaster = [];
    this.locationService.getLocations().subscribe(
      next => {
        next.forEach(location => {
          this.locationMaster.push({
            locationID: location.LocationID,
            city: location.City,
            state: location.State
          });
        });
      },
      error => {

      },
      () => { });
  }

  fetchCompanies() {
    this.companies = [];
    this.companyMaster = [];
    this.companyService.getCompanies().subscribe(
      next => {
        next.forEach(company => {
          this.companyMaster.push({
            companyId: company.CompanyID,
            companyName: company.CompanyName
          });
        });
      },
      error => {

      },
      () => { });
  }


  searchCompany(event) {
    this.companies = this.companyMaster.filter(c => c.companyName.toUpperCase().startsWith(event.query.toUpperCase())).map(c => c.companyName)
  }

  searchLocation(event) {
    this.locations = this.locationMaster.filter(c => c.city.toUpperCase().startsWith(event.query.toUpperCase())).map(c => c.city)
  }

  fetchJobPosts(searchParameter: SearchParameter): void {

    if (this.jobFilter.maxExp > 0 && this.jobFilter.minExp > this.jobFilter.maxExp) {
      this.alertService.info('INFO', 'Minimum Experience can not be greater than Maximum Experience');
      return;
    }

    if (this.jobFilter.company != '') searchParameter.Filters.push({ Field: 'company', Value: this.jobFilter.company });
    if (this.jobFilter.location != '') searchParameter.Filters.push({ Field: 'location', Value: this.jobFilter.location });
    if (this.jobFilter.minExp > 0) searchParameter.Filters.push({ Field: 'minExp', Value: this.jobFilter.minExp });
    if (this.jobFilter.maxExp > 0) searchParameter.Filters.push({ Field: 'maxExp', Value: this.jobFilter.maxExp });

    // this.totallFilteredJobCount=0;
    this.userPostDetails = [];

    this.jobpostService.getOpenings(searchParameter).subscribe(next => {
      this.totallFilteredJobCount = next.TotallItem;
      next.Items.forEach(element => {
        this.userPostDetails.push({
          postDetail: {
            postID: element.PostDetail.PostID,
            userID: element.PostDetail.UserID,
            company: element.PostDetail.Company,
            position: element.PostDetail.Position,
            minExp: element.PostDetail.MinExp,
            maxExp: element.PostDetail.MaxExp,
            location: element.PostDetail.Location,
            contact: element.PostDetail.Contact,
            description: element.PostDetail.Description
          },
          userDetail: {
            userID: element.UserDetail.UserID,
            firstName: element.UserDetail.FirstName,
            middleName: element.UserDetail.MiddleName,
            lastName: element.UserDetail.LastName,
            emailAddress: element.UserDetail.EmailAddress,
            mobile: element.UserDetail.Mobile
          }
        });
      });
    },
      error => {

      },
      () => { });
  }

  paginate(event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    
    let searchParam = new SearchParameter();
    searchParam.Page = event.page + 1;
    searchParam.Rows = event.rows;

    this.fetchJobPosts(searchParam);
  }

  refreshJobs() {
    this.fetchJobPosts(new SearchParameter());
  }
}
