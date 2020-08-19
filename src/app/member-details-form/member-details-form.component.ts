import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppService} from '../app.service';
import {ActivatedRoute, Router} from '@angular/router';
// import ActivatedRoute from '';

// This interface may be useful in the times ahead...
interface Member {
    firstName?: string;
    lastName?: string;
    jobTitle?: string;
    team?: string;
    status?: string;
}

@Component({
    selector: 'app-member-details',
    templateUrl: './member-details.component.html',
    styleUrls: ['./member-details.component.css']
})
export class MemberDetailsFormComponent implements OnInit, OnChanges {
    @Input() showModal = false;
    memberModel: Member;
    memberForm: FormGroup;
    submitted = false;
    alertType: String;
    alertMessage: String;
    firstName: String;
    lastName: String;
    jobTitle: String;
    team: String;
    status: String;
    teams = [];
    member = {};


    constructor(private fb: FormBuilder, private appService: AppService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.appService.getMemberById(params.get('id')).subscribe(member => (this.memberModel = member));
            console.log('params in details>>> ', params.get('id')); // save this to a variable and use it
        });

        this.appService.getTeams().subscribe(teams => (this.teams = teams));
        this.memberModel = {}
    }

    ngOnChanges() {
    }

    modalClose() {
        this.showModal = false;
        this.router.navigate([`/members/`]);
    }

    onFirstName(event) {
        this.firstName = event.target.value;
    }

    onLastName(event) {
        this.lastName = event.target.value;
    }

    onJobTitle(event) {
        this.jobTitle = event.target.value;
    }

    onTeam(event) {
        this.team = event.target.value;
    }

    onActive(event) {
        this.status = 'Active';
    }

    onInactive(event) {
        this.status = 'Inactive';
    }

    // TODO: Add member to members
    onSubmit(value: any) {

        console.log(value);
        this.memberModel = value;
        console.log('Model', this.memberModel);
        // alert(this.memberForm.value.firstName);
        //
        // const memberData = {
        //     firstName: this.firstName,
        //     lastName: this.lastName,
        //     jobTitle: this.jobTitle,
        //     team: this.team,
        //     status: this.status
        // };
        // alert('Hello ' + JSON.stringify(memberData));
    }
}
