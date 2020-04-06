import { Component, OnInit } from "@angular/core";
import { UserManagementService } from "./user-management.service";
import { User } from "src/app/models/user";
import { ModalService } from "../modal-module/modal.service";
import { MatDialog } from '@angular/material/dialog';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: "app-users-page",
  templateUrl: "./users-page.component.html",
  styleUrls: ["./users-page.component.scss"],
})
export class UsersPageComponent implements OnInit {
  users: User[] = [];
  selected: User[] = [];

  constructor(
    private userManagementService: UserManagementService,
    private modalService: ModalService, private dialog: MatDialog,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.userManagementService.getAllUsers().subscribe(
      (val) => {
        console.log(val);
        this.users = val;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openModal(mode: string, user: User) {

    const dialogRef = this.dialog.open(AddUserModalComponent, {
      autoFocus: false,
      data: {mode, user},
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if (result !== undefined) {
        if (mode === 'Add') {
          this.users = [...this.users, result];
        }
        else if (mode === 'Edit') {
          /*
          const index: number = this.users.findIndex((e) => e.id === user.id);
          const usersNew: User[] = [...this.users];
          const updUser: User = {...user};
          updUser.firstName = result.firstName;
          updUser.lastName = result.lastName;
          updUser.roles = result.roles;
          updUser.phoneNumber = result.phoneNumber;
          usersNew[index] = updUser;
          this.users = usersNew;
          */
        }
    }

    });


  }

  onDeleteSelection() {
    const toBeRemoved = this.selected.length;

    const dialogRef: any = this.modalService.confirmModal(
      "Do you want to delete " + toBeRemoved + " users?"
    );


    dialogRef.afterClosed().subscribe((val) => {
      console.log(val);
      if (val === true) {
        let count = 0;
        this.selected.forEach((user) => {
          this.users = this.users.filter(e => e.username !== user.username);
          this.userManagementService.deleteUser(user.username).subscribe((val) => {
            count += 1;
            if (count === toBeRemoved) {
              this.notificationService.info('Deleted ' + toBeRemoved + ' users.');
            }
          });
        });
      }
    });
  }

}
