import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';
import { ApicontrollerService } from '../../../controller/apicontroller.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  adminName = localStorage.getItem('name') || 'Admin';

  isSidebarOpen = false;

  totalUsers = 0;
  activeUsers = 0;
  totalReports = 0;

  users: any[] = [];

  loadingUsers = false;
  usersError = '';

  stats = [
    { title: 'Total Users', value: 0, icon: '👥' },
    { title: 'Active Users', value: 0, icon: '✅' },
    { title: 'ABG Analyses', value: 0, icon: '🩺' }
  ];

  currentYear = new Date().getFullYear();

  constructor(
    private router: Router,
    private Apicontroller: ApicontrollerService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'ADMIN') {
      this.router.navigate(['/login'], { replaceUrl: true });
      return;
    }

    this.loadUsers();
  }

  async loadUsers(): Promise<void> {
    this.loadingUsers = true;
    this.usersError = '';

    try {
      const resp = await this.Apicontroller.getAllUsers();

      if (resp?.status === 0) {

        this.users = Array.isArray(resp.data)
          ? resp.data
          : [];

        // Calculate user counts from API data
        this.totalUsers = this.users.length;

        this.activeUsers = this.users.filter(
          user => user.is_active === true
        ).length;

        // Update statistics cards
        this.stats[0].value = this.totalUsers;
        this.stats[1].value = this.activeUsers;
        this.stats[2].value = this.totalReports;

      } else {
        this.users = [];
        this.totalUsers = 0;
        this.activeUsers = 0;

        this.stats[0].value = 0;
        this.stats[1].value = 0;

        this.usersError =
          resp?.msg || 'Unable to fetch users.';
      }

    } catch (error) {
      console.error('Get all users error:', error);

      this.usersError =
        'Unable to connect to the server.';

    } finally {
      this.loadingUsers = false;
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');

    this.router.navigate(['/login']);
  }



 async manageUser(
  user: any,
  action: 'activate' | 'deactivate' | 'delete' | 'restore'
): Promise<void> {

  if (!user?.row_id) {
    alert('User ID not found');
    return;
  }

  const messages: Record<string, string> = {
    activate: 'Are you sure you want to activate this user?',
    deactivate: 'Are you sure you want to deactivate this user?',
    delete: 'Are you sure you want to delete this user?',
    restore: 'Are you sure you want to restore this user?'
  };

  if (!confirm(messages[action])) {
    return;
  }

  try {
    user.actionLoading = true;

    const resp: any = await this.Apicontroller.manageUserStatus({
      row_id: user.row_id,
      action: action
    });

    if (resp?.status === 0) {
      alert(resp.msg || 'User updated successfully');

      // Refresh user list using your existing API
      await this.loadUsers();
    } else {
      alert(resp?.msg || 'Unable to update user');
    }

  } catch (error) {
    console.error('Manage user error:', error);
    alert('Unable to connect to the server.');
  } finally {
    user.actionLoading = false;
  }
}



showUserDialog = false;

selectedUser: any = null;

selectedAction:
  | 'activate'
  | 'deactivate'
  | 'delete'
  | 'restore' = 'activate';

get dialogTitle(): string {
  const titles: Record<string, string> = {
    activate: 'Activate User?',
    deactivate: 'Deactivate User?',
    delete: 'Delete User?',
    restore: 'Restore User?'
  };

  return titles[this.selectedAction];
}

get dialogMessage(): string {
  const messages: Record<string, string> = {
    activate: 'This user will be able to access the system.',
    deactivate: 'This user will no longer be able to access the system.',
    delete: 'This user will be moved to the deleted users list.',
    restore: 'This user will be restored to the user list.'
  };

  return messages[this.selectedAction];
}

get confirmButtonText(): string {
  const labels: Record<string, string> = {
    activate: 'Yes, Activate',
    deactivate: 'Yes, Deactivate',
    delete: 'Yes, Delete',
    restore: 'Yes, Restore'
  };

  return labels[this.selectedAction];
}

openUserDialog(
  user: any,
  action: 'activate' | 'deactivate' | 'delete' | 'restore'
): void {
  this.selectedUser = user;
  this.selectedAction = action;
  this.showUserDialog = true;
}

closeUserDialog(): void {
  if (this.selectedUser?.actionLoading) {
    return;
  }

  this.showUserDialog = false;
  this.selectedUser = null;
}



toastMessage = '';
toastType: 'success' | 'error' = 'success';
showToast = false;

private toastTimer: ReturnType<typeof setTimeout> | null = null;

showToastMessage(
  message: string,
  type: 'success' | 'error' = 'success'
): void {
  if (this.toastTimer) {
    clearTimeout(this.toastTimer);
  }

  this.toastMessage = message;
  this.toastType = type;
  this.showToast = true;

  this.toastTimer = setTimeout(() => {
    this.showToast = false;
    this.toastTimer = null;
  }, 3000);
}

async confirmUserAction(): Promise<void> {
  if (!this.selectedUser || this.selectedUser.actionLoading) {
    return;
  }

  const user = this.selectedUser;
  const action = this.selectedAction;

  try {
    user.actionLoading = true;

    const resp: any =
      await this.Apicontroller.manageUserStatus({
        row_id: user.row_id,
        action
      });

    if (resp?.status === 0) {
      this.showUserDialog = false;
      this.selectedUser = null;

      this.showToastMessage(
        resp?.msg || 'User updated successfully.',
        'success'
      );

      await this.loadUsers();
    } else {
      this.showToastMessage(
        resp?.msg || 'Unable to update user.',
        'error'
      );
    }
  } catch (error) {
    console.error('Manage user error:', error);

    this.showToastMessage(
      'Unable to connect to the server.',
      'error'
    );
  } finally {
    user.actionLoading = false;
  }
}


openProfile(){

}

}