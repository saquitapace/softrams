import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
    members = [];
    teams = [];
    showModal = false;
    updateState = false;
    confirmUpdate = false;
    confirmDelete = false;
    memberId: number;
    title = 'Add';
    type = 'update';
    memberData = {
        firstName: '',
        lastName: '',
        jobTitle: '',
        status: '',
        team: '',
    };

    constructor(public appService: AppService, private router: Router) {
    }

    navigator(id) {
        console.log('ID on Navigator ', id);
        this.router.navigate([`/members/${id}`]);
    }

    ngOnInit() {
        this.appService.getMembers().subscribe(members => (this.members = members));
        this.appService.getTeams().subscribe(teams => (this.teams = teams));
    }

    goToAddMemberForm() {
        // this.router.navigate(['/member-details']);
        this.showModal = true;
        // console.log(`Hmmm...we didn't navigate anywhere`);
    }

    modalClose() {
        this.showModal = false;
        this.updateState = false;
    }

    modalSubmit() {
        this.showModal = false;
        this.appService.addMember(this.memberData).subscribe((data) => {
            this.members.push(data);
        });
    }

    confirmation(status) {
        if (status === 'update') {
            this.modalSubmitUpdate();
        } else if (status === 'delete') {

        }
    }

    modalSubmitUpdate() {

        this.updateState = false;
        this.closeModel();
        this.appService.updateMembers(this.memberData, this.memberId).subscribe((data) => {
            const newMemberData = [];
            for (const member of this.members) {
                if (member.id !== this.memberId) {
                    newMemberData.push(member);
                }
            }
            newMemberData.push(data);
            this.members = newMemberData;
        });
    }

    showConfirmDialog(cUpdate, cDelete, data?) {
        this.closeModel();
        if (data) {
            this.memberId = data.id;
        }
        this.confirmUpdate = cUpdate;
        this.confirmDelete = cDelete;
    }

    closeModel() {
        this.confirmUpdate = false;
        this.confirmDelete = false;
        this.showModal = false;
        this.updateState = false;

    }

    onFirstName(event) {
        this.memberData.firstName = event.target.value;
    }

    onLastName(event) {
        this.memberData.lastName = event.target.value;
    }

    onJobTitle(event) {
        this.memberData.jobTitle = event.target.value;
    }

    onTeam(event) {
        this.memberData.team = event.target.value;
    }

    onActive(event) {
        this.memberData.status = 'Active';
    }

    onInactive(event) {
        this.memberData.status = 'Inactive';
    }


    editMemberByID(id: number) {
        this.memberId = id;
        for (const member1 of this.members) {
            if (member1.id === id) {
                this.memberData.firstName = member1.firstName;
                this.memberData.lastName = member1.lastName;
                this.memberData.jobTitle = member1.jobTitle;
                this.memberData.team = member1.team;
                this.memberData.status = member1.status;
            }
        }
        this.updateState = true;
    }

    confirmDeleteDialog() {
        this.closeModel();
        this.confirmDelete = true;
    }

    deleteMemberById() {
        this.closeModel();
        this.appService.deleteMember(this.memberId).subscribe(() => {
            const newMembers = [];
            for (const member of this.members) {
                if (member.id !== this.memberId) {
                    newMembers.push(member);
                }
            }
            this.members = newMembers;
        });

    }
}
